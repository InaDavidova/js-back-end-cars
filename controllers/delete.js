const { deleteCar, getCarById } = require("../services/cars");

module.exports = {
  async delCar(req, res) {
    const id = req.params.id;
    const car = await getCarById(id);
    
    let isOwner = false;

    if (req.session.user && req.session.user.id == car.owner) {
      isOwner = true;
    }

    if (isOwner) {
      await deleteCar(id);
      res.redirect("/");
    } else {
      res.redirect(`/details/${id}`);
    }
  },
};
