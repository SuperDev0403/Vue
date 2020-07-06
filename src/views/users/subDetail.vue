<template>
  <div>
    <CCard>
      <CCardBody>
        <CDataTable
          :items="data"
          :fields="fields"
          table-filter
          column-filter
          items-per-page-select
          :items-per-page="5"
          hover
          sorter
          pagination
        >
          <template #option="{item}">
            <td>
              <CDropdown color="p-0" placement="bottom-end">
                <template #toggler-content>
                  <CIcon name="cil-settings" />
                </template>
                <CDropdownItem
                  @click="viewTransactionHistory(item.userID)"
                >{{$t('table.trans_history')}}</CDropdownItem>
                <CDropdownItem
                  @click="ViewCreatedUsers(item.userID, item.userName)"
                >{{$t('table.createdUsers')}}</CDropdownItem>
                <CDropdownItem @click="viewBetHistory(item.userID)">{{$t('table.betHistory')}}</CDropdownItem>
              </CDropdown>
            </td>
          </template>
          <template #userName="{item}">
            <td class="text-center">
              <div class="mb-2 username">{{item.userName}}</div>
              <CButton
                variant="outline"
                class="d-flex"
                @click="showHideHandle(item.id, item.userID)"
              >
                <span class="mr-2 text-info">{{item.show ? "Hide" :'Show'}}</span>
                <CIcon
                  :content="$options.freeSet[`${item.show?'cilChevronCircleUpAlt':'cilChevronCircleDownAlt'}`]"
                ></CIcon>
              </CButton>
            </td>
          </template>
          <template #created_at="{item}">
            <td>{{changeDateformat(item.created_at)}}</td>
          </template>
          <template #updated_at="{item}">
            <td>{{changeDateformat(item.updated_at)}}</td>
          </template>
          <template #details="{item}">
            <CCollapse :show="item.show" :duration="collapseDuration">
              <CCard>
                <CCardBody class="nested-body">
                  <CDataTable
                    :items="item.account"
                    :fields="winloseField"
                    :items-per-page="5"
                    smalls
                    fixed
                    hover
                    pagination
                  >
                    <template #order="{item}">
                      <td>{{item.order +1}}</td>
                    </template>
                    <template #timestamp="{item}">
                      <td>{{changeDateformat(item.updated_at)}}</td>
                    </template>
                  </CDataTable>
                </CCardBody>
              </CCard>
            </CCollapse>
          </template>
        </CDataTable>
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import { freeSet } from "@coreui/icons";
import { buttons, user_report, winlose } from "../tableHeaders";
import { mapGetters } from "vuex";
import i18n from "../../i18n";
import { errorHandle, changeDateformat } from "../functions";
export default {
  name: "subDetail",
  freeSet,
  components: {},
  mounted: function() {
    this.getField();
    this.init();
  },
  computed: {
    ...mapGetters({
      data: "user/subData",
      backList: "user/backList"
    })
  },
  methods: {
    viewBetHistory(userID) {
      this.$router.push(`/${this.$i18n.locale}/logs/betHistory/${userID}`);
    },
    init() {
      this.items = this.data;
    },
    ViewCreatedUsers(userID, userName) {
      this.$store.commit("user/addBackList", { userID, userName });
      this.toggleLoader();
      this.$store
        .dispatch("user/getUsers", userID)
        .then(result => {
          this.toggleLoader();
          this.$store.commit("user/setUserName", userName);
          let res = [];
          for (let i = 0; i < result.data.data.length; i++) {
            let item = result.data.data[i];
            item.id = i;
            item.show = false;
            res.push(item);
          }
          this.$store.commit("user/setData", res);
        })
        .catch(err => {
          this.toggleLoader();
          this.errorHandle(err);
        });
    },
    viewTransactionHistory(userID) {
      this.$router.push(`/${i18n.locale}/view/transactionHistory/${userID}`);
    },
    getUsers() {
      this.gettingUser = true;
      this.$store
        .dispatch("user/getUsers")
        .then(res => {
          this.gettingUser = false;
          if (res && res.data) {
            for (let i = 0; i < res.data.data.length; i++) {
              let item = res.data.data[i];
              item.id = i;
              item.show = false;
              this.items.push(item);
            }
            this.filteredData = this.items;
          }
        })
        .catch(err => {
          this.gettingUser = false;
          this.errorHandle(err);
        });
    },
    toggleLoader() {
      this.loading = !this.loading;
      if (this.loading) {
        this.loader = this.$loading.show({
          container: this.fullPage ? null : this.$refs.formContainer,
          loader: "dots"
        });
      } else {
        this.loader.hide();
      }
    },
    showHideHandle(index, userID) {
      if (!this.data[index].account) {
        this.toggleLoader();
        this.$store
          .dispatch("user/getUserWinLoseReport", userID)
          .then(result => {
            this.toggleLoader();
            this.data[index]["account"] = result.data.reportData;
            this.data[index].show = !this.data[index].show;
            this.$store.commit("user/success");
          })
          .catch(err => {
            this.toggleLoader();
            this.errorHandle(err);
          });
      } else {
        this.data[index].show = !this.data[index].show;
      }
    },
    getField: function() {
      this.fields.push({
        key: "option",
        label: "",
        sorter: false,
        filter: false
      });
      for (let i = 0; i < this.user_report.length; i++) {
        let item = this.user_report[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
      for (let i = 0; i < this.winlose.length; i++) {
        let item = this.winlose[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.winloseField.push(item);
      }
    }
  },
  data() {
    return {
      fullPage: false,
      gettingUser: false,
      startDate: null,
      endDate: null,
      buttons,
      userInfo: {},
      user_report,
      winlose,
      winloseField: [],
      items: [],
      collapseDuration: 300,
      fields: [],
      filteredData: [],
      changeDateformat,
      errorHandle,
      filterError: false,
      loading: false,
      loader: ""
    };
  }
};
</script>