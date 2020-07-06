<template>
  <CCard>
    <CCardHeader class="bg-success text-white">{{$t('Promotion.main')}}</CCardHeader>
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
                    <CInput :label="$t('Promotion.name')" v-model="info.name" />
                  </CCol>
                  <CCol sm="6" lg="6">
                    <span>{{$t('Promotion.category')}}</span>
                    <select name id="category" v-model="info.category" class="form-control mt-2">
                      <option value>{{$t('select')}}</option>
                      <option
                        :value="item"
                        v-for="(item, index) in categories"
                        :key="index"
                      >{{item}}</option>
                    </select>
                  </CCol>
                  <CCol sm="6" lg="6">
                    <span>{{$t('Promotion.bonus_type')}}</span>
                    <select name id="category" v-model="info.btype" class="form-control mt-2">
                      <option value>{{$t('select')}}</option>
                      <option :value="item" v-for="(item, index) in btypes" :key="index">{{item}}</option>
                    </select>
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput
                      :label="$t('Promotion.max_bonus')"
                      v-model="info.maxbonus"
                      :description="$t('Promotion.bonus_desc')"
                    />
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput
                      :label="$t('Promotion.top_turn')"
                      v-model="info.topturn"
                      :description="$t('Promotion.topturn_desc')"
                    />
                  </CCol>
                  <CCol sm="6" lg="6">
                    <CInput
                      :label="$t('Promotion.maxw_ithdraw')"
                      v-model="info.maxwithdraw"
                      :description="$t('Promotion.withdraw_desc')"
                    />
                  </CCol>
                  <CCol sm="12" lg="12">
                    <vue-editor v-model="content"></vue-editor>
                  </CCol>
                  <CCol sm="6" lg="4" class="d-flex align-items-center mb-2 mt-2">
                    <CSwitch
                      color="success"
                      shape="pill"
                      checked
                      @update:checked="(val) => info.status = !info.status"
                    />
                    <span class="ml-2">{{$t('Promotion.status')}}</span>
                  </CCol>
                </CRow>
                <CCard>
                  <CCardHeader class>
                    {{$t('Promotion.conditions.title')}}
                    <div class="float-right">
                      <CButton
                        color="success"
                        class="float-right ml-2"
                        @click="addCondition"
                      >{{$t('Promotion.conditions.add')}}</CButton>
                      <CButton color="danger" @click="removeCondition">{{$t('Promotion.conditions.remove')}}</CButton>
                    </div>
                  </CCardHeader>
                  <CCardBody>
                    <CRow v-for="(condition, index) in conditions" :key="index">
                      <CCol sm="4" lg="4">
                        <CInput :label="$t('Promotion.conditions.min')" type="number" v-model="condition.min" />
                      </CCol>
                      <CCol sm="4" lg="4">
                        <CInput :label="$t('Promotion.conditions.max')" type="number" v-model="condition.max" />
                      </CCol>
                      <CCol sm="4" lg="4">
                        <CInput :label="$t('Promotion.conditions.bonus')" type="number" v-model="condition.bonus" />
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
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
              <CIcon name="cil-grid" />{{$t('Promotion.nav')}}
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
import { VueEditor } from "vue2-editor";

export default {
  name: "Promotion",
  components: { VueEditor },
  freeSet,
  data() {
    return {
      content: "",
      collapse: false,
      conditions: [
        {
          min: "",
          max: "",
          bonus: ""
        }
      ],
      categories: [
        "Deposit all day",
        "New member registration",
        "First deposit of the day",
        "Golden minute"
      ],
      btypes: ["Fixed", "Percent"],
      fields: [
        "action",
        "Promotion name",
        "Category",
        "Bonus Type",
        "Max Bonus",
        "Top Turn",
        "Max Withdraw",
        "status",
        "Start Time",
        "End Time",
        "Last Update",
        "Created Time"
      ],
      accounts: [],
      info: {
        name: "",
        category: "",
        btype: "",
        maxbonus: "",
        topturn: "",
        maxwithdraw: "",
        status: true
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
    addCondition() {
      this.conditions.push({
        min: "",
        max: "",
        bonus: ""
      });
    },
    removeCondition() {
      this.conditions.splice(this.conditions.length - 1, 1);
    },
    addAcc() {
      console.log(JSON.stringify(this.content));
      //   let date = new Date();
      //   this.accounts.push({
      //     action: "",
      //     Bank: this.bank,
      //     "Bank Account Name": this.info.baccName,
      //     "Bank Account Number": this.info.baccNum,
      //     "Deposit Money": this.info.deposit,
      //     "Withdraw Money": this.info.withdraw,
      //     Status: this.info.status,
      //     "Last Update": date.toLocaleString(),
      //     "Created Time": date.toLocaleString()
      //   });
        this.collapse = false;
    }
  }
};
</script>