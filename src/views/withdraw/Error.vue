<template>
  <div>
    <div class="card">
      <div class="card-header bg-danger text-white">
        <h4>{{$t('Authorization_to_withdraw.main')}}</h4>
      </div>
      <div class="card-body">
        <CRow>
          <CCol sm="6" lg="6">
            {{$t('from')}}
            <date-picker v-model="startDate" type="format"></date-picker>
          </CCol>
          <CCol sm="6" lg="6">
            {{$t('to')}}
            <date-picker v-model="endDate" type="format"></date-picker>
          </CCol>
        </CRow>
        <CRow class="mt-4">
          <CCol sm="12" lg="12">
            <CInput :label="$t('search')" :description="$t('search_desc')">
              <template #append>
                <CButton color="primary">{{$t('search')}}</CButton>
              </template>
            </CInput>
          </CCol>
        </CRow>
        <CRow>
          <template v-for="(color) in buttons">
            <CButton :key="color" color="success" variant="outline" class="m-2">{{color}}</CButton>
          </template>
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
  name: "Manual",
  components: { DatePicker },
  data() {
    return {
      startDate: null,
      endDate: null,
      buttons: [
        "All",
        "Today",
        "Yesterday",
        "7 Days ago",
        "30 days ago",
        "1 years ago"
      ],
      items: [],
       fields: [
        'User',
        'User Name',
        'Amount of money',
        'Status',
        'Maximum withdrawal',
        'Credit bfore withdrawal',
        'Credit after withdrawal',
        'Balance before withdrawal',
        'Balance after withdrawal',
        'All bonuses',
        'Account Number',
        'Start time to turn',
        'Withdrawal date',
      ]
    };
  }
};
</script>
