export interface GameConfig {
  length: number;
  base: number;
}

export interface Attempt {
  guess: string;
  bulls: number;
  cows: number;
}

export type GameStatus = "playing" | "won";

export interface GameState {
  config: GameConfig;
  secret: string;
  attempts: Attempt[];
  status: GameStatus;
}
