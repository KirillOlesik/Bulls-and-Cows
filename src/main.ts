import { createSettingsScreen } from "./ui/settingsScreen";

const app = document.getElementById("app");

if (app) {
  const settings = createSettingsScreen((config) => {
    console.log("Конфигурация игры:", config);
  });

  app.append(settings);
}
