
exports.up = function(knex, Promise) {
  return  knex.schema.createTable('account', function(table) {
    table.increments('account_id');
    table.string('first_name').notNullable;
    table.string('last_name').notNullable;
    table.string('username').notNullable;
    table.string('password').notNullable;
    table.string('email').notNullable;
    table.integer('phone');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('company_id').references('company.company_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.dropTable('company');
};
