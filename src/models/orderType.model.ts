import { Model } from 'objection';
import Order from './order.model';

export default class OrderType extends Model {
  static tableName = 'order_types';

  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'order_types.id',
        to: 'orders.orderTypeId',
      },
    },
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
