/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user', function (table) {
    table.increments('id').primary();
    table.uuid('key').defaultTo(knex.raw('(UUID())'));
    table.string('firstName', 255).notNullable();
    table.string('lastName', 255).notNullable();
    table.string('email', 255).unique().notNullable();
    table.string('password', 255).notNullable();
    table.integer('avatarId').unsigned().references('id').inTable('file');
    table.dateTime('lastLogin').defaultTo(null);
    table.boolean('isActive').defaultTo(true);
    table.string('hashedRt').nullable();
    table
      .dateTime('updatedAt')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.dateTime('createdAt').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user');
};
