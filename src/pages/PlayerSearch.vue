<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {storeToRefs} from 'pinia';
import {useAllPlayerStore} from '@/api/allPlayersStore.ts';
import {usePlayerStore} from '@/api/playerStore.ts';
import {useSearchHistoryStore} from '@/widgets/searchHistoryStore.ts';
import PlayerInfoStats from '@/widgets/PlayerInfoStats.vue';
import PlayerInfoByRole from '@/widgets/PlayerInfoByRole.vue';
import PlayerGamesHistory from '@/widgets/PlayerGamesHistory.vue';
import SearchHistory from '@/widgets/SearchHistory.vue';


const router = useRouter();
const route = useRoute();
const allPlayersStore = useAllPlayerStore();
const {fetchCurrentPlayer} = usePlayerStore();
const {setHistoryItem} = useSearchHistoryStore();
const {fetchAllPlayers} = allPlayersStore;
const {lightPlayers} = storeToRefs(allPlayersStore);


const searchQuery = ref('');
const currentPlayerId = ref<number | null>(null);
const isSearchError = ref(false);


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
    const id = Number(newId);
    fetchCurrentPlayer(id);
    currentPlayerId.value = id;
  } else {
    currentPlayerId.value = null;
    searchQuery.value = '';
  }
});


const isNameValidatesInput = (name: string) => {
  return name.toLowerCase().includes(searchQuery.value.toLowerCase())
};


const getDataFromRouteQuery = () => {
  const id = Number(route.query.id);

  if (!id) {
    return;
  }

  fetchCurrentPlayer(id);
  const player = lightPlayers.value.find((player) => player.id === Number(id));

  if (!player) {
    return;
  }

  searchQuery.value = player.name;
  currentPlayerId.value = player.id;
};

const onSearchUpdate = (value: string) => {
  searchQuery.value = value;
};

const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    performSearch(searchQuery.value);
  }
};

const onClearClick = () => {
  currentPlayerId.value = null;
};

const performSearch = (name: string) => {
  const player = lightPlayers.value.find((player) => player.name === name);

  if (!player) {
    isSearchError.value = true;

    return;
  }

  isSearchError.value = false;
  currentPlayerId.value = player.id;
  searchQuery.value = name;
  setHistoryItem(name);

  router.push({
    path: '/users',
    query: {id: currentPlayerId.value},
  });
};

fetchAllPlayers();
getDataFromRouteQuery();
</script>

<template>
  <v-container max-width="1366">
    <v-combobox
      :model-value="searchQuery"
      :items="filteredNames"
      :hide-no-data="isInputEmpty || isNamesEmpty"
      @keydown="onKeyDown"
      @update:search="onSearchUpdate"
      @click:clear="onClearClick"
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

    <div
      v-if="currentPlayerId && !isSearchError"
      class="pt-4 d-flex flex-column fill-height"
    >
      <h2 class="pb-4">Статистика:</h2>

      <PlayerInfoStats />

      <h2 class="pb-4">По ролям:</h2>
      <PlayerInfoByRole />

      <h2 class="pt-4 pb-4">Последние игры:</h2>
      <PlayerGamesHistory />
    </div>

    <div
      v-if="isSearchError && searchQuery"
      class="pa-4"
    >
      <h2>Данный пользователь не найден</h2>
    </div>

    <div v-if="!searchQuery">
      <SearchHistory @search="performSearch" />
    </div>
  </v-container>
</template>

<style scoped>
</style>
