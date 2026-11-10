const ALL_DIGITS = "0123456789abcdef";

export function createDigitValidator(base: number) {
  const validDigits = ALL_DIGITS.slice(0, base);
  return (char: string) =>
    char.length === 1 && validDigits.includes(char.toLowerCase());
}
