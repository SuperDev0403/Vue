<template>
  <div class="card">
    <div class="card-header bg-danger text-white">{{$t('Setup_withdrawal.main')}}</div>
    <div class="card-body">
      <CRow>
        <CCol sm="6" lg="4" class="d-flex align-items-center">
          <CSwitch color="primary" shape="pill" checked value="primary" />
          <span class="ml-2">{{$t('Setup_withdrawal.switch')}}</span>
        </CCol>
      </CRow>
      <hr />
      <div class="card">
        <div class="card-header text-white bg-success">{{$t('Setup_withdrawal.switch')}}</div>
        <div class="card-body">
          <CRow>
            <CCol sm="4" lg="4" class="d-flex align-items-center">
              <CSwitch color="warning" shape="pill" value="warning" />
              <span class="ml-2">{{$t('onoff')}}</span>
            </CCol>
            <CCol sm="4" lg="4">
              <CInput :label="$t('Setup_withdrawal.min')" v-model="data.min" />
            </CCol>
            <CCol sm="4" lg="4">
              <CInput :label="$t('Setup_withdrawal.max')" v-model="data.max" />
            </CCol>
            <CCol sm="3" lg="3">
                <CButton color="success">{{$t('record')}}</CButton>
            </CCol>
          </CRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransferWithdraw",
  data() {
    return {
      data: {
          min: 500,
          max: 10000
      }
    };
  },
  methods: {}
};
</script>
<style lang="css">
.file-select input {
  border: solid 1px gray;
  border-radius: 10px;
}
</style>