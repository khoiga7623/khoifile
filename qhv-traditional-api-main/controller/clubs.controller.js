const Formatter = require("response-format");
const Repository = require("../repository/clubs.repository");

module.exports.findAll = async (req, res) => {
  let items = await Repository.findAll();
  return res.json(Formatter.success(null, items));
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  let item = await Repository.findById(id);
  return res.json(Formatter.success(null, item));
};

module.exports.insert = async (req, res) => {
  let items = await Repository.insert(req.body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.update = async (req, res) => {
  let items = await Repository.update(req.body);
  return res.json(Formatter.success(null, items[0]));
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  await Repository.delete(id);
  return res.json(Formatter.success());
};
