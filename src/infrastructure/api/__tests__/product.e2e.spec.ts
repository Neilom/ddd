import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E: Product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
    const response = await request(app).get("/product");
    expect(response.status).toEqual(200);
    expect(response.body.products.length).toEqual(0);
  });
});
