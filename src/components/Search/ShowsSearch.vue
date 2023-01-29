<template>
    <div class="shows-search" @mouseover="searchIconMouseOver">
        <font-awesome-icon
            :icon="['fas', 'search']"
            ref="searchIcon"
        />

        <div
            v-if="enableSearch"
            class="search-input"
        >
            <input
                name="search"
                id="search"
                placeholder="Search your show..."
                @blur="enableSearch = false"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchIcon = ref();
const enableSearch = ref<boolean>(false);

const searchIconMouseOver = () => {
    enableSearch.value = true;
};
</script>

<style lang="scss" scoped>
.shows-search {
    position: relative;
    max-width: 400px;
    width: 100%;
    margin: 15px;

    svg {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 0;
    }

    .search-input {
        input {
            width: calc(100% - 20px);
            height: 20px;
            border: 1px solid #aaa;
            background-color: #555;
            color: white;
            font-size: 1rem;
            padding: 10px;
        }

        &::placeholder {
            color: white;
        }
    }
}
</style>
