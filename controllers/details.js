const { getCarWithAccessories } = require("../services/cars");

module.exports = {
  async details(req, res) {
    const id = req.params.id;
    const car = await getCarWithAccessories(id);
    res.render("details", car);
  },
};
