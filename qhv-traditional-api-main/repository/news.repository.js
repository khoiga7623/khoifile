const knex = require("../config/database.js");

module.exports.findAll = async ({ page, pageSize, title }) => {
  try {
    const offset = (page - 1) * pageSize;

    // Base query
    let query = knex("news")
      .leftJoin("accounts", "news.user_id", "accounts.id")
      .select("news.*", "accounts.name as user_name")
      .limit(pageSize)
      .offset(offset);
    let countQuery = knex("news").count({ count: "*" }).first();

    // Apply title filter if provided
    if (title) {
      query = query.where("news.title", "like", `%${title}%`);
      countQuery = countQuery.where("news.title", "like", `%${title}%`);
    }

    const data = await query.orderBy("news.published_at", "desc");
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

module.exports.findByUserId = async ({ page, pageSize, title, userId }) => {
  try {
    const offset = (page - 1) * pageSize;

    // Base query
    let query = knex("news")
      .leftJoin("accounts", "news.user_id", "accounts.id")
      .select("news.*", "accounts.name as user_name")
      .where("news.user_id", userId)
      .limit(pageSize)
      .offset(offset);
    let countQuery = knex("news").count({ count: "*" }).where("news.user_id", userId).first();

    // Apply title filter if provided
    if (title) {
      query = query.where("news.title", "like", `%${title}%`);
      countQuery = countQuery.where("news.title", "like", `%${title}%`);
    }

    const data = await query.orderBy("news.published_at", "desc");
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

module.exports.findById = id => {
  return knex("news")
    .leftJoin("accounts", "news.user_id", "accounts.id")
    .select("news.*", "accounts.name as user_name")
    .where("news.id", id)
    .first();
};

module.exports.update = body => {
  return knex("news")
    .where({ id: body.id })
    .update({
      title: body.title,
      content: body.content,
      published_at: body.published_at,
      thumbnail: body.thumbnail,
      sapo: body.sapo,
      files: body.files
    })
    .returning("*");
};

module.exports.updateStatus = body => {
  return knex("news")
    .where({ id: body.id })
    .update({
      status: body.status
    })
    .returning("*");
};

module.exports.insert = body => {
  return knex("news")
    .insert({
      title: body.title,
      content: body.content,
      published_at: body.published_at,
      user_id: body.user_id,
      thumbnail: body.thumbnail,
      sapo: body.sapo,
      files: body.files,
      status: "published"
    })
    .returning("*");
};

module.exports.delete = id => {
  return knex("news").where({ id: id }).del();
};
