<template>
    <div class="show" @click="goToShowPage">
        <img :src="show.image.medium" />

        <div class="show__info">
            <h3 class="show__name" v-text="show.name" />
            <div class="show__summary" v-html="show.summary" />
            <p class="show__genres" v-text="show.genres.join(', ')" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Show } from '@/types';
import { useRouter } from 'vue-router';
import store from '@/store';

export default defineComponent({
    props: {
        show: {
            type: Object as () => Show,
            required: true,
        },
    },
    setup(props) {
        const router = useRouter();

        return {
            goToShowPage() {
                store.dispatch('selectShow', props.show);
                
                router.push({
                    name: 'show',
                    params: { id: props.show.id },
                });

            },
        };
    },
});
</script>

<style lang="scss" scoped>
.show {
    position: relative;
    cursor: pointer;

    img {
        border-radius: 5px;
    }

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
