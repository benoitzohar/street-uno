export type Scores = {
  [player: string]: number[];
};
export type Totals = {
  [player: string]: number;
};

export type RoundScores = { [player: string]: number | undefined };

export interface Game {
  id: string;
  date: string;
  players: string[];
  scores: Scores;
  totals: Totals;
  rounds: number;
  winner: string;
}

export interface GameDoc {
  id: string;
  date: any;
  players: string[];
  scores: Scores;
}
