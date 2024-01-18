import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import Addon from '../models/addon.model';
import Meal from '../models/meal.model';

@Injectable()
export class AddonsService {
  async createAddon(mealId: number, createAddonDto: CreateAddonDto) {
    const meal = await Meal.query().findById(mealId);
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${mealId} not found`);
    }

    return Addon.query().insert({ ...createAddonDto, mealId });
  }

  async getAllAddonsForMeal(mealId: number) {
    const meal = await Meal.query().findById(mealId);
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${mealId} not found`);
    }

    return Addon.query().where({ mealId });
  }

  async getAddonById(mealId: number, id: number): Promise<Addon> {
    const addon = await Addon.query().where({ id, mealId }).first();
    if (!addon) {
      throw new NotFoundException(
        `Addon with ID ${id} not found under meal with ID ${mealId}`,
      );
    }
    return addon;
  }

  async updateAddon(
    mealId: number,
    id: number,
    updateAddonDto: UpdateAddonDto,
  ) {
    const meal = await Meal.query().findById(mealId);
    if (!meal) {
      throw new NotFoundException(`Meal with ID ${mealId} not found`);
    }

    const addon = await Addon.query().where({ id, mealId }).first();
    if (!addon) {
      throw new NotFoundException(
        `Addon with ID ${id} not found under meal with ID ${mealId}`,
      );
    }

    return Addon.query().patchAndFetchById(id, updateAddonDto);
  }

  async deleteAddonById(mealId: number, id: number): Promise<void> {
    const addon = await Addon.query().where({ id, mealId }).first();
    if (!addon) {
      throw new NotFoundException(
        `Addon with ID ${id} not found under meal with ID ${mealId}`,
      );
    }

    await Addon.query().deleteById(id);
  }
}
