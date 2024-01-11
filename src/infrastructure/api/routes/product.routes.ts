import express from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ProductListUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  const usecase = new ProductListUseCase(new ProductRepository());
  try {
    const products = await usecase.execute({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});
