import { Model } from 'objection';
import Meal from './meal.model';

export default class Addon extends Model {
  static tableName = 'addons';

  id!: number;
  amount!: number;
  mealId!: number;
  mealDataId!: number;
  createdAt!: Date;
  updatedAt!: Date;
  internalProfit!: number;
  minSelectionNo!: number;

  static relationMappings = {
    meal: {
      relation: Model.BelongsToOneRelation,
      modelClass: Meal,
      join: {
        from: 'addons.mealId',
        to: 'meals.id',
      },
    },
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
