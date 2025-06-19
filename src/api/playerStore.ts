import {defineStore} from 'pinia';
import {ref} from 'vue'
import stats from './mock/player_stats.json'
import type {Stat, StatByRole, StatBySeat} from '@/types/IPlayer.ts';
import {ROLE_NAMES} from '@/types/IRole.ts';
import type {Game} from '@/types/IGame.ts';

export const usePlayerStore = defineStore('player', () => {
  const name = ref('');
  const id = ref(0);
  const total = ref<Stat>({
    gamesCount: 0,
    winsCount: 0,
    points: 0,
    bestPlayerPoints: 0,
    bestMovePoints: 0,
    disqualificationPoints: 0,
    penaltyPoints: 0,
    firstShotCount: 0,
  });

  const byRole = ref<StatByRole>({
    [ROLE_NAMES.CITIZEN]: {
      gamesCount: 0,
      winsCount: 0,
      points: 0,
      bestPlayerPoints: 0,
      bestMovePoints: 0,
      disqualificationPoints: 0,
      penaltyPoints: 0,
      firstShotCount: 0,
    },
    [ROLE_NAMES.SHERIFF]: {
      gamesCount: 0,
      winsCount: 0,
      points: 0,
      bestPlayerPoints: 0,
      bestMovePoints: 0,
      disqualificationPoints: 0,
      penaltyPoints: 0,
      firstShotCount: 0,
    },
    [ROLE_NAMES.MAFIA]: {
      gamesCount: 0,
      winsCount: 0,
      points: 0,
      bestPlayerPoints: 0,
      bestMovePoints: 0,
      disqualificationPoints: 0,
      penaltyPoints: 0,
      firstShotCount: 0,
    },
    [ROLE_NAMES.DON]: {
      gamesCount: 0,
      winsCount: 0,
      points: 0,
      bestPlayerPoints: 0,
      bestMovePoints: 0,
      disqualificationPoints: 0,
      penaltyPoints: 0,
      firstShotCount: 0,
      sheriffsShot: [],
    },
  });

  const bySeatNumber = ref<StatBySeat>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0
  });

  const history = ref<Game[]>([]);

  const fetchCurrentPlayer = (playerId: number) => {
    //Здесь замоканные данные
    const data = stats.find((player) => player.id === playerId);

    if (!data) {
      throw new Error(`Не удалось найти пользователя с id ${playerId}`);
    }

    name.value = data.name;
    id.value = data.id;
    total.value = data.total;
    byRole.value = data.byRole;
    bySeatNumber.value = data.bySeatNumber;
    history.value = data.history;
  };

  return {
    name,
    id,
    total,
    byRole,
    bySeatNumber,
    history,
    fetchCurrentPlayer,
  }
});

