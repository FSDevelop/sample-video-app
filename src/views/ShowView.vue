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
import { defineComponent, computed } from 'vue';
import { Show } from '@/types';
import { useRoute } from 'vue-router';
import store from '@/store';

export default defineComponent({
    components: {
        ShowInfo,
    },
    setup() {
        const route = useRoute();
        store.dispatch('selectShow', route.params.id);

        let show = computed<Show>(() => store.getters.getSelectedShow);
        let loading = computed<boolean>(() => !show.value);

        return { loading, show };
    },
});
</script>
