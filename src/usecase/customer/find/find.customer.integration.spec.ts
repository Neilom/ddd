import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Find Customer integration test', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("sould find a customer by id", async () => {
        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("1", "John Doe")
        const address = new Address("street", 123, "zip", "city");
        customer.changeAddress(address);
        await customerRepository.create(customer);

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