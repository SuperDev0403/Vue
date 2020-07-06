<template>
  <div class="card">
    <div class="card-header bg-danger text-white">{{$t('System_Setting.main')}}</div>
    <div class="card-body">
      <!-- <div class="mt-2 text-center">
        <img :src="loadingImage" v-show="isLoading=='loading'" alt="loading" width="40px" />
      </div>-->
      <CCollapse :show="edit">
        <CRow>
          <CCol sm="6" lg="6">
            <CInput
              :label="$t('System_Setting.band')"
              :placeholder="$t('System_Setting.band')"
              v-model="information.band"
            />
          </CCol>
          <CCol sm="6" lg="6">
            <CInput
              :label="$t('System_Setting.link_to_play')"
              v-model="information.link"
              placeholder="https://www.texas.com"
            />
          </CCol>
          <CCol sm="6" lg="6">
            <CInput label="Line @" v-model="information.line" placeholder="LINE ID" />
          </CCol>
          <CCol sm="6" lg="6">
            <CInput
              :label="$t('System_Setting.credit')"
              type="number"
              v-model="totalCredit"
              disabled
            />
          </CCol>
          <CCol sm="6" lg="6">
            <label class="typo__label">{{$t('System_Setting.providers')}}</label>
            <multiselect
              v-model="information.selectedProviders"
              :options="providers"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :placeholder="$t('membership_page.pick')"
              label="name"
              track-by="name"
              :preselect-first="false"
            >
              <template slot="selection" slot-scope="{ values, search, isOpen }">
                <span
                  class="multiselect__single"
                  v-if="values.length &amp;&amp; !isOpen"
                >{{ values.length }} {{$t('membership_page.opt_selected')}}</span>
              </template>
            </multiselect>
          </CCol>
          <CCol sm="6" lg="4" class="d-block m-auto">
            <CButton
              color="primary"
              class="ml-2 float-right"
              variant="outline"
              @click="exportData"
            >{{$t('export')}}</CButton>
            <CButton
              color="info"
              class="ml-2 float-right mr-2"
              @click="submit"
              variant="outline"
            >{{$t('submit')}}</CButton>
            <CButton
              color="warning"
              class="mr-2 float-right"
              variant="outline"
              @click="edit=!edit"
            >{{$t('cancel')}}</CButton>
          </CCol>
        </CRow>
        <hr />
        <CCard v-show="information.selectedProviders.length>0">
          <CCardHeader>{{$t('System_Setting.provider')}}</CCardHeader>
          <CCardBody>
            <CRow
              v-for="(item, index) in information.selectedProviders"
              :key="index"
              class="text-center"
            >
              <CCol class="mt-2" sm="3" lg="3">
                <CButton color="primary" variant="outline" block>{{item.name}}</CButton>
              </CCol>
              <CCol class="mt-2 d-flex" sm="4" lg="4">
                <CInput :value="item.percent[defaultLevelKey]" horizontal class="ml-5" disabled />%
                <CInput v-model="item.percent[userLevelKey]" horizontal class="ml-5" type="number" />%
              </CCol>
              <CCol class="mt-2" sm="2" lg="2">
                <CInput v-model="item.credit[userLevelKey]" type="number"></CInput>
              </CCol>
              <CCol class="mt-2" sm="3" lg="3">
                <CButton color="success">{{$t('edit')}}</CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCollapse>
      <CCollapse :show="!edit" :duration="400">
        <CCard>
          <CCardHeader>{{$t('table.agent')}}</CCardHeader>
          <CCardBody>
            <CDataTable
              :items="users"
              :fields="fields"
              table-filter
              items-per-page-select
              :items-per-page="10"
              hover
              sorter
              pagination
            >
              <template #option="{item}">
                <td>
                  <CButton
                    color="success"
                    variant="outline"
                    @click="editAgent(item.userID, item.userLevel)"
                  >{{$t('edit')}}</CButton>
                </td>
              </template>
              <template #order="{item, index}">
                <td>{{index + 1 }}</td>
              </template>
              <template #member="{item}">
                <td class="text-center">
                  <CBadge
                    :color="item.member?'success':'warning'"
                    size="lg"
                  >{{item.member ? $t('yes'): $t('no')}}</CBadge>
                </td>
              </template>
              <template #created_at="{item}">
                <td>{{changeDateformat(item.created_at)}}</td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCollapse>
    </div>
    <div class="vld-parent">
      <loading-effect :active.sync="loading" :is-full-page="true" loader="dots"></loading-effect>
    </div>
  </div>
</template>

