<template>
  <div class="card">
    <div class="card-header bg-success text-white">{{$t('Promotional_Image.main')}}</div>
    <div class="card-body">
      <CInputFile
        class="file-select"
        :label="$t('Promotional_Image.label')"
        horizontal
        @change="onUploadImage"
      />
      <div v-if="images.length>0" class="mt-3">
        <CRow>
          <CCol lg="12">
            <CTableWrapper :items="images" :fields="fields" striped :caption="$t('Promotional_Image.imagelist')" />
          </CCol>
        </CRow>
        <CButton color="success">{{$t('record')}}</CButton>
      </div>
    </div>
  </div>
</template>

<script>
import CTableWrapper from "../../base/Table";
export default {
  name: "PromotionImage",
  components: { CTableWrapper },
  data() {
    return {
      images: [],
      fields: ["image", "timestamp", "action"]
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
    }
  }
};
</script>