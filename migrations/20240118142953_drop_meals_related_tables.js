/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists('calculated_orders_meals_addons')
    .dropTableIfExists('calculated_orders_meals');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .createTable('calculated_orders_meals', () => {})
    .createTable('calculated_orders_meals_addons', () => {});
};
