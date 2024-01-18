import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import OrderType from '../models/orderType.model';
import { CreateOrderTypeDto } from './dto/create-order-type.dto';
import { UpdateOrderTypeDto } from './dto/update-order-type.dto';
import { isNameUnique } from '../common/validations/isUnique.validations';

@Injectable()
export class OrderTypeService {
  async createOrderType(createDto: CreateOrderTypeDto) {
    // Check if the name is unique
    const unique = await isNameUnique(OrderType, createDto.name);
    if (!unique) {
      throw new ConflictException(
        `OrderType with name "${createDto.name}" already exists`,
      );
    }

    return OrderType.query().insert(createDto);
  }

  async findAllOrderTypes() {
    return OrderType.query();
  }

  async findOrderTypeById(id: number) {
    const orderType = await OrderType.query().findById(id);
    if (!orderType) {
      throw new NotFoundException(`OrderType with ID ${id} not found`);
    }
    return orderType;
  }

  async updateOrderType(id: number, updateDto: UpdateOrderTypeDto) {
    // Check if the name is unique, excluding the current id
    if (updateDto.name) {
      const unique = await isNameUnique(OrderType, updateDto.name, id);
      if (!unique) {
        throw new ConflictException(
          `OrderType with name "${updateDto.name}" already exists`,
        );
      }
    }

    const updatedOrderType = await OrderType.query().patchAndFetchById(
      id,
      updateDto,
    );
    if (!updatedOrderType) {
      throw new NotFoundException(`OrderType with ID ${id} not found`);
    }
    return updatedOrderType;
  }

  async deleteOrderType(id: number): Promise<void> {
    const rowsDeleted = await OrderType.query().deleteById(id);
    if (rowsDeleted === 0) {
      throw new NotFoundException(`OrderType with ID ${id} not found`);
    }
  }
}
