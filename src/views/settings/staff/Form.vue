<template>
  <CCard>
    <CCardHeader class="bg-success text-white">{{title}}</CCardHeader>
    <div class="mt-2 text-center">
      <img :src="loadingImage" v-show="status=='loading'" alt="loading" width="40px" />
    </div>
    <CCardBody v-show="status!='loading'">
      <CRow>
        <CCol sm="6" lg="6">
          <CInput v-model="userInfo.firstName" :label="$t('Add_staff.firstname')" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput v-model="userInfo.lastName" :label="$t('Add_staff.lastname')" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput
            v-model="userInfo.userName"
            @input="checkValidUsername"
            :description="userNameError"
            :label="$t('Add_staff.username')"
          />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput v-model="userInfo.password" :label="$t('Add_staff.password')" />
        </CCol>
      </CRow>
      <CCard class="mt-3">
        <CCardHeader class="bg-danger text-white">{{$t('Add_staff.subcard')}}</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6" md="6" xl="4" v-for="(item, index) in components" :key="index">
              <CCard>
                <CCardHeader
                  :class="`bg-${color[item.value]} text-white`"
                >{{$t(`${item.name}.nav`)}}</CCardHeader>
                <CCardBody>
                  <form action class="text-left ml-4">
                    <CRow>
                      <CCol sm="6" lg="6">
                        <input
                          class="mr-1"
                          type="radio"
                          :id="`${index}-edit`"
                          horizontal
                          custom
                          value="edit"
                          v-model="item.value"
                        />
                        <label class="mr-3" :for="`${index}-edit`">{{$t('Agent_system.editable')}}</label>
                      </CCol>
                      <CCol sm="6" lg="6">
                        <input
                          class="mr-1"
                          type="radio"
                          :id="`${index}-invisible`"
                          horizontal
                          custom
                          value="invisible"
                          v-model="item.value"
                        />
                        <label
                          class="mr-3"
                          :for="`${index}-invisible`"
                        >{{$t('Agent_system.invisible')}}</label>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <div class="text-danger mt-2" v-for="(item, index) in errors" :key="index">
        <p>{{item}}</p>
      </div>
      <CButton color="success" @click="addStaff" :disabled="creating=='loading'">
        {{$t('record')}}
        <img
          :src="loadingImage"
          v-show="creating=='loading'"
          alt="loading"
          width="18px"
        />
      </CButton>
    </CCardBody>
  </CCard>
</template>
<script>
import { componentsArray } from "./dataSource";
import loadingImage from "@/assets/img/loading.gif";
import { mapGetters } from "vuex";
export default {
  name: "Form",
  components: {},
  mounted() {
    this.init();
  },
  props: ["title", "userInfo"],
  data() {
    return {
      loadingImage,
      componentsArray,
      components: [],
      errors: [],
      userNameError: "",
      userNames: [],
      color: {
        edit: "success",
        invisible: "warning"
      }
    };
  },
  computed: {
    ...mapGetters({
      status: "currentStatus",
      creating: "setting/currentStatus"
    })
  },
  methods: {
    checkValidUsername() {
      if (this.userNames.includes(this.userInfo.userName)) {
        this.userNameError = "This user name already Taken!";
      } else {
        this.userNameError = "";
      }
    },
    success() {
      this.$store.commit("success");
    },
    init() {
      this.$store
        .dispatch("getUserNames")
        .then(result => {
          this.success();
          this.userNames = result.data.userNames;
        })
        .catch(err => {
          this.errorHandle(err);
        });
      this.components = componentsArray;
    },
    notify(data) {
      this.$notify({
        type: data.status ? "success" : "warn",
        text: data.msg
      });
    },
    addStaff() {
      this.errors = [];
      if (this.userNameError) this.errors.push(this.userNameError);
      let keys = Object.keys(this.userInfo);
      for (let i = 0; i < keys.length; i++) {
        if (!this.userInfo[keys[i]]) {
          this.errors.push("Please insert correct staff information.");
          return;
        }
      }
      if (!this.errors.length > 0 && !this.userNameError) {
        this.userNames.push(this.userInfo.userName);
        this.userInfo.role = "staff";
        this.userInfo.userLevel = "staff";
        let data = {
          components: this.components,
          userInfo: this.userInfo
        };
        this.$store
          .dispatch("setting/addStaff", data)
          .then(result => {
            this.$store.commit("setting/success");
            for (let i = 0; i < keys.length; i++) {
              this.userInfo[keys[i]] = "";
            }
            this.notify(result.data);
          })
          .catch(err => {
            this.errorHandle(err);
          });
      }
    },
    errorHandle(err) {
      if (err.message == "Request failed with status code 401") {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
      }
    }
  }
};
</script>
<style lang="css">
.control_wrapper {
  display: block;
  max-width: 350px;
  max-height: 350px;
  margin: auto;
  overflow: auto;
  border: 1px solid #dddddd;
  border-radius: 3px;
}
small.form-text {
  color: red !important;
}
</style>
<style src="@syncfusion/ej2-base/styles/material.css"></style>
<style src="@syncfusion/ej2-vue-navigations/styles/material.css"></style>
<style src="@syncfusion/ej2-buttons/styles/material.css"></style>