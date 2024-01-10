import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product 1", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Find Product unit test", () => {
  it("should find a Product by id", async () => {
    const ProductRepository = MockRepository();
    const usecase = new FindProductUseCase(ProductRepository);

    const input = { id: "1" };

    const output = {
        id: "1",
        name: "Product 1",
        price: 10,
    };
    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a Product by id", async () => {
    const ProductRepository = MockRepository();
    ProductRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(ProductRepository);

    const input = { id: "1" };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
