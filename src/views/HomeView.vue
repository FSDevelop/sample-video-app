<template>
    <div class="view home__view">
        <ShowGallery
            v-for="genre in genres"
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
import { defineComponent, computed } from 'vue';
import store from '@/store/index';

export default defineComponent({
    components: {
        ShowGallery,
    },
    setup() {
        store.dispatch('loadShows');

        const shows = computed<Show[]>(() => store.getters.getShows);
        const genres = computed<string[]>(() => shuffle(groupGenres(shows.value)));

        const getShowsByGenre = (genre: string): Show[] => {
            return shuffle(
                shows.value.filter(
                    (show: Show) => show.genres.includes(genre)
                )
            );
        };

        return {
            shows,
            genres,
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
}
</style>
