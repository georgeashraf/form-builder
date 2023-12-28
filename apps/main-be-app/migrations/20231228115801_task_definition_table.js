/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('task_definition', function (table) {
    table.increments('id').primary();
    table.uuid('key').defaultTo(knex.raw('(UUID())'));
    table.jsonb('schema').notNullable();
    table.string('type', 255).notNullable();
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
  return knex.schema.dropTableIfExists('task_definition');
};
