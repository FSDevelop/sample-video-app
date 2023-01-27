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

<script setup lang="ts">
import ShowItem from '@/components/ShowItem.vue';
import { Show } from '@/types';
import { defineProps } from 'vue';

defineProps<{
    shows: Show[],
    genre: string,
}>();
</script>

<style scoped>
.shows {
    display: flex;
}
</style>
