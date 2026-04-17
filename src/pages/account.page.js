import { test } from "@playwright/test";

export class AccountPage {
  constructor(page) {
    this.page = page;
    this.nameField = page.locator("#input-firstname");
    this.lastNameField = page.locator("#input-lastname");
    this.emailField = page.locator("#input-email");
    this.phoneField = page.locator("#input-telephone");
    this.passwordField = page.locator("#input-password");
    this.passwordConfirmField = page.locator("#input-confirm");
    this.agreeTermsButton = page.getByRole("checkbox");
    this.continueButton = page.locator(".btn.btn-primary");
    this.getNameButton = page.getByRole("textbox", { name: "* Имя, Отчество" });
    this.getLastnameButton = page.getByRole("textbox", { name: "* Фамилия" });
    this.getEmailButton = page.getByRole("textbox", { name: "* E-Mail" });
    this.getPhoneButton = page.getByRole("textbox", { name: "* Телефон" });
    this.sucessText = page.getByRole("heading", {
      name: "Ваша учетная запись создана!",
    });

    this.changeContactInfoButton = page
      .locator("#column-right")
      .getByRole("link", { name: "Изменить контактную информацию" });
    this.changePasswordButton = page.getByRole("link", {
      name: "Пароль",
      exact: true,
    });
  }

  async registration(name, lastName, email, phone, password) {
    return test.step("Заполнить данные для регистрации и нажать `Продолжить`", async (step) => {
      await this.nameField.fill(name);
      await this.lastNameField.fill(lastName);
      await this.emailField.fill(email);
      await this.phoneField.fill(phone);
      await this.passwordField.fill(password);
      await this.passwordConfirmField.fill(password);

      await this.agreeTermsButton.click();

      await this.continueButton.click();
    });
  }

  async editContactInforfation(name, lastName, email, phone) {
    await test.step("Перейти на страницу и отредактировать информацию", async (step) => {
      await this.changeContactInfoButton.click();
      await this.nameField.fill(name);
      await this.lastNameField.fill(lastName);
      await this.emailField.fill(email);
      await this.phoneField.fill(phone);

      await this.continueButton.click();

      await this.changeContactInfoButton.click();
    });
  }

  async getName() {
    return this.getNameButton;
  }

  async getLastname() {
    return this.getLastnameButton;
  }

  async getEmail() {
    return this.getEmailButton;
  }

  async getPhone() {
    return this.getPhoneButton;
  }
}
