export const ROLE_NAMES = {
  MAFIA: 'mafia',
  DON: 'don',
  SHERIFF: 'sheriff',
  CITIZEN: 'citizen',
} as const;

export type RoleName = typeof ROLE_NAMES[keyof typeof ROLE_NAMES];
