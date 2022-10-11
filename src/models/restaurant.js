const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Food Name is required"] },
    price: { type: Number, required: [true, "Food Price is required"] },
    description: { type: String, required: false },
    rating: { type: Number, required: false },
    display_image: { type: String, required: false },
});

const LocationSchema = new mongoose.Schema({
    lat: { type: Number, required: [true, "Location Longitute is required"] },
    lng: { type: Number, required: [true, "Location Latitude is required"] }
});

const RestaurantSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Restaurant Name is required"] },
    rating: { type: Number, default: 0 },
    address: { type: String, required: [true, "Restaurant Address is required"] },
    display_image: { type: String },
    foods: [FoodSchema],
    location: { type: LocationSchema, required: [true, "Restaurant Location is required"] }
});

FoodSchema.plugin(mongoose_delete); //Adding Soft Delete functionality
RestaurantSchema.plugin(mongoose_delete); //Adding Soft Delete functionality

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;