<template>
  <div>
    <div class="card">
      <CCardHeader class="bg-info text-white">{{$t('Games.list.title')}}</CCardHeader>
      <CCardBody>
        <CCollapse :duration="600" :show="collapse">
          <CRow>
            <CCard class="w-100">
              <CCardHeader class="d-flex align-items-center">
                <div class="float-left">
                  <h3>{{$t('Games.provider')}}</h3>
                </div>
                <div class="ml-auto">
                  <div class="float-right d-flex align-items-center">
                    <CInput
                      :label="$t('Games.username')"
                      class="ml-2 pb-0 mb-0"
                      disabled
                      v-model="username"
                    ></CInput>
                    <!-- <CInput
                      :label="$t('Games.percentage')"
                      class="ml-2 pb-0 mb-0"
                      v-model="userInfo.percentage"
                    ></CInput>-->
                    <div class="ml-2 pb-0 mb-0 mr-5">
                      <span>{{$t('Add_members.user_role')}}</span>
                      <select id="how" class="form-control mt-2" v-model="member">
                        <option value>{{$t('select')}}</option>
                        <option
                          :value="item"
                          v-for="(item, index) in users"
                          :key="index"
                        >{{item.userName}}</option>
                      </select>
                    </div>
                    <!-- <CButton color="info" @click="savePercentage">{{$t('save')}}</CButton> -->
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol
                    class="mt-2"
                    sm="3"
                    lg="2"
                    v-for="(item, index) in userInfo.providers"
                    :key="index"
                  >
                    <CButton
                      color="success"
                      variant="outline"
                      block
                      @click="providerHandle(item)"
                    >{{item.name}}</CButton>
                  </CCol>
                  <!-- <CCol class="mt-2" sm="12" lg="12">
                    <CButton
                      color="info"
                      class="float-right"
                      @click="viewAll"
                    >{{$t('Games.list.all')}}</CButton>
                  </CCol>-->
                </CRow>
                <CRow class="mt-4">
                  <CCol sm="4" lg="4" class="mb-3">
                    <label for="from">{{$t('from')}}</label>
                    <date-picker v-model="startDate" type="format" class="float-right"></date-picker>
                  </CCol>
                  <CCol sm="4" lg="4" class="mb-3">
                    <label for="to">{{$t('to')}}</label>
                    <date-picker v-model="endDate" type="format" class="float-right"></date-picker>
                  </CCol>
                  <CCol sm="2" lg="2"></CCol>
                  <CCol sm="2" lg="2">
                    <CButton
                      color="primary"
                      block
                      class="float-right"
                      @click="getSummary"
                      :disabled="member==''"
                    >{{$t('submit')}}</CButton>
                  </CCol>
                </CRow>
                <CRow v-show="gameLists.length>0">
                  <template v-for="(button, index) in buttons">
                    <CButton
                      :key="index"
                      color="success"
                      variant="outline"
                      class="m-2"
                      @click="searchData(button.value)"
                    >{{$t(`buttons.${button.name}`)}}</CButton>
                  </template>
                </CRow>
              </CCardBody>
            </CCard>
          </CRow>
          <!-- <CRow>
            <table class="gamelist-table m-2" v-show="filteredGameLists.length>0">
              <thead>
                <th class="image">{{$t('Games.table.image')}}</th>
                <th class="name">{{$t('Games.table.name')}}</th>
                <th class="code">{{$t('Games.table.game_code')}}</th>
                <th class="category">{{$t('Games.table.category')}}</th>
                <th class="volatility">{{$t('Games.table.volatility')}}</th>
                <th class="status">{{$t('Games.table.status')}}</th>
              </thead>
              <tbody>
                <tr class="mt-2 p-2" v-for="(item, index) in filteredGameLists" :key="index">
                  <td class="image d-flex align-items-center">
                    <img :src="images[index%2]" width="50px" alt="image" />
                  </td>
                  <td>
                    <input type="checkbox" />
                    {{item['D']}} / {{item['E']}}
                  </td>
                  <td>{{item['C']}}</td>
                  <td>{{item['B']}}</td>
                  <td>{{item['T']}}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <CSwitch color="primary" shape="pill" checked value="warning" />
                      <span class="ml-2">{{$t('Games.table.onoff')}}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </CRow>-->
          <bet-history v-show="gameLists.length>0" :items="filteredGameLists"></bet-history>
        </CCollapse>
      </CCardBody>
    </div>
    <div class="vld-parent">
      <loading-effect :active.sync="loading" :is-full-page="true" loader="dots"></loading-effect>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import LoadingEffect from "vue-loading-overlay";
