import { expect } from "@playwright/test";
import { apiTest } from "../../src/helpers/fixtures/index";
import { ToDoBuilder } from "../../src/helpers/builders/todo.builder";
import {
  EXISTING_TODO_ID,
  NONEXISTENT_TODO_ID,
} from "../../src/const/todos.const";

let token;

apiTest.describe("API Challenges", () => {
  apiTest.beforeAll(async ({ api }, testInfo) => {
    let response = await api.challenger.post(testInfo);
    token = response.headers["x-challenger"];
  });

  apiTest(
    `Получить список челленджей (200)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testInfo) => {
      let response = await api.challenges.get(testInfo, token); // отправляем запрос /challenges

      expect(response.status).toBe(200);
      expect(response.body.challenges.length).toBe(59);
    },
  );

  apiTest(
    `Сделать запрос к /todo (404)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testInfo) => {
      let response = await api.todos.getTodo(testInfo, token); // отправляем запрос /todo

      expect(response.status).toBe(404); // проверяем статус-ответ респонза
    },
  );

  apiTest(
    `Запросить ToDo по существующему id (200)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testInfo) => {
      let toDoId = EXISTING_TODO_ID; // id существующей задачи в ToDo
      let response = await api.todos.getTodoById(testInfo, token, toDoId); // отправляем запрос /todos c id таски

      expect(response.status).toBe(200); // проверяем статус-ответ
      expect(response.body.todos[0].id).toBe(toDoId); // проверяем, что в ответе пришел запрашиваемый id
    },
  );

  apiTest(
    `Запросить ToDo по несуществующему id (404)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testInfo) => {
      let toDoId = NONEXISTENT_TODO_ID; // несуществующий id
      let response = await api.todos.getTodoById(testInfo, token, toDoId); // отправляем запрос /todos c id таски

      expect(response.status).toBe(404); // проверяем статус-ответ
    },
  );

  apiTest(
    `Создать ToDo (201)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testInfo) => {
      const newTask = new ToDoBuilder()
        .addTitle()
        .addDoneStatus()
        .addDescription()
        .generate();

      let response = await api.todos.post(
        testInfo,
        token,
        newTask.title,
        newTask.status,
        newTask.description,
      ); // отправляем запрос /todos и передаем в него информацию по создаваемой таске

      let newResponse = await api.todos.getTodoById(
        testInfo,
        token,
        response.body.id,
      ); // отправляем запрос /todo с запросом таски по id созданной таски

      expect(newResponse.body.todos[0].title).toBe(newTask.title); // проверяем, что заголовок таски соответствует заголовку при создании
      expect(newResponse.body.todos[0].doneStatus).toBe(newTask.status); // проверяем, что статус таски соответствует статусу при создании
      expect(newResponse.body.todos[0].description).toBe(newTask.description); // проверяем, что описание таски соответствует описанию при создании
    },
  );
});
