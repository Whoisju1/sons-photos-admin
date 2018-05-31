
exports.up = function(knex, Promise) {
  return knex.schema.createTable('photo', function (table) {
    table.increments('photo_id');
    table.text('url').notNullable;
    table.text('description');
    table.integer('gallery_id').references('gallery.gallery_id').notNullable;
    table.integer('click_count').defaultTo(0).notNullable;
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photo');
};
