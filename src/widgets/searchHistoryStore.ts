import {ref, watch} from 'vue'
import {defineStore} from 'pinia';

const MAX_HISTORY_ITEMS = 10;

export const useSearchHistoryStore = defineStore('searchStore', () => {
  const historyFromStorage = JSON.parse(localStorage.getItem('searchHistory') ?? '[]');
  const historyItems = ref<string[]>(
    historyFromStorage ?? [],
  );

  watch(
    historyItems,
    (newValue) => {
      localStorage.setItem('searchHistory', JSON.stringify(newValue))
    },
    { deep: true },
  );

  const setHistoryItem = (value: string) => {
    if (!value?.trim()) {
      return;
    }

    historyItems.value = [
      value,
      ...historyItems.value.filter(item => item !== value)
    ].slice(0, MAX_HISTORY_ITEMS);
  };

  const clearHistory = () => {
    historyItems.value = [];
  };

  const removeHistoryItem = (index: number) => {
    historyItems.value.splice(index, 1);
  };

  return {
    historyItems,
    setHistoryItem,
    clearHistory,
    removeHistoryItem,
  };
});

