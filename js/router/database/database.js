const {Router} = require('express');
const asyncHandler = require(`express-async-handler`);
const CitySchema = require('../../CitySchema');

const router = Router();

router.get("/favourites", asyncHandler(async (req, res) => {
    const citySchemas = await CitySchema.find({});
    res.send(citySchemas);
}));

router.post("/favourites", asyncHandler(async (req, res) => {
    if (await isExist(req.query.city)) {
        res.statusCode = 400;
        res.send({ status: 'Bad Request', citySchema: 'already exists' });
    } else {
        const citySchema = new CitySchema({
            city: req.query.city
        });
        await citySchema.save(function (err) {
            if (err) {
                res.statusCode = 500;
                res.send({error: 'Server error'});
            } else {
                return res.send({status: 'OK', citySchema: citySchema});
            }
        });
    }
}));

router.delete("/favourites", asyncHandler(async (req, res) => {
    const cityFilter = req.query.city;
    await CitySchema.findOneAndDelete({city: cityFilter}).exec();
    return res.send({ status: 'OK', citySchema: 'deleted' });
}));

async function isExist(city) {
    return await CitySchema.findOne({ city: city }).exec() != null;
}

module.exports = router;