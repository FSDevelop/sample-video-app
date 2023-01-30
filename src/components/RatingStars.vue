<template>
    <font-awesome-icon
        v-for="star of Math.floor(stars)"
        :key="star"
        :icon="['fas', 'star']"
        :class="{ 'small': size === 'small' }"
    />

    <font-awesome-icon
        v-if="stars - Math.floor(stars) > 0"
        :icon="['fas', 'star-half-stroke']"
        :class="{ 'small': size === 'small' }"
    />

    <font-awesome-icon
        v-for="star of 10 - Math.ceil(stars)"
        :key="star"
        :class="{ 'small': size === 'small' }"
        :icon="['far', 'star']"
    />

    <span
        :class="{ 'small': size === 'small' }"
        v-text="' (' + stars + '/10)'"
    />
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    stars: number,
    size: string,
}>();
</script>

<style scoped lang="scss">
svg {
    padding: 0;
    margin-right: 5px;
    cursor: auto;

    &:last-child {
        margin-right: 0;
    }

    &.small {
        font-size: 0.7rem;
        margin-right: 2px;
    }
}

span {
    &.small {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    svg {
        margin-right: 2px;
        font-size: 0.7rem;

        &:last-child {
            margin-right: 0;
        }

        &.small {
            font-size: 0.5rem;
        }
    }
}
</style>