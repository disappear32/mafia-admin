import type {RoleName} from '@/types/IRole.ts';
import type {ResultId} from '@/types/IResult.ts';

export type Game = {
  role: RoleName;
  resultId: ResultId;
  date: string;
  seatNumber: number;
  points: number;
  bestMovePoints: number;
  bestPlayerPoints: number;
  disqualificationPoints: number;
  penaltyPoints: number;
  isFirstShot: boolean;
};
