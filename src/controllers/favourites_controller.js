const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const router = require('../routes/favourite');

// GET /favourites
exports.get_all_favourites = async (req, res) => {
    const user = await User.findById(req.user.userId);
    const allFavourites = user.favourites
    res.send(allFavourites);
}

//add to favourites
exports.add_to_favourites = async (req, res) => {
    const user = await User.findById(req.user.userId);
    let restaurant;
    try {
        restaurant = await Restaurant.findById(req.params.id);
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong, please try again later." })
    }
    const isRestaurantInFavourites = user.favourites.includes(restaurant._id);
    if (isRestaurantInFavourites) {
        return res.status(422).json({ message: "Restaurant is already in your favourites." })
    } else {
        user.favourites.push(restaurant._id);
        await user.save();
        res.send(user.favourites);
    }
}

//remove from favourites
exports.remove_from_favourites = async (req, res) => {
    const user = await User.findById(req.user.userId);
    let restaurant;
    try {
        restaurant = await Restaurant.findById(req.params.id);
    } catch (err) {
        return res.status(500).json({ message: "Something went wrong, please try again later." })
    }
    const isRestaurantInFavourites = user.favourites.includes(restaurant._id);
    if (!isRestaurantInFavourites) {
        return res.status(422).json({ message: "Restaurant is not in your favourites." })
    } else {
        user.favourites.pull(restaurant._id);
        await user.save();
        res.send(user.favourites);
    }
}