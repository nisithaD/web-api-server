const mongoose = require('mongoose');
const RestaurantSchema = new mongoose.Schema({
    name: String,
    rating: Number,

})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;