/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_types', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('name').notNullable(); // Order type name
    table.dateTime('createdAt').defaultTo(knex.fn.now()); // Creation timestamp
    table.dateTime('updatedAt').defaultTo(knex.fn.now()); // Update timestamp
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('order_types'); // Drops the 'order_types' table if it exists
};
