const express = require("express");
const hbs = require("express-handlebars");
const { about } = require("./controllers/about");
const create = require("./controllers/create");
const createAccessory = require("./controllers/createAccessory");
const attachAccessory = require("./controllers/attachAccessory");
const update = require("./controllers/update");
const { details } = require("./controllers/details");
const { home } = require("./controllers/home");
const { notFound } = require("./controllers/notFound");
const { delCar } = require("./controllers/delete");

const initDB = require("./models");

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

  app.get("/", home);
  app.get("/about", about);
  app.get("/details/:id", details);
  app.get("/delete/:id", delCar);

  app.route("/create/accessory")
  .get(createAccessory.get)
  .post(createAccessory.post);
  
  app.route("/create")
  .get(create.get)
  .post(create.post);

  app.route("/update/:id")
  .get(update.get)
  .post(update.post);

  app.route("/attach/:id")
  .get(attachAccessory.get)
  .post(attachAccessory.post);
  
  app.all("*", notFound);

  app.listen(3000, () => console.log("Server started at port 3000"));
}