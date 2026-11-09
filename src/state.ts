import type { GameConfig, GameState } from "./types";

export function createInitialState(
  config: GameConfig,
  secret: string,
): GameState {
  return {
    config,
    secret,
    attempts: [],
    status: "playing",
  };
}

export function addAttempt(
  state: GameState,
  guess: string,
  result: { bulls: number; cows: number },
): GameState {
  const newEntry = {
    guess,
    bulls: result.bulls,
    cows: result.cows,
  };

  return {
    ...state,
    attempts: [...state.attempts, newEntry],
    status: result.bulls === state.config.length ? "won" : state.status,
  };
}
