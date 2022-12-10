const { getAllCars } = require("../services/cars");

module.exports = {
  async home(req, res) {
    const cars = await getAllCars(req.query);
    res.render("home", { cars, query: req.query });
  },
};
