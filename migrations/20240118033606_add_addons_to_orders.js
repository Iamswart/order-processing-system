/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('calculated_orders_meals_addons', (table) => {
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
    table
      .integer('addonId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('addons')
      .onDelete('CASCADE');
    table.primary(['calculatedOrderId', 'mealId', 'addonId']); // Composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('calculated_orders_meals_addons');
};
