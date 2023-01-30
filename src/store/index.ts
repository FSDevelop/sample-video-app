import { createStore } from 'vuex';
import { request } from '@/ts/utils';
import { Show } from '@/types';
import { API_URL } from '@/ts/constants';

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
        async loadShows(state) {
            if (state.shows.length === 0) {
                const shows = await request(`${API_URL}/shows`);
                state.shows = shows;
            }
        }
    },
    actions: {
        selectShow({ commit }, show: Show) {
            commit('selectShow', show);
        },
        loadShows({ commit }) {
            commit('loadShows');
        },
    },
    modules: {},
});
