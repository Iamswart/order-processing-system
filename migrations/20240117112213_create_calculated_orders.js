/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return (
    knex.schema
      // Create the calculated_orders table
      .createTable('calculated_orders', (table) => {
        table.increments('id').primary();
        table.decimal('totalAmount', 14, 2).notNullable();
        table.boolean('freeDelivery').notNullable();
        table.decimal('deliveryFee', 14, 2).notNullable();
        table.decimal('serviceCharge', 14, 2).notNullable();
        table.json('addressDetails').notNullable();
      })
      // Create the junction table for calculated_orders and meals
      .createTable('calculated_orders_meals', (table) => {
        table
          .integer('calculatedOrderId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('calculated_orders')
          .onDelete('CASCADE');
        table
          .integer('mealId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('meals')
          .onDelete('CASCADE');
        table.integer('quantity').unsigned().notNullable();
        table.primary(['calculatedOrderId', 'mealId']); // Composite primary key
      })
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('calculated_orders_meals')
    .dropTableIfExists('calculated_orders');
};
