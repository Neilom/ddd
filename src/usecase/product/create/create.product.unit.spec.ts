import Product from "../../../domain/product/entity/product";
import ProductCreateUseCase from "./create.product.usecase";

const input = {
  name: "Product 1",
  price: 10,
  type: "a",
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create Product unit test", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const usecase = new ProductCreateUseCase(productRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 10,
    });
  });

  it("should not create a product because type C", async () => {
    const productRepository = MockRepository();
    const usecase = new ProductCreateUseCase(productRepository);
    input.type = "c";

    expect(usecase.execute(input)).rejects.toThrowError("Product type not supported");
  });
});
