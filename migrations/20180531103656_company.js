
exports.up = function(knex, Promise) {
  return knex.schema.createTable('company', function (table) {
    table.increments('company_id');
    table.string('name').notNullable;
    table.text('logo');
    table.string('motto');
    table.string('email');
    table.integer('phone');
    table.text('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('company');
};
