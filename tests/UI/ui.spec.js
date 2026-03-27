import { expect } from "@playwright/test";
import { test } from "../../src/helpers/fixtures/ui.fixtures";
import { UserBuilder } from "../../src/helpers/builders/user.builder";

test.describe("Набор функциональных UI-тестов", () => {
  test("Изменить контактную информацию ", async ({ app, registeredUser }) => {
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
  });

  test("Купить iMac", async ({ app, registeredUser }) => {
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
  });

  test("Добавить iMac в «Избранное»", async ({ app, registeredUser }) => {
    await app.mainPage.goToiMacs();

    const productName = await app.productsPage.getProductName(0);

    await app.productsPage.addToFavotire(0);
    await app.productsPage.goToFavorite();

    await expect(app.productsPage.getTbodyLocator()).toContainText(productName);
  });

  test("Сравнить товары", async ({ app, registeredUser }) => {
    await app.mainPage.goToMp3Players();

    const firstItemName = await app.productsPage.getProductName(0);
    const secondItemName = await app.productsPage.getProductName(1);

    await app.productsPage.addToComparisonList(0);
    await app.productsPage.addToComparisonList(1);

    await app.productsPage.goToComparisonList();

    const firstComparisonName =
      await app.productsPage.getComparisonProductName(1);
    const secondomparisonName =
      await app.productsPage.getComparisonProductName(2);

    expect(firstComparisonName).toBe(firstItemName);
    expect(secondomparisonName).toBe(secondItemName);
  });

  test("Поиск товара iMac", async ({ app, registeredUser }) => {
    const product = "Canon EOS 5D";

    await app.mainPage.searchProduct(product);

    const searchingProductName = await app.productsPage.getProductName(0);

    expect(searchingProductName).toBe(product);
  });
});
