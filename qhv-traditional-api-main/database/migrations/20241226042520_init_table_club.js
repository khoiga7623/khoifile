exports.up = async function (knex) {
  await knex.schema.createTable("clubs", t => {
    t.increments("id").primary();
    t.string("name").notNullable();
    t.text("thumbnail");
    t.json("links");
    t.timestamps(true, true);
    t.integer("user_id").unsigned().notNullable();
    t.foreign("user_id").references("accounts.id");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable("clubs");
};
