import { createSettingsScreen } from "./ui/settingsScreen";
import { createGameScreen } from "./ui/gameScreen";
import { generateSecret } from "./generateSecret";
import { evaluateGuess } from "./evaluateGuess";
import { createInitialState, addAttempt } from "./state";
import type { GameState } from "./types";

const app = document.getElementById("app")!;

function renderSettings() {
  app.replaceChildren();

  const screen = createSettingsScreen((config) => {
    startGame(config.length, config.base);
  });
  app.append(screen);
}

function startGame(length: number, base: number) {
  app.replaceChildren();

  const secret = generateSecret(length, base);
  let currentState: GameState = createInitialState({ length, base }, secret);

  const screen = createGameScreen(
    currentState,
    (guess) => {
      const feedback = evaluateGuess(currentState.secret, guess);

      currentState = addAttempt(currentState, guess, feedback);

      screen.update(currentState);
    },
    () => {
      renderSettings();
    },
  );

  app.append(screen.element);
}
renderSettings();
