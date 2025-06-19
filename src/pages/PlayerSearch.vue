<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useAllPlayerStore} from '@/api/allPlayersStore.ts';
import PlayerInfo from '@/widgets/PlayerInfo.vue';

const router = useRouter();
const route = useRoute();

const allPlayersStore = useAllPlayerStore();
const {fetchData} = allPlayersStore;
const {lightPlayers} = storeToRefs(allPlayersStore);
fetchData();


const searchQuery = ref('');
const playerId = ref(0);
const isSearchError = ref(false);

const isNameValidatesInput = (name: string) => {
  return name.toLowerCase().includes(searchQuery.value.toLowerCase())
};

const isInputEmpty = computed(() => {
  return !searchQuery.value.length;
});

const filteredNames = computed(() => {
  if (isInputEmpty.value) {
    return [];
  }

  return lightPlayers.value
    .filter(({name}) => isNameValidatesInput(name))
    .map(({name}) => name);
});

const isNamesEmpty = computed(() => {
  return !filteredNames.value.length;
});


watch(() => route.query.id, (newId) => {
  if (newId) {
    playerId.value = Number(newId);
  }
});


onMounted(() => {
  const idFromQuery = route.query.id;

  if (!idFromQuery) {
    return;
  }

  const id = Array.isArray(idFromQuery)
    ? idFromQuery[0] || 0
    : idFromQuery;

  const player = lightPlayers.value.find((player) => player.id === Number(id));

  if (!player) {
    return;
  }

  searchQuery.value = player.name;
  playerId.value = player.id;
});


const onSearchUpdate = (value: string) => {
  searchQuery.value = value;
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    performSearch(searchQuery.value);
  }
};

const performSearch = (name: string) => {
  const player = lightPlayers.value.find((player) => player.name === name);

  if (!player) {
    isSearchError.value = true;

    return;
  }

  isSearchError.value = false;
  playerId.value = player.id;

  router.push({
    path: '/users',
    query: {id: playerId.value},
  });
};
</script>

<template>
  <v-container max-width="1366">
    <v-combobox
      :model-value="searchQuery"
      :items="filteredNames"
      :hide-no-data="isInputEmpty || isNamesEmpty"
      @keydown="onKeyDown"
      @update:search="onSearchUpdate"
      class="pt-4"
      label="Введите никнейм игрока"
      no-data-text="Не удалось найти игрока по никнейму"
      variant="outlined"
      density="compact"
      clearable
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    >
      <template #item="{props, item}">
        <v-list-item
          v-bind="props"
          @click="performSearch(item.raw)"
        ></v-list-item>
      </template>

      <template #append>
        <v-btn
          color="primary"
          variant="outlined"
          class="ml-1 mr-1"
          :disabled="isInputEmpty"
          @click="performSearch(searchQuery)"
        >
          <v-icon start icon="mdi-magnify"></v-icon>
          Поиск
        </v-btn>
      </template>
    </v-combobox>

    <PlayerInfo
      v-if="playerId && !isSearchError"
      :id="playerId"
    />

    <div
      v-if="isSearchError"
      class="ma-4 mt-0"
    >
      <h2>Данный пользователь не найден</h2>
    </div>
  </v-container>
</template>

<style scoped>
</style>
