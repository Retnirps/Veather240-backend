const {Router} = require('express');
const asyncHandler = require(`express-async-handler`);
const {getFavourites, saveToFavourites, deleteFromFavourites} = require('../network/mongoDbRequests');

const router = Router();

router.get("/favourites", asyncHandler(async (req, res) => {
    res.send(await getFavourites());
}));

router.post("/favourites", asyncHandler(async (req, res) => {
    await saveToFavourites(req.query.city, res);
}));

router.delete("/favourites", asyncHandler(async (req, res) => {
    await deleteFromFavourites(req.query.city, res);
}));

module.exports = router;