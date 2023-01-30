<template>
  <div>
    <nav>
      <div class="menu__options">
        <RouterLink to="/">Home</RouterLink>
      </div>

      <ShowsSearch />
    </nav>

    <RouterView class="router-view" v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
            <component :is="Component" />
        </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import ShowsSearch from '@/components/Search/ShowsSearch.vue';
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.8s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}

.view {
    margin: 8px;
    padding-top: 60px;
}

nav {
    .menu__options {
        display: flex;

        a {
            font-weight: bold;
            color: white;
            padding: 20px;
            text-decoration: none;
            font-size: 1.5rem;

            &.router-link-exact-active {
                color: #42b983;
            }

            &:hover {
                color: #42b983;
            }
        }
    }
}
</style>
