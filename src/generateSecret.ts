const ALL_DIGITS = "0123456789abcdef";

export function generateSecret(
  length: number,
  base: number,
  random: () => number = Math.random,
): string {
  if (length > base) {
    throw new RangeError(
      `Cannot generate ${length} unique digits from base ${base}`,
    );
  }

  const alphabet = ALL_DIGITS.slice(0, base);

  const pickUnique = (acc: string[]): string[] => {
    if (acc.length === length) return acc;

    const index = Math.floor(random() * base);
    const char = alphabet.charAt(index);

    if (acc.includes(char)) {
      return pickUnique(acc);
    }

    return pickUnique([...acc, char]);
  };

  return pickUnique([]).join("");
}
