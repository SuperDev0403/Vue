<template>
  <CContainer class="d-flex content-center min-vh-100">
    <notifications />
    <CRow class="login-form justify-content-center">
      <CCol sm="8" xs="12" lg="6">
        <CCard class="p-4">
          <CCardBody>
            <CForm class="login-form">
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <CInput
                placeholder="Username"
                autocomplete="username email"
                v-model="user.email"
                type="email"
              >
                <template #prepend-content>
                  <CIcon name="cil-user" />
                </template>
              </CInput>
              <CInput
                placeholder="Password"
                type="password"
                v-model="user.password"
                autocomplete="curent-password"
              >
                <template #prepend-content>
                  <CIcon name="cil-lock-locked" />
                </template>
              </CInput>
              <CRow>
                <CCol col="12" class="text-center">
                  <CButton
                    color="primary"
                    class="px-4"
                    @click="login"
                    :disabled="loading=='loading'"
                  >
                    Login
                    <img
                      :src="loadingImage"
                      v-show="loading=='loading'"
                      alt="loading"
                      width="20px"
                    />
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
import loadingImage from "@/assets/img/loading.gif";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loadingImage,
      isLoading: false,
      user: {
        email: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      loading: "auth/currentStatus"
    })
  },
  methods: {
    login() {
      let email = this.user.email;
      let password = this.user.password;
      this.isLoading = true;
      this.$store
        .dispatch("auth/login", { email, password })
        .then(() => {
          this.$notify({
            type: "success",
            text: this.$i18n.t("login_success")
          });
          window.location.href = "/";
        })
        .catch(err => {
          console.log("login -> err", err);
          this.$notify({
            type: "warn",
            text: this.$i18n.t("login_failed")
          });
        });
    }
  }
};
</script>
<style lang="css">
.login-form {
  width: 100%;
}
</style>
