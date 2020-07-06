<template>
  <CCard>
    <CCardHeader class="bg-primary text-white">
      <h4>{{$t('Dashboard.main')}}</h4>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol
          sm="6"
          :lg="checkItem(item) ? '6': '4'"
          v-for="(item, index) in hasDetails"
          :key="index"
        >
          <CWidgetDropdown
            :color="`${color[index%3]}`"
            :header="`${info[item].value}`"
            :text="$t(`Dashboard.${item}`)"
          >
            <template #default>
              <CDropdown color="transparent p-0" placement="bottom-end" v-if="info[item].link">
                <template #toggler-content>
                  <CIcon name="cil-settings" />
                </template>
                <CDropdownItem @click="viewDetail(info[item].link)">{{$t('Dashboard.detail')}}</CDropdownItem>
              </CDropdown>
            </template>
            <template #footer>
              <CCard class="m-2" v-if="hasDetails.includes(item)">
                <CCardBody :class="`bg-${color[index%3]}`">
                  <CRow>
                    <CCol sm="12" lg="8" class="mb-1">
                      <label for="from">{{$t('from') }}</label>
                      <date-picker
                        v-model="info[item]['startDate']"
                        type="format"
                        id="from"
                        class="float-right"
                      ></date-picker>
                    </CCol>
                    <CCol sm="12" lg="8" class="mb-1">
                      <label for="to">{{$t('to')}}</label>
                      <date-picker
                        id="to"
                        v-model="info[item]['endDate']"
                        type="format"
                        class="float-right"
                      ></date-picker>
                    </CCol>
                    <CCol sm="12" lg="4">
                      <CButton color="primary" class="float-right">{{$t('submit')}}</CButton>
                    </CCol>
                  </CRow>
                  <CCard :class="`bg-transparent mt-2`">
                    <CCardHeader>{{$t('detail')}}</CCardHeader>
                    <CCardBody class="text-white">
                      <table style="width:100%" v-if="!checkItem(item)">
                        <tbody>
                          <tr v-for="(agent, i) in info.total_agent.agents" :key="i">
                            <td>{{Object.keys(agent)[0]}}</td>
                            <td>{{Object.values(agent)[0]}}</td>
                          </tr>
                        </tbody>
                      </table>
                      <CDataTable
                        class="text-white"
                        v-if="checkItem(item)"
                        :fields="info[item].fields"
                        :items="info[item].items"
                        striped
                        hover
                      ></CDataTable>
                    </CCardBody>
                  </CCard>
                </CCardBody>
              </CCard>
            </template>
          </CWidgetDropdown>
        </CCol>
      </CRow>
    </CCardBody>
    <div class="vld-parent">
      <loading-effect :active.sync="loading" :is-full-page="true" loader="dots"></loading-effect>
    </div>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
import LoadingEffect from "vue-loading-overlay";
import { changeDateformat, errorHandle } from "./functions";
import { gameReports, creditReports } from "./tableHeaders";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "Dashboard",
  components: { LoadingEffect, DatePicker },
  computed: {
    ...mapGetters({
      loading: "home/isLoading"
    })
  },
  data() {
    return {
      changeDateformat,
      errorHandle,
      color: ["success", "info", "warning"],
      info: {
        total_agent: {
          startDate: null,
          endDate: null,
          value: 0,
          agents: [],
          link: `/${this.$i18n.locale}/users/report`
        },
        total_member: {
          startDate: null,
          endDate: null,
          value: 0,
          link: `/${this.$i18n.locale}/users/report`
        },
        total_win_lose: {
          startDate: null,
          endDate: null,
          value: 0,
          link: `/${this.$i18n.locale}/reports/statement`
        },
        game_reports: {
          startDate: null,
          endDate: null,
          value: 0,
          fields: [],
          items: [],
          link: `/${this.$i18n.locale}/games`
        },
        credit_reports: {
          startDate: null,
          endDate: null,
          value: 0,
          fields: [],
          items: [],
          link: `/${this.$i18n.locale}/settings/customer`
        },
        tWithdraw: { value: 0 },
        tDeposit: { value: 0 },
        tCompanyShare: { value: 0 },
        nAgentToday: { value: 0 },
        nMemberToday: { value: 0 },
        tDepoisitToday: { value: 0 },
        tGame: { value: 0 },
        topGames: { value: 0 }
      },
      gameReports,
      creditReports,
      hasDetails: [
        "total_agent",
        "total_member",
        "total_win_lose",
        "game_reports",
        "credit_reports"
      ],
      dashItems: []
    };
  },
  methods: {
    viewDetail(link) {
      this.$router.push(link);
    },
    checkItem(item) {
      if (item == "game_reports" || item == "credit_reports") {
        return true;
      } else {
        return false;
      }
    },
    getSummary() {
      this.$store
        .dispatch("home/getSummary")
        .then(result => {
          let data = result.data.data;
          let keys = Object.keys(data);
          keys.forEach(item => {
            if (item == "total_agent") {
              let levels = Object.keys(data[item]);
              levels.forEach(key => {
                this.info[item].value += data[item][key];
                let agentData = {};
                agentData[key] = data[item][key];
                this.info[item].agents.push(agentData);
              });
            } else {
              this.info[item].value = data[item];
            }
          });
          this.$store.commit("home/success");
        })
        .catch(err => {
          this.$store.commit("home/error");
          this.errorHandle(err);
        });
    },
    init() {
      // this.hasDetails.forEach(item => {
      //   this.info[item].startDate = null;
      //   this.info[item].endDate = null;
      // });
      for (let i = 0; i < this.gameReports.length; i++) {
        let item = this.gameReports[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.info.game_reports.fields.push(item);
      }
      for (let i = 0; i < this.creditReports.length; i++) {
        let item = this.creditReports[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.info.credit_reports.fields.push(item);
      }
      this.info.game_reports.items = [
        { provider: "Live22", category: "SL", turn: 120, win_lose: 12314 },
        { provider: "Live22", category: "LC", turn: 2324, win_lose: 123184 },
        { provider: "SA Game", category: "LC", turn: 124, win_lose: 12314457 },
        {
          provider: "SlotXO",
          category: "APP",
          turn: 123420,
          win_lose: 12324514
        },
        { provider: "Joker", category: "LC", turn: 124430, win_lose: 12324314 }
      ];
      this.info.credit_reports.items = [
        { provider: "Live22", submit: 10000, remain: 334 },
        { provider: "WM CAsino", submit: 675, remain: 345 },
        { provider: "SA Game", submit: 105675000, remain: 345 },
        { provider: "SlotXO", submit: 567998, remain: 3453 },
        { provider: "Joker", submit: 76678, remain: 56 }
      ];
    }
  },
  mounted() {
    this.dashItems = Object.keys(this.info);
    this.init();
    this.getSummary();
  }
};
</script>
<style lang="css">
.mx-datepicker {
  width: 120px !important;
}
.bg-transparent .table {
  color: white !important;
}
</style>