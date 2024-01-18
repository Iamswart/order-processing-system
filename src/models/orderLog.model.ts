import { Model } from 'objection';
import Order from './order.model';

export default class OrderLog extends Model {
  static tableName = 'order_logs';

  // Updated field types if needed
  id!: number; // or number, depending on your ID strategy
  orderId!: number; // or number, matching the Order model's ID type
  time!: Date; // Using Date type for timestamp
  description!: string;

  // Relationship mappings
  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'order_logs.orderId',
        to: 'orders.id',
      },
    },
    // Additional relations if necessary
  };

  // Additional methods and virtual properties can be added here
}
