<script setup lang="ts">
import {usePlayerStore} from '@/api/playerStore.ts';
import {formatValue, getRoleText} from '@/utils/utils.ts';
import {computed} from 'vue';
import {ROLE_NAMES} from '@/types/IRole.ts';

const playerStore = usePlayerStore();
const {
  total,
  history,
} = playerStore;
//bySeatNumber sheriffsShot firstShotCount винстрик лузстрик

const statsItems = computed(() => ([
  {
    title: 'Общий винрейт',
    descs: [
      {title: 'Всего игр', value: total.gamesCount,},
      {title: 'Винрейт', value: `${formatValue(total.winsCount / total.gamesCount)}%`,}
    ],
  },
  {
    title: 'Допбаллы',
    descs: [
      {title: 'Баллы ЛИ', value: total.bestPlayerPoints,},
      {title: 'Баллы ЛХ ', value: total.bestMovePoints,}
    ]
  },
  {
    title: 'Косяки',
    descs: [
      {title: 'Баллы дисквалификации', value: total.disqualificationPoints,},
      {title: 'Штрафные баллы', value: total.penaltyPoints,},
    ],
  },
  {
    title: 'Первый убиенный',
    descs: [
      {title: 'Количество ПУ', value: total.firstShotCount,},
      {title: 'Процент ПУ', value: `${formatValue(total.firstShotCount / total.gamesCount)}%`,},
    ],
  },
]));
</script>

<template>
  <v-row class="justify-space-between ga-6 pb-6">
    <v-card
      v-for="item in statsItems"
      :title="item.title"
      variant="tonal"
      class="rounded-lg p-0 flex-column flex-grow-1 flex-basis-0"
    >
      <v-card-text class="d-flex flex-column">
        <div v-for="desc in item.descs" class="d-flex flex-row">
          <p>{{desc.title}}: {{desc.value}}</p>
        </div>
      </v-card-text>
    </v-card>
  </v-row>
</template>

<style scoped>

</style>
