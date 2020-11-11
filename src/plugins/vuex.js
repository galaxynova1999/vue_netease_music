import Vue from "vue";
import persistedState from 'vuex-persistedstate';
import Vuex from 'vuex';
import loginState from "@/store/loginState";


Vue.use(Vuex);


export default new Vuex.Store({
    module:{
        loginState,
    },
    plugins: [persistedState()],
    strict: process.env.NODE_ENV !== 'production'
})
