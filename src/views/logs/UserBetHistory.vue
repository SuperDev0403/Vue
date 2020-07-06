<template>
  <div>
    <CCard v-show="loading!='loading'">
      <CCardBody>
        <bet-history :items="items"></bet-history>
      </CCardBody>
    </CCard>
    <div class="vld-parent">
      <loading-effect :active.sync="isLoading" :is-full-page="true" loader="dots"></loading-effect>
    </div>
  </div>
</template>
<script>
import betHistory from "../games/betHistory";
import { errorHandle } from "../functions";
import { gameList } from "../tableHeaders";
import LoadingEffect from "vue-loading-overlay";
import { mapGetters } from "vuex";

export default {
  name: "UserBetHistory",
  components: { betHistory, LoadingEffect },
  computed: {
    ...mapGetters({
      isLoading: "user/isLoading",
      loading: "user/currentStatus"
    })
  },
  data() {
    return {
      items: [],
      errorHandle,
      gameList
    };
  },
  methods: {
    getBetHistory() {
      let userID = this.$route.params.userID;
      let data = {
        member: { userID }
      };
      this.$store
        .dispatch("user/getSummary", data)
        .then(result => {
          this.items = result.data.history;
          this.$store.commit("user/success");
        })
        .catch(err => {
          this.$store.commit("user/error");
          this.errorHandle(err);
        });
    }
  },
  mounted: function() {
    this.getBetHistory();
  }
};
</script>