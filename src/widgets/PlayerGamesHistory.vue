<script setup lang="ts">
import {computed, ref} from 'vue';
import {RESULT_IDS, RESULT_NAMES} from '@/types/IResult.ts';
import {getRoleText} from '@/utils/utils';
import {ROLE_NAMES} from '@/types/IRole.ts';
import {usePlayerStore} from '@/api/playerStore.ts';
import {storeToRefs} from 'pinia';

const playerStore = usePlayerStore();
const {history} = storeToRefs(playerStore);

const pagesOptions = [
  {value: 15, title: '15'},
  {value: 25, title: '25'},
  {value: 50, title: '50'},
  {value: 100, title: '100'},
  {value: -1, title: 'Все'},
];

const roleFilter = ref<string[] | null>(null);
const resultFilter = ref<number | null>(null);


const items = computed(() => {
  return history.value
    .filter(({
       role,
       resultId,
    }) => {
      const isRole = roleFilter.value === null  || roleFilter?.value.includes(role);
      const isResult = resultFilter.value === null || resultFilter.value === resultId;

      return isRole && isResult;
    })
    .map(({
      role,
      resultId,
      date,
      seatNumber,
      points,
      bestMovePoints,
      bestPlayerPoints,
      isFirstShot,
    }, id) => {
      const totalPoints = points + bestMovePoints + bestPlayerPoints;
      const [day, month, year] = date.split('/');
      const timeStamp = new Date(2000 + Number(year), Number(month) - 1, Number(day), 0, 0, 0, id).getTime();

      return {
        role,
        resultId,
        totalPoints: `${totalPoints ? '+' : ''}${totalPoints}`,
        bestMovePoints: isFirstShot ? bestMovePoints : '-',
        bestPlayerPoints,
        _date: date,
        dateTimestamp: timeStamp,
        seatNumber,
      };
    });
});

const headers = computed(() => [
  {title: 'Роль', key: 'role', sortable: false},
  {title: 'Результат', key: 'resultId', sortable: false},
  {title: 'Σ Баллы', key: 'totalPoints', sortable: true},
  {title: 'ЛИ', key: 'bestPlayerPoints', sortable: true},
  {title: 'ЛХ', key: 'bestMovePoints', sortable: true},
  {title: 'Дата', key: 'dateTimestamp', sortable: true},
  {title: '№ за столом', key: 'seatNumber', sortable: false},
]);

const iconByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: 'mdi-pistol',
  [ROLE_NAMES.DON]: 'mdi-hat-fedora',
  [ROLE_NAMES.SHERIFF]: 'mdi-octagram',
  [ROLE_NAMES.CITIZEN]: 'mdi-account-group',
}));

const colorByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: 'grey-darken-4',
  [ROLE_NAMES.DON]: 'grey-darken-4',
  [ROLE_NAMES.SHERIFF]: 'red',
  [ROLE_NAMES.CITIZEN]: 'red',
}));

const availableRoles = computed(() => [
  {title: getRoleText(ROLE_NAMES.MAFIA), value: ROLE_NAMES.MAFIA},
  {title: getRoleText(ROLE_NAMES.DON), value: ROLE_NAMES.DON},
  {title: getRoleText(ROLE_NAMES.SHERIFF), value: ROLE_NAMES.SHERIFF},
  {title: getRoleText(ROLE_NAMES.CITIZEN), value: ROLE_NAMES.CITIZEN}
]);

const availableResults = computed(() => [
  {title: RESULT_NAMES[RESULT_IDS.WIN], value: RESULT_IDS.WIN},
  {title: RESULT_NAMES[RESULT_IDS.LOSE], value: RESULT_IDS.LOSE}
]);

const resetFilters = () => {
  roleFilter.value = null;
  resultFilter.value = null;
};
</script>

<template>
  <div>
    <div class="d-flex flex-wrap align-center ga-4 pb-4">
      <v-select
        v-model="roleFilter"
        :items="availableRoles"
        hide-details="auto"
        label="Фильтр по роли"
        density="comfortable"
        multiple
        chips
        clearable
      ></v-select>

      <v-select
        v-model="resultFilter"
        :items="availableResults"
        hide-details="auto"
        label="Фильтр по результату"
        density="comfortable"
        chips
        clearable
      ></v-select>

      <v-btn
        :disabled="!resultFilter && !roleFilter"
        color="primary"
        variant="outlined"
        @click="resetFilters"
      >
        Сбросить фильтры
      </v-btn>
    </div>

    <v-data-table
      fixed-header
      fixed-footer
      height="50vh"
      items-per-page-text="Количество записей"
      items-per-page="15"
      no-data-text="Нет игр"
      :items-per-page-options="pagesOptions"
      :items="items"
      :sort-by="[{key: 'dateTimestamp', order: 'desc'}]"
      :headers="headers"
      class="flex-0-0"
    >
      <template v-slot:[`item.dateTimestamp`]="{item}">
        <div>{{item._date}}</div>
      </template>

      <template v-slot:[`item.role`]="{item}">
        <v-chip class="rounded-lg">
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

      <template v-slot:[`item.resultId`]="{item}">
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
