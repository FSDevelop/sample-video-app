import { createStore } from 'vuex';

export default createStore({
    state: {
        selectedShow: null,
    },
    getters: {
        selectedShow(state) {
            return state.selectedShow;
        },
    },
    mutations: {
        updateSelectedShow(state, show) {
            state.selectedShow = show;
        },  
    },
    actions: {
        selectShow({ commit }, show) {
            commit('updateSelectedShow', show);
        },
    },
    modules: {},
});
