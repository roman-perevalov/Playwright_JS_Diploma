import { test } from "@playwright/test";

export class ChallengesService {
  constructor(request) {
    this.request = request;
  }

  async get(testinfo, token) {
    return test.step("GET /challenges", async () => {
      const response = await this.request.get(
        `${testinfo.project.use.apiURL}/challenges`,
        { headers: { "X-CHALLENGER": token } },
      );

      const body = await response.json();
      const headers = response.headers();
      const status = response.status();

      return { body, headers, status };
    });
  }
}
