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

        let shows = computed(() => store.getters.getShows);
        let genres = computed(() => shuffle(groupGenres(shows.value)));

        return {
            getShowsByGenre(genre: string) {
                return shuffle(
                    shows.value.filter(
                        (show: Show) => show.genres.includes(genre)
                    )
                );
            },
            shows,
            genres,
        };
    },
});

const groupGenres = (showsArr: Show[]) => {
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

<style scoped>
.home__view {
    padding-top: 6rem;
}
</style>
