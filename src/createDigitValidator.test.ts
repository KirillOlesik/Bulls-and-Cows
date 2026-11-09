import { describe, it, expect } from "vitest";
import { createDigitValidator } from "./createDigitValidator";
describe("createDigitValidator", () => {
  it("should return a function", () => {
    const isDigit = createDigitValidator(10);
    expect(typeof isDigit).toBe("function");
  });

  it("десятичная (base 10): цифры 0-9 допустимы", () => {
    const isDecimal = createDigitValidator(10);
    expect(isDecimal("0")).toBe(true);
    expect(isDecimal("9")).toBe(true);
    expect(isDecimal("a")).toBe(false);
  });
  it("двоичная (base 2): цифры 0-1 допустимы", () => {
    const isBinary = createDigitValidator(2);
    expect(isBinary("0")).toBe(true);
    expect(isBinary("1")).toBe(true);
    expect(isBinary("2")).toBe(false);
  });
  it("восьмеричная (base 8): цифры 0-7 допустимы", () => {
    const isOctal = createDigitValidator(8);
    expect(isOctal("0")).toBe(true);
    expect(isOctal("7")).toBe(true);
    expect(isOctal("8")).toBe(false);
  });
  it("шестнадцатиричная (base 16): цифры и a-f допустимы", () => {
    const isHex = createDigitValidator(16);
    expect(isHex("0")).toBe(true);
    expect(isHex("9")).toBe(true);
    expect(isHex("a")).toBe(true);
    expect(isHex("f")).toBe(true);
    expect(isHex("A")).toBe(true);
    expect(isHex("F")).toBe(true);
    expect(isHex("g")).toBe(false);
  });
  it("отклоняет не-одиночные символы и мусор", () => {
    const isDecimal = createDigitValidator(10);
    expect(isDecimal("")).toBe(false);
    expect(isDecimal("12")).toBe(false);
    expect(isDecimal(" ")).toBe(false);
    expect(isDecimal("-")).toBe(false);
    expect(isDecimal("!")).toBe(false);
  });
});
