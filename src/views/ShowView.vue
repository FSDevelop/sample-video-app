<template>
    <div class="view show" v-if="!loading && show">
        <h1 v-text="show.name" />

        <div class="show__info">
            <img :src="show.image.medium" />

            <div class="show__summary" v-html="show.summary" />
            <p class="show__genres" v-text="show.genres.join(', ')" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { Show } from '@/types';
import { useRoute } from 'vue-router';
import store from '@/store';

export default defineComponent({
    setup() {
        let show = ref<Show>();
        let loading = ref<boolean>(false);

        if (store.getters.selectedShow) {
            show = store.getters.selectedShow;
        } else {
            loading.value = true;
        }

        return { loading, show };
    },
    async created() {
        if (!store.getters.selectedShow) {
            const route = useRoute();
            
            let response = await fetch(`http://api.tvmaze.com/shows/${route.params.id}`);
            let data = await response.json();

            this.show = data;
            this.loading = false;
        }
    },
});
</script>
