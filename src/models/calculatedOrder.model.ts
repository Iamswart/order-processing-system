import { Model } from 'objection';
import Order from './order.model';

export default class CalculatedOrder extends Model {
  static tableName = 'calculated_orders';

  id!: number;
  totalAmount!: number;
  freeDelivery!: boolean;
  deliveryFee!: number;
  serviceCharge!: number;
  addressDetails!: {
    city: string;
    name: string;
    addressLine: string;
    buildingNumber: string;
  };
  mealDetails!: string;

  static relationMappings = {
    order: {
      relation: Model.HasOneRelation,
      modelClass: Order,
      join: {
        from: 'calculated_orders.id',
        to: 'orders.calculated_order_id',
      },
    },
  };
}
