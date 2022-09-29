const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    display_image: { type: String, required: false },
});




const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;