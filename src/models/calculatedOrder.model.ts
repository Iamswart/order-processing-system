import { Model } from 'objection';
import Order from './order.model';
import Meal from './meal.model';

export default class CalculatedOrder extends Model {
  static tableName = 'calculated_orders';

  // Define properties based on the sample data
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
  mealDetails!: Array<{
    mealId: number;
    quantity: number;
    addons: Array<{
      addonId: number;
    }>;
  }>;

  // Relationship mappings
  static relationMappings = {
    order: {
      relation: Model.HasOneRelation,
      modelClass: Order,
      join: {
        from: 'calculated_orders.id',
        to: 'orders.calculated_order_id',
      },
    },
    meals: {
      relation: Model.ManyToManyRelation,
      modelClass: Meal,
      join: {
        from: 'calculated_orders.id',
        through: {
          from: 'calculated_orders_meals.calculatedOrderId',
          to: 'calculated_orders_meals.mealId',
        },
        to: 'meals.id',
      },
    },
    // Additional relations can be defined here if needed
  };

  // Any additional methods or virtual properties can be added here.
}
