<template>
  <v-app>
    <v-main>
      <v-navigation-drawer
        permanent
      >
        <v-list nav>
          <v-list-item
            to="/users"
            prepend-icon="mdi-account-file-outline"
            title="Игроки"
            value="players"
            :active="isActive('/users')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-history"
            title="Игры"
            value="games"
            :active="isActive('/games')"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-tournament"
            title="Турниры"
            value="tournaments"
            :active="isActive('/tournaments')"
          ></v-list-item>
        </v-list>

        <template #append>
          <div class="pa-2">
            <v-btn
              block
              variant="text"
              prepend-icon="mdi-theme-light-dark"
              @click="toggleTheme"
            >
              Сменить тему
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {useRoute} from 'vue-router';
import {useTheme} from 'vuetify/framework';

const route = useRoute();
const theme = useTheme();

const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
};
</script>
