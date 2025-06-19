import {ref} from 'vue'
import {defineStore} from 'pinia';
import stats from './mock/player_stats.json'
import type {LightPlayer} from '@/types/IPlayer.ts';

export const useAllPlayerStore = defineStore('allPlayers', () => {
  const lightPlayers = ref<LightPlayer[]>([]);

  const fetchAllPlayers = () => {
    lightPlayers.value = stats.map(({id, name}) => ({
      id,
      name,
    }));
  };

  return {
    lightPlayers,
    fetchAllPlayers,
  };
});

