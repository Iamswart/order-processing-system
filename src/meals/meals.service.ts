import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Meal from '../models/meal.model';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import Brand from 'src/models/brand.model';
import { isNameUnique } from '../common/validations/isUnique.validations';

@Injectable()
export class MealsService {
  async createMeal(brandId: number, createMealDto: CreateMealDto) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} does not exist`);
    }

    if (
      !(await isNameUnique(Meal, createMealDto.name, undefined, { brandId }))
    ) {
      throw new BadRequestException(
        `Meal with name ${createMealDto.name} already exists for this brand`,
      );
    }

    return Meal.query().insert({ ...createMealDto, brandId });
  }

  async getAllMealsByBrand(brandId: number) {
    const brandExists = await Brand.query().findById(brandId);
    if (!brandExists) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    return Meal.query().where('brandId', brandId);
  }

  async getMealById(brandId: number, mealId: number) {
    const brandExists = await Brand.query().findById(brandId);
    if (!brandExists) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }

    const meal = await Meal.query()
      .where('id', mealId)
      .andWhere('brandId', brandId)
      .first();

    if (!meal) {
      throw new NotFoundException(
        `Meal with ID ${mealId} not found under brand ID ${brandId}`,
      );
    }

    return meal;
  }

  async updateMealById(
    id: number,
    brandId: number,
    updateMealDto: UpdateMealDto,
  ) {
    const meal = await Meal.query()
      .where('id', id)
      .andWhere('brandId', brandId)
      .first();

    if (!meal) {
      throw new NotFoundException(
        `Meal with ID ${id} under brand ID ${brandId} not found`,
      );
    }

    if (updateMealDto.name && updateMealDto.name !== meal.name) {
      const isUnique = await isNameUnique(Meal, updateMealDto.name, id, {
        brandId: meal.brandId,
      });
      if (!isUnique) {
        throw new BadRequestException(
          `Meal with name ${updateMealDto.name} already exists for this brand`,
        );
      }
    }

    if (updateMealDto.availableNo === 0) {
      updateMealDto.active = false;
    }

    return Meal.query().patchAndFetchById(id, updateMealDto);
  }

  async deleteMealById(brandId: number, mealId: number) {
    const meal = await Meal.query().where({ id: mealId, brandId }).first();

    if (!meal) {
      throw new NotFoundException(
        `Meal with ID ${mealId} under brand ID ${brandId} not found`,
      );
    }

    await Meal.query().deleteById(mealId);
  }
}
