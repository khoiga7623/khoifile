const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user.repository");
const Formatter = require("response-format");

module.exports.login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await UserRepository.getUserByName(userName);

  if (!user) return res.status(400).json({ error: "Người dùng không tồn tại" });

  let resultCompare = await bcrypt.compare(password, user.password);
  if (!resultCompare) {
    return res.status(400).json({
      error: "Mật khẩu không đúng"
    });
  }

  const jwtSecret = process.env.JWT_SECRET;
  const token = jwt.sign(user, jwtSecret, {});
  return res.json(Formatter.success(null, { token: token, id: user.id, name: user.name }));
};
