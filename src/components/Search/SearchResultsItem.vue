<template>
    <div
        class="search-results__item"
        v-text="show.name"
        @click="goToShow"
    />
</template>

<script lang="ts">
import { Show } from '@/types';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/store/index';

export default defineComponent({
    props: {
        show: {
            type: Object as () => Show,
            required: true,
        },
    }, 
    setup(props, context) {
        const router = useRouter();

        const goToShow = () => {
            store.dispatch('selectShow', props.show);
                            
            router.push({
                name: 'show',
                params: { id: props.show.id },
            });

            context.emit('clearSearch');
        };

        return {
            goToShow,
        };
    },
});
</script>

<style scoped lang="scss">
.search-results__item {
    color: black;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    min-width: 200px;

    &:last-child {
        border-bottom: none;
    }
}
</style>
