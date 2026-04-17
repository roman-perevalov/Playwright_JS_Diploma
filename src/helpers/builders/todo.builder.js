import { faker } from "@faker-js/faker";

export class ToDoBuilder {
  addTitle() {
    this.title = faker.lorem.words(3);
    return this;
  }

  addDoneStatus() {
    this.status = faker.datatype.boolean();
    return this;
  }

  addDescription() {
    this.description = faker.food.description();
    return this;
  }

  generate() {
    return {
      title: this.title,
      status: this.status,
      description: this.description,
    };
  }
}
