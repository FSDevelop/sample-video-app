import { createStore } from 'vuex';

export default createStore({
    state: {
        selectedShow: null,
        shows: [],
    },
    getters: {
        getSelectedShow(state) {
            return state.selectedShow;
        },
        getShows(state) {
            return state.shows;
        },
    },
    mutations: {
        selectShow(state, show) {
            state.selectedShow = show;
        },
        loadShows(state, shows) {
            state.shows = shows;
        }
    },
    actions: {
        selectShow({ commit }, show) {
            commit('selectShow', show);
        },
        loadShows({ commit }, shows) {
            commit('loadShows', shows);
        },
    },
    modules: {},
});
