import type { GameState } from "../types";
import { isValidGuess } from "../isValidGuess";
import { createDigitValidator } from "../createDigitValidator";

export function createGameScreen(
  initialState: GameState,
  startTime: number,
  onGuess: (guess: string) => void,
  onRestart: () => void,
) {
  const container = document.createElement("div");
  let currentState = initialState;
  const isDigit = createDigitValidator(initialState.config.base);

  const title = document.createElement("h2");
  title.textContent = "Угадайте секрет";

  const info = document.createElement("p");
  info.textContent = `Длина: ${initialState.config.length} | База: ${initialState.config.base}`;

  const timerDisplay = document.createElement("div");
  timerDisplay.style.fontWeight = "bold";
  timerDisplay.style.color = "#0055aa";
  timerDisplay.style.marginBottom = "15px";
  timerDisplay.textContent = "Время: 0 сек.";

  const timerId = setInterval(() => {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Время: ${seconds} сек.`;
  }, 1000);
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = initialState.config.length;
  input.placeholder = `Введите ${initialState.config.length} символов...`;

  input.addEventListener("input", () => {
    const currentValue = input.value;
    const filteredValue = [...currentValue]
      .filter((char) => isDigit(char))
      .map((char) => char.toLowerCase())
      .join("")
      .slice(0, initialState.config.length);

    if (input.value !== filteredValue) {
      input.value = filteredValue;
    }
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Проверить";

  const errorMsg = document.createElement("div");
  errorMsg.style.color = "red";
  errorMsg.style.minHeight = "1.2em";

  form.append(input, submitBtn, errorMsg);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const guess = input.value;

    if (
      !isValidGuess(guess, initialState.config.length, initialState.config.base)
    ) {
      errorMsg.textContent = "Неверный ввод! Проверьте длину и уникальность.";
      return;
    }
    if (currentState.attempts.some((a) => a.guess === guess)) {
      errorMsg.textContent = "Вы уже вводили эту попытку!";
      return;
    }

    errorMsg.textContent = "";
    input.value = "";
    onGuess(guess);
  });

  const historyTitle = document.createElement("h3");
  historyTitle.textContent = "История ходов";

  const historyList = document.createElement("ul");
  historyList.style.listStyle = "none";
  historyList.style.padding = "0";

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Сдаться (в настройки)";
  restartBtn.style.marginTop = "20px";

  restartBtn.addEventListener("click", () => {
    clearInterval(timerId);
    onRestart();
  });

  container.append(
    title,
    info,
    timerDisplay,
    form,
    historyTitle,
    historyList,
    restartBtn,
  );

  const update = (state: GameState, finalTimeSeconds?: number) => {
    currentState = state;
    historyList.replaceChildren();

    state.attempts.forEach((attempt) => {
      const li = document.createElement("li");
      li.style.marginBottom = "5px";
      li.style.fontFamily = "monospace";

      const guessSpan = document.createElement("strong");
      guessSpan.textContent = `${attempt.guess} → `;

      const bullsSpan = document.createElement("span");
      bullsSpan.textContent = `Быки: ${attempt.bulls} `;
      bullsSpan.style.color = "green";

      const cowsSpan = document.createElement("span");
      cowsSpan.textContent = `Коровы: ${attempt.cows}`;
      cowsSpan.style.color = "orange";

      li.append(guessSpan, bullsSpan, cowsSpan);
      historyList.append(li);
    });

    if (state.status === "won") {
      clearInterval(timerId);

      if (finalTimeSeconds !== undefined) {
        timerDisplay.textContent = `Время: ${finalTimeSeconds} сек.`;
        timerDisplay.style.color = "green";
      }

      info.textContent = `ПОБЕДА! Вы угадали за ${state.attempts.length} ходов.`;
      info.style.color = "green";
      input.disabled = true;
      submitBtn.disabled = true;
      title.textContent = "Игра окончена";
    }
  };

  update(initialState);
  return { element: container, update };
}
