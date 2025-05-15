<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn flat dense round @click="toggleDrawer" aria-label="Menu" icon="menu" />
        <q-toolbar-title class="app-title">Rick and Morty</q-toolbar-title>
        <q-btn flat dense round :icon="isDarkMode ? 'brightness_7' : 'brightness_4'" @click="toggleTheme" aria-label="Alternar tema" />
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

<script setup>
import { ref, watch } from 'vue';

const leftDrawerOpen = ref(false);
const isDarkMode = ref(false);

function toggleDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
}

watch(isDarkMode, (val) => {
  document.body.setAttribute('data-theme', val ? 'dark' : '');
});
</script>

<style scoped>
.header {
  background-color: var(--header-background);
  color: var(--text);
}
.app-title {
  font-size: 24px;
  font-weight: bold;
}
.drawer {
  background-color: var(--card-background);
  color: var(--text);
}
</style>

<style>
.q-input__native {
  color: var(--input-text) !important;
  background: var(--input-background);
}
.q-field__label {
  color: var(--input-text) !important;
}
</style>
