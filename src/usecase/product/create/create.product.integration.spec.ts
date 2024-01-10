import { Sequelize } from "sequelize-typescript";
import ProductCreateUseCase from "./create.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Find Product integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("sould find a Product by id", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ProductCreateUseCase(productRepository);

    const product = new Product("1", "product", 10);
    await productRepository.create(product);

    const input = { 
        name: "Product 1",
        price: 10,
        type: "a",
     };

    const output = {
        id: expect.any(String),
        name: "Product 1",
        price: 10,
    };
    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
