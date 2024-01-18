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
import { OrderLogService } from './order-log.service';
import { CreateOrderLogDto } from './dto/create-order-log.dto';
import { UpdateOrderLogDto } from './dto/update-order-log.dto';

@Controller('orders/:orderId/logs')
export class OrderLogController {
  constructor(private readonly orderLogService: OrderLogService) {}

  @Post()
  create(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() createDto: CreateOrderLogDto,
  ) {
    return this.orderLogService.createOrderLog(orderId, createDto);
  }

  @Get()
  findAll(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderLogService.findAllOrderLogsForOrder(orderId);
  }

  @Get(':logId')
  findOne(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('logId', ParseIntPipe) logId: number,
  ) {
    return this.orderLogService.findOrderLogById(orderId, logId);
  }

  @Put(':logId')
  update(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('logId', ParseIntPipe) logId: number,
    @Body() updateDto: UpdateOrderLogDto,
  ) {
    return this.orderLogService.updateOrderLog(orderId, logId, updateDto);
  }

  @Delete(':logId')
  remove(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Param('logId', ParseIntPipe) logId: number,
  ) {
    return this.orderLogService.deleteOrderLog(orderId, logId);
  }
}
