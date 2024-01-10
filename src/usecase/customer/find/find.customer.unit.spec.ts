import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("1", "John Doe")
const address = new Address("street", 123, "zip", "city");
customer.changeAddress(address);

const MockRepository =() =>{
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Find Customer unit test', () => {

    it("should not find a customer by id", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(()=>{
            throw new Error("Customer not found")
        })
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = { id: "1" };

        expect(()=>{
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found")
    })

    it("should find a customer by id", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = { id: "1" };

        const output = {
            id:'1',
            name: 'John Doe',
            address: {
                street: 'street',
                number: 123,
                city: 'city',
                zip: 'zip'
            }
        }
        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    })

})