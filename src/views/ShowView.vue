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
import { API_URL } from '@/ts/constants';
import { request } from '@/ts/utils';
import { defineComponent, ref, onMounted } from 'vue';
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

        if (store.getters.getSelectedShow) {
            show = store.getters.getSelectedShow;
        } else {
            loading.value = true;
        }

        onMounted(async () => {
            if (!store.getters.getSelectedShow) {
                const route = useRoute();
                show.value = await request(`${API_URL}/shows/${route.params.id}`);
                loading.value = false;
            }
        });

        return { loading, show };
    },
});
</script>
