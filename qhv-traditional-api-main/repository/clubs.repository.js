const knex = require("../config/database.js");

module.exports.findAll = () => {
  return knex.select().from("clubs");
};

module.exports.findById = id => {
  return knex("clubs").where("clubs.id", id).first();
};

module.exports.update = body => {
  return knex("clubs")
    .where({ id: body.id })
    .update({
      name: body.name,
      thumbnail: body.thumbnail,
      links: body.links
    })
    .returning("*");
};

module.exports.insert = body => {
  return knex("clubs")
    .insert({
      name: body.name,
      thumbnail: body.thumbnail,
      links: body.links,
      user_id: body.user_id
    })
    .returning("*");
};

module.exports.delete = id => {
  return knex("clubs").where({ id: id }).del();
};
