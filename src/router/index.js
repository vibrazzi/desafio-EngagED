import { createRouter, createWebHistory } from 'vue-router';
import CharacterList from '../components/CharacterList.vue';
import CharacterDetails from '../components/CharacterDetails.vue';

const routes = [
  { path: '/', name: 'CharacterList', component: CharacterList },
  { path: '/character/:id', name: 'CharacterDetails', component: CharacterDetails, props: route => ({ id: route.params.id }) },
  { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('../components/NotFound.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
