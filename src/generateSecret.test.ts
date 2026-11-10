import { describe, it, expect } from "vitest";
import { generateSecret } from "./generateSecret";

const seqRng = (...values: number[]) => {
  let i = 0;
  return (): number => values[i++ % values.length]!;
};

describe("generateSecret", () => {
  it("возвращает строку нужной длины", () => {
    const secret = generateSecret(4, 10, seqRng(0.1, 0.3, 0.5, 0.7));
    expect(secret).toHaveLength(4);
  });

  it("все цифры уникальны", () => {
    const secret = generateSecret(4, 10, seqRng(0.1, 0.3, 0.5, 0.7));
    expect(new Set(secret).size).toBe(4);
  });

  it("все цифры входят в базу", () => {
    const secret = generateSecret(4, 10, seqRng(0.1, 0.3, 0.5, 0.7));
    [...secret].forEach((c) => expect("0123456789").toContain(c));
  });

  it("детерминирована при фиксированном random", () => {
    expect(generateSecret(4, 10, seqRng(0.1, 0.4, 0.7, 0.9))).toBe(
      generateSecret(4, 10, seqRng(0.1, 0.4, 0.7, 0.9)),
    );
  });

  it("hex: может вернуть буквы", () => {
    const secret = generateSecret(4, 16, seqRng(0.7, 0.8, 0.9, 0.95));
    expect(secret).toMatch(/^[0-9a-f]{4}$/);
    expect(/[a-f]/.test(secret)).toBe(true);
  });

  it("кидает RangeError, если length > base", () => {
    expect(() => generateSecret(20, 10, seqRng(0.5))).toThrow(RangeError);
  });
});
