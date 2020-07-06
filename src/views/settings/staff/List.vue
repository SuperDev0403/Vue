<template>
  <CCard>
    <CCardHeader class="bg-danger text-white">{{$t('staff.main')}}</CCardHeader>
    <div class="mt-2 text-center">
      <img :src="loadingImage" v-show="status=='loading'" alt="loading" width="40px" />
    </div>
    <CCardBody v-show="status!='loading'">
      <CCollapse :show="!edit" :duration="400">
        <CCard>
          <CCardBody>
            <CDataTable
              :items="list"
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
              <template #option="{item}">
                <td class="text-left">
                  <CButton
                    size="sm"
                    class="mr-2 mb-2"
                    color="info"
                    @click="editItem(item)"
                  >{{$t('edit')}}</CButton>
                  <CButton
                    size="sm"
                    class="mb-2"
                    color="danger"
                    @click="confirm(item.userID)"
                  >{{$t('del')}}</CButton>
                </td>
              </template>
              <template #login="{item}">
                <td>{{changeDateformat(item.updated_at)}}</td>
              </template>
              <template #created_at="{item}">
                <td>{{changeDateformat(item.created_at)}}</td>
              </template>
              <template #status="{item}">
                <td>
                  <CBadge
                    :color="item.status?'success':'warning'"
                  >{{item.status ? "Active" : 'Deactive'}}</CBadge>
                </td>
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCollapse>
      <CCollapse :show="edit" :duration="400">
        <CRow>
          <CCol sm="6" lg="6">
            <CInput v-model="userInfo.firstName" :label="$t('Add_staff.firstname')" />
          </CCol>
          <CCol sm="6" lg="6">
            <CInput v-model="userInfo.lastName" :label="$t('Add_staff.lastname')" />
          </CCol>
          <CCol sm="6" lg="6">
            <CInput v-model="userInfo.userName" :label="$t('Add_staff.username')" disabled />
          </CCol>
          <CCol sm="6" lg="6" class="d-flex align-items-center">
            <CSwitch
              color="info"
              :checked="userInfo.status"
              @update:checked="(val) => userInfo.status = !userInfo.status"
            ></CSwitch>
            <span class="ml-2">{{$t('staff.active_deactive')}}</span>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12">
            <CButton class="float-right ml-4" color="success" @click="saveUser">{{$t('save')}}</CButton>
            <CButton class="float-right" color="warning" @click="cancelEdit">{{$t('cancel')}}</CButton>
          </CCol>
        </CRow>
      </CCollapse>
    </CCardBody>
    <CModal :title="$t('confirm')" color="warning" :show.sync="modal">
      <CRow>
        <CCol sm="12" class="text-center">
          <h4>{{$t('staff.confirm_text')}}</h4>
        </CCol>
      </CRow>
      <template #footer>
        <CButton @click="modal = false" color="danger">{{$t('cancel')}}</CButton>
        <CButton @click="deleteItem" color="success">{{$t('submit')}}</CButton>
      </template>
    </CModal>
  </CCard>
</template>

<script>
import loadingImage from "@/assets/img/loading.gif";
import { staffList } from "../../tableHeaders";
import { mapGetters } from "vuex";
export default {
  name: "ListView",
  computed: {
    ...mapGetters({
      status: "setting/currentStatus"
    })
  },
  mounted() {
    this.getStaff();
    this.init();
  },
  methods: {
    saveUser() {
      console.log(this.userInfo);
      this.edit = !this.edit;
      this.$store
        .dispatch("setting/saveUser", this.userInfo)
        .then(result => {
          this.success();
          this.notify(result.data);
          this.list = result.data.staff;
        })
        .catch(err => {
          this.errorHandle(err);
        });
    },
    cancelEdit() {
      this.edit = false;
    },
    editItem(user) {
      this.userInfo.userName = user.userName;
      this.userInfo.firstName = user.firstName;
      this.userInfo.lastName = user.lastName;
      this.userInfo.status = user.status;
      this.userInfo.userID = user.userID;
      this.edit = !this.edit;
    },
    confirm(userID) {
      this.modal = true;
      this.userID = userID;
    },
    deleteItem() {
      this.edit = false;
      this.modal = false;
      this.$store
        .dispatch("setting/deleteUser", this.userID)
        .then(result => {
          this.success();
          console.log("saveUser -> result", result);
          this.notify(result.data);
          this.list = result.data.staff;
        })
        .catch(err => {
          this.errorHandle(err);
        });
    },
    changeDateformat(timestamp) {
      let date = new Date(timestamp);
      return date.toLocaleString();
    },
    notify(data) {
      this.$notify({
        type: data.status ? "success" : "warn",
        text: data.msg
      });
    },
    getStaff() {
      this.$store
        .dispatch("setting/getStaff")
        .then(result => {
          this.success();
          this.list = result.data.staff;
        })
        .catch(err => {
          this.errorHandle(err);
        });
    },
    success() {
      this.$store.commit("setting/success");
    },
    errorHandle(err) {
      if (err.message == "Request failed with status code 401") {
        localStorage.removeItem("token");
        this.$router.push("/auth/login");
      }
    },
    init() {
      for (let i = 0; i < this.staffList.length; i++) {
        let item = this.staffList[i];
        item.label = this.$i18n.t(`table.${item.key}`);
        this.fields.push(item);
      }
    }
  },
  data() {
    return {
      edit: false,
      modal: false,
      list: [],
      fields: [],
      staffList,
      loadingImage,
      userID: "",
      userInfo: {
        userName: "",
        firstName: "",
        lastName: "",
        status: ""
      }
    };
  }
};
</script>