import { buttons, gameList } from "../tableHeaders";
import "vue2-datepicker/index.css";
// import gameLists from "./gamelist";
import { mapGetters } from "vuex";
import { errorHandle, changeDateformat } from "../functions";
import betHistory from "./betHistory";
export default {
  name: "GameList",
  components: { DatePicker, LoadingEffect, betHistory },
  computed: {
    ...mapGetters({
      isLoading: "user/currentStatus",
      loading: "user/isLoading"
    })
  },
  mounted: function() {
    this.getGameList();
    let user = JSON.parse(localStorage.getItem("user"));
    this.username = user.userName;
    this.filteredGameLists = this.gameLists;
  },
  data() {
    return {
      changeDateformat,
      buttons,
      gameList,
      startDate: null,
      endDate: null,
      errorHandle,
      filteredGameLists: [],
      percentage: 80,
      username: "",
      users: [],
      fields: [],
      editInfo: {
        init: {},
        desc: "",
        categories: [],
        gametype: "",
        sort: 0
      },
      userInfo: {
        providers: [],
        percentage: 0,
        user_role: ""
      },
      collapse: true,
      member: "",
      gameLists: [],
      provider: ""
    };
  },
  methods: {
    
    getSummary() {
      let data = {
        member: this.member,
        start_time: this.startDate
      };
      this.$store
        .dispatch("user/getSummary", data)
        .then(result => {
          this.gameLists = result.data.history;
          this.filteredGameLists = this.gameLists;
          this.$store.commit("user/success");
        })
        .catch(err => {
          this.$store.commit("user/error");
          this.errorHandle(err);
        });
    },
    searchData(e) {
      if (e == -1) {
        this.filteredGameLists = this.gameLists;
        this.startDate = null;
        this.endDate = null;
        return;
      } else {
        let endDate = new Date();
        endDate = new Date(endDate.setHours(0));
        endDate = new Date(endDate.setMinutes(0));
        let startDate = endDate;
        endDate = new Date(endDate.setDate(endDate.getDate() + 1));
        startDate = new Date(startDate.setDate(startDate.getDate() - e - 1));
        this.filteredGameLists = this.gameLists.filter(item => {
          let itemDate = new Date(item.end_time);
          return startDate <= itemDate && endDate >= itemDate;
        });
      }
    },
    savePercentage() {
      let data = {
        provider: this.provider,
        percentage: this.userInfo.percentage
      };
      if (data.provider) {
        this.$store
          .dispatch("user/savePercentage", data)
          .then(result => {
            console.log("savePercentage -> result", result);
            this.$store.commit("user/success");
            this.getGameList();
          })
          .catch(err => {
            this.$store.commit("user/success");
            this.errorHandle(err);
          });
      }
    },
    viewAll() {
      this.filteredGameLists = this.gameLists;
    },
    userRoleHandle(event) {
      let term = event.target.value;
      this.filteredGameLists = this.gameLists.filter(x => x["A"] == term);
    },
    getGameList() {
      this.$store
        .dispatch("user/getGameList")
        .then(result => {
          let { data } = result.data;
          this.userInfo = data;
          this.$store
            .dispatch("user/getAgentUsers")
            .then(res => {
              this.users = res.data.users;
              this.$store.commit("user/success");
            })
            .catch(err => {
              this.$store.commit("user/success");
              this.errorHandle(err);
            });
        })
        .catch(err => {
          this.$store.commit("user/success");
          this.errorHandle(err);
        });
    },
    providerHandle(provider) {
      this.provider = provider.name;
      this.userInfo.percentage = provider.percent;
      this.filteredGameLists = this.gameLists.filter(
        x => x["B"] == provider.name
      );
    },
    closeEdit() {
      this.collapse = !this.collapse;
    },
    editItem(index) {
      this.collapse = !this.collapse;
      this.editInfo.init = this.filteredGameLists[index];
      this.editInfo.sort =
        this.editInfo.init["V"] == "-" ? 0 : this.editInfo.init["V"];
    },
    deleteItem(index) {
      console.log(index);
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>