<template>
  <div>
    <div class="card">
      <div class="card-header bg-danger text-white">
        <h4>{{$t('Withdraw.main')}}</h4>
      </div>
      <div class="card-body">
        <CRow>
          <CCol sm="4" lg="4" class="mb-3">
            <label for="from">{{$t('from')}}</label>
            <date-picker v-model="startDate" type="format" id="from" class="float-right"></date-picker>
          </CCol>
          <CCol sm="4" lg="4" class="mb-3">
            <label for="to">{{$t('to')}}</label>
            <date-picker id="to" v-model="endDate" type="format" class="float-right"></date-picker>
          </CCol>
          <CCol sm="4" lg="4">
            <CButton color="info" block class="float-right" variant="outline">{{$t('search')}}</CButton>
          </CCol>
        </CRow>
        <CRow class="mt-4">
          <CCol sm="12" lg="12">
            <CButton color="primary" class="float-right" @click="openModal">
              {{$t('Withdraw.withdraw')}}
              <img
                :src="loadingImage"
                v-show="status=='gettingAccount'"
                alt="loading"
                width="20px"
              />
            </CButton>
          </CCol>
        </CRow>
      </div>
    </div>
    <div class="card">
      <CCardHeader class="bg-success text-white">{{$t('Withdraw.history')}}</CCardHeader>
      <CCardBody>
        <div class="text-center">
          <img :src="loadingImage" v-show="status=='gettingHistory'" alt="loading" width="40px" />
        </div>
        <CCard v-show="status!='gettingHistory'">
          <CCardBody>
            <CDataTable
              :items="withdrawHistory"
              :fields="fields"
              table-filter
              column-filter
              items-per-page-select
              :items-per-page="5"
              hover
              sorter
              pagination
            >
              <template #made_by="{item}">
                <td>{{item.made_by.name}}</td>
              </template>
              <template #order="{item, index}"><td>{{index + 1}}</td></template>
              <template #withdrawal_date="{item}"><td>{{changeDateformat(item.created_at)}}</td></template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCardBody>
    </div>
    <CModal :title="$t('Withdraw.withdraw')" color="success" :show.sync="modal">
      <CRow>
        <CCol sm="12" lg="12">
          <span>{{$t('Withdraw.select_user')}}</span>
          <select id="how" v-model="withdrawOption.userName" class="form-control mt-2">
            <option value>{{$t('select')}}</option>
            <option
              :value="item.tel_number"
              v-for="(item, index) in users"
              :key="index"
            >{{item.tel_number}}</option>
          </select>
        </CCol>
        <CCol sm="12" lg="12" class="mt-2">
          <CInput :label="$t('Withdraw.amount')" type="number" v-model="withdrawOption.amount" />
        </CCol>
        <CCol sm="12" lg="12" class="mt-2 text-danger" v-if="errors.length>0">
          <small v-for="(item, index) in errors" :key="index">{{item}}</small>
        </CCol>
      </CRow>
      <template #footer>
        <CButton @click="modal = false" color="danger">{{$t('cancel')}}</CButton>
        <CButton @click="confirmWithraw" color="success">{{$t('table.withdraw')}}</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import loadingImage from "@/assets/img/loading.gif";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { buttons, withdraw } from "../tableHeaders";
import { mapGetters } from "vuex";
export default {
  name: "WithdrawalReport",
  components: { DatePicker },
  computed: {
    ...mapGetters({
      status: "report/currentStatus"
    })
  },
  mounted() {
    this.init();
  },
  methods: {
    confirmWithraw() {
      this.errors = [];
      if (!this.withdrawOption.userName || !this.withdrawOption.amount) {
        this.errors.push(this.$i18n.t("err_msg"));
        return;
      } else {
        this.modal = false;
        this.$store
          .dispatch("report/confirmWithraw", this.withdrawOption)
          .then(result => {
            this.$store.commit("report/success");
            this.notification(result.data.status);
            this.withdrawHistory = result.data.withdrawHistory;
          })
          .catch(err => {
            this.errorHandle(err);
          });
      }
    },
    notification(status) {
      this.$notify({
        type: status ? "success" : "warn",
        text: status
          ? this.$i18n.t("Withdraw.success")
          : this.$i18n.t("Withdraw.failed")
      });
    },
    errorHandle(err) {
      if (err.message == "Request failed with status code 401") {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
      }
    },
    openModal() {
      this.errors = [];
      this.$store
        .dispatch("report/getAccounts")
        .then(result => {
          this.$store.commit("report/success");
          this.users = result.data.accounts;
          this.modal = true;
        })
        .catch(err => {
          this.errorHandle(err);
        });
    },
    changeDateformat(timestamp) {
      let date = new Date(timestamp);
      return date.toLocaleString();
    },
    init() {
      for (let i = 0; i < this.withdraw.length; i++) {
        let item = this.withdraw[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
      this.$store
        .dispatch("report/getWithdraws")
        .then(result => {
          this.$store.commit("report/success");
          this.withdrawHistory = result.data.withdrawHistory;
        })
        .catch(err => {
          this.errorHandle(err);
        });
    }
  },
  data() {
    return {
      modal: false,
      startDate: null,
      users: [],
      endDate: null,
      buttons,
      withdraw,
      loadingImage,
      withdrawHistory: [],
      fields: [],
      errors: [],
      withdrawOption: {
        userName: "",
        amount: ""
      }
    };
  }
};
</script>
