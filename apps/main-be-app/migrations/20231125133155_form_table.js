/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('form', function (table) {
      table.increments('id').primary();
      table.uuid('key').defaultTo(knex.raw('(UUID())'));
      table.string('name', 255).notNullable().unique();
      table
        .integer('requestId')
        .unsigned()
        .references('id')
        .inTable('request')
        .onDelete('cascade');
      table.jsonb('uiSchema').notNullable();
      table.jsonb('dataSchema').notNullable();
      table.boolean('isPublished').defaultTo(false);
      table
        .dateTime('updatedAt')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.dateTime('createdAt').defaultTo(knex.fn.now());
      table.dateTime('publishedAt').defaultTo(null);
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
  return knex.schema.dropTableIfExists('form');
};
