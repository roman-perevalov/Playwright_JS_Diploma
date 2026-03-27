import { test } from "@playwright/test";

export class MainPage {
  constructor(page) {
    this.page = page;
    this.accountButton = page.getByRole("link", { name: " Личный кабинет" });
    this.registrationButton = page.getByRole("link", { name: "Регистрация" });
    this.loginButton = page.getByRole("link", { name: "Авторизация" });
    this.favoritesButton = page.getByRole("link", { name: " Закладки (0)" });
    this.placingOrderButton = page.getByRole("link", {
      name: " Оформление заказа",
    });
    this.computersButton = page
      .locator("#menu")
      .getByRole("link", { name: "Компьютеры" });
    this.iMacsButton = page.getByRole("link", { name: "Mac (1)" });
    this.mp3PlayersMenu = page.locator("#menu").getByRole("link", {
      name: "MP3 плееры",
      exact: true,
    });
    this.allMp3Players = page.getByRole("link", {
      name: "Показать все MP3 плееры",
    });
    this.searchField = page.getByRole("textbox", { name: "Поиск" });
    this.searchButton = page.getByRole("button", { name: "" });
  }

  async goToRegistration() {
    return test.step("Перейти к регистрации", async (step) => {
      await this.accountButton.click();
      await this.registrationButton.click();
    });
  }

  async goToLogin() {
    return test.step("Перейти к авторизации", async (step) => {
      await this.loginButton.click();
    });
  }

  async goToiMacs() {
    return test.step("Перейти на страницу 'iMacs'", async (step) => {
      await this.computersButton.click();
      await this.iMacsButton.click();
    });
  }

  async goToCart() {
    return test.step("Перейти в 'Корзину'", async (step) => {
      await this.cartButton.click();
    });
  }

  async goToMp3Players() {
    return test.step("Перейти на страницу 'MP3 Players'", async (step) => {
      await this.mp3PlayersMenu.click();
      await this.allMp3Players.click();
    });
  }

  async searchProduct(item) {
    return test.step("Найти товар", async (step) => {
      await this.searchField.fill(item);
      await this.searchButton.click();
    });
  }
}
