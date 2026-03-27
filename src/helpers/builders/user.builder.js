import { faker } from "@faker-js/faker";

export class UserBuilder {
  addName(name) {
    this.name = name ?? faker.person.firstName();
    return this;
  }

  addLastName(lastName) {
    this.lastName = lastName ?? faker.person.lastName();
    return this;
  }

  addEmail(email) {
    this.email = email ?? faker.internet.email({ provider: "rp.test" });
    return this;
  }

  addPhone(phoneNumber) {
    this.phone = phoneNumber ?? faker.phone.number({ style: "international" });
    return this;
  }

  addPassword() {
    this.password = faker.internet.password({ length: 15 });
    return this;
  }

  generate() {
    return {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
    };
  }
}
