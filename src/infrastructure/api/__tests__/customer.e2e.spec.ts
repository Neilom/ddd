import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E: Customer", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "Anytown",
          number: 123,
          zip: "12345",
        },
      });
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("John Doe");
    expect(response.body.address.street).toEqual("123 Main St");
    expect(response.body.address.city).toEqual("Anytown");
    expect(response.body.address.number).toEqual(123);
    expect(response.body.address.zip).toEqual("12345");
  });

  it("should not create a customer with invalid data", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "Anytown",
          number: 123,
        },
      });
    expect(response.status).toEqual(500);
  });

  it("should list all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "Anytown",
          number: 123,
          zip: "12345",
        },
      });
    await request(app)
      .post("/customer")
      .send({
        name: "James",
        address: {
          street: "123 Main St 2",
          city: "Anytown 2 ",
          number: 1234,
          zip: "123452",
        },
      });
    const response = await request(app).get("/customer").send();
    expect(response.status).toEqual(200);
    expect(response.body.customers.length).toEqual(2);
    expect(response.body.customers[0].name).toEqual("John Doe");
    expect(response.body.customers[0].Address.street).toEqual("123 Main St");
    expect(response.body.customers[0].Address.city).toEqual("Anytown");
    expect(response.body.customers[0].Address.number).toEqual(123);
    expect(response.body.customers[0].Address.zip).toEqual("12345");
    expect(response.body.customers[1].name).toEqual("James");
    expect(response.body.customers[1].Address.street).toEqual("123 Main St 2");
    expect(response.body.customers[1].Address.city).toEqual("Anytown 2 ");
    expect(response.body.customers[1].Address.number).toEqual(1234);
    expect(response.body.customers[1].Address.zip).toEqual("123452");
  });
});
