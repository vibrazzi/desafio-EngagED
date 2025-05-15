<template>
  <div class="character-list">
    <q-input
      v-model="search"
      label="Buscar Personagens"
      outlined
      debounce="500"
      class="search-input"
      aria-label="Buscar personagens"
    />
    <div v-if="loading" class="loading-container" aria-live="polite">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <q-list v-if="characters.length" class="character-grid">
        <q-item
          v-for="character in characters"
          :key="character.id"
          clickable
          tag="router-link"
          :to="`/character/${character.id}`"
          class="character-card"
          aria-label="Ver detalhes do personagem"
        >
          <q-item-section avatar>
            <img :src="character.image" :alt="character.name" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="character-name">{{ character.name }}</q-item-label>
            <q-item-label caption class="character-details">
              {{ character.species }} - {{ character.status }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else-if="!error" class="no-results">
        <q-item-label>Nenhum personagem encontrado.</q-item-label>
      </div>
      <div v-if="error" class="error-message" aria-live="assertive">
        <q-icon name="error" color="negative" size="md" />
        <span>Erro ao carregar personagens. Tente novamente.</span>
      </div>
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        @update:model-value="onPageChange"
        class="pagination"
        aria-label="Paginação de personagens"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GET_CHARACTERS = gql`
  query ($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        pages
      }
      results {
        id
        name
        image
        status
        species
        gender
      }
    }
  }
`;

const search = ref('');
const currentPage = ref(1);

const variables = ref({
  page: currentPage.value,
  name: search.value
});

const { result, refetch, loading, error } = useQuery(GET_CHARACTERS, variables);

const characters = ref([]);
const maxPages = ref(1);

watch([search, currentPage], ([newSearch, newPage]) => {
  variables.value = { page: newPage, name: newSearch };
  refetch();
});

watch(result, () => {
  characters.value = result.value?.characters?.results || [];
  maxPages.value = result.value?.characters?.info?.pages || 1;
});

function onPageChange(page) {
  currentPage.value = page;
}
</script>

<style scoped>
.character-list {
  background: var(--background);
  color: var(--text);
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-input {
  margin-bottom: 20px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.character-card {
  background-color: var(--card-background);
  color: var(--text);
  border: 3px solid var(--card-border);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s cubic-bezier(.4,2,.6,1), box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  outline: none;
}
.character-card:focus,
.character-card:hover {
  transform: translateY(-5px) scale(1.03);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.character-name {
  color: var(--accent);
  font-weight: bold;
  font-size: 18px;
}

.character-details {
  font-size: 14px;
  color: var(--text);
}

.no-results {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: var(--text);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ff206e;
  margin: 24px 0;
  font-weight: bold;
  justify-content: center;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.q-input__native {
  background: var(--input-background);
  color: var(--input-text);
}

.q-field__label {
  color: var(--input-text);
}

.q-btn {
  background: var(--button-background);
  color: var(--button-text);
}

.q-btn:hover {
  background: var(--button-hover);
}

@media (max-width: 700px) {
  .character-list {
    padding: 8px;
  }
  .character-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .character-card {
    padding: 8px;
  }
}
</style>
