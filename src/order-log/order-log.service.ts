import { Injectable, NotFoundException } from '@nestjs/common';
import OrderLog from '../models/orderLog.model';
import Order from '../models/order.model';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';

@Injectable()
export class OrderLogService {
  async createOrderLog(orderId: number, createDto: CreateOrderLogDto) {
    // Check if the order exists
    const orderExists = await Order.query().findById(orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return OrderLog.query().insert({
      ...createDto,
      orderId,
    });
  }

  async findAllOrderLogsForOrder(orderId: number) {
    // Check if the order exists
    const orderExists = await Order.query().findById(orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return OrderLog.query().where({ orderId });
  }

  async findOrderLogById(orderId: number, logId: number) {
    // Check if the order exists
    const orderExists = await Order.query().findById(orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const orderLog = await OrderLog.query()
      .where({ id: logId, orderId })
      .first();
    if (!orderLog) {
      throw new NotFoundException(
        `OrderLog with ID ${logId} not found for order ${orderId}`,
      );
    }

    return orderLog;
  }

  async updateOrderLog(
    orderId: number,
    logId: number,
    updateDto: UpdateOrderLogDto,
  ) {
    // Check if the order and order log exist
    const orderExists = await Order.query().findById(orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const orderLog = await OrderLog.query().findById(logId);
    if (!orderLog || orderLog.orderId !== orderId) {
      throw new NotFoundException(
        `OrderLog with ID ${logId} not found for order ${orderId}`,
      );
    }

    return OrderLog.query().patchAndFetchById(logId, updateDto);
  }

  async deleteOrderLog(orderId: number, logId: number) {
    // Check if the order and order log exist
    const orderExists = await Order.query().findById(orderId);
    if (!orderExists) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const orderLog = await OrderLog.query().findById(logId);
    if (!orderLog || orderLog.orderId !== orderId) {
      throw new NotFoundException(
        `OrderLog with ID ${logId} not found for order ${orderId}`,
      );
    }

    await OrderLog.query().deleteById(logId);
  }
}
