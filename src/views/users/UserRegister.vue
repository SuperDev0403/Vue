<template>
  <CCard>
    <CCardHeader class="bg-success text-white">{{title? title: $t('Add_members.main')}}</CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.phone')" type="number" v-model="info.phone" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.username')" v-model="info.userName" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.firstName')" v-model="info.firstName" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.lastName')" v-model="info.lastName" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.accNum')" type="number" v-model="info.accNum" />
        </CCol>
        <CCol sm="6" lg="6">
          <span>{{$t('Add_members.bank')}}</span>
          <select id="bank" v-model="info.bank" class="form-control mt-2">
            <option value>{{$t('select')}}</option>
            <option :value="item" v-for="(item, index) in Banks" :key="index">{{item}}</option>
          </select>
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.pass')" type="password" v-model="info.password" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput
            :label="$t('Add_members.confirm')"
            type="password"
            v-model="info.confirmPassword"
          />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.lineID')" v-model="info.lineID" />
        </CCol>
        <CCol :sm="info.userLevel == 'custom'?'3':'6'" :lg="info.userLevel == 'custom'?'3':'6'">
          <span>{{$t('Add_members.user_role')}}</span>
          <select
            id="how"
            v-model="info.userLevel"
            class="form-control mt-2"
            v-show="isLoading!='loading'"
          >
            <option value>{{$t('select')}}</option>
            <option :value="item" v-for="(item, index) in userRole" :key="index">{{item}}</option>
          </select>
          <div class="mt-2">
            <img :src="loadingImage" v-show="isLoading=='loading'" alt="loading" width="40px" />
          </div>
        </CCol>
        <CCol sm="6" lg="6">
          <span>{{$t('Add_members.how')}}</span>
          <select id="how" v-model="info.socail" class="form-control mt-2">
            <option value>{{$t('select')}}</option>
            <option
              :value="item"
              v-for="(item, index) in socials"
              :key="index"
            >{{item.toUpperCase()}}</option>
          </select>
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Add_members.addition')" v-model="info.additional" />
        </CCol>
      </CRow>
      <hr />
      <h4 class="mt-4">{{$t('Add_members.extraQuestion')}}</h4>
      <CCol sm="12" lg="12">
        <CInputRadioGroup
          :options="receive"
          @update:checked="receiveChange"
          v-model="info.receive"
          custom
        />
      </CCol>
      <p>{{info.receive}}</p>
      <h4 class="mt-4">{{$t('Add_members.old')}}</h4>
      <CCol sm="12" lg="12" class="mb-4">
        <CInputRadioGroup :options="customers" @update:checked="customerChange" custom />
      </CCol>
      <div class="text-danger mt-2" v-for="(item, index) in errors" :key="index">
        <small>{{item}}</small>
      </div>
      <CButton color="primary" class="mt-4" @click="register">
        {{title? $t('submit'):$t('Add_members.register')}}
        <img
          :src="loadingImage"
          v-show="creating"
          alt="loading"
          width="20px"
        />
      </CButton>
      <CButton v-show="title" @click="cancelEdit"  class="mt-4 ml-3" color="warning">{{$t('cancel')}}</CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import loadingImage from "@/assets/img/loading.gif";
import { mapGetters } from "vuex";

export default {
  name: "UserRegister",
  props: ["userInfo", "title"],
  data() {
    return {
      creating: false,
      customUserLevel: "",
      loadingImage,
      errors: [],
      receive: [
        {
          label: this.$i18n.t("Add_members.receive"),
          value: true
        },
        {
          label: this.$i18n.t("Add_members.notreceive"),
          value: false
        }
      ],
      userRole: [],
      customers: [
        {
          label: this.$i18n.t("Add_members.yes"),
          value: true
        },
        {
          label: this.$i18n.t("Add_members.no"),
          value: false
        }
      ],

      Banks: [],
      socials: [
        "facebook",
        "line",
        "google",
        "youtube",
        "ig",
        "sms",
        "fried",
        "other"
      ],
      info: {
        userName: "",
        phone: "",
        firstName: "",
        lastName: "",
        accNum: "",
        bank: "",
        confirmPassword: "",
        lineID: "",
        userLevel: "",
        socail: "",
        additional: "",
        receive: true,
        customer: true
      }
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "user/currentStatus"
    })
  },
  mounted: function() {
    if (this.userInfo) {
      console.log("this.userInfo", this.userInfo);
      this.info = this.userInfo;
    } else {
      this.$notify({
        type: "info",
        text: this.$i18n.t("Add_members.msg")
      });
    }
    this.getUserLevel();
  },
  methods: {
    cancelEdit() {
      this.$store.commit("user/edited");
    },
    getUserLevel() {
      this.$store
        .dispatch("user/getUserLevelsAndBanks")
        .then(result => {
          this.$store.commit("user/success");
          this.userRole = result.data.userLevels;
          this.Banks = result.data.banks;
        })
        .catch(err => {
          if (err.message == "Request failed with status code 401") {
            localStorage.removeItem("token");
            this.$router.push("/auth/login");
          }
        });
    },
    customerChange(event) {
      this.info.customer = event;
    },
    receiveChange(event) {
      this.info.receive = event;
    },
    register: function() {
      this.errors = [];
      if (this.info.password != this.info.confirmPassword)
        this.errors.push("Password Does not match.");
      let keys = Object.keys(this.info);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        if (!this.info[key])
          this.errors.push("Please fill out all of the form");
        break;
      }
      if (this.info.userLevel == "custom" && this.customUserLevel == "")
        this.errors.push("Please insert custom user Level");
      if (this.errors.length > 0) {
        return;
      } else {
        this.creating = true;
        this.errors = [];
        let data = this.info;
        if (data.userLevel == "custom") {
          data.customUserLevel = this.customUserLevel;
        } else {
          if (data.customUserLevel) delete data.customUserLevel;
        }
        data.admin = true;
        if (this.userInfo) {
          this.$store
            .dispatch("user/editUserInfo", data)
            .then(result => {
              console.log("result", result);
              this.$store.commit("user/edited");
              this.creating = false;
            })
            .catch(err => {
              this.creating = false;
              this.$store.commit("user/success");
              this.$store.commit("user/edited");
              if (err.message == "Request failed with status code 401") {
                localStorage.removeItem("token");
                this.$router.push("/auth/login");
              }
              this.errors.push(err);
            });
        } else {
          this.$store
            .dispatch("user/createUser", data)
            .then(() => {
              this.creating = false;
              this.$router.push(`/${this.$i18n.locale}/users/report`);
            })
            .catch(err => {
              this.creating = false;
              this.$store.commit("user/success");
              if (err.message == "Request failed with status code 401") {
                localStorage.removeItem("token");
                this.$router.push("/auth/login");
              }
              this.errors.push(err);
            });
        }
      }
    }
  }
};
</script>
<style lang="css">
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>