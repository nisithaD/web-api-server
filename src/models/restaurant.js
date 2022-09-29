const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    display_image: { type: String, required: false },
});

const LocationSchema = new mongoose.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
});

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number },
    address: { type: String, required: true },
    display_image: { type: String },
    foods: [FoodSchema],
    location: { type: LocationSchema, required: true }
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;