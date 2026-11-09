import type { GameConfig, GameState } from "./types";
export function createInitialState(
  config: GameConfig,
  secret: string,
): GameState {
  void config;
  void secret;
  return {} as GameState;
}

export function addAttempt(
  state: GameState,
  guess: string,
  feedback: { bulls: number; cows: number },
): GameState {
  void state;
  void guess;
  void feedback;
  return {} as GameState;
}
