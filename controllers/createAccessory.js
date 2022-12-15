const { createAccessory } = require("../services/accessory");
const mapErrors = require("../util/mapErrors");

module.exports = {
  get(req, res) {
    res.render("createAccessory");
  },
  async post(req, res) {
    let { name, description, imageUrl, price } = req.body;
    const accessory = {
      name,
      description,
      imageUrl: imageUrl || undefined,
      price: Number(price),
    };
    try {
      await createAccessory(accessory);
      res.redirect("/");
    } catch (err) {
      const errors = mapErrors(err);
      res.render("createAccessory", { accessory, errors });
    }
  },
};
