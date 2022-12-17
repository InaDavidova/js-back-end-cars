const { updateCar, getCarById } = require("../services/cars");

module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await getCarById(id);
    let isOwner = false;

    if (req.session.user && req.session.user.id == car.owner) {
      isOwner = true;
    }

    if (isOwner) {
      res.render("edit", { car });
    } else {
      res.redirect(`/details/${id}`);
    }
  },
  async post(req, res) {
    const id = req.params.id;
    const { name, description, imageUrl, price } = req.body;
    const car = {
      name,
      description,
      imageUrl,
      price: Number(price),
    };

    const { owner } = await getCarById(id);
    let isOwner = false;

    if (req.session.user && req.session.user.id == owner) {
      isOwner = true;
    }

    try {
      if (isOwner) {
        await updateCar(id, car);
      }
      res.redirect(`/details/${id}`);
    } catch (err) {
      res.render("edit", { car });
    }
  },
};
