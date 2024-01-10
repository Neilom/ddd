import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ProductListUseCase {
  productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }
  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const product = await this.productRepository.findAll();
    return OutputMapper.toOutput(product);
  }
}

class OutputMapper {
  static toOutput(product: ProductInterface[]): OutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
