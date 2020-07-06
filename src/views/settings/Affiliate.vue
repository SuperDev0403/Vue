<template>
  <CCard>
    <CCardHeader class="bg-success text-white">{{$t('Affiliate.main')}}</CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="6" lg="6">
          <span>{{$t('Affiliate.bonus_type')}}</span>
          <select name id="bonus" v-model="info.btype" class="form-control mt-2">
            <option value>{{$t('selete')}}</option>
            <option :value="item" v-for="(item, index) in btypes" :key="index">{{item}}</option>
          </select>
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Affiliate.max_bonus')" v-model="info.maxBonus" type="number" />
        </CCol>
        <CCol sm="6" lg="6">
          <CInput :label="$t('Affiliate.top_turn')" v-model="info.topturn" type="number" />
        </CCol>
        <CCol sm="6" lg="6" class="d-flex align-items-center">
          <CSwitch
            color="success"
            shape="pill"
            @update:checked="(val) => info.status = !info.status"
          />
          <span class="ml-2">{{$t('onoff')}}</span>
        </CCol>
        <CCol sm="12" lg="12">
          <CInputRadioGroup :options="lists" custom />
        </CCol>
        <CCol sm="12" lg="12" class="mt-2">
          <CButton color="primary">{{$t('record')}}</CButton>
        </CCol>
      </CRow>
      <CCard class="mt-4">
        <CCardHeader class>
          <span class="cardtitle">{{$t('Affiliate.conditions.title')}}</span>
          <div class="float-right">
            <CButton color="success" class="float-right ml-2" @click="addCondition">{{$t('Affiliate.conditions.add')}}</CButton>
            <CButton color="danger" @click="removeCondition">{{$t('Affiliate.conditions.remove')}}</CButton>
          </div>
        </CCardHeader>
        <CCardBody>
          <CRow v-for="(condition, index) in conditions" :key="index">
            <CCol sm="4" lg="4">
              <CInput :label="$t('Affiliate.conditions.min')" type="number" v-model="condition.min" />
            </CCol>
            <CCol sm="4" lg="4">
              <CInput :label="$t('Affiliate.conditions.max')" type="number" v-model="condition.max" />
            </CCol>
            <CCol sm="4" lg="4">
              <CInput :label="$t('Affiliate.conditions.bonus')" type="number" v-model="condition.bonus" />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <div class="card mt-3">
        <div class="card-header bg-success text-white">{{$t('Affiliate.image')}}</div>
        <div class="card-body">
          <CInputFile
            class="file-select"
            :label="$t('Affiliate.select_logo')"
            horizontal
            @change="onUploadImage"
          />
          <div v-if="images.length>0" class="mt-3">
            <CRow>
              <CCol lg="12">
                <CTableWrapper :items="images" :fields="fields" striped caption="Image List" />
              </CCol>
            </CRow>
            <CButton color="success">Record</CButton>
          </div>
        </div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
import CTableWrapper from "../base/Table";
export default {
  name: "Affiliate",
  components: { CTableWrapper },
  data() {
    return {
      conditions: [{ min: "", max: "", bonus: "" }],
      btypes: ["Fixed", "Percent"],
      info: {
        btype: "",
        maxBonus: "",
        topturn: "",
        status: false
      },
      images: [],
      fields: ["image", "timestamp", "action"],
      lists: [
        {
          label: "Bonus for every deposit",
          value: "bed"
        },
        {
          label: "Bonus for new member promotion only",
          value: "bnp"
        },
        {
          label: "First deposit bonus only",
          value: "fdb"
        }
      ]
    };
  },
  methods: {
    onUploadImage(e) {
      let file = e[0];
      let selectedTime = file.lastModified;
      let url = URL.createObjectURL(file);
      console.log(new Date(selectedTime), url);
      this.images.push({
        image: url,
        timestamp: new Date(selectedTime),
        action: () => {
          console.log(url);
        }
      });
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
    }
  }
};
</script>

<style lang="css">
    .cardtitle {
        font-weight: 400;
        font-size: 20px;
    }
</style>