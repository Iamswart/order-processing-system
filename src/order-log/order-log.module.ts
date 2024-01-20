import { Module } from '@nestjs/common';
import { OrderLogService } from './order-log.service';
import { OrderLogController } from './order-log.controller';

@Module({
  controllers: [OrderLogController],
  providers: [OrderLogService],
  exports: [OrderLogService],
})
export class OrderLogModule {}
