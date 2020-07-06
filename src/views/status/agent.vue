<template>
  <CCard>
    <CCardHeader class="bg-success text-white">{{$t('Agent_system.main')}}</CCardHeader>
    <CCardBody class="form">
      <div class="mt-2 text-center">
        <img :src="loadingImage" v-show="isLoading=='loading'" alt="loading" width="40px" />
      </div>
      <CRow v-show="isLoading!='loading'" class="mb-4">
        <CCol sm="6" lg="6">
          <span>{{$t('Add_members.user_role')}}</span>
          <select
            id="how"
            v-model="userLevel"
            class="form-control mt-2"
            v-show="isLoading!='loading'"
            @change="getAgent($event)"
          >
            <option value>{{$t('select')}}</option>
            <option :value="item" v-for="(item, index) in userRole" :key="index">{{item}}</option>
            <option value="custom">{{$t('Add_members.custom')}}</option>
          </select>
        </CCol>
        <CCol v-show="userLevel == 'custom'" sm="3" lg="3">
          <CInput :label="$t('Add_members.custom_user_role')" v-model="customUserLevel"></CInput>
        </CCol>
      </CRow>
      <CRow v-show="isLoading!='loading' && components.length>0">
        <CCol sm="6" md="4" xl="3" v-for="(item, index) in components" :key="index">
          <CCard>
            <CCardHeader :class="`bg-${color[item.value]} text-white`">{{$t(`${item.name}.nav`)}}</CCardHeader>
            <CCardBody>
              <form action class="text-left">
                <CRow>
                  <CCol sm="12" lg="12">
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
                  <CCol sm="12" lg="12">
                    <input
                      class="mr-1"
                      type="radio"
                      :id="`${index}-view`"
                      horizontal
                      custom
                      value="view"
                      v-model="item.value"
                    />
                    <label class="mr-3" :for="`${index}-view`">{{$t('Agent_system.view_only')}}</label>
                  </CCol>
                  <CCol sm="12" lg="12">
                    <input
                      class="mr-1"
                      type="radio"
                      :id="`${index}-invisible`"
                      horizontal
                      custom
                      value="invisible"
                      v-model="item.value"
                    />
                    <label class="mr-3" :for="`${index}-invisible`">{{$t('Agent_system.invisible')}}</label>
                  </CCol>
                </CRow>
              </form>
            </CCardBody>
          </CCard>
        </CCol>
        <div class="text-danger mt-2" v-for="(item, index) in errors" :key="index">
          <p>{{item}}</p>
        </div>
      </CRow>
      <CButton
        v-show="isLoading !='loading' && components.length>0"
        class="float-right"
        size="lg"
        color="info"
        @click="submit"
      >{{$t('save')}}</CButton>
    </CCardBody>
  </CCard>
</template>

<script>
import nav from "./navbars";
import loadingImage from "@/assets/img/loading.gif";
import { mapGetters } from "vuex";
export default {
  name: "AgentStatus",
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters({
      isLoading: "user/currentStatus"
    })
  },
  data() {
    return {
      nav,
      loadingImage,
      components: [],
      userRole: [],
      customUserLevel: "",
      userLevel: "",
      errors: [],
      color: {
        edit: "success",
        view: "info",
        invisible: "warning"
      }
    };
  },
  methods: {
    errorHandle(err) {
      if (err.message == "Request failed with status code 401") {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
      }
    },
    getUserLevel() {
      this.$store
        .dispatch("user/getUserLevel")
        .then(result => {
          this.$store.commit("user/success");
          this.userRole = result.data.userLevels;
        })
        .catch(err => {
          this.errorHandle(err)
        });
    },
    getAgent(event) {
      let userLevel = event.target.value;
      if (userLevel != "custom" && userLevel) {
        this.$store
          .dispatch("user/getAgentByUserLevel", userLevel)
          .then(result => {
            this.$store.commit("user/success");
            this.components = result.data.components;
          })
          .catch(err => {
            this.errorHandle(err)
          });
      } else {
        this.components = [];
        nav.forEach(item => {
          this.components.push({
            name: item,
            value: "invisible"
          });
        });
      }
    },
    init() {
      this.getUserLevel();
    },
    submit() {
      this.errors = [];
      if (
        (this.userLevel == "custom" && this.customUserLevel == "") ||
        this.customUserLevel == "custom"
      )
        this.errors.push("Please insert custom user Level");
      if (this.errors.length > 0) {
        return;
      } else {
        let data = {
          components: this.components,
          userLevel: this.userLevel
        };
        if (data.userLevel == "custom") {
          data.customUserLevel = this.customUserLevel;
        } else {
          if (data.customUserLevel) delete data.customUserLevel;
        }
        this.$store
          .dispatch("user/applyAgent", data)
          .then(res => {
            if (res) window.location.reload();
          })
          .catch(err => {
            this.$store.commit("user/success");
            this.errorHandle(err)
          });
      }
    }
  }
};
</script>
<style lang="scss">
</style>