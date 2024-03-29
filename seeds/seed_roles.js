/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('roles').del();

  await knex('roles').insert([
    { name: 'Admin' },
    { name: 'User' },
    { name: 'Rider' },
  ]);
};
