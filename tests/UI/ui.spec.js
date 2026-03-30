import { expect } from "@playwright/test";
import { uiTest } from "../../src/helpers/fixtures/ui.fixtures";
import { UserBuilder } from "../../src/helpers/builders/user.builder";

uiTest.describe("Набор функциональных UI-тестов", () => {
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
        .addPhone();

      await app.accountPage.goToChangeContactInformation();

      await app.accountPage.editContactInforfation(
        newUserinfo.name,
        newUserinfo.lastName,
        newUserinfo.email,
        newUserinfo.phone,
      );

      await app.accountPage.goToChangeContactInformation();

      await expect(await app.accountPage.getName()).toHaveValue(
        newUserinfo.name,
      );
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

  uiTest(
    "Купить iMac",
    {
      tag: ["@UI"],
    },
    async ({ app, registeredUser }) => {
      await app.mainPage.goToiMacs();

      await app.productsPage.addToCart();
      await app.productsPage.placeAnOrder(
        "TestName",
        "TestLastName",
        "Test Adress 13",
        "Test City",
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

      await app.productsPage.addToFavotire();
      await app.productsPage.goToFavorite();

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

  uiTest(
    "Поиск товара iMac",
    {
      tag: ["@UI"],
    },
    async ({ app, registeredUser }) => {
      const product = "Canon EOS 5D";

      await app.mainPage.searchProduct(product);

      const searchingProductName = await app.productsPage.getFirstProductName();

      expect(searchingProductName).toBe(product);
    },
  );
});
