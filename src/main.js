import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import _ from "lodash";
import { createPicURL } from "@/util/convenience";
import moment from "moment";

Vue.config.productionTip = false;
//注入lodash
Vue.prototype._ = _;
//注入moment
Vue.prototype.moment = moment;
//注入一些全局方法
Vue.prototype.createPicURL = function (src, x, y) {
  return `${src}?param=${x}y${y}`;
};
//注入全局路由方法
Vue.prototype.changeRouteToPlayList = function (id) {
  this.$router.push({ path: `/playlist/song/${id}` });
};
Vue.prototype.changeRouteToAlbums = function (id) {
  this.$router.push({ path: `/playlist/album/${id}` });
};
Vue.prototype.changeRouteToSinger = function (id) {
  this.$router.push({ path: `/singer/${id}` });
};
//在开发环境下注入模板调试方法
Vue.prototype.$log = window.console.log;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
