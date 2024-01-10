import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerListUseCase from "./list.customer.usecase";

const customer = CustomerFactory.createWithAddress("John Doe", new Address("street", 123, "zip", "city"));
const customer2 = CustomerFactory.createWithAddress("John2 Doe", new Address("2street", 1234, "zip2", "city2"));

const MockRepository =() =>{
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('List Customer unit test', () => {

    it("should list all customers", async () => {

        const customerRepository = MockRepository();
        const customerListUseCase = new CustomerListUseCase(customerRepository);

        const output = await customerListUseCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toEqual(customer.id);
        expect(output.customers[1].id).toEqual(customer2.id);
        expect(output.customers[0].name).toEqual(customer.name);
        expect(output.customers[1].name).toEqual(customer2.name);
        expect(output.customers[0].Address.street).toEqual(customer.Address.street);
        expect(output.customers[1].Address.street).toEqual(customer2.Address.street);
    });

});