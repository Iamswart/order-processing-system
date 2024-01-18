import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CalculatedOrderService } from './calculated-order.service';
import { CreateCalculatedOrderDto } from './dto/create-calculated-order.dto';
import { UpdateCalculatedOrderDto } from './dto/update-calculated-order.dto';

@Controller('calculated-orders')
export class CalculatedOrderController {
  constructor(
    private readonly calculatedOrderService: CalculatedOrderService,
  ) {}

  @Post()
  create(@Body() createDto: CreateCalculatedOrderDto) {
    return this.calculatedOrderService.createCalculatedOrder(createDto);
  }

  @Get()
  findAll() {
    return this.calculatedOrderService.findAllCalculatedOrders();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.calculatedOrderService.findCalculatedOrderById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCalculatedOrderDto,
  ) {
    return this.calculatedOrderService.updateCalculatedOrder(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.calculatedOrderService.deleteCalculatedOrder(id);
  }
}
