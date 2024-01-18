import { Model } from 'objection';
import Brand from './brand.model';
import Addon from './addon.model';

export default class Meal extends Model {
  static tableName = 'meals';

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
  };

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
