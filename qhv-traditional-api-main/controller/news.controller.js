const Formatter = require("response-format");
const Repository = require("../repository/news.repository");
const jwt = require("jsonwebtoken");

module.exports.findAll = async (req, res) => {
  const { page, pageSize, title } = req.query;
  let items = await Repository.findAll({ page, pageSize, title });
  return res.json(Formatter.success(null, items));
};

module.exports.findByUserId = async (req, res) => {
  const token = req.header("authorization").split(" ")[1];
  const decodeObject = jwt.decode(token);
  const { page, pageSize, title, userId } = req.query;
  let items = await Repository.findByUserId({ page, pageSize, title, userId: userId || decodeObject.id });
  return res.json(Formatter.success(null, items));
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  let item = await Repository.findById(id);
  return res.json(Formatter.success(null, item));
};

module.exports.insert = async (req, res) => {
  const token = req.header("authorization").split(" ")[1];
  const decodeObject = jwt.decode(token);
  let body = {
    ...req.body,
    user_id: decodeObject.id
  };
  let items = await Repository.insert(body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.update = async (req, res) => {
  let items = await Repository.update(req.body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.updateStatus = async (req, res) => {
  let items = await Repository.updateStatus(req.body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Repository.delete(id);
  return res.json(Formatter.success());
};
