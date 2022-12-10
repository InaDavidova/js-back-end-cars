const { getCarById } = require("../services/cars");

module.exports={
    async details(req, res){
        const id = req.params.id;
        const car = await getCarById(id);
        res.render('details', car);
    }
}