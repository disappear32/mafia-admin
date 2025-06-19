import {ROLE_NAMES, type RoleName} from '@/types/IRole.ts';

export const getRoleText = (role: RoleName) => {
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

export const formatValue = (value: number) => {
  if (!value) {
    return 0;
  }

  return Number(value.toFixed(2));
};
