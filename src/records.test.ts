import { describe, it, expect } from "vitest";
import { sortRecords, addRecord, type GameRecord } from "./records";

describe("records logic", () => {
  const recSlow: GameRecord = {
    length: 4,
    base: 10,
    attempts: 5,
    time: 30,
    date: "2024-01-01",
  };
  const recFast: GameRecord = {
    length: 4,
    base: 10,
    attempts: 5,
    time: 10,
    date: "2024-01-02",
  };
  const recFewAttempts: GameRecord = {
    length: 4,
    base: 10,
    attempts: 2,
    time: 50,
    date: "2024-01-03",
  };

  it("sortRecords: сначала по попыткам (меньше = лучше)", () => {
    const sorted = sortRecords([recSlow, recFewAttempts]);
    expect(sorted[0]).toEqual(recFewAttempts); // 2 попытки лучше 5
    expect(sorted[1]).toEqual(recSlow);
  });

  it("sortRecords: при равенстве попыток — по времени (меньше = лучше)", () => {
    const sorted = sortRecords([recSlow, recFast]);
    expect(sorted[0]).toEqual(recFast);
    expect(sorted[1]).toEqual(recSlow);
  });

  it("addRecord: добавляет запись, сортирует и обрезает до топ-10", () => {
    const initial = Array(10).fill(recSlow);
    const newRecord = { ...recSlow, attempts: 1 };

    const result = addRecord(initial, newRecord);

    expect(result.length).toBe(10);
    expect(result[0]).toEqual(newRecord);
  });
});
