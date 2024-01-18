import { Model } from 'objection';
import Brand from './brand.model';
import Addon from './addon.model';
// import CalculatedOrder from './calculatedOrder.model';

export default class Meal extends Model {
  static tableName = 'meals';

  // Define properties based on the sample data
  id!: number;
  name!: string;
  brandId!: number;
  active!: boolean;
  amount!: number;
  images!: string;
  description?: string;
  calories?: string;
  isAddon!: boolean;
  isCombo!: boolean;
  alcohol!: boolean;
  itemType!: string;
  mealTags?: string[];
  createdAt!: Date;
  updatedAt!: Date;
  isDeleted!: boolean;
  minimumAge!: number;
  availableNo!: number;
  internalProfit!: number;
  // Additional fields as per the sample data

  // Relationship mappings
  static relationMappings = {
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: Brand,
      join: {
        from: 'meals.brandId',
        to: 'brands.id',
      },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: Addon,
      join: {
        from: 'meals.id',
        to: 'addons.mealId',
      },
    },
    // calculatedOrders: {
    //   relation: Model.ManyToManyRelation,
    //   modelClass: CalculatedOrder,
    //   join: {
    //     from: 'meals.id',
    //     // Assuming there's a junction table for meals and calculated_orders
    //     through: {
    //       from: 'calculated_orders_meals.mealId',
    //       to: 'calculated_orders_meals.calculatedOrderId',
    //     },
    //     to: 'calculated_orders.id',
    //   },
    // },
    // Additional relations can be defined here if needed
  };

  // Additional methods and virtual properties can be added here if necessary.

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
