const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodReferanceSchema = new Schema({
    food: { type: mongoose.Schema.Types.ObjectId, require: true },
    outlet: { type: mongoose.Schema.Types.ObjectId, require: true },
    price: { type: Number, require: true },
    qty: { type: Number, require: true }
});


const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        minlength: 6
    },
    address: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
    wishlist: [FoodReferanceSchema],
    cart: [FoodReferanceSchema],
    is_admin: {
        type: Boolean,
        default: false
    }

});

const user = mongoose.model('User', userSchema);
module.exports = user;