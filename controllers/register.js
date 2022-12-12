const { register } = require("../services/auth");

module.exports = {
  get(req, res) {
    res.render("register");
  },
  async post(req, res) {
    let { username, password, repeatPassword } = req.body;

    username = username.trim();
    password = password.trim();
    repeatPassword = repeatPassword.trim();

    try {
      if (!password) {
        throw new Error("Password is required");
      } else if (password !== repeatPassword) {
        throw new Error("Passwords don't match");
      }

      const user = await register(username, password);

      req.session.user = {
        id: user._id,
        username: user.username,
      };

      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.render("register");
    }
  },
};
