import { test as base } from "@playwright/test";

import { Api } from "../../services/index";
export const apiTest = base.extend({
  api: async ({ request }, use) => {
    await use(new Api(request));
  },
});
