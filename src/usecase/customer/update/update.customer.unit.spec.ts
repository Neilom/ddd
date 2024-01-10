import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerUpdateUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John Doe", new Address("street", 123, "zip", "city"));

const input = {
    id: customer.id,
    name: "John Doe updated",
    address: {
        street: "street updated",
        number: 1234,
        zip: "zip updated",
        city: "city updated",
    },
}

const MockRepository =() =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Update Customer unit test', () => {

    it("should not update a customer by id", async () => {

        const customerRepository = MockRepository();
        const customerUpdateUseCase = new CustomerUpdateUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);

    });

});