import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BrandsModule } from './brands/brands.module';
import { MealsModule } from './meals/meals.module';
import { AddonsModule } from './addons/addons.module';
import { OrderTypesModule } from './order-types/order-types.module';
import { CalculatedOrderModule } from './calculated-order/calculated-order.module';
import { OrderModule } from './order/order.module';
import { OrderLogModule } from './order-log/order-log.module';
import { AuthModule } from './auth/auth.module';
import { RequestLoggingMiddleware } from './requestLogging.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    BrandsModule,
    MealsModule,
    AddonsModule,
    OrderTypesModule,
    CalculatedOrderModule,
    OrderModule,
    OrderLogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
