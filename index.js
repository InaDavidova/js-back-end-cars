const express = require("express");
const hbs = require("express-handlebars");
const session = require("express-session");
const userSession = require("./middleware/userSession");

const { about } = require("./controllers/about");
const { logout } = require("./controllers/logout");
const { details } = require("./controllers/details");
const { home } = require("./controllers/home");
const { notFound } = require("./controllers/notFound");
const { delCar } = require("./controllers/delete");
const create = require("./controllers/create");
const createAccessory = require("./controllers/createAccessory");
const attachAccessory = require("./controllers/attachAccessory");
const login = require("./controllers/login");
const register = require("./controllers/register");
const update = require("./controllers/update");

const initDB = require("./models");
const { isLoggedIn } = require("./middleware/guards");

start();

async function start() {
  const app = express();

  await initDB();

  app.engine(
    "hbs",
    hbs.create({
      extname: ".hbs",
    }).engine
  );
  app.set("view engine", "hbs");

  app.use(express.urlencoded({ extended: true }));
  app.use("/static", express.static("static"));

  app.use(
    session({
      secret: "this is a secret",
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: "auto",
      },
    })
  );
  app.use(userSession());

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.get("/delete/:id", delCar);
  app.get("/logout", logout);

  app.route("/create/accessory")
    .get(isLoggedIn(), createAccessory.get)
    .post(isLoggedIn(), createAccessory.post);

  app.route("/create")
    .get(isLoggedIn(), create.get)
    .post(isLoggedIn(), create.post);

  app.route("/login")
    .get(login.get)
    .post(login.post);

  app.route("/register")
    .get(register.get)
    .post(register.post);

  app.route("/update/:id")
    .get(isLoggedIn(), update.get)
    .post(isLoggedIn(), update.post);

  app.route("/attach/:id")
    .get(isLoggedIn(), attachAccessory.get)
    .post(isLoggedIn(), attachAccessory.post);

  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started at port 3000"));
}