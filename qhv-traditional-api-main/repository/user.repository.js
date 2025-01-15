const knex = require("../config/database.js");

module.exports.getUserByName = userName => {
  return knex("accounts").where({ user_name: userName }).first();
};

module.exports.findById = id => {
  return knex("accounts").where({ id: id }).first();
};

module.exports.findAll = async ({ page, pageSize, name }) => {
  try {
    const offset = (page - 1) * pageSize;

    // Base query
    let query = knex("accounts").where({ deleted_flag: false }).limit(pageSize).offset(offset);
    let countQuery = knex("accounts").count({ count: "*" }).where({ deleted_flag: false }).first();

    // Apply name filter if provided
    if (name) {
      query = query.where("name", "like", `%${name}%`);
      countQuery = countQuery.where("name", "like", `%${name}%`);
    }

    const data = await query.orderBy("id", "asc");
    const totalRecords = await countQuery;

    return {
      data,
      pagination: {
        totalRecords: parseInt(totalRecords.count, 10),
        totalPages: Math.ceil(totalRecords.count / pageSize),
        currentPage: parseInt(page, 10),
        pageSize: parseInt(pageSize, 10)
      }
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.update = body => {
  return knex("accounts")
    .where({ id: body.id })
    .update({ name: body.name, phone: body.phone, email: body.email })
    .returning(["id", "name", "phone", "email", "created_at"]);
};

module.exports.updatePassword = body => {
  return knex("accounts")
    .where({ id: body.id })
    .update({
      password: body.password
    })
    .returning("*");
};

module.exports.insert = body => {
  return knex("accounts")
    .insert({
      name: body.name,
      user_name: body.user_name,
      password: body.password,
      email: body.email,
      phone: body.phone
    })
    .returning("*");
};

module.exports.delete = async id => {
  return knex("accounts")
    .where({ id: id })
    .update({
      deleted_flag: true
    })
    .returning("*");
};

module.exports.createAudit = body => {
  return knex("audit").insert({
    user_id: body.user_id,
    activity: body.activity
  });
};

module.exports.getAllAudit = async ({ page, pageSize }) => {
  try {
    const offset = (page - 1) * pageSize;

    // Base query
    let query = knex("audit")
      .leftJoin("accounts", "accounts.id", "audit.user_id")
      .select("audit.created_at", "accounts.name", "audit.activity")
      .limit(pageSize)
      .offset(offset);
    let countQuery = knex("audit").count({ count: "*" }).first();

    const data = await query.orderBy("audit.created_at", "desc");
    const totalRecords = await countQuery;

    return {
      data,
      pagination: {
        totalRecords: parseInt(totalRecords.count, 10),
        totalPages: Math.ceil(totalRecords.count / pageSize),
        currentPage: parseInt(page, 10),
        pageSize: parseInt(pageSize, 10)
      }
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};
