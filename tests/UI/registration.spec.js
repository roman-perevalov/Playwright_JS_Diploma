import { expect } from "@playwright/test";
import { uiTest } from "../../src/helpers/fixtures/ui.fixtures";
import { UserBuilder } from "../../src/helpers/builders/user.builder";

uiTest(
  "Изменить контактную информацию",
  {
    tag: ["@UI"],
  },
  async ({ app, registeredUser }) => {
    const newUserinfo = new UserBuilder()
      .addName()
      .addLastName()
      .addEmail()
      .addPhone()
      .generate();

    await app.accountPage.editContactInforfation(
      newUserinfo.name,
      newUserinfo.lastName,
      newUserinfo.email,
      newUserinfo.phone,
    );

    await expect(await app.accountPage.getName()).toHaveValue(newUserinfo.name);
    await expect(await app.accountPage.getLastname()).toHaveValue(
      newUserinfo.lastName,
    );
    await expect(await app.accountPage.getEmail()).toHaveValue(
      newUserinfo.email,
    );
    await expect(await app.accountPage.getPhone()).toHaveValue(
      newUserinfo.phone,
    );
  },
);
