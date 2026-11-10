const AVAILABLE_LENGTHS = [2, 3, 4, 5, 6];
const AVAILABLE_BASES = [
  { value: 2, label: "Бин (2)" },
  { value: 8, label: "Окт (8)" },
  { value: 10, label: "Дек (10)" },
  { value: 16, label: "Хекс (16)" },
];

export function createSettingsScreen(
  onStart: (config: { length: number; base: number }) => void,
  onViewRecords: () => void,
): HTMLElement {
  const container = document.createElement("div");
  container.classList.add("retro-card");

  const form = document.createElement("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onStart({
      length: Number(lengthSelect.value),
      base: Number(baseSelect.value),
    });
  });

  const lengthLabel = document.createElement("label");
  lengthLabel.textContent = "Длина секрета: ";

  const lengthSelect = document.createElement("select");
  lengthSelect.classList.add("select-field");
  AVAILABLE_LENGTHS.forEach((len) => {
    const opt = document.createElement("option");
    opt.value = String(len);
    opt.textContent = String(len);
    lengthSelect.append(opt);
  });

  const baseLabel = document.createElement("label");
  baseLabel.textContent = "База: ";

  const baseSelect = document.createElement("select");
  baseSelect.classList.add("select-field");
  AVAILABLE_BASES.forEach((b) => {
    const opt = document.createElement("option");
    opt.value = String(b.value);
    opt.textContent = b.label;
    baseSelect.append(opt);
  });
  baseSelect.value = "10";

  baseSelect.addEventListener("change", () => {
    const selectedBase = Number(baseSelect.value);
    const options = lengthSelect.querySelectorAll("option");

    options.forEach((opt) => {
      const lenValue = Number(opt.value);
      opt.disabled = lenValue > selectedBase;
    });

    if (Number(lengthSelect.value) > selectedBase) {
      lengthSelect.value = String(selectedBase);
    }
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Начать игру";
  submitBtn.classList.add("btn");

  const recordsBtn = document.createElement("button");
  recordsBtn.type = "button";
  recordsBtn.textContent = " Таблица рекордов";
  recordsBtn.classList.add("btn");
  recordsBtn.addEventListener("click", onViewRecords);

  form.append(
    lengthLabel,
    document.createElement("br"),
    lengthSelect,
    document.createElement("br"),
    document.createElement("br"),
    baseLabel,
    document.createElement("br"),
    baseSelect,
    document.createElement("br"),
    document.createElement("br"),
    submitBtn,
    recordsBtn,
  );

  container.append(form);
  return container;
}
