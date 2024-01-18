import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('brands/:brandId/meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Post()
  create(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() createMealDto: CreateMealDto,
  ) {
    return this.mealsService.createMeal(brandId, createMealDto);
  }

  @Get()
  findAll(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.mealsService.getAllMealsByBrand(brandId);
  }

  @Get(':mealId')
  findOne(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('mealId', ParseIntPipe) mealId: number,
  ) {
    return this.mealsService.getMealById(brandId, mealId);
  }

  @Patch(':mealId')
  update(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() updateMealDto: UpdateMealDto,
  ) {
    return this.mealsService.updateMealById(mealId, brandId, updateMealDto);
  }

  @Delete(':mealId')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('mealId', ParseIntPipe) mealId: number,
  ) {
    return this.mealsService.deleteMealById(brandId, mealId);
  }
}
