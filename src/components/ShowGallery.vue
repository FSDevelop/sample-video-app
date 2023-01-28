<template>
    <h2 v-text="genre" />

    <div class="slider">
        <div
            class="slider__navigation"
            :class="{ 'slider__navigation-invisible': !showNavigators }"
            @click="navigate('left')"
        >
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </div>

        <div class="shows" ref="showsElm">
            <ShowItem
                v-for="show in shows"
                :key="show.id"
                :show="show"
            />
        </div>

        <div
            class="slider__navigation"
            :class="{ 'slider__navigation-invisible': !showNavigators }"
            @click="navigate('right')"
        >
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </div>
    </div>
</template>

<script lang="ts">
import ShowItem from '@/components/ShowItem.vue';
import { Show } from '@/types';
import { defineComponent, ref, onMounted, inject } from 'vue';

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
    setup() {
        // eslint-disable-next-line
        const showsElm = ref<any>(null);
        const showNavigators = ref(false);

        onMounted(() => {
            if (showsElm.value.scrollWidth + 80 >= window.innerWidth) {
                showNavigators.value = true;
            }
        });

        return {
            showsElm,
            showNavigators,
            navigate(direction: string) {
                if (showsElm.value) {
                    showsElm.value.scroll({
                        left: showsElm.value.scrollLeft + (direction === 'left' ? -500 : 500),
                        behavior: 'smooth'
                    });
                }
            },
        }
    },
});
</script>

<style lang="scss" scoped>
h2 {
    margin-left: 70px;
}

.slider {
    display: flex;
    column-gap: 10px;

    .slider__navigation {
        &.slider__navigation-invisible {
            visibility: hidden;
        }

        &:hover {
            background-color: #2c3e50;
        }

        height: 295px;
        cursor: pointer;

        svg {
            padding: 0;
            margin-top: 110px;
            padding: 20px;
        }
    }

    .shows {
        display: flex;
        column-gap: 20px;
        padding-bottom: 50px;
        overflow-x: auto;

        &::-webkit-scrollbar {
            display: none;
        }
    }
}
</style>
