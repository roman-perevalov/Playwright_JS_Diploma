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

  addStreetAddress() {
    this.streetAddress = faker.location.streetAddress(true);
    return this;
  }

  addCityAddress() {
    this.cityAddress = faker.location.city();
    return this;
  }

  generate() {
    return {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      password: this.password,
      streetAddress: this.streetAddress,
      cityAddress: this.cityAddress,
    };
  }
}
