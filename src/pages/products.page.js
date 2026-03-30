import { test } from "@playwright/test";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addToCartButton = page.getByRole("button", { name: " Купить" });
    this.productsButton = page.locator("#cart-total");
    this.getFirstProductNameButton = page.locator("h4 a").nth(0);
    this.getSecondProductNameButton = page.locator("h4 a").nth(1);
    this.placeOrderButton = page.getByRole("link", {
      name: " Оформить заказ",
    });
    this.addToFavoriteButton = page.getByRole("button", { name: "" }).nth(0);
    this.addFirstToComparisonButton = page
      .getByRole("button", { name: "" })
      .nth(0);
    this.addSecondToComparisonButton = page
      .getByRole("button", { name: "" })
      .nth(1);
    this.comparisonList = page.locator("#compare-total");
    this.favorites = page.getByRole("link", { name: " Закладки (0)" });
    this.comparisonList = page.locator("#compare-total");
    this.ComparisonFirstProductName = page.locator("tbody tr td").nth(1);
    this.ComparisonSecondProductName = page.locator("tbody tr td").nth(2);

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

  async addToFavotire() {
    return test.step("Добавить в 'Избранное'", async (step) => {
      await this.addToFavoriteButton.click();
    });
  }

  async goToFavorite() {
    return test.step("Перейти в 'Избранное'", async (step) => {
      await this.favorites.click();
    });
  }

  async getFirstProductName() {
    return test.step("Получить название первого товара", async (step) => {
      return this.getFirstProductNameButton.innerText();
    });
  }

  async getSecondProductName() {
    return test.step("Получить название второго товара", async (step) => {
      return this.getSecondProductNameButton.innerText();
    });
  }

  async addFirstToComparisonList() {
    return test.step("Добавить первый товар к сравнению", async (step) => {
      await this.addFirstToComparisonButton.click();
    });
  }

  async addSecondToComparisonList() {
    return test.step("Добавить второй товар к сравнению", async (step) => {
      await this.addSecondToComparisonButton.click();
    });
  }

  async goToComparisonList() {
    return test.step("Перейти к списку сравнения товаров", async (step) => {
      await this.comparisonList.click();
    });
  }

  async getComparisonFirstProductName() {
    return test.step("Получить название первого товара из сравнения", async (step) => {
      return await this.ComparisonFirstProductName.innerText();
    });
  }

  async getComparisonSecondProductName() {
    return test.step("Получить название второго товара из сравнения", async (step) => {
      return await this.ComparisonSecondProductName.innerText();
    });
  }

  getContentLocator() {
    return this.page.locator("#content");
  }

  getTbodyLocator() {
    return this.page.locator("tbody");
  }
}
