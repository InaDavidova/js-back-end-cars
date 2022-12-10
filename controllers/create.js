const { createCar } = require("../services/cars");

module.exports = {
  get(req, res) {
    res.render("create");
  },
  async post(req, res) {
    let { name, description, imageUrl, price } = req.body;
    if (imageUrl === "") {
      imageUrl = undefined;
    }
    const car = {
      name,
      description,
      imageUrl,
      price: Number(price),
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

// module.exports = {
//     get(req, res) {
//         res.render('create', { title: 'Create Listing' });
//     },
//     async post(req, res) {
//         const car = {
//             name: req.body.name,
//             description: req.body.description,
//             imageUrl: req.body.imageUrl || undefined,
//             price: Number(req.body.price),
//             owner: req.session.user.id
//         };

//         try {
//             await req.storage.createCar(car);

//             res.redirect('/');
//         } catch (err) {
//             console.log('Error creating record');
//             res.locals.errors = mapError(err);
//             res.render('create', { title: 'Create Listing', car });
//         }
//     }
// };
