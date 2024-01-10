import { Sequelize } from "sequelize-typescript";
import productModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Find product integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([productModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("sould find a product by id", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const input = {
        id: "1",
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
