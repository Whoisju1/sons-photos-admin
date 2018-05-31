
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gallery', function (table) {
    table.increments('gallery_id');
    table.string('title').notNullable;
    table.text('description');
    table.integer('click_count').defaultTo(0).notNullable;
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gallery');
};
