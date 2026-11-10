import { describe, it, expect, vi } from "vitest";
import { memoize } from "./memoize";

describe("memoize", () => {
  it("при повторном вызове с теми же аргументами не вызывает fn", () => {
    const fn = vi.fn((n: number) => n * 2);
    const memo = memoize(fn);

    expect(memo(5)).toBe(10);
    expect(memo(5)).toBe(10);
    expect(memo(5)).toBe(10);

    expect(fn).toHaveBeenCalledTimes(1); // ← вот доказательство
  });

  it("при разных аргументах вызывает fn каждый раз", () => {
    const fn = vi.fn((n: number) => n * 2);
    const memo = memoize(fn);

    memo(5);
    memo(6);
    memo(7);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("кэширует примитивные результаты корректно (0, false, '')", () => {
    const fn = vi.fn((n: number) => (n === 0 ? 0 : 1));
    const memo = memoize(fn);

    expect(memo(0)).toBe(0);
    expect(memo(0)).toBe(0);
    expect(fn).toHaveBeenCalledTimes(1); // 0 !== undefined, кэш сработал
  });
});
