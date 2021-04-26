const CitySchema = require('../database-model/CitySchema');

async function getFavourites() {
    return CitySchema.find({});
}

async function saveToFavourites(city, res) {
    if (await isExist(city)) {
        res.statusCode = 400;
        res.send({ status: 'Bad Request', citySchema: 'already exists' });
    } else {
        const citySchema = new CitySchema({
            city: city
        });
        await saveSchema(citySchema, res);
    }
}

async function saveSchema(citySchema, res) {
    await citySchema.save(function (err) {
        if (err) {
            res.statusCode = 500;
            res.send({error: 'Server error'});
        } else {
            return res.send({status: 'OK', citySchema: citySchema});
        }
    });
}

async function deleteFromFavourites(cityFilter, res) {
    await CitySchema.findOneAndDelete({city: cityFilter}).exec(function (err) {
        if (err) {
            res.statusCode = 500;
            res.send({error: 'Server error'});
        } else {
            return res.send({ status: 'OK', citySchema: 'deleted' });
        }
    });
}

async function isExist(city) {
    return await CitySchema.findOne({city: city}).exec() != null;
}

module.exports = {
    getFavourites,
    saveToFavourites,
    deleteFromFavourites
}