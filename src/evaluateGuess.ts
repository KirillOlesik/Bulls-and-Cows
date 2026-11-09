export function evaluateGuess(
  secret: string,
  guess: string,
): { bulls: number; cows: number } {
  const s = secret.toLowerCase().split("");
  const g = guess.toLowerCase().split("");

  const bulls = s.reduce(
    (count, ch, i) => (ch === g[i] ? count + 1 : count),
    0,
  );

  const remainingSecret = s.filter((ch, i) => ch !== g[i]);
  const remainingGuess = g.filter((ch, i) => ch !== s[i]);
  const cows = remainingGuess.filter((ch) =>
    remainingSecret.includes(ch),
  ).length;

  return { bulls, cows };
}
