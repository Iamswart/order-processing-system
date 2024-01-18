import { Model } from 'objection';
import Meal from './meal.model';

export default class Brand extends Model {
  static tableName = 'brands';

  // Define properties as per the sample data
  id!: number;
  name!: string;
  createdAt?: Date;
  updatedAt?: Date;
  // Additional properties can be added here if available

  // Relationship mappings
  static relationMappings = {
    meals: {
      relation: Model.HasManyRelation,
      modelClass: Meal,
      join: {
        from: 'brands.id',
        to: 'meals.brandId',
      },
    },
    // If there are other relationships relevant to the Brand model, they can be added here.
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
