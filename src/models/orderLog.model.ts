import { Model } from 'objection';
import Order from './order.model';

export default class OrderLog extends Model {
  static tableName = 'order_logs';

  id!: number;
  orderId!: number;
  time!: Date;
  description!: string;

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'order_logs.orderId',
        to: 'orders.id',
      },
    },
  };
}
