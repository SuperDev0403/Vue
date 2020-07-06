<template>
  <CCard>
    <CCardHeader
      class="bg-success text-white"
    >{{$t('deposit_withdraw_money.main')}}</CCardHeader>
    <CCardBody>
      <CRow class>
        <CCol sm="12" lg="12">
          <CButton color="primary" class="float-right" @click="collapse = !collapse">
            {{!collapse ? $t('show'): $t('hide')}}
            <CIcon
              :content="!collapse?$options.freeSet.cilFullscreen:$options.freeSet.cilFullscreenExit"
            />
          </CButton>
        </CCol>
        <CCol sm="12" lg="12" class="mt-3">
          <CCollapse :show="collapse" :duration="400">
            <CCard body-wrapper>
              <CCardText>
                <CRow>
                  <CCol sm="6" lg="6">
                    <span>{{$t('deposit_withdraw_money.select_bank')}}</span>
                    <select
                      name
                      id="bank"
                      v-model="bank"
                      class="form-control mt-2"
                      @change="changeView"
                    >
                      <option value>{{$t('select')}}</option>
                      <option :value="item" v-for="(item, index) in banks" :key="index">{{item}}</option>
                    </select>
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput :label="$t('deposit_withdraw_money.bank_account_name')" v-model="info.baccName" />
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput :label="$t('deposit_withdraw_money.baccnum')" v-model="info.baccNum" />
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput :label="$t('deposit_withdraw_money.idCard')" v-model="info.IDcard" />
                  </CCol>
                  <CCol sm="6" lg="6">
                    <span>{{$t('deposit_withdraw_money.date')}}</span>
                    <br />
                    <date-picker v-model="info.timestamp" class="mt-2 mb-2" type="format"></date-picker>
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput :label="$t('deposit_withdraw_money.pin')" v-model="info.pinCode" />
                  </CCol>
                  <CCol sm="6" lg="4" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => extraOpt.deposit = !extraOpt.deposit"
                    />
                    <span class="ml-2">{{$t('deposit_withdraw_money.deposit')}}</span>
                  </CCol>
                  <CCol sm="6" lg="4" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => extraOpt.withdraw = !extraOpt.withdraw"
                    />
                    <span class="ml-2">{{$t('deposit_withdraw_money.withdraw')}}</span>
                  </CCol>
                  <CCol sm="6" lg="4" class="d-flex align-items-center mb-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      @update:checked="(val) => extraOpt.status = !extraOpt.status"
                    />
                    <span class="ml-2">{{$t('deposit_withdraw_money.status')}}</span>
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
      <CCard>
        <CCardHeader>
          <slot name="header">
            <CIcon name="cil-grid" />{{$t('deposit_withdraw_money.all')}}
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
    </CCardBody>
  </CCard>
</template>

<script>
import { freeSet } from "@coreui/icons";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "Banking",
  components: { DatePicker },
  freeSet,
  data() {
    return {
      collapse: false,
      banks: ["SBER Bank", "BAnk of Ayudhya"],
      bank: "",
      fields: [
        "action",
        "Bank",
        "Bank Account Name",
        "Bank Account Number",
        "Deposit Money",
        "Withdraw Money",
        "Status",
        "Last Update",
        "Created Time"
      ],
      accounts: [],
      info: {
        baccName: "",
        baccNum: "",
        IDcard: "",
        timestamp: "",
        pinCode: ""
      },
      extraOpt: {
        deposit: false,
        withdraw: false,
        status: false
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
      console.log(JSON.stringify(this.extraOpt));
    },
    addAcc() {
      let date = new Date();
      this.accounts.push({
        action: "",
        Bank: this.bank,
        "Bank Account Name": this.info.baccName,
        "Bank Account Number": this.info.baccNum,
        "Deposit Money": this.extraOpt.deposit,
        "Withdraw Money": this.extraOpt.withdraw,
        Status: this.extraOpt.status,
        "Last Update": date.toLocaleString(),
        "Created Time": date.toLocaleString()
      });
      this.collapse = false;
    }
  }
};
</script>