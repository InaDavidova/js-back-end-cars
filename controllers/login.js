const { login } = require("../services/auth");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("login");
  },
  async post(req, res) {
    let { username, password } = req.body;

    username = username.trim();
    password = password.trim();

    try {
      const user = await login(username, password);

      req.session.user = {
        id: user._id,
        username: user.username,
      };

      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("login", { errors, user: { username, password } });
    }
  },
};
