import Vue from "vue";
import Vuetify from "vuetify/lib";
// 由Vuetify（javascript）提供的翻译
import zhHans from "vuetify/es5/locale/zh-Hans";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#c62f2f",
      },
    },
  },
  lang: {
    locales: { zhHans },
    current: "zhHans",
  },
});
