/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_logs', (table) => {
    table.increments('id').primary();
    table
      .integer('orderId')
      .unsigned()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE');
    table.dateTime('time').notNullable();
    table.string('description').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('order_logs');
};
