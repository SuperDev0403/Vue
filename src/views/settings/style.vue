<template>
  <div class="card">
    <div class="card-header bg-danger text-white">{{$t('colors_backgrounds.main')}}</div>
    <div class="card-body">
      <div class="card">
        <div class="card-header text-white bg-success">{{$t('colors_backgrounds.bgc')}}</div>
        <div class="card-body">
          <CTabs :active-tab.sync="activeTab">
            <CTab active>
              <template slot="title">
                <CIcon name="cil-laptop" /> {{$t('colors_backgrounds.picture')}}
              </template>
              <div class="card">
                <div class="card-header bg-success text-white">{{$t('colors_backgrounds.logo')}}</div>
                <div class="card-body">
                  <CInputFile
                    class="file-select"
                    :label="$t('colors_backgrounds.logo')"
                    horizontal
                    @change="onUploadImage"
                  />
                  <div v-if="images.length>0" class="mt-3">
                    <CRow>
                      <CCol lg="12">
                        <CTableWrapper
                          :items="images"
                          :fields="fields"
                          striped
                          caption="Image List"
                        />
                      </CCol>
                    </CRow>
                    <CButton color="success">{{$t('record')}}</CButton>
                  </div>
                </div>
              </div>
            </CTab>
            <CTab>
              <template slot="title">
                <CIcon name="cil-drop" /> {{$t('colors_backgrounds.pickColor')}}
              </template>
              <div class="mt-2 d-flex">
                <Chrome v-model="bgColors" class="mr-4"></Chrome>
                <Swatches v-model="txtColors" class="ml-3 mr-4"></Swatches>
              </div>
              <CRow class="mt-3">
                <CCol sm="12" lg="12">
                  <div class="result text-center" :style="{backgroundColor: bgColors.hex}" @click="changeHandle">
                      <h1 :style="{color: txtColors.hex}">{{$t('colors_backgrounds.txtColor')}}</h1>
                  </div>
                </CCol>
              </CRow>
            </CTab>
          </CTabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CTableWrapper from "../base/Table";
import { Chrome, Swatches } from "vue-color";
export default {
  name: "Style",
  components: {
    CTableWrapper,
    Chrome,
    Swatches
  },
  data() {
    return {
      images: [],
      fields: ["image", "timestamp", "action"],
      activeTab: 0,
      bgColors: {
        hex:'#E91E63'
      },
      txtColors: {
        hex:'#E91E63'
      }
    };
  },
  methods: {
    changeHandle() {
      console.log(this.colors);
    },
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
    }
  }
};
</script>
<style lang="css">
.file-select input {
  border: solid 1px gray;
  border-radius: 10px;
}
.result {
  width: 50%;
  height: 50px;
}
</style>