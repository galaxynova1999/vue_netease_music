import Vue from "vue";
import persistedState from 'vuex-persistedstate';
import Vuex from 'vuex';
import loginState from "@/store/loginState";
import songState from "@/store/songState";
import userState from "@/store/userState";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        login:loginState,
        song:songState,
        user:userState
    },
    plugins: [persistedState()],
    strict: process.env.NODE_ENV !== 'production'
})


export default store
