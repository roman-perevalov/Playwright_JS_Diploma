import { test } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    // this.iMacProductPage = page.getByText("iMac", { exact: true });
    this.addToCartButton = page.getByRole("button", { name: " Купить" });
    this.productsButton = page.locator("#cart-total");
    this.placeOrderButton = page.getByRole("link", {
      name: " Оформить заказ",
    });
    this.addToFavoriteButton = page.getByRole("button", { name: "" });
    this.addToComparisonButton = page.getByRole("button", { name: "" });
    this.comparisonList = page.locator("#compare-total");
    this.favorites = page.getByRole("link", { name: " Закладки (0)" });
    this.comparisonList = page.locator("#compare-total");

    this.paymentName = page.locator("#input-payment-firstname");
    this.paymentLastName = page.locator("#input-payment-lastname");
    this.paymentAddress = page.locator("#input-payment-address-1");
    this.paymentCity = page.locator("#input-payment-city");
    this.paymentCountry = page.locator("#input-payment-country");
    this.paymentZone = page.locator("#input-payment-zone");
    this.paymentContinueButton = page.locator("#button-payment-address");
    this.shippingAddressContinueButton = page.locator(
      "#button-shipping-address",
    );
    this.shippingMethodContinueButton = page.locator("#button-shipping-method");
    this.agreeTermsButton = page.getByRole("checkbox");
    this.paymentMethodContinueMethod = page.locator("#button-payment-method");
    this.confirmOrderButton = page.locator("#button-confirm");
  }

  async addToCart() {
    return test.step("Добавить в 'Корзину'", async (step) => {
      await this.addToCartButton.click();
    });
  }

  async placeAnOrder(
    paymentName,
    paymentLastName,
    paymentAddress,
    paymentCity,
  ) {
    return test.step("Заполнить данные для заказа", async (step) => {
      await this.productsButton.click();
      await this.placeOrderButton.click();
      await this.paymentName.fill(paymentName);
      await this.paymentLastName.fill(paymentLastName);
      await this.paymentAddress.fill(paymentAddress);
      await this.paymentCity.fill(paymentCity);
      await this.paymentCountry.selectOption("220");
      await this.paymentZone.selectOption("135");
      await this.paymentContinueButton.click();
      await this.shippingAddressContinueButton.click();
      await this.shippingMethodContinueButton.click();
      await this.agreeTermsButton.click();
      await this.paymentMethodContinueMethod.click();
      await this.confirmOrderButton.click();
    });
  }

  async addToFavotire(index) {
    return test.step("Добавить в 'Избранное'", async (step) => {
      await this.addToFavoriteButton.nth(index).click();
    });
  }

  async goToFavorite() {
    return test.step("Перейти в 'Избранное'", async (step) => {
      await this.favorites.click();
    });
  }

  async getProductName(index) {
    return test.step("Получить название товара", async (step) => {
      return this.page.locator("h4 a").nth(index).innerText();
    });
  }

  async addToComparisonList(index) {
    return test.step("Добавить товар к сравнению", async (step) => {
      await this.addToComparisonButton.nth(index).click();
    });
  }

  async goToComparisonList() {
    return test.step("Перейти к списку сравнения товаров", async (step) => {
      await this.comparisonList.click();
    });
  }

  async getComparisonProductName(index) {
    return test.step("Получить название товара из сравнения", async (step) => {
      return await this.page.locator("tbody tr td").nth(index).innerText();
    });
  }

  getContentLocator() {
    return this.page.locator("#content");
  }

  getTbodyLocator() {
    return this.page.locator("tbody");
  }
}
