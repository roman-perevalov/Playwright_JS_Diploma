import { expect } from "@playwright/test";
import { apiTest } from "../../src/helpers/fixtures/index";
import { ToDoBuilder } from "../../src/helpers/builders/todo.builder";
import {
  EXISTING_TODO_ID,
  NONEXISTENT_TODO_ID,
} from "../../src/const/todos.const";

let token;

apiTest.describe("API Challenges", () => {
  apiTest.beforeAll(async ({ api }, testinfo) => {
    let response = await api.challenger.post(testinfo);
    token = response.headers["x-challenger"];
  });

  apiTest(
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

  apiTest(
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

  apiTest(
    `Сделать запрос к /todo (404)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let response = await api.todos.getTodo(testinfo, token); // отправляем запрос /todo

      expect(response.status).toBe(404); // проверяем статус-ответ респонза
    },
  );

  apiTest(
    `Запросить ToDo по существующему id (200)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let toDoId = EXISTING_TODO_ID; // id существующей задачи в ToDo
      let response = await api.todos.getTodoById(testinfo, token, toDoId); // отправляем запрос /todos c id таски

      expect(response.status).toBe(200); // проверяем статус-ответ
      expect(response.body.todos[0].id).toBe(toDoId); // проверяем, что в ответе пришел запрашиваемый id
    },
  );

  apiTest(
    `Запросить ToDo по несуществующему id (404)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      let toDoId = NONEXISTENT_TODO_ID; // несуществующий id
      let response = await api.todos.getTodoById(testinfo, token, toDoId); // отправляем запрос /todos c id таски

      expect(response.status).toBe(404); // проверяем статус-ответ
    },
  );

  apiTest(
    `Создать ToDo (201)`,
    {
      tag: ["@API"],
    },
    async ({ api }, testinfo) => {
      const newTask = new ToDoBuilder()
        .addTitle()
        .addDoneStatus()
        .addDescription()
        .generate();

      let response = await api.todos.post(
        testinfo,
        token,
        newTask.title,
        newTask.status,
        newTask.description,
      ); // отправляем запрос /todos и передаем в него информацию по создаваемой таске

      let newResponse = await api.todos.getTodoById(
        testinfo,
        token,
        response.body.id,
      ); // отправляем запрос /todo с запросом таски по id созданной таски

      expect(newResponse.body.todos[0].title).toBe(newTask.title); // проверяем, что заголовок таски соответствует заголовку при создании
      expect(newResponse.body.todos[0].doneStatus).toBe(newTask.status); // проверяем, что статус таски соответствует статусу при создании
      expect(newResponse.body.todos[0].description).toBe(newTask.description); // проверяем, что описание таски соответствует описанию при создании
    },
  );
});
