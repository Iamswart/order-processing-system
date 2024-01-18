/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.boolean('completed').defaultTo(false);
    table.boolean('cancelled').defaultTo(false);
    table.boolean('kitchenCancelled').defaultTo(false);
    table.boolean('kitchenAccepted').defaultTo(false);
    table.boolean('kitchenDispatched').defaultTo(false);
    table.dateTime('kitchenDispatchedTime').nullable();
    table.dateTime('completedTime').nullable();
    table
      .integer('riderId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.boolean('kitchenPrepared').defaultTo(false);
    table.boolean('riderAssigned').defaultTo(false);
    table.boolean('paid').defaultTo(false);
    table.string('orderCode').notNullable();
    table.string('orderChange').nullable();
    table
      .integer('calculatedOrderId')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('calculated_orders')
      .onDelete('SET NULL');
    table.dateTime('createdAt').defaultTo(knex.fn.now());
    table.dateTime('updatedAt').defaultTo(knex.fn.now());
    table.dateTime('kitchenVerifiedTime').nullable();
    table.dateTime('kitchenCompletedTime').nullable();
    table.boolean('shopAccepted').defaultTo(false);
    table.boolean('shopPrepared').defaultTo(false);
    table.integer('noOfMealbagsDelivered').defaultTo(0);
    table.integer('noOfDrinksDelivered').defaultTo(0);
    table.dateTime('riderStartedTime').nullable();
    table.boolean('riderStarted').defaultTo(false);
    table.dateTime('riderArrivedTime').nullable();
    table.boolean('riderArrived').defaultTo(false);
    table.boolean('isFailedTrip').defaultTo(false);
    table.json('failedTripDetails').nullable();
    table.string('boxNumber').notNullable();
    table.string('shelfId').nullable();
    table.json('orderTotalAmountHistory').nullable();
    table.boolean('scheduled').defaultTo(false);
    table
      .integer('confirmedById')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table
      .integer('completedById')
      .unsigned()
      .nullable()
      .references('id')
      .inTable('users')
      .onDelete('SET NULL');
    table.dateTime('scheduledDeliveryDate').nullable();
    table.dateTime('scheduledDeliveryTime').nullable();
    table.boolean('isHidden').defaultTo(false);
    table.string('lat').nullable();
    table.string('lng').nullable();
    table.boolean('pickup').defaultTo(false);
    table.string('prevPrice').nullable();
    table
      .integer('orderTypeId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('order_types')
      .onDelete('RESTRICT');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
