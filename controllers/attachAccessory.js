const { getCarAndAllAvailableAccessories } = require("../services/accessory");
const { attachAccessory } = require("../services/cars");

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
      console.log(err);
      res.redirect(`/attach/${carId}`);
    }
  },
};
