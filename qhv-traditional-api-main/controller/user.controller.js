const Formatter = require("response-format");
const Repository = require("../repository/user.repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports.findAll = async (req, res) => {
  const { page, pageSize, name } = req.query;
  let items = await Repository.findAll({ page, pageSize, name });
  return res.json(Formatter.success(null, items));
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  let user = await Repository.findById(id);
  if (!user) return res.json(Formatter.notFound());
  delete user.password;
  return res.json(Formatter.success(null, user));
};

module.exports.getUserInfo = async (req, res) => {
  const token = req.header("authorization").split(" ")[1];
  const decodeObject = jwt.decode(token);
  let user = await Repository.findById(decodeObject.id);
  if (!user) return res.json(Formatter.notFound());
  delete user.password;
  return res.json(Formatter.success(null, user));
};

module.exports.insert = async (req, res) => {
  let body = req.body;

  // Check user exist
  const user = await Repository.getUserByName(body.user_name);
  if (user) return res.status(400).json({ error: "Người dùng đã tồn tại" });

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);

  // Insert user
  let items = await Repository.insert(body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.updateName = async (req, res) => {
  let body = req.body;
  let items = await Repository.updateName(body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.update = async (req, res) => {
  let body = req.body;
  let items = await Repository.update(body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.updatePassword = async (req, res) => {
  let body = req.body;
  // Hash password
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(body.password, salt);

  let items = await Repository.updatePassword(body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Repository.delete(id);
  return res.json(Formatter.success());
};

module.exports.getListAudit = async (req, res) => {
  const { page, pageSize } = req.query;
  let items = await Repository.getAllAudit({ page, pageSize });
  return res.json(Formatter.success(null, items));
};

module.exports.createAudit = async (req, res) => {
  const token = req.header("authorization").split(" ")[1];
  const decodeObject = jwt.decode(token);
  const body = {
    user_id: decodeObject.id,
    activity: req.body.activity
  };
  await Repository.createAudit(body);
  return res.json(Formatter.success());
};
