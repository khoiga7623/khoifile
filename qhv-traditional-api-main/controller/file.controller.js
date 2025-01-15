const Formatter = require("response-format");
const fs = require("fs-extra");
var shell = require("shelljs");
var dir = process.env.FILE_DIRECTORY;

module.exports.uploadFile = async (req, res) => {
  if (!fs.pathExistsSync(dir)) shell.mkdir("-p", dir);
  const fileName = `${Date.now()}_${req.file.originalname}`;
  const path = `${dir}/${fileName}`;
  fs.renameSync(`${dir}/${req.file.originalname}`, path);
  res.json(Formatter.success(null, fileName));
};

module.exports.downFile = (req, res) => {
  const path = `${dir}/${req.params.path}`;
  if (fs.pathExistsSync(path)) res.sendFile(path);
  else res.json(Formatter.badRequest());
};

module.exports.deleteFile = async (req, res) => {
  try {
    const path = `${dir}/${req.params.path}`;
    fs.removeSync(path);
    res.json(Formatter.success());
  } catch (err) {
    res.json(Formatter.badRequest());
  }
};