<script>
import loadingImage from "@/assets/img/loading.gif";
import Multiselect from "vue-multiselect";
import { mapGetters } from "vuex";
import { customer } from "../tableHeaders";
import { changeDateformat, errorHandle, getUserLevelKey } from "../functions";
import LoadingEffect from "vue-loading-overlay";
export default {
  name: "Customer",
  components: { Multiselect, LoadingEffect },
  data() {
    return {
      getUserLevelKey,
      changeDateformat,
      defaultLevelKey: "",
      errorHandle,
      edit: false,
      items: [],
      loadingImage,
      users: [],
      providers: [],
      errors: [],
      customer,
      fields: [],
      loggedinUserProviders: [],
      userLevelKey: "",
      information: {
        band: "",
        agent: "",
        link: "",
        line: "",
        selectedProviders: [],
        amount: 0
      }
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "user/currentStatus",
      loading: "user/isLoading"
    }),
    totalCredit() {
      let credit = 0;
      this.information.selectedProviders.forEach(item => {
        credit += Number.parseInt(item.credit[this.userLevelKey]);
      });
      return credit;
    }
  },
  mounted: function() {
    this.getUsers();
    this.getField();
    let user = JSON.parse(localStorage.getItem("user"));
    let { userLevel } = user;
    this.defaultLevelKey = getUserLevelKey(userLevel);
  },
  methods: {
    exportData() {
      this.$store
        .dispatch("user/exportData", this.information.agent)
        .then(result => {
          let data = {
            ...result.data.data,
            link: this.information.link
          };
          let arrayData = [];
          if (this.information.selectedProviders.length > 0) {
            for (
              let i = 0;
              i < this.information.selectedProviders.length;
              i++
            ) {
              let provider = this.information.selectedProviders[i];
              let provierData = {
                provider: provider.name,
                percent: provider.percent[this.userLevelKey],
                credit: provider.credit[this.userLevelKey]
              };
              if (i == 0) {
                arrayData.push({
                  ...data,
                  ...provierData
                });
              } else {
                arrayData.push({
                  agent: "",
                  userAccount: "",
                  time: "",
                  password: "",
                  link: "",
                  secret: "",
                  ...provierData
                });
              }
            }
          } else {
            arrayData.push({
              ...data
            });
          }
          this.dowloadCsv(arrayData);
          this.$store.commit("user/success");
        })
        .catch(err => {
          this.$store.commit("user/error");
          this.errorHandle(err);
        });
    },
    dowloadCsv(data) {
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += [
        Object.keys(data[0]).join(","),
        ...data.map(item => Object.values(item).join(","))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");
      const encodedData = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedData);
      link.setAttribute("download", `${data[0].agent}.csv`);
      link.click();
    },
    getField: function() {
      for (let i = 0; i < this.customer.length; i++) {
        let item = this.customer[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
    },
    editAgent(userID, userLevel) {
      this.userLevelKey = this.getUserLevelKey(userLevel);
      this.getCustomerInfo(userID);
    },
    notification(type, title, text) {
      this.$notify({
        type: type ? "success" : "warn",
        title: title,
        text: text
      });
    },
    submit() {
      this.errors = [];
      this.information.amount = this.totalCredit;
      let data = this.information;
      let keys = Object.keys(this.information);
      for (let i = 0; i < keys.length; i++) {
        if (!this.information[keys[i]]) {
          this.errors.push("Please complete the form");
          this.$notify({
            type: "warn",
            text: "Please complete the form."
          });
          return;
        }
      }
      this.$store
        .dispatch("user/editUser", data)
        .then(result => {
          this.edit = false;
          this.$store.commit("user/success");
          this.notification(result.data.status, "Edit User", result.data.msg);
          if (result.data.account) {
            let data = result.data.account;
            this.notification(
              data.status,
              "Creating User Account on Gaming Site",
              data.msg
            );
          }
        })
        .catch(err => {
          this.$store.commit("user/error");
          this.errorHandle(err);
        });
    },
    getCustomerInfo(userID) {
      if (userID) {
        this.$store
          .dispatch("user/getCustomerInfo", { userID })
          .then(result => {
            this.loggedinUserProviders = result.data.loggedInUserInfo.providers;
            let data = result.data.customerInfo;
            this.$store.commit("user/success");
            this.edit = true;
            this.information = {
              band: data ? data.band : "",
              // link: data ? data.link : "",
              link: "https://covid88.live",
              line: data ? data.line : "",
              amount: data ? data.amount : "",
              agent: userID,
              selectedProviders: data ? data.providers : []
            };
          })
          .catch(err => {
            this.$store.commit("user/error");
            this.errorHandle(err);
          });
      }
    },
    getPercentages(item) {
      for (let i = 0; i < this.loggedinUserProviders.length; i++) {
        let loggedInUserProvider = this.loggedinUserProviders[i];
        if (loggedInUserProvider.key == item.key) {
          return loggedInUserProvider.percent[this.defaultLevelKey];
        }
      }
      return item.percent[this.userLevelKey];
    },
    getUsers() {
      this.$store
        .dispatch("user/getUsers")
        .then(res => {
          if (res && res.data) {
            this.users = res.data.data;
            this.$store
              .dispatch("user/getProviders")
              .then(result => {
                this.$store.commit("user/success");
                this.providers = result.data.providers;
              })
              .catch(err => {
                this.$store.commit("user/error");
                this.errorHandle(err);
              });
          }
        })
        .catch(err => {
          this.$store.commit("user/error");
          this.errorHandle(err);
        });
    },
    onUploadImage(e) {
      let file = e[0];
      let selectedTime = file.lastModified;
      let url = URL.createObjectURL(file);
      console.log(new Date(selectedTime), url);
      this.images.push({
        image: url,
        timestamp: new Date(selectedTime),
        action: () => {
          console.log(url);
        }
      });
    }
  }
};
</script>
<style lang="css">
.file-select input {
  border: solid 1px gray;
  border-radius: 10px;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
