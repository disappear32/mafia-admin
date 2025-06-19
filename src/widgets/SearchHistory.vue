<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {useSearchHistoryStore} from '@/widgets/searchHistoryStore.ts';

const searchStore = useSearchHistoryStore();
const {clearHistory, removeHistoryItem} = searchStore;
const {historyItems} = storeToRefs(searchStore);
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <v-btn
        v-if="historyItems.length"
        color="error"
        variant="text"
        size="small"
        @click="clearHistory"
      >
        Очистить историю
      </v-btn>
    </div>

    <v-list v-if="historyItems.length" class="bg-transparent">
      <v-list-item
        v-for="(item, index) in historyItems"
        :key="index"
        :value="item"
        @click="$emit('search', item)"
      >
        <template #prepend>
          <v-icon icon="mdi-magnify" class="mr-2"></v-icon>
        </template>

        <v-list-item-title>{{ item }}</v-list-item-title>

        <template #append>
          <v-btn
            icon
            variant="text"
            size="small"
            @click.stop="removeHistoryItem(index)"
          >
            <v-icon icon="mdi-close"></v-icon>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-alert
      v-else
      type="info"
      variant="tonal"
    >
      История поиска пуста
    </v-alert>
  </div>
</template>

<style scoped>

</style>
