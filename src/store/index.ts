import { createStore } from 'vuex';
import { request } from '@/ts/utils';
import { Show, GlobalState } from '@/types';
import { API_URL } from '@/ts/constants';

const state: GlobalState = {
    selectedShow: null,
    shows: [],
};

export default createStore({
    state,
    getters: {
        getSelectedShow(state): Show | null {
            return state.selectedShow;
        },
        getShows(state): Show[] {
            return state.shows;
        },
    },
    mutations: {
        selectShow(state, show: Show) {
            state.selectedShow = show;
        },
        loadShows(state, shows: Show[]) {
            state.shows = shows;
        }
    },
    actions: {
        async selectShow({ commit }, showId: number) {
            try {
                if (!this.state.selectedShow) {
                    const selectedShow: Show = await request(`${API_URL}/shows/${showId}`);
                    commit('selectShow', selectedShow);
                }
            } catch (e) {
                console.error(e);
            }
        },
        async loadShows({ state, commit }) {
            try {
                if (state.shows.length === 0) {
                    const shows: Show[] = await request(`${API_URL}/shows`);
                    commit('loadShows', shows);
                }
            } catch (e) {
                console.error(e);
            }
        },
    },
    modules: {},
});
