import { Injectable, OnModuleInit } from '@nestjs/common';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile';

@Injectable()
export class DatabaseService implements OnModuleInit {
  onModuleInit() {
    const knex = Knex(knexConfig[process.env.NODE_ENV || 'development']);
    Model.knex(knex);
  }
}
