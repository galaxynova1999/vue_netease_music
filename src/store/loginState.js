const state = () => ({
    isLogin:false
})


const mutations = {
    changeLoginState (state, newState) {
        state.isLogin = newState;
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
