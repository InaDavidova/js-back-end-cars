const { getCarAndAllAvailableAccessories } = require("../services/accessory");
const { attachAccessory } = require("../services/cars");
const mapErrors = require("../util/mapErrors");

module.exports = {
  async get(req, res) {
    const carId = req.params.id;
    const { car, accessories } = await getCarAndAllAvailableAccessories(carId);
    res.render("attachAccessory", { car, accessories });
  },
  async post(req, res) {
    const carId = req.params.id;
    const query = req.body;

    try {
      await attachAccessory(carId, query.accessory);
      res.redirect(`/details/${carId}`);
    } catch (err) {
      const errors = mapErrors(err);
      res.render("attachAccessory", {errors});
    }
  },
};
