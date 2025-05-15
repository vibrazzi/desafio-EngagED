<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleDrawer"
          aria-label="Menu"
          icon="menu"
        />
        <q-toolbar-title class="app-title">
          Rick and Morty App
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="drawer">
      <q-list>
        <q-item clickable tag="router-link" to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    const leftDrawerOpen = ref(false);

    const toggleDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    return {
      leftDrawerOpen,
      toggleDrawer,
    };
  },
};
</script>

<style scoped>
.header {
  background-color: #4FC3F7; /* Azul claro */
  color: white;
}

.app-title {
  font-size: 24px;
  font-weight: bold;
}

.drawer {
  background-color: #FFEB3B; /* Amarelo */
}
</style>
