<template>
  <div>
    <div class="card">
      <div class="card-header bg-danger text-white">
        <h4>{{$t('Money_transfer_report.main')}}</h4>
      </div>
      <div class="card-body">
        <CRow>
          <CCol sm="4" lg="4" class="mb-3">
            <label for="from">{{$t('from')}}</label>
            <date-picker v-model="startDate" type="format" id="from" class="float-right"></date-picker>
          </CCol>
          <CCol sm="4" lg="4" class="mb-3">
            <label for="to">{{$t('to')}}</label>
            <date-picker id="to" v-model="endDate" type="format" class="float-right"></date-picker>
          </CCol>
          <CCol sm="4" lg="4">
            <CButton color="info" block class="float-right" variant="outline">{{$t('search')}}</CButton>
          </CCol>
        </CRow>
        <CRow class="mt-4">
          <CCol sm="12" lg="12">
            <CInput :label="$t('Money_transfer_report.user')">
              <template #append>
                <CButton color="primary">{{$t('search')}}</CButton>
              </template>
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <!-- <template v-for="(color) in buttons">
            <CButton :key="color" color="success" variant="outline" class="m-2">{{color}}</CButton>
          </template>-->
        </CRow>
      </div>
    </div>
    <div class="card">
      <CCardBody>
        <CDataTable
          :items="items"
          :fields="fields"
          table-filter
          items-per-page-select
          :items-per-page="5"
          hover
          sorter
          pagination
        >
          <template #status="{item}">
            <td>
              <CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
            </td>
          </template>
          <template #show_details="{item, index}">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
              >{{Boolean(item._toggled) ? 'Hide' : 'Show'}}</CButton>
            </td>
          </template>
          <template #details="{item}">
            <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
              <CCardBody>
                <CMedia :aside-image-props="{ height: 102 }">
                  <h4>{{item.username}}</h4>
                  <p class="text-muted">User since: {{item.registered}}</p>
                  <CButton size="sm" color="info" class>User Settings</CButton>
                  <CButton size="sm" color="danger" class="ml-1">Delete</CButton>
                </CMedia>
              </CCardBody>
            </CCollapse>
          </template>
        </CDataTable>
      </CCardBody>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "TransferReport",
  components: { DatePicker },
  data() {
    return {
      startDate: null,
      endDate: null,
      items: [],
      fields: [
        "Order",
        "Status",
        "Amount of money",
        "Transfer from account number",
        "Transfer from bank",
        "User",
        "User Name",
        "Bank User",
        "Account Number",
        "Balance",
        "Note",
        "Time"
      ]
    };
  }
};
</script>
