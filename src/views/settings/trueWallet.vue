<template>
  <CCard>
    <CCardHeader class="bg-success text-white">Add a TreuWallet account for depositing funds.</CCardHeader>
    <CCardBody>
      <CRow class>
        <CCol sm="12" lg="12">
          <CButton :color="!collapse?'primary':'danger'" @click="collapse = !collapse">
            {{!collapse ? $t('show'): $t('hide')}}
            <CIcon :content="!collapse?$options.freeSet.cilPlus:$options.freeSet.cilX" />
          </CButton>
        </CCol>
        <CCol sm="12" lg="3"></CCol>
        <CCol sm="12" lg="6" class="mt-3">
          <CCollapse :show="collapse" :duration="400">
            <CCard body-wrapper>
              <CCardText>
                <CRow>
                  <CCol sm="12" lg="12">
                    <CInput :label="$t('Wallet_Deposit.walletNum')" />
                  </CCol>
                  <CCol sm="12" lg="12">
                    <CInput :label="$t('Wallet_Deposit.walletpass')" type="password" />
                  </CCol>
                </CRow>
                <CButton color="primary" class="float-right ml-2" @click="loginToWallet">{{$t('submit')}}</CButton>
                <CButton
                  color="warning"
                  class="float-right mr-2"
                  @click="collapse = !collapse"
                >{{$t('cancel')}}</CButton>
              </CCardText>
            </CCard>
          </CCollapse>
        </CCol>
        <CCol sm="12" lg="3"></CCol>
      </CRow>
      <CCard>
        <CCardHeader>
          <slot name="header">
            <CIcon name="cil-grid" /> {{$t('Wallet_Deposit.sub')}}
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
import "vue2-datepicker/index.css";
export default {
  name: "TrueWalletDeposit",
  freeSet,
  data() {
    return {
      collapse: false,
      fields: [
        "action",
        "name",
        "Wallets Number",
        "Deposit Money",
        "Withdraw Money",
        "Status",
        "Last Update",
        "Created Time"
      ],
      accounts: [],
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
    loginToWallet() {
      console.log('---------------')
    }
  }
};
</script>