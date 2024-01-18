import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import Order from '../models/order.model';

@Injectable()
export class OrderService {
  async createOrder(createDto: CreateOrderDto): Promise<Order> {
    return Order.query().insert(createDto);
  }

  async findAllOrders(): Promise<Order[]> {
    return Order.query();
  }

  async findOrderById(id: number): Promise<Order> {
    const order = await Order.query().findById(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateOrder(id: number, updateDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await Order.query().patchAndFetchById(id, updateDto);
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<void> {
    const rowsDeleted = await Order.query().deleteById(id);
    if (rowsDeleted === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
