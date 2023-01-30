<template>
    <div class="view home__view" ref="home" v-if="!loading" @scroll="lazyLoading">
        <ShowGallery
            v-for="genre in genres.slice(0, genresLimit)"
            :key="genre"
            :genre="genre"
            :shows="getShowsByGenre(genre)"
        />
    </div>
</template>

<script lang="ts">
import ShowGallery from '@/components/ShowGallery.vue';
import { Show } from '@/types';
import { shuffle } from '@/ts/utils';
import { defineComponent, computed, ref } from 'vue';
import store from '@/store/index';

export default defineComponent({
    components: {
        ShowGallery,
    },
    setup() {
        store.dispatch('loadShows');

        const loading = computed<boolean>(() => genres.value.length === 0);
        const shows = computed<Show[]>(() => shuffle(store.getters.getShows));
        const genres = computed<string[]>(() => shuffle(groupGenres(shows.value)));
        const genresLimit = ref<number>(4);

        const getShowsByGenre = (genre: string): Show[] => {
            return shows.value.filter(
                (show: Show) => show.genres.includes(genre)
            );
        };

        // eslint-disable-next-line
        const lazyLoading = (elm: any) => {
            elm = elm.srcElement;

            if (Math.ceil(elm.scrollTop + elm.clientHeight) >= elm.scrollHeight) {
                genresLimit.value += 2;
            }
        };

        return {
            shows,
            genres,
            loading,
            genresLimit,
            lazyLoading,
            getShowsByGenre,
        };
    },
});

const groupGenres = (showsArr: Show[]): string[] => {
    return showsArr.reduce((acc: string[], show: Show) => {

        show.genres.forEach((genre: string) => {
            if (!acc.includes(genre)) {
                acc.push(genre);
            }
        });

        return acc;
    }, []);
};
</script>

<style scoped lang="scss">
.home__view {
    padding-top: 6rem;
    overflow-y: auto;
    height: calc(100vh - 6rem);
    margin: 0 auto;

    &::-webkit-scrollbar {
        display: none;
    }
}
</style>
