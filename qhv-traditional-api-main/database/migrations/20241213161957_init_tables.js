exports.up = async function (knex) {
  await knex.schema.createTable("accounts", t => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.string("user_name").notNullable();
    t.string("password").notNullable();
    t.string("email");
    t.string("phone");
    t.boolean("deleted_flag").defaultTo(false);
    t.timestamps(true, true);
  });

  await knex.schema.createTable("news", t => {
    t.increments("id").primary();
    t.string("title").notNullable();
    t.string("sapo", 10000).notNullable();
    t.string("content", 10000).notNullable();
    t.text("thumbnail");
    t.timestamp("published_at").notNullable();
    t.json("files");
    t.text("status").notNullable();
    t.timestamps(true, true);
    t.integer("user_id").unsigned().notNullable();
    t.foreign("user_id").references("accounts.id");
  });

  await knex.schema.createTable("audit", t => {
    t.increments("id").primary();
    t.string("activity").notNullable();
    t.timestamps(true, true);
    t.integer("user_id").unsigned().notNullable();
    t.foreign("user_id").references("accounts.id");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("accounts");
  await knex.schema.dropTable("news");
  await knex.schema.dropTable("audit");
};
