import { createApp } from 'vue';
import App from './App.vue';
import { ApolloClients } from '@vue/apollo-composable';
import apolloClient from './apolloClient';
import router from './router';
import { Quasar } from 'quasar';
import quasarUserOptions from './quasar-user-options';
import './styles/quasar.sass';
import './styles/themes.css';

const app = createApp(App);

app.provide(ApolloClients, { default: apolloClient });
app.use(router);
app.use(Quasar, quasarUserOptions);
app.mount('#app');
