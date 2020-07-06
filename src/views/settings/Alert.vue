<template>
  <CCard>
    <CCardHeader class="bg-success text-white">{{$t('Alert.main')}}</CCardHeader>
    <CCardBody>
      <CRow class>
        <CCol sm="12" lg="12">
          <CButton
            :color="!collapse?'primary':'danger'"
            class="float-right"
            @click="collapse = !collapse"
          >
            {{!collapse ? $t('show'): $t('hide')}}
            <CIcon :content="!collapse?$options.freeSet.cilPlus:$options.freeSet.cilX" />
          </CButton>
        </CCol>
        <CCol sm="12" lg="12" class="mt-3">
          <CCollapse :show="collapse" :duration="400">
            <CCard body-wrapper>
              <CCardText>
                <CRow>
                  <CCol sm="6" lg="6">
                    <CInput
                      :label="$t('Alert.line_token')"
                      v-model="info.lineToken"
                      :description="$t('Alert.lt_desc')"
                    />
                  </CCol>
                  <CCol sm="6" lg="6"></CCol>
                  <CCol sm="6" lg="6" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => info.deposit = !info.deposit"
                    />
                    <span class="ml-2">{{$t('Alert.deposit')}}</span>
                  </CCol>
                  <CCol sm="6" lg="6" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => info.withdraw = !info.withdraw"
                    />
                    <span class="ml-2">{{$t('Alert.withdraw')}}</span>
                  </CCol>
                  <CCol sm="6" lg="6" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => info.success = !info.success"
                    />
                    <span class="ml-2">{{$t('Alert.succes')}}</span>
                  </CCol>
                  <CCol sm="6" lg="6" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => info.member = !info.member"
                    />
                    <span class="ml-2">{{$t('Alert.become')}}</span>
                  </CCol>
                </CRow>
                <CButton color="primary" class="float-right ml-2" @click="addAcc">{{$t('submit')}}</CButton>
                <CButton
                  color="warning"
                  class="float-right mr-2"
                  @click="collapse = !collapse"
                >{{$t('cancel')}}</CButton>
              </CCardText>
            </CCard>
          </CCollapse>
        </CCol>
      </CRow>
      <CCollapse :show="!collapse" :duration="400">
        <CCard>
          <CCardHeader>
            <slot name="header">
              <CIcon name="cil-grid" />{{$t('Alert.all')}}
            </slot>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              :hover="table.hover"
              :striped="table.striped"
              :bordered="table.bordered"
              :fixed="!table.fixed"
              :small="table.small"
              :items="accounts"
              :fields="fields"
              :items-per-page="table.small ? 10: 5"
              :dark="table.dark"
              pagination
            >
              <template #action="{item}">
                <td>
                  <CButton color="success" @click="changeView" class="mr-2 mb-2">
                    <CIcon :content="$options.freeSet.cilPencil"></CIcon>
                  </CButton>
                  <CButton color="danger" @click="changeView" class="mb-2">
                    <CIcon :content="$options.freeSet.cilTrash"></CIcon>
                  </CButton>
                </td>
                {{item.action}}
              </template>
            </CDataTable>
          </CCardBody>
        </CCard>
      </CCollapse>
    </CCardBody>
  </CCard>
</template>

<script>
import { freeSet } from "@coreui/icons";
export default {
  name: "Alert",
  components: {},
  freeSet,
  data() {
    return {
      collapse: false,
      banks: ["SBER Bank", "BAnk of Ayudhya"],
      bank: "",
      fields: [
        "action",
        "Line Token",
        "Deposit Money",
        "Withdrawal Notification",
        "Successful withdrawal",
        "Become a member",
        "Last Update",
        "Created Time"
      ],
      accounts: [],
      info: {
        lineToken: "",
        deposit: false,
        withdraw: false,
        success: false,
        member: false
      },
      table: {
        hover: true,
        striped: true,
        bordered: true,
        dark: true,
        small: true,
        fixed: true
      }
    };
  },
  methods: {
    changeView() {
      console.log(JSON.stringify(this.info));
    },
    addAcc() {
      let date = new Date();
      this.accounts.push({
        action: "",
        "Line Token": this.info.lineToken,
        "Withdrawal Notification": this.info.withdraw,
        "Deposit Money": this.info.deposit,
        "Successful withdrawal": this.info.success,
        "Become a member": this.info.member,
        "Last Update": date.toLocaleString(),
        "Created Time": date.toLocaleString()
      });
      this.collapse = false;
    }
  }
};
</script>