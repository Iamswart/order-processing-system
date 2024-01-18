/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('order_logs', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table
      .integer('orderId')
      .unsigned()
      .references('id')
      .inTable('orders')
      .onDelete('CASCADE'); // Foreign key to orders table
    table.dateTime('time').notNullable(); // Timestamp of the log entry
    table.string('description').notNullable(); // Description of the log entry

    // Add other fields if necessary
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('order_logs'); // Drops the 'order_logs' table if it exists
};
