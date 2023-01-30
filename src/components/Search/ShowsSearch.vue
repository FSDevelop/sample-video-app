<template>
    <div class="shows-search" @mouseover="searchIconMouseOver">
        <font-awesome-icon
            :icon="['fas', 'search']"
            ref="searchIcon"
            @click="searchIconMouseOver"
        />

        <div
            v-if="enableSearch"
            class="search-input"
        >
            <input
                name="search"
                id="search"
                ref="searchInput"
                placeholder="Search your show..."
                @blur="searchInputBlur"
                @keyup="checkResults"
            />
        </div>

        <SearchResults
            v-if="availableResults.length > 0"
            :shows="filteredResults"
            @clearSearch="clearSearch"
        />
    </div>
</template>

<script lang="ts">
import SearchResults from '@/components/Search/SearchResults.vue';
import { ref, defineComponent, computed, watch } from 'vue';
import { Show } from '@/types';
import store from '@/store/index';

export default defineComponent({
    components: {
        SearchResults,
    },
    setup() {
        const searchIcon = ref();
        const searchInput = ref();
        const enableSearch = ref<boolean>(false);
        const showResults = ref<boolean>(false);
        const availableResults = computed(() => store.getters.getShows);
        const filteredResults = ref<Show[]>([]);

        watch(searchInput, (curr) => {
            if (curr) curr.focus();
        });

        const searchIconMouseOver = () => {
            enableSearch.value = true;
        };

        const searchInputBlur = () => {
            if (!searchInput.value.value) {
                enableSearch.value = false;
            }
            
            // delay clear results (when clicking one of the options this is triggered)
            setTimeout(() => filteredResults.value = [], 100);
        };

        let searchTimeout: number;

        const checkResults = () => {
            clearTimeout(searchTimeout);

            if (searchInput.value.value.length >= 2) {
                searchTimeout = setTimeout(() => {
                    filteredResults.value = availableResults.value.filter((show: Show) => {
                        return show.name.toLowerCase().includes(searchInput.value.value.toLowerCase());
                    });
                }, 400);
            } else {
                filteredResults.value = [];
            }
        };

        const clearSearch = () => {
            filteredResults.value = [];
            searchInput.value.value = '';
        };

        return {
            availableResults,
            filteredResults,
            showResults,
            searchIcon,
            searchInput,
            enableSearch,
            checkResults,
            searchIconMouseOver,
            searchInputBlur,
            clearSearch,
        };
    },
});
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
        cursor: auto;
    }

    .search-input {
        input {
            width: calc(100% - 20px);
            height: 20px;
            border: 1px solid #aaa;
            background-color: #555;
            padding: 10px;
        }
    }
}
</style>
