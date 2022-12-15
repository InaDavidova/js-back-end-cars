const { createCar } = require("../services/cars");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("create");
  },
  async post(req, res) {
    let { name, description, imageUrl, price } = req.body;
    const ownerId = req.session.user.id;

    const car = {
      name,
      description,
      imageUrl: imageUrl || undefined,
      price: price || undefined,
      owner: ownerId,
    };
    try {
      await createCar(car);
      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("create", {errors, car});
    }
  },
};
