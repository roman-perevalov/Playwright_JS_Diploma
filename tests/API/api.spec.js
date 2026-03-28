import { expect } from "@playwright/test";
import { test } from "../../src/helpers/fixtures/index";

let token;

test.describe("API Challenges", () => {
  test.beforeAll(async ({ api }, testinfo) => {
    let response = await api.challenger.post(testinfo);
    token = response.headers["x-challenger"];

    console.log(`${testinfo.project.use.apiURL}/gui/challenges/${token}`);
  });

  test(
    `Получить список челленджей (200)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let response = await api.challenges.get(testinfo, token); // отправляем запрос /challenges

      expect(response.status).toBe(200);
      expect(response.body.challenges.length).toBe(59);
    },
  );

  test(
    `Получить список ToDo (200)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let response = await api.todos.get(testinfo, token); // отправляем запрос /todos

      expect(response.status).toBe(200);
      expect(response.body.todos.length).toBe(10); // прореряем, что пришло 10 объектов ToDo
    },
  );

  test(
    `Сделать запрос к /todo (404)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let response = await api.todos.getTodo(testinfo, token); // отправляем запрос /todo

      expect(response.status).toBe(404); // проверяем статус-ответ респонза
    },
  );

  test(
    `Запросить ToDo по существующему id (200)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let toDoId = 7; // id существующей задачи в ToDo
      let response = await api.todos.getTodoById(testinfo, token, toDoId); // отправляем запрос /todos c id таски

      expect(response.status).toBe(200); // проверяем статус-ответ
      expect(response.body.todos[0].id).toBe(toDoId); // проверяем, что в ответе пришел запрашиваемый id
    },
  );

  test(
    `Запросить ToDo по несуществующему id (404)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let toDoId = 54; // id существующей задачи в ToDo
      let response = await api.todos.getTodoById(testinfo, token, toDoId); // отправляем запрос /todos c id таски

      expect(response.status).toBe(404); // проверяем статус-ответ
    },
  );

  test(
    `Создать ToDo (201)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      const newTaskTitle = "Created a task";
      const newTaskStatus = false;
      const newTaskDescription = "New task for Test project is created";

      let response = await api.todos.post(
        testinfo,
        token,
        newTaskTitle,
        newTaskStatus,
        newTaskDescription,
      ); // отправляем запрос /todos и передаем в него информацию по создаваемой таске

      let newResponse = await api.todos.getTodoById(
        testinfo,
        token,
        response.body.id,
      ); // отправляем запрос /todo с запросом таски по id созданной таски

      expect(newResponse.body.todos[0].title).toBe(newTaskTitle); // проверяем, что заголовок таски соответствует заголовку при создании
      expect(newResponse.body.todos[0].doneStatus).toBe(newTaskStatus); // проверяем, что статус таски соответствует статусу при создании
      expect(newResponse.body.todos[0].description).toBe(newTaskDescription); // проверяем, что описание таски соответствует описанию при создании
    },
  );
});
