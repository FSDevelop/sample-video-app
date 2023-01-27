<script setup lang="ts">
import { defineProps } from 'vue';
import { Show } from '@/types';

defineProps<{
    show: Show,
}>();
</script>

<template>
    <div class="show">
        <img :src="show.image.medium" />
        <div class="show__info">
            <h3 class="show__name">{{ show.name }}</h3>
            <div class="show__summary" v-html="show.summary" />
            <p class="show__genres">{{ show.genres.join(', ') }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.show {
    position: relative;
    border-radius: 5px;
    cursor: pointer;

    .show__name {
        margin-bottom: 0;
    }

    .show__summary {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        font-size: 0.9rem;
        -webkit-box-orient: vertical;
    }
    
    .show__info {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        padding: 10px;
    }

    .show__genres {
        margin-top: 10px;
        font-weight: bold;
    }
}

.show:hover img {
    transform: scale(1.1);
    filter: brightness(0.3);
    transition: transform 0.2s;
}

.show:hover .show__info {
    display: block;
}
</style>
