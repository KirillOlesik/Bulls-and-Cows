export interface GameRecord {
  length: number;
  base: number;
  attempts: number;
  time: number;
  date: string;
}

export function sortRecords(records: GameRecord[]): GameRecord[] {
  return [...records].sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }
    return a.time - b.time;
  });
}

export function addRecord(
  records: GameRecord[],
  newRecord: GameRecord,
): GameRecord[] {
  const updated = [...records, newRecord];
  const sorted = sortRecords(updated);
  return sorted.slice(0, 10);
}

const STORAGE_KEY = "bulls_and_cows_records";

export function loadRecords(): GameRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GameRecord[];
  } catch (error) {
    console.error("Ошибка чтения рекордов", error);
    return [];
  }
}

export function saveRecords(records: GameRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
