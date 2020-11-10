import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import VueRouter from "vue-router";

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(VueRouter);
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
