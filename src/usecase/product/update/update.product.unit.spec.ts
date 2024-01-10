import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductUpdateUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10);

const input = {
  id: product.id,
  name: product.name,
  price: product.price,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Update product unit test", () => {
  it("should not update a product by id", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new ProductUpdateUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
