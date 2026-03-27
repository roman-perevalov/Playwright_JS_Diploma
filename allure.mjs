import { defineConfig } from "allure";

export default defineConfig({
  name: "Allure Report Example",
  plugins: {
    awesome: {
      options: {
        singleFile: true,
        reportLanguage: "ru",
      },
    },
  },
});
