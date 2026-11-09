import { describe, it, expect } from "vitest";
import { isValidGuess } from "./isValidGuess";
describe("isValidGuess", () => {
  it("принимает 4 уникальные цифры в base 10", () => {
    expect(isValidGuess("0123", 4, 10)).toBe(true);
  });

  it("отклоняет неверную длину", () => {
    expect(isValidGuess("", 4, 10)).toBe(false);
    expect(isValidGuess("123", 4, 10)).toBe(false);
    expect(isValidGuess("20123", 4, 10)).toBe(false);
  });

  it("отклоняет повторяющиеся цифры", () => {
    expect(isValidGuess("1123", 4, 10)).toBe(false);
  });

  it("отклоняет символы вне базы", () => {
    expect(isValidGuess("12a4", 4, 10)).toBe(false);
  });

  it("base 8: 8 и 9 недопустимы", () => {
    expect(isValidGuess("0123", 4, 8)).toBe(true);
    expect(isValidGuess("8192", 4, 8)).toBe(false);
  });

  it("base 2: только 0 и 1", () => {
    expect(isValidGuess("01", 2, 2)).toBe(true);
    expect(isValidGuess("11", 2, 2)).toBe(false);
  });

  it("hex: регистр не важен", () => {
    expect(isValidGuess("aBcD", 4, 16)).toBe(true);
    expect(isValidGuess("ABCD", 4, 16)).toBe(true);
  });

  it("hex: aAbB — не уникальные (регистр не спасает)", () => {
    expect(isValidGuess("aAbB", 4, 16)).toBe(false);
  });

  it("hex: G недопустим", () => {
    expect(isValidGuess("abGd", 4, 16)).toBe(false);
  });
});
