import * as bcrypt from 'bcrypt';
import { Model } from 'objection';
import { Role } from './role.model';
import Order from './order.model';

export class User extends Model {
  static tableName = 'users';

  id!: number;
  username!: string;
  password!: string;
  roleId!: number;

  static relationMappings = {
    role: {
      relation: Model.BelongsToOneRelation,
      modelClass: Role,
      join: {
        from: 'users.roleId',
        to: 'roles.id',
      },
    },
    placedOrders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'users.id',
        to: 'orders.userId',
      },
    },
    riderOrders: {
      relation: Model.HasManyRelation,
      modelClass: Order,
      join: {
        from: 'users.id',
        to: 'orders.riderId',
      },
    },
  };

  async $beforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
