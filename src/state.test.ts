import { describe, it, expect } from "vitest";
import { createInitialState, addAttempt } from "./state";

describe("createInitialState", () => {
  it("создаёт пустой журнал с переданным секретом и конфигом", () => {
    const state = createInitialState({ length: 4, base: 10 }, "0123");

    expect(state.config).toEqual({ length: 4, base: 10 });
    expect(state.secret).toBe("0123");
    expect(state.attempts).toEqual([]);
    expect(state.status).toBe("playing");
  });

  it("в каждом вызове создаёт НОВЫЙ массив attempts (не шарит между состояниями)", () => {
    const a = createInitialState({ length: 4, base: 10 }, "0123");
    const b = createInitialState({ length: 4, base: 10 }, "0123");
    expect(a.attempts).not.toBe(b.attempts); // разные ссылки
  });
});

describe("addAttempt", () => {
  const config = { length: 4, base: 10 };
  const baseState = createInitialState(config, "0123");

  it("возвращает НОВОЕ состояние (не мутирует исходное)", () => {
    const next = addAttempt(baseState, "4567", { bulls: 0, cows: 0 });
    expect(next).not.toBe(baseState); // новая ссылка
    expect(baseState.attempts).toEqual([]); // исходное не тронуто
  });

  it("добавляет попытку в конец истории", () => {
    const next = addAttempt(baseState, "4567", { bulls: 0, cows: 0 });
    expect(next.attempts).toEqual([{ guess: "4567", bulls: 0, cows: 0 }]);
  });

  it("несколько addAttempt накапливают историю в правильном порядке", () => {
    const s1 = addAttempt(baseState, "4567", { bulls: 0, cows: 0 });
    const s2 = addAttempt(s1, "8901", { bulls: 0, cows: 0 });
    const s3 = addAttempt(s2, "0123", { bulls: 4, cows: 0 });

    expect(s3.attempts.map((a) => a.guess)).toEqual(["4567", "8901", "0123"]);
  });

  it("status = 'won', если bulls === length", () => {
    const next = addAttempt(baseState, "0123", { bulls: 4, cows: 0 });
    expect(next.status).toBe("won");
  });

  it("status остаётся 'playing', если bulls < length", () => {
    const next = addAttempt(baseState, "0124", { bulls: 3, cows: 1 });
    expect(next.status).toBe("playing");
  });

  it("секрет и конфиг не меняются между попытками", () => {
    const next = addAttempt(baseState, "4567", { bulls: 0, cows: 0 });
    expect(next.secret).toBe(baseState.secret);
    expect(next.config).toBe(baseState.config);
  });
});
