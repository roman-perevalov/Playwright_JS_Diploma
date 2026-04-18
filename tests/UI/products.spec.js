import { expect } from "@playwright/test";
import { uiTest } from "../../src/helpers/fixtures/ui.fixtures";
import { UserBuilder } from "../../src/helpers/builders/user.builder";

uiTest.describe("Набор функциональных UI-тестов с товарами", () => {
  uiTest(
    "Купить iMac",
    {
      tag: ["@UI"],
    },
    async ({ app, registeredUser }) => {
      const deliveryDetails = new UserBuilder()
        .addName()
        .addLastName()
        .addStreetAddress()
        .addCityAddress()
        .generate();

      await app.mainPage.goToiMacs();

      await app.productsPage.buyProduct(
        deliveryDetails.name,
        deliveryDetails.lastName,
        deliveryDetails.streetAddress,
        deliveryDetails.cityAddress,
      );

      await expect(app.productsPage.getContentLocator()).toContainText(
        "Ваш заказ принят!",
      );
    },
  );

  uiTest(
    "Добавить iMac в «Избранное»",
    {
      tag: ["@UI"],
    },
    async ({ app, registeredUser }) => {
      await app.mainPage.goToiMacs();

      const productName = await app.productsPage.getFirstProductName();

      await app.productsPage.addAndGoToFavorite();

      await expect(app.productsPage.getTbodyLocator()).toContainText(
        productName,
      );
    },
  );

  uiTest(
    "Сравнить товары",
    {
      tag: ["@UI"],
    },
    async ({ app, registeredUser }) => {
      await app.mainPage.goToMp3Players();

      const firstItemName = await app.productsPage.getFirstProductName();
      const secondItemName = await app.productsPage.getSecondProductName();

      await app.productsPage.addFirstToComparisonList();
      await app.productsPage.addSecondToComparisonList();

      await app.productsPage.goToComparisonList();

      const firstComparisonName =
        await app.productsPage.getComparisonFirstProductName();
      const secondComparisonName =
        await app.productsPage.getComparisonSecondProductName();

      expect(firstComparisonName).toBe(firstItemName);
      expect(secondComparisonName).toBe(secondItemName);
    },
  );
});
