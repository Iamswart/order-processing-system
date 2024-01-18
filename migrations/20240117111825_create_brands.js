/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('brands', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('name').notNullable(); // Brand name, cannot be null
    table.dateTime('createdAt').defaultTo(knex.fn.now()); // Timestamp for when the record was created
    table.dateTime('updatedAt').defaultTo(knex.fn.now()); // Timestamp for when the record was last updated
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('brands'); // Drops the 'brands' table
};
