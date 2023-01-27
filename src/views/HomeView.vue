<template>
  <div class="home">
    <ShowGallery
      v-for="genre in genres"
      :key="genre"
      :genre="genre"
      :shows="shows.filter(show => show.genres.includes(genre))"
    />
  </div>
</template>

<script setup lang="ts">
import ShowGallery from '@/components/ShowGallery.vue';
import { Show } from '@/types';
import { onMounted, ref } from 'vue';

let shows = ref<Show[]>([]);
let genres = ref<string[]>([]);

onMounted(async () => {
  let response = await fetch('https://api.tvmaze.com/shows');
  let showsArr = await response.json();

  shows.value = showsArr;
  genres.value = groupGenres(showsArr);
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
