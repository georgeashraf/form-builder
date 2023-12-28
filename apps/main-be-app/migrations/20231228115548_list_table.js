/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('list', function (table) {
    table.increments('id').primary();
    table.uuid('key').defaultTo(knex.raw('(UUID())'));
    table.string('group', 255).notNullable();
    table.string('label', 255).nullable();
    table.string('value', 255).nullable();
    table.jsonb('jsonValue').nullable();
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
  return knex.schema.dropTableIfExists('list');
};
