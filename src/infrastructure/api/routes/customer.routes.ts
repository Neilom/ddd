import express, { Request, Response } from "express";
import CustomerRepository from "../../customer/repository/sequelize/customer.repository";
import CustomerCreateUseCase from "../../../usecase/customer/create/create.customer.usecase";
import CustomerListUseCase from "../../../usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CustomerCreateUseCase(new CustomerRepository());

  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    };

    const output = await usecase.execute(customerDto);
    res.send(output);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new CustomerListUseCase(new CustomerRepository());
  try {
    const customers = await usecase.execute({});
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});
