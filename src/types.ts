export type Scores = {
  [player: string]: number[];
};

export type RoundScores = { [player: string]: number | undefined };

export interface Game {
  id: number;
  date: Date;
  players: string[];
  scores: Scores;
  winner: string;
}
