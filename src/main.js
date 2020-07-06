import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { TreeViewPlugin } from "@syncfusion/ej2-vue-navigations"
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/index'
import i18n from './i18n'
import Notifications from 'vue-notification'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(Notifications)
Vue.use(Loading)
Vue.use(TreeViewPlugin)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  i18n,
  components: {
    App
  }
})
