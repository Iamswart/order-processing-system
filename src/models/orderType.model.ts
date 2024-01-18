import { Model } from 'objection';
import Order from './order.model'; // Assuming you have an Order model

export default class OrderType extends Model {
  static tableName = 'order_types';

  // Define properties as per the sample data
  id!: number;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;

  // Additional properties can be added here if available

  // Relationship mappings
  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'order_types.id',
        to: 'orders.orderTypeId', // Adjust the 'orderTypeId' based on your actual Order model's schema
      },
    },
    // If there are other relationships relevant to the OrderType model, they can be added here.
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
