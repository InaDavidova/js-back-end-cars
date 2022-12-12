const { getCarWithAccessories } = require("../services/cars");

module.exports = {
  async details(req, res) {
    const id = req.params.id;
    const car = await getCarWithAccessories(id);

    let isOwner = false;

    if (req.session.user) {
      isOwner = req.session.user.id == car.owner;
    }
    
    res.render("details", { car, isOwner });
  },
};
