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
import { API_URL } from '@/ts/constants';
import { request } from '@/ts/utils';
import { ref, defineComponent, onMounted } from 'vue';

export default defineComponent({
    components: {
        ShowGallery,
    },
    setup() {
        let shows = ref<Show[]>([]);
        let genres = ref<string[]>([]);

        onMounted(async () => {
            const showsArr = await request(`${API_URL}/shows`);
            shows.value = showsArr;
            genres.value = groupGenres(showsArr);
        });

        return {
            getShowsByGenre(genre: string) {
                return shows.value
                    // filter by genre
                    .filter((show: Show) => {
                        return show.genres.includes(genre);
                    })

                    // shuffle the shows
                    .sort(() => {
                        return Math.random() - 0.5;
                    });
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
