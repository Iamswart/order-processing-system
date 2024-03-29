import { Model } from 'objection';
import OrderLog from './orderLog.model';
import CalculatedOrder from './calculatedOrder.model';
import OrderType from './orderType.model';
import { User } from './user.model';

export default class Order extends Model {
  static tableName = 'orders';

  id!: number;
  userId!: number;
  completed!: boolean;
  cancelled!: boolean;
  kitchenCancelled!: boolean;
  kitchenAccepted!: boolean;
  kitchenDispatched!: boolean;
  kitchenDispatchedTime?: Date;
  completedTime?: Date;
  riderId!: number;
  kitchenPrepared!: boolean;
  riderAssigned!: boolean;
  paid!: boolean;
  orderCode!: string;
  orderChange?: string;
  calculatedOrderId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  kitchenVerifiedTime!: Date;
  kitchenCompletedTime!: Date;
  shopAccepted!: boolean;
  shopPrepared!: boolean;
  noOfMealbagsDelivered!: number;
  noOfDrinksDelivered!: number;
  riderStartedTime?: Date;
  riderStarted!: boolean;
  riderArrivedTime?: Date;
  riderArrived!: boolean;
  isFailedTrip!: boolean;
  failedTripDetails?: object;
  boxNumber!: string;
  shelfId?: string;
  orderTotalAmountHistory!: string;
  scheduled!: boolean;
  confirmedById?: number;
  completedById?: number;
  scheduledDeliveryDate?: Date;
  scheduledDeliveryTime?: Date;
  isHidden!: boolean;
  lat?: string;
  lng?: string;
  pickup!: boolean;
  prevPrice?: string;
  orderTypeId!: number;

  static relationMappings = {
    logs: {
      relation: Model.HasManyRelation,
      modelClass: OrderLog,
      join: {
        from: 'orders.id',
        to: 'order_logs.orderId',
      },
    },
    calculatedOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: CalculatedOrder,
      join: {
        from: 'orders.calculatedOrderId',
        to: 'calculated_orders.id',
      },
    },
    orderType: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderType,
      join: {
        from: 'orders.orderTypeId',
        to: 'order_types.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'orders.userId',
        to: 'users.id',
      },
    },
    rider: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'orders.riderId',
        to: 'users.id',
      },
    },
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
