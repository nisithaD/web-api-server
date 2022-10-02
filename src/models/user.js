const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');

const FoodReferanceSchema = new Schema({
    food: { type: mongoose.Schema.Types.ObjectId, required: true },
    outlet: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    lineTotal: { type: Number, required: true }
});


const WishlistItemSchema = new Schema({
    food: { type: mongoose.Schema.Types.ObjectId, required: true },
    outlet: { type: mongoose.Schema.Types.ObjectId, required: true }
})

const userSchema = new Schema({
    googleId: {
        type: String,
        required: false,
        index: true,
        unique: true,
        sparse: true,
        default: null
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
    wishlist: [WishlistItemSchema],
    cart: [FoodReferanceSchema],
    isAdmin: {
        type: Boolean,
        default: false
    }

});

userSchema.plugin(mongoose_delete); //Adding Soft Delete functionality

const user = mongoose.model('User', userSchema);
module.exports = user;