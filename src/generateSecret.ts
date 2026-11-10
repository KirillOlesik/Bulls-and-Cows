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

  const alphabet = [...ALL_DIGITS.slice(0, base)];

  const pickUnique = (bag: string[], acc: string[] = []): string[] => {
    if (acc.length === length) return acc;
    const index = Math.floor(random() * bag.length);
    const chosen = bag[index]!;
    const rest = bag.filter((_, i) => i !== index);
    return pickUnique(rest, [...acc, chosen]);
  };

  return pickUnique(alphabet).join("");
}
