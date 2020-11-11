const state = () => ({
    id: "431085465",
    name: "Graduate",
    author: "",
    pic: "",
    totalTime: "",
    src: "",
    playStatus: 'waiting',
    lyric: "",
    comments: {
        hotComments:[],
        comments:[]
    },
    totalSecond: 0,
    currentIndexInPlayList : 0,
})

// getters
const getters = {}

// actions
const actions = {
    getAllProducts ({ commit }) {
        shop.getProducts(products => {
            commit('setProducts', products)
        })
    }
}

// mutations
const mutations = {
    setProducts (state, products) {
        state.all = products
    },

    decrementProductInventory (state, { id }) {
        const product = state.all.find(product => product.id === id)
        product.inventory--
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
