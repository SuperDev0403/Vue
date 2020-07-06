<template>
  <div class="d-flex align-items-center min-vh-100">
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <div class="text-danger mb-2" v-for="(item, index) in errors" :key="index">
                  <small>{{item}}</small>
                </div>
                <CInput placeholder="Username" autocomplete="username" v-model="user.userName">
                  <template #prepend-content>
                    <CIcon name="cil-user" />
                  </template>
                </CInput>
                <CInput placeholder="Email" autocomplete="email" prepend="@" v-model="user.email" />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  v-model="user.password"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  v-model="user.confirmPassword"
                  autocomplete="new-password"
                  class="mb-4"
                >
                  <template #prepend-content>
                    <CIcon name="cil-lock-locked" />
                  </template>
                </CInput>
                <CButton color="success" block @click="register">
                  Create Account
                  <img
                    :src="loadingImage"
                    v-show="isLoading"
                    alt="loading"
                    width="20px"
                  />
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import loadingImage from "@/assets/img/loading.gif";
import { mapState } from "vuex";
export default {
  name: "Register",
  // components: { loadingImage },
  data() {
    return {
      loadingImage,
      user: {
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      isLoading: false,
      errors: []
    };
  },
  computed: mapState(["status"]),
  methods: {
    register: function() {
      this.errors = [];
      if (this.user.password != this.user.confirmPassword)
        this.errors.push("Password Does not match.");
      let { userName, email, password, confirmPassword } = this.user;
      if (!userName || !email || !password || !confirmPassword)
        this.errors.push("Please insert exactly below.");
      if (this.errors.length > 0) {
        return;
      } else {
        this.isLoading = true;
        this.errors = [];
        let data = this.user;
        this.$store
          .dispatch("auth/register", data)
          .then(() => this.$router.push("/"))
          .catch(err => {
            console.log(err);
            this.errors.push(err);
          });
      }
    }
  }
};
</script>
<style lang="css">
</style>