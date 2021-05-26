import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        editionNum: "版本号"
    },
    mutations: {
        change(state) {
            state.isShowPage = true;
        }
    }
})

export default store