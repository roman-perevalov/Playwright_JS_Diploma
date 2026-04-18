import { expect } from "@playwright/test";
import { uiTest } from "../../src/helpers/fixtures/ui.fixtures";

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
