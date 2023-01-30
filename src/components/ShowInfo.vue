<template>
    <img v-if="slider" :src="show.image.medium" class="picture__slider" />
    
    <div class="show__info" :class="{ 'show__info__slider': slider, 'show__info__large': large }">
        <font-awesome-icon
            v-if="large"
            class="go-back"
            :icon="['fas', 'arrow-left']"
            @click="goBack"
        />

        <img
            v-if="large"
            :src="show.image.original"
            class="picture__large"
            :class="{ 'animated': pictureAnimationOn }"
            @load="pictureAnimationOn = true"
        />

        <img
            v-if="large"
            :src="show.image.medium"
            class="picture__large__medium"
        />
        
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
import { useRouter } from 'vue-router';

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
        const pictureAnimationOn = ref<boolean>(false);

        if (props.variant === 'large') {
            if (props.show.premiered) {
                premieredDate.value = formatDate(props.show.premiered);
            }

            if (props.show.ended) {
                endedDate.value = formatDate(props.show.ended);
            }
        }

        const slider = computed<boolean>(() => props.variant === 'slider');
        const large = computed<boolean>(() => props.variant === 'large');
        const router = useRouter();

        const goBack = () => {
            router.push({ name: 'home' });
        };

        return {
            slider,
            large,
            endedDate,
            premieredDate,
            pictureAnimationOn,
            goBack,
        };
    },
});
</script>

<style lang="scss" scoped>
.picture__slider {
    width: 210px;
}

.picture__large__medium {
    height: 400px;
    margin-top: 50px;
    margin-left: 20px;
    border-radius: 5px;
}

.show__info {
    z-index: 100;
    display: flex;

    .go-back {
        margin-top: 55px;
        margin-left: 20px;
        cursor: pointer;
        z-index: 100;
        padding: 0;
        position: relative;
    }

    .show__data {
        padding: 20px;
    }

    img.picture__large {
        width: 100%;
        right: 0;
        position: fixed;
        opacity: 0.2;
        z-index: 0;
        transition: all 4s ease-in-out;
        transform: translateY(-700px);
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
    .picture__large__medium {
        display: block;
    }

    .show__info__large {
        .show__data {
            width: calc(100% - 40px);
            max-width: 900px;
        }
    }

    img.picture__large {
        mask-image: linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0));

        &.animated {
            transform: translateY(0px);
        }
    }
}

@media only screen and (max-width: 768px) {
    .picture__slider {
        width: 140px;
    }
    .picture__large__medium {
        display: none;
    }

    .show__info {
        display: block;
        
        .go-back {
            z-index: 200;
        }
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

        &.animated {
            transform: translateY(0);
        }
    }
}
</style>
