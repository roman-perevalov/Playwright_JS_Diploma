import { test as base } from "@playwright/test";
import { App } from "../../pages/app.page";
import { UserBuilder } from "../builders/user.builder";

export const uiTest = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  registeredUser: async ({ page, app }, use) => {
    const user = new UserBuilder()
      .addName()
      .addLastName()
      .addEmail()
      .addPhone()
      .addPassword()
      .generate();

    await page.goto("/");
    await app.mainPage.goToRegistration();

    await app.accountPage.registration(
      user.name,
      user.lastName,
      user.email,
      user.phone,
      user.password,
    );

    await use(user);
  },
});
