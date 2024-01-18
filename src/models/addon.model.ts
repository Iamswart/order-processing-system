import { Model } from 'objection';
import Meal from './meal.model';

export default class Addon extends Model {
  static tableName = 'addons';

  // Define properties based on the sample data
  id!: number;
  amount!: number;
  mealId!: number;
  mealDataId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  internalProfit!: number;
  minSelectionNo!: number;
  // Assuming meal_addon_category_id is a reference to a category, if such a model exists
  // mealAddonCategoryId?: string;

  // Relationship mappings
  static relationMappings = {
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: Meal,
      join: {
        from: 'addons.mealId',
        to: 'meals.id',
      },
    },
    // Additional relations can be added if there are other relevant entities
  };

  // Any additional methods or virtual properties can be added here if needed.

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
