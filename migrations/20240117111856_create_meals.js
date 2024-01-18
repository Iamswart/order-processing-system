/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('meals', (table) => {
    table.increments('id').primary();
    table
      .integer('brandId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE');
    table.string('name').notNullable();
    table.boolean('active').defaultTo(true);
    table.decimal('amount', 14, 2).notNullable();
    table.string('images');
    table.string('description');
    table.string('calories');
    table.boolean('isAddon').defaultTo(false);
    table.boolean('isCombo').defaultTo(false);
    table.boolean('alcohol').defaultTo(false);
    table.string('itemType').notNullable();
    table.json('mealTags');
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.fn.now());
    table.boolean('isDeleted').defaultTo(false);
    table.integer('minimumAge').defaultTo(0);
    table.integer('availableNo').defaultTo(0);
    table.decimal('internalProfit', 14, 2);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('meals');
};
