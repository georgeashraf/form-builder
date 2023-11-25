/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('request', function (table) {
      table.increments('id').primary();
      table.uuid('key').defaultTo(knex.raw('(UUID())'));
      table.string('label', 255).notNullable();
      table.string('name', 255).notNullable().unique();
      table.text('description', 'TEXT').nullable();
      table.string('creator').notNullable();
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
  return knex.schema.dropTableIfExists('request');
};
