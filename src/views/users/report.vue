<template>
  <div>
    <div class="card">
      <div class="card-header bg-danger text-white">
        <h4>{{$t('Manage_members.main')}}</h4>
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
          <CCol sm="2" lg="2"></CCol>
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
      </div>
    </div>
    <div class="card">
      <CCardHeader class="bg-success text-white">{{$t('Manage_members.user_list')}}</CCardHeader>
      <CCardBody>
        <div class="text-center">
          <img :src="loadingImage" v-show="gettingUser" alt="loading" width="40px" />
        </div>
        <CCollapse :show="!edit" :duration="400">
          <CCard v-show="!gettingUser">
            <CCardBody>
              <CDataTable
                :items="filteredData"
                :fields="fields"
                table-filter
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
                      <CDropdownItem @click="editUserDitail(item)">{{$t('edit')}}</CDropdownItem>
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
        </CCollapse>
        <CCollapse :show="edit" :duration="400">
          <userInfoPage v-if="edit" :userInfo="userInfo" :title="$t('edit')" />
        </CCollapse>
      </CCardBody>
    </div>
    <CModal :title="userName" color="info" :show.sync="modal" size="xl">
      <subDatail :data="subData" />
      <template #footer>
        <CButton
          @click="back(backList[backList.length-2])"
          color="danger"
          v-if="backList.length>1"
        >{{$t('back')}} {{$t('to')}} {{backList[backList.length-2].userName}}</CButton>
        <CButton @click="modal = false" color="danger">{{$t('close')}}</CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import loadingImage from "@/assets/img/loading.gif";
import userInfoPage from "./UserRegister";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { freeSet } from "@coreui/icons";
import { buttons, user_report, winlose } from "../tableHeaders";
import { mapGetters } from "vuex";
import i18n from "../../i18n";
import { errorHandle, changeDateformat } from "../functions";
import subDatail from "./subDetail";
export default {
  name: "UserReport",
  freeSet,
  components: { DatePicker, userInfoPage, subDatail },
  mounted: function() {
    this.getUsers();
    this.getField();
  },
  computed: {
    ...mapGetters({
      status: "user/currentStatus",
      edit: "user/editStatus",
      userName: "user/userName",
      backList: "user/backList"
    })
  },
  methods: {
    viewBetHistory(userID) {
      this.$router.push(`/${this.$i18n.locale}/logs/betHistory/${userID}`);
    },
    back(user) {
      let { userID, userName } = user;
      this.$store.commit("user/removeBackList");
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
    ViewCreatedUsers(userID, userName) {
      this.$store.commit("user/clearBackList");
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
          this.modal = true;
        })
        .catch(err => {
          this.toggleLoader();
          this.errorHandle(err);
        });
    },
    viewTransactionHistory(userID) {
      this.$router.push(`/${i18n.locale}/view/transactionHistory/${userID}`);
    },
    editUserDitail(item) {
      let unUsedKeys = [
        "_id",
        "__v",
        "account",
        "created_at",
        "updated_at",
        "password"
      ];
      unUsedKeys.forEach(key => delete item[key]);
      this.$store.commit("user/edit");
      this.userInfo = item;
    },
    clearFilter() {
      this.startDate = null;
      this.endDate = null;
      this.filteredData = this.items;
    },
    searchByDate() {
      if (!this.startDate && !this.endDate) {
        this.filteredData = this.items;
        return;
      }
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
      if (!this.items[index].account) {
        this.toggleLoader();
        this.$store
          .dispatch("user/getUserWinLoseReport", userID)
          .then(result => {
            this.toggleLoader();
            this.items[index]["account"] = result.data.reportData;
            this.items[index].show = !this.items[index].show;
            this.$store.commit("user/success");
          })
          .catch(err => {
            this.toggleLoader();
            this.errorHandle(err);
          });
      } else {
        this.items[index].show = !this.items[index].show;
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
      loadingImage,
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
      loader: "",
      modal: false,
      title: "",
      subData: []
    };
  }
};
</script>
<style lang="scss">
.username {
  font-size: 15px;
  font-weight: 900;
}
.nested-body {
  background-color: rgb(241, 234, 234);
}
</style>