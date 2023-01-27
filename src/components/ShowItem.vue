<script setup lang="ts">
import { defineProps } from 'vue';
import { Show } from '@/types';

defineProps<{
    show: Show,
}>();
</script>

<template>
    <img :src="show.image.medium" />
</template>

<style scoped>
img {
    cursor: pointer;
}
</style>
