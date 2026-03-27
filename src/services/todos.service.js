import { test } from "@playwright/test";

export class TodosService {
  constructor(request) {
    this.request = request;
  }

  async get(testinfo, token) {
    return test.step("GET /todos", async () => {
      const response = await this.request.get(
        `${testinfo.project.use.apiURL}/todos`,
        { headers: { "X-CHALLENGER": token } },
      );

      const body = await response.json();
      const headers = response.headers();
      const status = response.status();

      return { body, headers, status };
    });
  }

  async getTodo(testinfo, token) {
    return test.step("GET /todo", async () => {
      const response = await this.request.get(
        `${testinfo.project.use.apiURL}/todo`,
        { headers: { "X-CHALLENGER": token } },
      );

      const status = response.status();

      return { status };
    });
  }

  async getTodoById(testinfo, token, id) {
    return test.step("GET /todo", async () => {
      const response = await this.request.get(
        `${testinfo.project.use.apiURL}/todos/${id}`,
        { headers: { "X-CHALLENGER": token } },
      );

      const body = await response.json();
      const status = response.status();

      return { body, status };
    });
  }

  async post(testinfo, token, title, status, description) {
    return test.step("POST /todos", async () => {
      const response = await this.request.post(
        `${testinfo.project.use.apiURL}/todos`,
        {
          headers: { "X-CHALLENGER": token },
          data: {
            title: title,
            doneStatus: status,
            description: description,
          },
        },
      );

      const body = await response.json();
      const statusCode = response.status();

      return { body, statusCode };
    });
  }
}
