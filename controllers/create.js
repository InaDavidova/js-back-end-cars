const { createCar } = require("../services/cars");

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
      price: Number(price),
      owner: ownerId,
    };
    try {
      await createCar(car);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      res.redirect("/create");
    }
  },
};
