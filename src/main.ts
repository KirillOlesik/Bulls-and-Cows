import { createSettingsScreen } from "./ui/settingsScreen";
import { createGameScreen } from "./ui/gameScreen";
import { createLeaderboardScreen } from "./ui/leaderboardScreen";
import { generateSecret } from "./generateSecret";
import { evaluateGuess } from "./evaluateGuess";
import { createInitialState, addAttempt } from "./state";
import { loadRecords, addRecord, saveRecords } from "./records";
import type { GameState } from "./types";

const app = document.getElementById("app")!;

function renderSettings() {
  app.replaceChildren();
  const screen = createSettingsScreen(
    (config) => startGame(config.length, config.base),
    () => renderLeaderboard(),
  );
  app.append(screen);
}

function renderLeaderboard() {
  app.replaceChildren();
  const records = loadRecords();
  const screen = createLeaderboardScreen(records, () => renderSettings());
  app.append(screen);
}

function startGame(length: number, base: number) {
  app.replaceChildren();

  const secret = generateSecret(length, base);
  let currentState: GameState = createInitialState({ length, base }, secret);

  const startTime = Date.now();

  const screen = createGameScreen(
    currentState,
    startTime,
    (guess) => {
      if (currentState.attempts.some((a) => a.guess === guess)) {
        return;
      }

      const feedback = evaluateGuess(currentState.secret, guess);
      currentState = addAttempt(currentState, guess, feedback);

      if (currentState.status === "won") {
        const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);

        const newRecord = {
          length,
          base,
          attempts: currentState.attempts.length,
          time: timeInSeconds,
          date: new Date().toISOString(),
        };

        const records = loadRecords();
        saveRecords(addRecord(records, newRecord));

        screen.update(currentState, timeInSeconds);
      } else {
        screen.update(currentState);
      }
    },
    () => renderSettings(),
  );

  app.append(screen.element);
}

renderSettings();
