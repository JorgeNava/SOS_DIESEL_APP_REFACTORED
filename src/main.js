import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2';
import VueMask from 'v-mask'

import vco from "v-click-outside"

import router from './router'
import store from '@/state/store'
import i18n from './i18n'

import "@/assets/scss/app.scss";

import LocalStorageService from '@/helpers/local-storage-service';
import eventBus from '@/helpers/event-bus';

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(vco)
Vue.use(Vuelidate)
Vue.use(VueSweetalert2);
Vue.use(VueMask)

new Vue({
  router,
  store,
  i18n,
  data() {
    return {
      jwtTimer: null,
    };
  },
  methods: {
    startJwtTimer() {
      this.jwtTimer = setInterval(() => {
        const currentRoute = this.$route.path;
        if (!currentRoute.includes('/panel-de-administracion') || currentRoute === '/login') {
          return;
        }
  
        const jwtToken = LocalStorageService.getToken();
        const jwtExpireTime = new Date(JSON.parse(atob(jwtToken.split('.')[1])).exp * 1000);
        if (jwtExpireTime <= new Date()) {
          clearInterval(this.jwtTimer);
          eventBus.$emit('sessionExpired');
        }
      }, 1000  * 60 * 5); // Check 5 mins
    },
  },
  destroyed() {
    clearInterval(this.jwtTimer);
  },
  render: h => h(App)
}).$mount('#app')
