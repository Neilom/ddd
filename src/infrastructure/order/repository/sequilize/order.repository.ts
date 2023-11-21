import RepositoryInterface from "../../../../domain/@shared/repository/repository.interface";
import Order from "../../../../domain/order/entity/order";
import OrderItem from "../../../../domain/order/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/order/repository/order.repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item: OrderItem) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [{ model: OrderItemModel }],
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  async update(entity: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item: OrderItem) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          where: {
            id: entity.id,
          },
        }
      );
    } catch (error) {
      console.log(error)
    }
  }

  async find(id: string): Promise<Order> {
    try {
      let orderModel;
      try {
        orderModel = await OrderModel.findOne({
          where: {
            id,
          },
          rejectOnEmpty: true,
          include: [{ model: OrderItemModel }]
        });
      } catch (error) {
        throw new Error("Order not found");
      }

      const orderItens = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        )
      })
      return new Order(id, orderModel.customer_id, orderItens)
    } catch (error) {
      console.log(error)
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const orderModel = await OrderModel.findAll({
        include: [{ model: OrderItemModel }]
      })

      const orders = orderModel.map((order) => {
        const orderItens = order.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.product_id,
            item.quantity,
          )
        })
        return new Order(order.id, order.customer_id, orderItens)
      })

      return orders
    } catch (error) {
      console.log(error)
    }
  }

}
