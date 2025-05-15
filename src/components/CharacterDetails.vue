<template>
  <div class="character-details-container">
    <div v-if="loading" class="loading-container">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <q-card class="character-card">
        <q-card-section>
          <div class="character-header">
            <img :src="character.image" :alt="character.name || 'Character Image'" class="character-image" />
            <div class="character-info">
              <h2>{{ character.name || 'Unknown' }}</h2>
              <p>Status: <span class="status" :class="character.status">{{ character.status || 'Unknown' }}</span></p>
              <p>Species: {{ character.species || 'Unknown' }}</p>
              <p>Gender: {{ character.gender || 'Unknown' }}</p>
              <p>Origin: {{ character.origin?.name || 'Unknown' }}</p>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <h3>Episódios</h3>
          <q-list>
            <q-item v-for="episode in character.episode || []" :key="episode.id" class="episode-item">
              <q-item-section>
                <q-item-label>{{ episode.name || 'Unknown Episode' }}</q-item-label>
                <q-item-label caption>{{ episode.episode || 'Unknown Code' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
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
        character.value = result.value?.character || {};
      }
      loading.value = queryLoading.value;
    });

    const fetchCharacter = async () => {
      try {
        loading.value = true;
        await refetch({ id: characterId.value });
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
.character-details-container {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.character-card {
  margin: 20px auto;
  max-width: 600px;
  background: var(--card-background);
  color: var(--text);
  border: 3px solid var(--card-border);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  padding: 0;
}

.character-header {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.character-image {
  width: 140px;
  height: 140px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid var(--accent);
  background: #fff;
  flex-shrink: 0;
}

.character-info {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

.character-info h2 {
  margin: 0 0 8px 0;
  color: var(--accent);
  font-size: 2rem;
  font-weight: bold;
  word-break: break-word;
}

.character-info p {
  margin: 5px 0;
  word-break: break-word;
}

.status {
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 8px;
  margin-left: 4px;
}

.status.Alive {
  background: #00ff9d;
  color: #222;
}
.status.Dead {
  background: #ff206e;
  color: #fff;
}
.status.Unknown {
  background: #bdbdbd;
  color: #222;
}

.episode-item {
  border-bottom: 1px solid var(--card-border);
  word-break: break-word;
}
.episode-item:last-child {
  border-bottom: none;
}

@media (max-width: 600px) {
  .character-details-container {
    padding: 8px;
  }
  .character-card {
    margin: 10px auto;
    max-width: 100%;
    padding: 0;
  }
  .character-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .character-image {
    width: 100px;
    height: 100px;
    margin-right: 0;
  }
  .character-info h2 {
    font-size: 1.3rem;
  }
  .character-info,
  .character-info h2,
  .character-info p,
  .episode-item {
    word-break: break-word;
    white-space: normal;
  }
}
</style>
