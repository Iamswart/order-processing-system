/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await knex('users').insert([
    { username: 'admin', password: hashedPassword, roleId: 1 },
    { username: 'user', password: hashedPassword, roleId: 2 },
    { username: 'rider', password: hashedPassword, roleId: 3 },
  ]);
};
