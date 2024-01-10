import CustomerCreateUseCase from "./create.customer.usecase";

const input = {
  name: "John Doe",
  address: {
    street: "street",
    number: 123,
    zip: "zip",
    city: "city",
  },
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create Customer unit test", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: "John Doe",
      address: {
        street: "street",
        number: 123,
        city: "city",
        zip: "zip",
      },
    });
  });

  it("should throw an error when name is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.name = "";
    expect(usecase.execute(input)).rejects.toThrowError("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const customerRepository = MockRepository();
    const usecase = new CustomerCreateUseCase(customerRepository);

    input.address.street = "";
    expect(usecase.execute(input)).rejects.toThrowError("Street is required");
  });
});
