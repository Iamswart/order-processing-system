import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import CalculatedOrder from '../models/calculatedOrder.model';

@Injectable()
export class CalculatedOrderService {
  async createCalculatedOrder(createDto: CreateCalculatedOrderDto) {
    // InsertGraph allows for insertion of related models
    return CalculatedOrder.query().insertGraph(createDto);
  }

  async findAllCalculatedOrders() {
    // Fetch all calculated orders, possibly with related data if needed
    return CalculatedOrder.query();
  }

  async findCalculatedOrderById(id: number) {
    const order = await CalculatedOrder.query().findById(id);
    if (!order) {
      throw new NotFoundException(`CalculatedOrder with ID ${id} not found`);
    }
    return order;
  }

  async updateCalculatedOrder(id: number, updateDto: UpdateCalculatedOrderDto) {
    const updatedOrder = await CalculatedOrder.query().findById(id);
    if (!updatedOrder) {
      throw new NotFoundException(`CalculatedOrder with ID ${id} not found`);
    }

    // UpdateGraph can be used if there are relations that also need to be updated
    return CalculatedOrder.query().updateAndFetchById(id, updateDto);
  }

  async deleteCalculatedOrder(id: number) {
    const rowsDeleted = await CalculatedOrder.query().deleteById(id);
    if (rowsDeleted === 0) {
      throw new NotFoundException(`CalculatedOrder with ID ${id} not found`);
    }
  }
}
