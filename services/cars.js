const Car = require("../models/Car");

async function getAllCars(query, page) {
  const options = {};
  const limit = 4;

  if (query.search) {
    options.name = new RegExp(query.search, "i");
  }

  if (query.from) {
    options.price = { $gte: Number(query.from) };
  }

  if (query.to) {
    if (!options.price) {
      options.price = {};
    }

    options.price.$lte = Number(query.to);
  }
  const count = await Car.count(options);
  const pagesTotal = Math.ceil(count / limit);

  const cars = await Car.find(options)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();
  return { cars, pagesTotal };
}

async function getCarById(id) {
  const car = await Car.findById(id).lean();
  return car;
}

async function getCarWithAccessories(id) {
  const car = await Car.findById(id).populate("accessories").lean();
  return car;
}

async function createCar(car) {
  const result = new Car(car);
  await result.save();
}

async function updateCar(id, car) {
  await Car.findByIdAndUpdate(id, car, { runValidators: true });
}

async function deleteCar(id) {
  await Car.findByIdAndDelete(id);
}

async function attachAccessory(carId, accessoryId) {
  const car = await Car.findById(carId);
  car.accessories.push(accessoryId);
  await car.save();
}

module.exports = {
  getAllCars,
  getCarById,
  getCarWithAccessories,
  createCar,
  deleteCar,
  updateCar,
  attachAccessory,
};
