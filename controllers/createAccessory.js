const { createAccessory } = require("../services/accessory");

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
      console.log(err);
      res.redirect("/create/accessory", { accessory });
    }
  },
};
