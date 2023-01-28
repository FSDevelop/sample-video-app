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
import { defineComponent, ref } from 'vue';
import { Show } from '@/types';
import { useRoute } from 'vue-router';
import store from '@/store';

export default defineComponent({
    components: {
        ShowInfo,
    },
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
