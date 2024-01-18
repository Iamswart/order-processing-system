import { Module } from '@nestjs/common';
import { OrderTypeService } from './order-types.service';
import { OrderTypeController } from './order-types.controller';

@Module({
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
})
export class OrderTypesModule {}
