import { memoize } from "./memoize";

const count = memoize((remaining: number, available: number): number => {
  if (remaining === 0) return 1;
  return available * count(remaining - 1, available - 1);
});

export function countPossibleSecrets(length: number, base: number): number {
  if (length < 0 || length > base) return 0;
  return count(length, base);
}
