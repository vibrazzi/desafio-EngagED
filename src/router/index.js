import { createRouter, createWebHistory } from 'vue-router';
import CharacterList from '../components/CharacterList.vue';
import CharacterDetails from '../components/CharacterDetails.vue';

const routes = [
  {
    path: '/',
    name: 'CharacterList',
    component: CharacterList
  },
  {
    path: '/character/:id',
    name: 'CharacterDetails',
    component: CharacterDetails,
    props: (route) => ({ id: route.params.id }) // Passa o ID como prop
  },
  {
    path: '/:catchAll(.*)', // Rota para páginas não encontradas
    name: 'NotFound',
    component: () => import('../components/NotFound.vue') // Carregamento dinâmico
  }
];

const router = createRouter({
history: createWebHistory(),
  routes
});

export default router;
