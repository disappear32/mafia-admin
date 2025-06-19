export const RESULT_NAMES: Record<number, string> = {
  0: 'Поражение',
  1: 'Победа',
};

export const RESULT_IDS = {
  LOSE: 0,
  WIN: 1,
} as const;

export type ResultId = typeof RESULT_IDS[keyof typeof RESULT_IDS];
