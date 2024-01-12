import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import productModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductUpdateUseCase from "./update.product.usecase";

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
    const usecase = new ProductUpdateUseCase(productRepository);

    const product = new Product("1", "Product 1", 10);
    await productRepository.create(product);

    const input = {
      _id: "1",
      name: "Product 200",
      price: 200,
    };

    const output = {
      _id: "1",
      name: "Product 200",
      price: 200,
    };
    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});
