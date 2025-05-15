<template>
  <div class="character-list">
    <q-input
      v-model="search"
      label="Buscar Personagens"
      outlined
      debounce="300"
      class="search-input"
      @input="onSearchInput"
    />
    <q-list v-if="characters.length" class="character-grid">
      <q-item
        v-for="character in characters"
        :key="character.id"
        clickable
        tag="router-link"
        :to="`/character/${character.id}`"
        class="character-card"
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
    <div v-else class="no-results">
      <q-item-label>Nenhum personagem encontrado.</q-item-label>
    </div>
    <q-pagination
      v-model="currentPage"
      :max="maxPages"
      @update:model-value="fetchCharacters"
      class="pagination"
    />
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watchEffect } from 'vue';

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

export default {
  setup() {
    const search = ref('');
    const currentPage = ref(1);
    const characters = ref([]);
    const maxPages = ref(1);
    
    const { result, loading, refetch, error } = useQuery(GET_CHARACTERS, {
      page: currentPage.value,
      name: search.value,
    });

    watchEffect(() => {
      if (result.value) {
        console.log("Dados dos personagens:", result.value);
        characters.value = result.value?.characters?.results || [];
        maxPages.value = result.value?.characters?.info?.pages || 1;
      }
    });

    const fetchCharacters = async () => {
      try {
        await refetch({ page: currentPage.value, name: search.value });
      } catch (err) {
        console.error('Erro ao buscar personagens:', err);
      }
    };

    const onSearchInput = () => {
      currentPage.value = 1; // Reseta para a primeira página ao buscar
      fetchCharacters();
    };

    watchEffect(() => {
      if (error.value) {
        console.error('Erro GraphQL:', error.value);
      }
    });

    return { characters, search, currentPage, maxPages, loading, fetchCharacters, onSearchInput };
  },
};
</script>

<style scoped>
.character-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.search-input {
  margin-bottom: 20px;
}

.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.character-card {
  background-color: #FFEB3B; /* Amarelo */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
}

.character-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.character-name {
  font-weight: bold;
  font-size: 18px;
  color: #333;
}

.character-details {
  font-size: 14px;
  color: #666;
}

.no-results {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
  color: #999;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
