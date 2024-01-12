import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update.product.dto";

export default class ProductUpdateUseCase {
  productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    await this.productRepository.update({
      id: input._id,
      name: input.name,
      price: input.price,
    });
    return {
      _id: input._id,
      name: input.name,
      price: input.price,
    };
  }
}
