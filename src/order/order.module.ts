import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderLogModule } from 'src/order-log/order-log.module';

@Module({
  imports: [OrderLogModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
