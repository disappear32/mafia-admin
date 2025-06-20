<script setup lang="ts">
import {computed} from 'vue';
import {storeToRefs} from 'pinia';
import {usePlayerStore} from '@/api/playerStore.ts';
import {ROLE_NAMES} from '@/types/IRole.ts';
import {formatValue, getRoleText} from '@/utils/utils.ts';

const playerStore = usePlayerStore();
const {byRole} = storeToRefs(playerStore);

const gamesCountByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: byRole.value[ROLE_NAMES.MAFIA].gamesCount,
  [ROLE_NAMES.DON]: byRole.value[ROLE_NAMES.DON].gamesCount,
  [ROLE_NAMES.SHERIFF]: byRole.value[ROLE_NAMES.SHERIFF].gamesCount,
  [ROLE_NAMES.CITIZEN]: byRole.value[ROLE_NAMES.CITIZEN].gamesCount,
}));

const winsCountByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: byRole.value[ROLE_NAMES.MAFIA].winsCount,
  [ROLE_NAMES.DON]: byRole.value[ROLE_NAMES.DON].winsCount,
  [ROLE_NAMES.SHERIFF]: byRole.value[ROLE_NAMES.SHERIFF].winsCount,
  [ROLE_NAMES.CITIZEN]: byRole.value[ROLE_NAMES.CITIZEN].winsCount,
}));

const winRatesByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: formatValue(
    byRole.value[ROLE_NAMES.MAFIA].winsCount / byRole.value[ROLE_NAMES.MAFIA].gamesCount * 100,
  ),
  [ROLE_NAMES.DON]: formatValue(
    byRole.value[ROLE_NAMES.DON].winsCount / byRole.value[ROLE_NAMES.DON].gamesCount * 100,
  ),
  [ROLE_NAMES.SHERIFF]: formatValue(
    byRole.value[ROLE_NAMES.SHERIFF].winsCount / byRole.value[ROLE_NAMES.SHERIFF].gamesCount * 100,
  ),
  [ROLE_NAMES.CITIZEN]: formatValue(
    byRole.value[ROLE_NAMES.CITIZEN].winsCount / byRole.value[ROLE_NAMES.CITIZEN].gamesCount * 100,
  ),
}));

const bestPlayerPointsByRole = computed(() => ({
  [ROLE_NAMES.MAFIA]: byRole.value[ROLE_NAMES.MAFIA].bestPlayerPoints,
  [ROLE_NAMES.DON]: byRole.value[ROLE_NAMES.DON].bestPlayerPoints,
  [ROLE_NAMES.SHERIFF]: byRole.value[ROLE_NAMES.SHERIFF].bestPlayerPoints,
  [ROLE_NAMES.CITIZEN]: byRole.value[ROLE_NAMES.CITIZEN].bestPlayerPoints,
}));
</script>

<template>
  <div class="flex-0-0">
    <v-row align="start" class="full-height">
      <v-col
        v-for="role in ROLE_NAMES"
        :key="role"
        cols="3"
      >
        <v-card
          :title="getRoleText(role)"
          variant="tonal"
          class="rounded-lg p-0"
        >
          <v-card-text
            class="grid grid-cols-2"
          >
            <v-row>
              <v-col>
                <p class="text-xl text-grey-lighten-1">Всего игр:</p>
                <p class="text-xl">{{gamesCountByRole[role]}}</p>
              </v-col>
              <v-col>
                <p class="text-xl text-grey-lighten-1">Побед:</p>
                <p class="text-xl">{{winsCountByRole[role]}}</p>
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <p class="text-xl text-grey-lighten-1">Винрейт:</p>
                <p class="text-xl">{{winRatesByRole[role]}}%</p>
              </v-col>
              <v-col>
                <p class="text-xl text-grey-lighten-1">Допы:</p>
                <p class="text-xl">{{bestPlayerPointsByRole[role]}}</p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
