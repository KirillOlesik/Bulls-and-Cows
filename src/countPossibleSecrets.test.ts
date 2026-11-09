import { describe, it, expect } from "vitest";
import { countPossibleSecrets } from "./countPossibleSecrets";

describe("countPossibleSecrets", () => {
  it("length = 0 → ровно 1 способ (ничего не выбрать)", () => {
    expect(countPossibleSecrets(0, 10)).toBe(1);
  });

  it("length = 1, base = 10 → 10 вариантов", () => {
    expect(countPossibleSecrets(1, 10)).toBe(10);
  });

  it("length = 2, base = 10 → 10 * 9 = 90", () => {
    expect(countPossibleSecrets(2, 10)).toBe(90);
  });

  it("length = 3, base = 10 → 10 * 9 * 8 = 720", () => {
    expect(countPossibleSecrets(3, 10)).toBe(720);
  });

  it("length = base = 4 → 4! = 24 (перестановка всей базы)", () => {
    expect(countPossibleSecrets(4, 4)).toBe(24);
  });

  it("length = base = 6 → 6! = 720", () => {
    expect(countPossibleSecrets(6, 6)).toBe(720);
  });

  it("length > base → 0 (невозможно выбрать больше уникальных)", () => {
    expect(countPossibleSecrets(5, 4)).toBe(0);
    expect(countPossibleSecrets(20, 10)).toBe(0);
  });

  it("hex: length = 4, base = 16 → 16 * 15 * 14 * 13 = 43680", () => {
    expect(countPossibleSecrets(4, 16)).toBe(43680);
  });

  it("hex: length = base = 16 → 16! (проверяем как число)", () => {
    expect(countPossibleSecrets(16, 16)).toBe(20922789888000);
  });
});
