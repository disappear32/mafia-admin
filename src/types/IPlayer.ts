import type {RoleName} from '@/types/IRole.ts';
import type {Game} from '@/types/IGame.ts';

export type Stat = {
  gamesCount: number;
  winsCount: number;
  points: number;
  bestPlayerPoints: number;
  bestMovePoints: number;
  disqualificationPoints: number;
  penaltyPoints: number;
  firstShotCount: number;
  sheriffsShot?: string[];
};

export type StatByRole = Record<RoleName, Stat>;

export type StatBySeat = Record<string, number>;

export type Player = {
  name: string;
  id: number;
  total: Stat;
  byRole: StatByRole;
  bySeatNumber: StatBySeat;
  history: Game[];
};

export type LightPlayer = {
  name: string;
  id: number;
};
