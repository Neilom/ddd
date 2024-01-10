import { Sequelize } from "sequelize-typescript";
import productModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductListUseCase from "./list.product.usecase";

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

  it("should findAll a products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ProductListUseCase(productRepository);

    const product = new Product("1", "Product 1", 10);
    const product2 = new Product("10", "Product 10", 100);
    await productRepository.create(product);
    await productRepository.create(product2);

    const input = {};

    const output = await usecase.execute(input);
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(product.id);
    expect(output.products[1].id).toEqual(product2.id);
    expect(output.products[0].name).toEqual(product.name);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[0].price).toEqual(product.price);
    expect(output.products[1].price).toEqual(product2.price);
  });
});
