const Accessory = require("../models/Accessory");
const { getCarById } = require("./cars");

async function getCarAndAllAvailableAccessories(carId) {
  const car = await getCarById(carId);

  const accessories = await Accessory.find({
    _id: { $nin: car.accessories },
  }).lean();

  return { car, accessories };
}

async function createAccessory(accessory) {
  const result = new Accessory(accessory);
  await result.save();
}

module.exports = {
  createAccessory,
  getCarAndAllAvailableAccessories,
};
