import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AddonsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';

@Controller('meals/:mealId/addons')
export class AddonsController {
  constructor(private readonly addonsService: AddonsService) {}

  @Post()
  create(
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() createAddonDto: CreateAddonDto,
  ) {
    return this.addonsService.createAddon(mealId, createAddonDto);
  }

  @Get()
  findAll(@Param('mealId', ParseIntPipe) mealId: number) {
    return this.addonsService.getAllAddonsForMeal(mealId);
  }

  @Get(':id')
  findOne(
    @Param('mealId', ParseIntPipe) mealId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addonsService.getAddonById(mealId, id);
  }

  @Patch(':id')
  update(
    @Param('mealId', ParseIntPipe) mealId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.updateAddon(mealId, id, updateAddonDto);
  }

  @Delete(':id')
  remove(
    @Param('mealId', ParseIntPipe) mealId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.addonsService.deleteAddonById(mealId, id);
  }
}
