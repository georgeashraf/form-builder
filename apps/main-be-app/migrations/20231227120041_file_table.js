/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('file', function (table) {
      table.increments('id').primary();
      table.uuid('key').defaultTo(knex.raw('(UUID())'));
      table.string('fieldName', 255).notNullable();
      table.string('originalName', 255).notNullable();
      table.string('encoding', 255).notNullable();
      table.string('mimeType', 255).notNullable();
      table.string('destination', 255).notNullable();
      table.string('fileName', 255).notNullable();
      table.string('path', 255).notNullable();
      table.integer('size').notNullable();
      table
        .dateTime('updatedAt')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.dateTime('createdAt').defaultTo(knex.fn.now());
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('file').catch((err) => {
    console.error(err);
    throw err;
  });
};
