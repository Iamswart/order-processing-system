import { Model } from 'objection';
import Meal from './meal.model';

export default class Brand extends Model {
  static tableName = 'brands';

  id!: number;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;

  static relationMappings = {
    meals: {
      relation: Model.HasManyRelation,
      modelClass: Meal,
      join: {
        from: 'brands.id',
        to: 'meals.brandId',
      },
    },
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
