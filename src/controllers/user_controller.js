const User = require('../models/user');
const router = require('../routes/user');
const { errorLogger } = require('../helper.util');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Get All Users : Nuwan
const index = async (req, res) => {
    let users = await User.find();
    res.status(200).send({
        statusCode: 200,
        message: "OK",
        data: users
    });
}
// Get Single User : Nuwan
const find = async (req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
    if (user) {
        res.status(200).send({
            statusCode: 200,
            message: 'OK',
            data: user
        });
    } else {
        res.status(404).send({
            statusCode: 404,
            message: `User id:${id} Not Found:`,
            data: []
        });
    }
}
// Get Wishlist : Palamkubura
const getWishlist = async (req, res) => {
    let id = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if (user) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: user.wishlist
        })
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "wish List" + req.params.id + " Not found.",
        });
    }
}
// Get Cart : Palamkubura
const getcart = async (req, res) => {
    let id = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if (user) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: user.cart
        })
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "cart" + req.params.id + " Not found.",
        });
    }
}
// Get Favourites : Palamkubura
const getFavourites = async (req, res) => {
    let id = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if (user) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: user.favourites
        })
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Favourites" + req.params.id + " Not found.",
        });
    }
}

// Create User: Nuwan
const create = async (req, res) => {

    let args = {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    if (args.password !== args.confirmPassword) {
        res.status(400).send({
            statusCode: 400,
            message: "Password and Confirm Password does not match",
        });
        return;
    }
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    args.password = await bcrypt.hash(args.password, salt);

    // Check email exists
    let existingUser = await User.findOne({ email: args.email });
    if (existingUser) {
        res.status(303).send({
            statusCode: 303, // https://www.rfc-editor.org/rfc/rfc7231#section-4.3.3
            message: `Email ${args.email} already exists.`
        })
        return;
    }
    let newUser = new User(args);
    let err = newUser.validateSync();
    if (err) {
        let errors = {};

        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        res.status(400).send({
            statusCode: 400,
            message: err._message,
            errors: errors
        })
    } else {
        try {
            let data = await newUser.save();
            res.status(201).send({
                statusCode: 201,
                message: "OK",
                data: data
            });
        } catch (e) {
            res.status(500).send({
                statusCode: 500,
                message: "Something Went worng. Please try again later"
            })
            errorLogger.debug(e.message);
        }
    }
}
// Add to Cart  : Nuwan
const addToCart = async (req, res) => {
    let id = req.params.id;
    // Checkfor the existsance

    let user = await User.findById(id);
    if (user) {
        let args = {
            food: req.body.food,
            outlet: req.body.outlet,
            price: req.body.price,
            qty: req.body.qty,
            lineTotal: req.body.lineTotal
        };
        // Check Item already exists in the cart
        let index = user.cart.findIndex((x) => {
            return (x.food.equals(mongoose.Types.ObjectId(args.food)) && x.outlet.equals(mongoose.Types.ObjectId(args.outlet)));
        });
        if (index !== -1) {
            res.status(303).send({
                statusCode: 303,  // https://www.rfc-editor.org/rfc/rfc7231#section-4.3.3
                message: "Item Already Exists"
            })
        } else {
            try {
                user.cart.push(arg