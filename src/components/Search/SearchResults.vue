<template>
    <div class="search-results">
        <ResultItem
            v-for="show in shows"
            :key="show.id"
            :show="show"
            @clearSearch="clearSearch"
        />
    </div>
</template>

<script lang="ts">
import ResultItem from '@/components/Search/SearchResultsItem.vue';
import { Show } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        ResultItem,
    },
    props: {
        shows: {
            type: Object as () => Show[],
            required: true,
        },
    },
    setup(props, context) {
        return {
            clearSearch() {
                context.emit('clearSearch');
            },
        };
    },
});
</script>

<style scoped lang="scss">
.search-results {
    background: white;
    border-radius: 5px;
    margin-top: 10px;
    position: absolute;
}
</style>
