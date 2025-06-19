import vuetify from './vuetify';
import pinia from './pinia';
import router from '@/router';

import type { App } from 'vue'

export const registerPlugins = (app: App) => {
  app
    .use(vuetify)
    .use(router)
    .use(pinia);
};
