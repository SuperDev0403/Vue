<template>
  <div>
    <div class="card">
      <div class="card-header bg-danger text-white">
        <h4>{{$t('Profit_Loss.main')}}</h4>
      </div>
      <div class="card-body">
        <CRow>
          <CCol sm="4" lg="4" class="mb-3">
            <label for="from">{{$t('from')}}</label>
            <date-picker
              v-model="startDate"
              type="format"
              id="from"
              class="float-right"
              @change="searchByDate"
            ></date-picker>
          </CCol>
          <CCol sm="4" lg="4" class="mb-3">
            <label for="to">{{$t('to')}}</label>
            <date-picker
              id="to"
              v-model="endDate"
              type="format"
              v-on:change="searchByDate"
              class="float-right"
            ></date-picker>
          </CCol>
          <CCol sm="2" lg="2">
            <!-- <CButton color="info" block class="float-right" variant="outline">{{$t('search')}}</CButton>
            <small class="text-danger" v-show="filterError">Please insert value to insert</small>-->
          </CCol>
          <CCol sm="2" lg="2">
            <CButton
              color="warning"
              block
              class="float-right"
              variant="outline"
              @click="clearFilter"
            >{{$t('clear_filter')}}</CButton>
          </CCol>
        </CRow>
        <CRow>
          <template v-for="(button, index) in buttons">
            <CButton
              :key="index"
              color="success"
              variant="outline"
              class="m-2"
              @click="searchData(button.value)"
            >{{$t(`buttons.${button.name}`)}}</CButton>
          </template>
        </CRow>
      </div>
    </div>
    <div class="card">
      <CCardBody>
        <div class="text-center">
          <img :src="loadingImage" v-show="status=='loading'" alt="loading" width="40px" />
        </div>
        <CCard v-show="status!='loading'">
          <CCardBody>
            <CDataTable
              :items="filteredData"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="10"
              hover
              sorter
              pagination
            >
              <template #order="{item, index}">
                <td>{{index + 1 }}</td>
              </template>
              <template #created_at="{item}">
                <td>{{changeDateformat(item.created_at)}}</td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCardBody>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import loadingImage from "@/assets/img/loading.gif";
import "vue2-datepicker/index.css";
import { buttons, report_statement } from "../tableHeaders";
import { mapGetters } from "vuex";
export default {
  name: "StatementReport",
  components: { DatePicker },
  data() {
    return {
      startDate: null,
      endDate: null,
      loadingImage,
      buttons,
      report_statement,
      items: [],
      filteredData: [],
      fields: []
    };
  },
  computed: {
    ...mapGetters({
      status: "report/currentStatus"
    })
  },
  methods: {
    searchData(e) {
      if (e == -1) {
        this.filteredData = this.items;
        this.startDate = null;
        this.endDate = null;
        return;
      } else {
        let endDate = new Date();
        endDate = new Date(endDate.setHours(0));
        endDate = new Date(endDate.setMinutes(0));
        let startDate = endDate;
        endDate = new Date(endDate.setDate(endDate.getDate() + 1));
        startDate = new Date(startDate.setDate(startDate.getDate() - e - 1));
        this.filteredData = this.items.filter(item => {
          let itemDate = new Date(item.created_at);
          return startDate <= itemDate && endDate >= itemDate;
        });
      }
    },
    clearFilter() {
      this.startDate = null;
      this.endDate = null;
      this.filteredData = this.items;
    },
    searchByDate() {
      console.log(this.startDate);
      if (!this.startDate) {
        this.filteredData = this.items.filter(item => {
          let searchDate = new Date(this.endDate);
          searchDate.setDate(searchDate.getDate() + 1);
          let itemDate = new Date(item.created_at);
          return searchDate >= itemDate;
        });
      } else if (!this.endDate) {
        this.filteredData = this.items.filter(item => {
          let searchDate = new Date(this.startDate);
          let itemDate = new Date(item.created_at);
          return searchDate <= itemDate;
        });
      } else {
        this.filteredData = this.items.filter(item => {
          let startDate = new Date(this.startDate);
          let endDate = new Date(this.endDate);
          endDate.setDate(endDate.getDate() + 1);
          let itemDate = new Date(item.created_at);
          return startDate <= itemDate && endDate >= itemDate;
        });
      }
    },
    getField: function() {
      for (let i = 0; i < this.report_statement.length; i++) {
        let item = this.report_statement[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
    },
    changeDateformat(timestamp) {
      let date = new Date(timestamp);
      return date.toLocaleString();
    },
    errorHandle(err) {
      if (err.message == "Request failed with status code 401") {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
      }
    },
    getStatementData() {
      this.$store
        .dispatch("report/getStatementData")
        .then(result => {
          this.$store.commit("report/success");
          this.items = result.data.data;
          this.filteredData = this.items;
        })
        .catch(err => {
          this.errorHandle(err);
        });
    }
  },
  mounted() {
    this.getField();
    this.getStatementData();
  }
};
</script>
