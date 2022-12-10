const { deleteCar } = require("../services/cars");

module.exports = {
  async delCar(req, res) {
    const id = req.params.id;
    console.log(id);
    await deleteCar(id);
    res.redirect("/");
  },
};
