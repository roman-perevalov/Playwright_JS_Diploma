import { MainPage, AccountPage, ProductsPage } from "./index.js";

export class App {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.accountPage = new AccountPage(page);
    this.productsPage = new ProductsPage(page);
  }
}
