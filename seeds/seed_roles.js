/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del();

  // Inserts seed entries
  await knex('roles').insert([
    { name: 'Admin' },
    { name: 'User' },
    { name: 'Rider' },
    // Add other roles as needed
  ]);
};
