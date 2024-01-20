import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import Order from '../models/order.model';
import CalculatedOrder from 'src/models/calculatedOrder.model';
import { CreateOrderLogDto } from '../order-log/dto/create-order-log.dto';
import { OrderLogService } from '../order-log/order-log.service';
import { generateOrderCode } from '../common/utilities/orderCode.utils';

@Injectable()
export class OrderService {
  constructor(private readonly orderLogService: OrderLogService) {}
  async createOrder(createDto: CreateOrderDto) {
    const calculatedOrder = await CalculatedOrder.query().findById(
      createDto.calculatedOrderId,
    );
    if (!calculatedOrder) {
      throw new NotFoundException(
        `CalculatedOrder with ID ${createDto.calculatedOrderId} not found`,
      );
    }

    const newOrder = await Order.query().insert({
      ...createDto,
      completed: false,
      cancelled: false,
      kitchenAccepted: false,
      paid: false,
      orderCode: generateOrderCode(createDto.userId),
      orderTotalAmountHistory: JSON.stringify([
        {
          time: new Date().toISOString(),
          totalAmount: calculatedOrder.totalAmount,
        },
      ]),
    });

    const logEntry: CreateOrderLogDto = {
      time: new Date(),
      description: `Order with ID ${newOrder.id} created successfully.`,
    };
    await this.orderLogService.createOrderLog(newOrder.id, logEntry);

    return newOrder;
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
    const existingOrder = await Order.query().findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    const totalAmountHistory = JSON.parse(
      existingOrder.orderTotalAmountHistory || '[]',
    );

    if (
      updateDto.calculatedOrderId &&
      updateDto.calculatedOrderId !== existingOrder.calculatedOrderId
    ) {
      const calculatedOrder = await CalculatedOrder.query().findById(
        updateDto.calculatedOrderId,
      );
      if (!calculatedOrder) {
        throw new NotFoundException(
          `CalculatedOrder with ID ${updateDto.calculatedOrderId} not found`,
        );
      }
      totalAmountHistory.push({
        time: new Date().toISOString(),
        totalAmount: calculatedOrder.totalAmount,
      });
    }

    const updatedOrder = await Order.query().patchAndFetchById(id, {
      ...updateDto,
      orderTotalAmountHistory: JSON.stringify(totalAmountHistory),
    });

    const updateLog = {
      time: new Date(),
      description: `Order with ID ${id} updated`,
    };
    await this.orderLogService.createOrderLog(id, updateLog);

    updatedOrder.orderTotalAmountHistory = totalAmountHistory;

    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<void> {
    const rowsDeleted = await Order.query().deleteById(id);
    if (rowsDeleted === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async processOrder(id: number): Promise<Order> {
    const order = await Order.query()
      .findById(id)
      .withGraphFetched('calculatedOrder');
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    if (!order.kitchenAccepted) {
      throw new Error('Order not yet accepted by kitchen');
    } else if (order.kitchenAccepted && !order.kitchenPrepared) {
      await this.orderLogService.createOrderLog(id, {
        time: new Date(),
        description: 'Order accepted by kitchen',
      });
    } else if (order.kitchenPrepared && !order.kitchenDispatched) {
      await this.orderLogService.createOrderLog(id, {
        time: new Date(),
        description: 'Order completed by kitchen',
      });
    } else if (order.kitchenDispatched && !order.riderArrived) {
      await Order.query().patchAndFetchById(id, { riderArrived: true });
      await this.orderLogService.createOrderLog(id, {
        time: new Date(),
        description: 'Order dispatched by front desk',
      });
    } else if (order.kitchenDispatched && order.riderArrived) {
      await Order.query().patchAndFetchById(id, { riderArrived: true });
      await this.orderLogService.createOrderLog(id, {
        time: new Date(),
        description: 'Order dispatched by front desk',
      });
      await Order.query().patchAndFetchById(id, {
        completed: true,
        completedTime: new Date(),
      });
    } else {
      throw new Error('Order has already been processed');
    }

    return await Order.query().findById(id);
  }
}
