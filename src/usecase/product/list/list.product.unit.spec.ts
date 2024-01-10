import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductListUseCase from "./list.product.usecase";

const product0 = ProductFactory.create("a", "Product 1", 10);
const product1 = ProductFactory.create("b", "Product 2", 20);

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product0, product1])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("List Product unit test", () => {
  it("should list all Products", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ProductListUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(product0.id);
    expect(output.products[1].id).toEqual(product1.id);
    expect(output.products[0].name).toEqual(product0.name);
    expect(output.products[1].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product0.price);
    expect(output.products[1].price).toEqual(product1.price);
  });
});
