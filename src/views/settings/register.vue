<template>
  <CCard>
    <CCardHeader class="bg-success text-white">
      <h5>{{$t('membership_page.main')}}</h5>
    </CCardHeader>
    <CCardBody>
      <div>
        <label class="typo__label">{{$t('membership_page.label')}}</label>
        <multiselect
          v-model="value"
          :options="options"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="$t('membership_page.pick')"
          label="name"
          track-by="name"
          :preselect-first="true"
        >
          <template slot="selection" slot-scope="{ values, search, isOpen }">
            <span
              class="multiselect__single"
              v-if="values.length &amp;&amp; !isOpen"
            >{{ values.length }} {{$t('membership_page.opt_selected')}}</span>
          </template>
        </multiselect>
      </div>
    </CCardBody>
  </CCard>
</template>
<script>
import Multiselect from "vue-multiselect";
export default {
  name: "MembershipPlan",
  components: { Multiselect },
  data() {
    return {
      value: [],
      options: [
        { name: "Facebook", key: "fb" },
        { name: "Linkedin", key: "in" },
        { name: "Youtube", key: "youtube" },
        { name: "Twitter", key: "tw" },
        { name: "VK", key: "vk" },
        { name: "Freelancer", key: "fl" }
      ]
    };
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>