export type Game = {
  role: string; //TODO заменить на RoleName после реализации бэка
  resultId: number; //TODO заменить на ResultId после реализации бэка
  date: string;
  seatNumber: number;
  points: number;
  bestMovePoints: number;
  bestPlayerPoints: number;
  disqualificationPoints: number;
  penaltyPoints: number;
  isFirstShot: boolean;
};
