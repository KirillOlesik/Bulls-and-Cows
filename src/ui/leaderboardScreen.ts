import type { GameRecord } from "../records";

export function createLeaderboardScreen(
  records: GameRecord[],
  onBack: () => void,
): HTMLElement {
  const container = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = "🏆 Таблица рекордов";

  const list = document.createElement("ol");

  if (records.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "Пока нет рекордов. Сыграйте первую игру!";
    container.append(title, empty);
  } else {
    records.forEach((r) => {
      const li = document.createElement("li");
      li.style.marginBottom = "10px";

      const stats = document.createElement("strong");
      stats.textContent = `[Длина: ${r.length}, База: ${r.base}] `;

      const result = document.createElement("span");
      result.textContent = `Попыток: ${r.attempts}, Время: ${r.time} сек.`;

      li.append(stats, result);
      list.append(li);
    });
    container.append(title, list);
  }

  const backBtn = document.createElement("button");
  backBtn.textContent = "Назад в настройки";
  backBtn.style.marginTop = "20px";
  backBtn.addEventListener("click", onBack);

  container.append(backBtn);
  return container;
}
