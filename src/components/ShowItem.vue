<template>
    <div class="show" @click="goToShowPage">
        <ShowInfo
            :show="show"
            variant="slider"
        />
    </div>
</template>

<script lang="ts">
import ShowInfo from '@/components/ShowInfo.vue';
import { defineComponent } from 'vue';
import { Show } from '@/types';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        ShowInfo,
    },
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
                router.push({
                    name: 'show',
                    params: { id: props.show.id },
                });
            },
        };
    },
});
</script>

<style lang="scss">
.show {
    position: relative;
    cursor: pointer;

    img {
        border-radius: 5px;
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

@media only screen and (max-width: 768px) {
    .show:hover img {
        transform: scale(1);
        transition: none;
    }
}
</style>
