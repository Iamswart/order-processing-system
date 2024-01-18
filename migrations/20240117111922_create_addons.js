/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('addons', (table) => {
    table.increments('id').primary();
    table.decimal('amount', 14, 2).notNullable();
    table
      .integer('mealId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');
    table
      .integer('mealDataId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('meals')
      .onDelete('CASCADE');
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.fn.now());
    table.decimal('internalProfit', 14, 2);
    table.integer('minSelectionNo').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('addons');
};
