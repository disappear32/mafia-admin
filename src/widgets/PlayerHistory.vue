<script setup lang="ts">
import {computed} from 'vue';
import type {Game} from '@/types/IGame.ts';
import {RESULT_IDS, RESULT_NAMES} from '@/types/IResult.ts';
import {getRoleText} from '@/utils/utils';
import {ROLE_NAMES} from '@/types/IRole.ts';

const props = defineProps<{games: Game[]}>();

const items = computed(() => {
  return props.games.map(({
    role,
    resultId,
    date,
    seatNumber,
    points,
    bestMovePoints,
    bestPlayerPoints,
  }) => {
    const totalPoints = points + bestMovePoints + bestPlayerPoints;
    const [day, month, year] = date.split('/');
    const dateObj = new Date(2000 + Number(year), Number(month) - 1, Number(day));

    return {
      role,
      resultId,
      points: `${totalPoints ? '+' : ''}${totalPoints}`,
      date,
      _dateSort: dateObj.getTime(),
      seatNumber,
    };
  });
});

const headers = computed(() => [
  { title: 'Роль', key: 'role', align: 'left', sortable: false },
  { title: 'Результат', key: 'resultId', align: 'left', sortable: false },
  { title: 'Баллы', key: 'points', align: 'left' },
  { title: 'Дата', key: 'date', align: 'left', sortable: true, sortKey: '_dateSort' },
  { title: '№ за столом', key: 'seatNumber', align: 'left', sortable: false },
]);

const iconByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: 'mdi-pistol',
  [ROLE_NAMES.DON]: 'mdi-hat-fedora',
  [ROLE_NAMES.SHERIFF]: 'mdi-octagram',
  [ROLE_NAMES.CITIZEN]: 'mdi-account-tie',
}));

const colorByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: 'grey-darken-4',
  [ROLE_NAMES.DON]: 'grey-darken-4',
  [ROLE_NAMES.SHERIFF]: 'red',
  [ROLE_NAMES.CITIZEN]: 'red',
}));
</script>

<template>
  <div class="mt-10">
    <h2 class="mb-4">Последние игры:</h2>

    <v-data-table
      :items="items"
      :headers="headers"
      :sort-by="[{key: '_dateSort', order: 'desc'}]"
    >
        <template v-slot:item.role="{item}">
          <v-chip>
            <p class="text-left">
              {{getRoleText(item.role)}}
            </p>

            <v-icon
              :icon="iconByRole[item.role]"
              :color="colorByRole[item.role]"
              class="pl-5 pr-2"
            ></v-icon>
          </v-chip>
        </template>

      <template v-slot:item.resultId="{item}">
        <div class="text-left">
          <v-chip
            :color="item.resultId === RESULT_IDS.WIN ? 'green' : 'red'"
            :text="RESULT_NAMES[item.resultId]"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<style scoped>

</style>
