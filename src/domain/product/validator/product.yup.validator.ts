import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import * as yup from "yup";

export default class ProductYupValidator
  implements ValidatorInterface<ProductInterface>
{
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("Id is required"),
          name: yup.string().required("Name is required"),
          price: yup.number().moreThan(0, "Price must be greater than zero"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "product",
        });
      });
    }
  }
}
