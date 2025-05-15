<template>
  <div v-if="loading">
    <q-spinner color="primary" size="50px" />
  </div>
  <div v-else>
    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col-auto">
            <img :src="character.image" :alt="character.name || 'Character Image'" class="character-image" />
          </div>
          <div class="col">
            <h2>{{ character.name || 'Unknown' }}</h2>
            <p>Status: {{ character.status || 'Unknown' }}</p>
            <p>Species: {{ character.species || 'Unknown' }}</p>
            <p>Gender: {{ character.gender || 'Unknown' }}</p>
            <p>Origin: {{ character.origin?.name || 'Unknown' }}</p>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <h3>Episodes</h3>
        <q-list>
          <q-item v-for="episode in character.episode || []" :key="episode.id">
            <q-item-section>
              <q-item-label>{{ episode.name || 'Unknown Episode' }}</q-item-label>
              <q-item-label caption>{{ episode.episode || 'Unknown Code' }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const GET_CHARACTER = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      image
      episode {
        id
        name
        episode
      }
    }
  }
`;

export default {
  setup() {
    const route = useRoute();
    const characterId = ref(route.params.id);
    const character = ref({});
    const loading = ref(true);

    const { result, loading: queryLoading, refetch, error } = useQuery(GET_CHARACTER, { id: characterId.value });

    watchEffect(() => {
      if (result.value) {
        console.log("Dados do personagem:", result.value);
        character.value = result.value?.character || {};
      }
      loading.value = queryLoading.value;
    });

    const fetchCharacter = async () => {
      try {
        loading.value = true;
        await refetch({ id: characterId.value });
      } catch (err) {
        console.error('Erro ao buscar personagem:', err);
      } finally {
        loading.value = false;
      }
    };

    watchEffect(() => {
      if (error.value) {
        console.error("Erro GraphQL:", error.value);
      }
    });

    return { character, loading, fetchCharacter };
  },
};
</script>

<style scoped>
.character-image {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
}
</style>
