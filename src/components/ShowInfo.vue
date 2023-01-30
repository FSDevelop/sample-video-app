<template>
    <img v-if="slider" :src="show.image.medium" class="picture__slider" />
    
    <div class="show__info" :class="{ 'show__info__slider': slider, 'show__info__large': large }">
        <img v-if="large" :src="show.image.original" class="picture__large" />
        
        <div class="show__data">
            <RatingStars
                v-if="show.rating.average && slider"
                :stars="show.rating.average"
                size="small"
            />

            <h1 class="show__name" v-text="show.name" />
            <div class="show__summary" v-html="show.summary" />

            <table v-if="large">
                <tr>
                    <td><b>Average Rating:</b></td>
                    <td>
                        <RatingStars
                            :stars="show.rating.average"
                            size="normal"
                        />
                    </td>
                </tr>
                <tr>
                    <td><b>Premiered on:</b></td>
                    <td v-text="premieredDate" />
                </tr>
                <tr v-if="show.ended">
                    <td><b>Ended on:</b></td>
                    <td v-text="endedDate" />
                </tr>
                <tr>
                    <td><b>Genres:</b></td>
                    <td v-text="show.genres.join(', ')" />
                </tr>
            </table>

            <p v-if="slider" class="show__genres" v-text="show.genres.join(', ')" />
        </div>
    </div>
</template>

<script lang="ts">
import RatingStars from '@/components/RatingStars.vue';
import { Show } from '@/types';
import { formatDate } from '@/ts/utils';
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
    components: {
        RatingStars,
    },
    props: {
        show: {
            type: Object as () => Show,
            required: true,
        },
        variant: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        const premieredDate = ref<string>();
        const endedDate = ref<string>();

        if (props.variant === 'large') {
            if (props.show.premiered) {
                premieredDate.value = formatDate(props.show.premiered);
            }

            if (props.show.ended) {
                endedDate.value = formatDate(props.show.ended);
            }
        }

        const slider = computed(() => props.variant === 'slider');
        const large = computed(() => props.variant === 'large');

        return {
            slider,
            large,
            endedDate,
            premieredDate
        };
    },
});
</script>

<style lang="scss" scoped>
.picture__slider {
    width: 210px;
}

.show__info {
    z-index: 100;

    .show__data {
        padding: 20px;
    }

    img.picture__large {
        width: 100%;
        right: 0;
        position: absolute;
        z-index: 0;
    }

    table {
        width: 100%;
        font-size: 1.2rem;

        tr {
            td:first-child {
                width: 160px;
            }
        }
    }

    &.show__info__slider {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: calc(100% - 10px);
        height: calc(100% - 10px);
        padding: 10px;

        .show__name {
            margin-bottom: 0;
            font-size: 1.2rem;
        }

        .show__summary {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 5;
            -webkit-line-clamp: 5;
            font-size: 0.9rem;
            -webkit-box-orient: vertical;
        }

        .show__genres {
            margin-top: 10px;
            font-weight: bold;
            font-size: 1rem;
        }
    }

    &.show__info__large {
        .show__data {
            position: relative;

            .show__name {
                margin-bottom: 0;
                font-size: 2rem;
            }

            .show__summary {
                font-size: 1.2rem;
            }

            .show__genres {
                margin-top: 10px;
                font-size: 1.5rem;
                font-weight: bold;
            }
        }
    }
}

@media only screen and (min-width: 769px) {
    .show__info__large {
        .show__data {
            width: calc(100% - 40px);
            max-width: 900px;
        }
    }

    img.picture__large {
        mask-image: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));
    }
}

@media only screen and (max-width: 768px) {
    .picture__slider {
        width: 140px;
    }

    .show__info__slider {
        width: 100% !important;
        height: calc(100% - 0px) !important;
        padding: 0px !important;

        .show__data {
            padding: 5px;

            .show__name {
                font-size: 1rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .show__summary {
                -webkit-line-clamp: 3;
                line-clamp: 3;
            }
            
            .show__genres {
                font-size: 0.8rem;
            }
        }
    }

    .show__info__large {
        .show__data {
            width: calc(100% - 40px);
        }
    }

    img.picture__large {
        opacity: 0.5;
        mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0));
    }
}
</style>
