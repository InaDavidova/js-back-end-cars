const { register } = require("../services/auth");
const mapErrors = require("../util/mapErrors");

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
      } else if (password.length < 3) {
        const error = {
          name: "customError",
          field: "password",
          message: "Password has to be at least 3 characters!",
        };
        throw error;
      }

      const user = await register(username, password);

      req.session.user = {
        id: user._id,
        username: user.username,
      };

      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      console.log(errors);
      res.render("register", {
        errors,
        user: { username, password, repeatPassword },
      });
    }
  },
};
