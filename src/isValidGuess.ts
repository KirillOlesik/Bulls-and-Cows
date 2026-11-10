import { createDigitValidator } from "./createDigitValidator";

export function isValidGuess(
  guess: string,
  length: number,
  base: number,
): boolean {
  if (guess.length !== length) return false;
  const isDigit = createDigitValidator(base);
  const chars = [...guess];
  const allValid = chars.every(isDigit);
  const allUnique =
    new Set(chars.map((c) => c.toLowerCase())).size === chars.length;
  return allValid && allUnique;
}
