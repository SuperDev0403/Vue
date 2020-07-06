import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import serviceUtils from './services/serviceUtils'

let services = new serviceUtils()
// import modules
import auth from "./modules/auth";
import user from './modules/users';
import report from './modules/report';
import setting from './modules/setting';
import log from './modules/log';
import home from './modules/home'

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  status: '',
  state: ''
}
const actions = {
  getUserNames({ commit }) {
    console.log("getUserNames -> commit")

    commit('loading')
    return services.ApiGET('getUserNames')
  },
}

const mutations = {
  error(state) {
    state.status = 'error'
  },
  success(state) {
    state.status = 'success'
  },
  loading(state) {
    state.status = 'loading'
  },
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  }
}

const getters = {
  currentStatus: state => state.status,
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    auth,
    user,
    report,
    log,
    setting,
    home
  }
})