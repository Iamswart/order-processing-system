import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import CalculatedOrder from '../models/calculatedOrder.model';
import Meal from '../models/meal.model';
import Addon from '../models/addon.model';

@Injectable()
export class CalculatedOrderService {
  async createCalculatedOrder(createDto: CreateCalculatedOrderDto) {
    let totalAmount = createDto.serviceCharge;

    if (!createDto.freeDelivery) {
      totalAmount += createDto.deliveryFee;
    }

    const mealDetailsArray = [];

    for (const mealDetail of createDto.mealDetails) {
      const meal = await Meal.query().findById(mealDetail.mealId);
      if (!meal) {
        throw new NotFoundException(
          `Meal with ID ${mealDetail.mealId} not found`,
        );
      }
      totalAmount += Number(meal.amount) * Number(mealDetail.quantity);

      const addonsArray = [];

      for (const addonDetail of mealDetail.addons) {
        const addon = await Addon.query().findById(addonDetail.addonId);
        if (!addon) {
          throw new NotFoundException(
            `Addon with ID ${addonDetail.addonId} not found`,
          );
        }
        totalAmount += Number(addon.amount);

        addonsArray.push({ addonId: addon.id, addonAmount: addon.amount });
      }

      mealDetailsArray.push({
        mealId: meal.id,
        quantity: mealDetail.quantity,
        addons: addonsArray,
      });
    }

    const calculatedOrderData = {
      totalAmount,
      deliveryFee: createDto.deliveryFee,
      serviceCharge: createDto.serviceCharge,
      freeDelivery: createDto.freeDelivery,
      addressDetails: createDto.addressDetails,
      mealDetails: JSON.stringify(mealDetailsArray),
    };

    const createdOrder =
      await CalculatedOrder.query().insert(calculatedOrderData);
    const responseOrder = {
      ...createdOrder,
      mealDetails: mealDetailsArray,
    };

    return responseOrder;
  }

  async findAllCalculatedOrders() {
    return CalculatedOrder.query();
  }

  async findCalculatedOrderById(id: number) {
    const order = await CalculatedOrder.query().findById(id);
    if (!order) {
      throw new NotFoundException(`CalculatedOrder with ID ${id} not found`);
    }
    return order;
  }

  async updateCalculatedOrder(
    id: number,
    updateDto: UpdateCalculatedOrderDto,
  ): Promise<CalculatedOrder> {
    const existingOrder = await CalculatedOrder.query().findById(id);
    if (!existingOrder) {
      throw new NotFoundException(`CalculatedOrder with ID ${id} not found`);
    }

    let totalAmount = updateDto.serviceCharge;

    if (!updateDto.freeDelivery) {
      totalAmount += updateDto.deliveryFee;
    }

    for (const mealDetail of updateDto.mealDetails) {
      const meal = await Meal.query().findById(mealDetail.mealId);
      if (!meal) {
        throw new NotFoundException(
          `Meal with ID ${mealDetail.mealId} not found`,
        );
      }
      totalAmount += Number(meal.amount) * Number(mealDetail.quantity);

      for (const addonDetail of mealDetail.addons) {
        const addon = await Addon.query().findById(addonDetail.addonId);
        if (!addon) {
          throw new NotFoundException(
            `Addon with ID ${addonDetail.addonId} not found`,
          );
        }
        totalAmount += Number(addon.amount);
      }
    }

    const updatedOrder = await CalculatedOrder.query().patchAndFetchById(id, {
      ...updateDto,
      totalAmount,
      mealDetails:
        typeof updateDto.mealDetails === 'string'
          ? updateDto.mealDetails
          : JSON.stringify(updateDto.mealDetails),
    });

    if (typeof updatedOrder.mealDetails === 'string') {
      updatedOrder.mealDetails = JSON.parse(updatedOrder.mealDetails);
    }

    return updatedOrder;
  }

  async deleteCalculatedOrder(id: number) {
    const rowsDeleted = await CalculatedOrder.query().deleteById(id);
    if (rowsDeleted === 0) {
      throw new NotFoundException(`CalculatedOrder with ID ${id} not found`);
    }
  }
}
