<template>
  <div>
    <div class="card">
      <div class="card-header bg-danger text-white">
        <h4>{{$t('Making_of_admins.main')}}</h4>
      </div>
      <div class="mt-2 text-center">
        <img :src="loadingImage" v-show="status=='loading'" alt="loading" width="40px" />
      </div>
      <CCardBody v-show="status!='loading'">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="items"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="10"
              hover
              sorter
              pagination
            >
              <template #order="{item, index}">
                <td>{{index +1}}</td>
              </template>
              <template #amount="{item}">
                <td>{{item.amount.toLocaleString()}}</td>
              </template>
              <template #type="{item}">
                <td>
                  <CBadge
                    :color="item.type=='dp'?'success':'danger'"
                    size="lg"
                  >{{$t(`table.${item.type}`)}}</CBadge>
                </td>
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
// import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import loadingImage from "@/assets/img/loading.gif";
import { adminActivity } from "../tableHeaders";
import { errorHandle, commit, notify, changeDateformat } from "../functions";
import { mapGetters } from "vuex";
export default {
  name: "TransferReport",
  // components: { DatePicker },
  computed: {
    ...mapGetters({
      status: "log/currentStatus"
    })
  },
  mounted() {
    this.init();
    this.getAdminHistory();
  },
  methods: {
    init() {
      for (let i = 0; i < this.adminActivity.length; i++) {
        let item = this.adminActivity[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
    },
    getAdminHistory() {
      let userID = this.$route.params.userID;
      this.$store
        .dispatch("log/getAdminHistory", userID)
        .then(result => {
          this.commit(true, "log");
          this.items = result.data.adminHistory;
        })
        .catch(err => {
          this.errorHandle(err);
          this.notify(err);
          this.commit(false, "log");
        });
    }
  },
  data() {
    return {
      startDate: null,
      endDate: null,
      items: [],
      fields: [],
      adminActivity,
      notify,
      errorHandle,
      changeDateformat,
      commit,
      loadingImage
    };
  }
};
</script>
