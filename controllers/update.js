const { updateCar, getCarById } = require("../services/cars");

module.exports = {
  async get(req, res) {
    const id = req.params.id;
    const car = await getCarById(id);
    res.render("edit", { car });
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

    try{
      await updateCar(id, car);
      res.redirect(`/details/${id}`);
    }catch(err){
      console.log(err.message);
      res.render("edit", {car});
    }
  },
};
