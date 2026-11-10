import { describe, it, expect } from "vitest";
import { evaluateGuess } from "./evaluateGuess";
describe("evaluateGuess", () => {
  it("все цифры на своих местах → 4 быка, 0 коров", () => {
    expect(evaluateGuess("1234", "1234")).toEqual({ bulls: 4, cows: 0 });
  });

  it("цифры есть, но не на своих местах → коровы", () => {
    expect(evaluateGuess("1234", "4321")).toEqual({ bulls: 0, cows: 4 });
  });

  it("смешанный случай: быки + коровы", () => {
    expect(evaluateGuess("1234", "1243")).toEqual({ bulls: 2, cows: 2 });
  });
  it("ни одного совпадения → 0 быков, 0 коров", () => {
    expect(evaluateGuess("1234", "5678")).toEqual({ bulls: 0, cows: 0 });
  });

  it("hex: регистр не важен", () => {
    expect(evaluateGuess("abcd", "ABCD")).toEqual({ bulls: 4, cows: 0 });
  });
});
