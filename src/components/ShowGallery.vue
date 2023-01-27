<template>
    <h2 v-text="genre" />

    <div class="shows">
        <ShowItem
            v-for="show in shows"
            :key="show.id"
            :show="show"
        />
    </div>
</template>

<script lang="ts">
import ShowItem from '@/components/ShowItem.vue';
import { Show } from '@/types';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        ShowItem,
    },
    props: {
        shows: {
            type: Array as () => Show[],
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
    },
});
</script>

<style scoped>
h2 {
    margin-left: 30px;
}

.shows {
    display: flex;
    column-gap: 20px;
    padding-bottom: 50px;
    overflow-x: auto;
}

.shows::-webkit-scrollbar {
    display: none;
}
</style>
