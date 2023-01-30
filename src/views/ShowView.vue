<template>
    <div class="view show__view" v-if="!loading && show">
        <ShowInfo
            :show="show"
            variant="large"
        />
    </div>
</template>

<script lang="ts">
import ShowInfo from '@/components/ShowInfo.vue';
import { defineComponent, computed, watch } from 'vue';
import { Show } from '@/types';
import { useRoute } from 'vue-router';
import store from '@/store';

export default defineComponent({
    components: {
        ShowInfo,
    },
    setup() {
        const route = useRoute();
        const show = computed<Show>(() => store.getters.getSelectedShow);
        const loading = computed<boolean>(() => !show.value);

        store.dispatch('loadShows');
        store.dispatch('selectShow', route.params.id);

        watch(route, (curr) => {
            if (curr.name === 'show') {
                store.dispatch('selectShow', curr.params.id);
            }
        });

        return { loading, show };
    },
});
</script>
