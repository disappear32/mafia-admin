import {ROLE_NAMES} from '@/types/IRole.ts';
import {RESULT_NAMES} from '@/types/IResult.ts';

export const getRoleText = (role: string) => { //TODO заменить string на RoleName после реализации бэка
  switch (role) {
    case ROLE_NAMES.DON:
      return 'Дон';
    case ROLE_NAMES.SHERIFF:
      return 'Шериф';
    case ROLE_NAMES.MAFIA:
      return 'Мафия';
    default:
      return 'Мирный';
  }
};

export const getResultTextById = (id: number) => { //TODO заменить number на ResultId после реализации бэка
  return RESULT_NAMES[id];
};

export const formatValue = (value: number) => {
  return Number(value.toFixed(2));
};
