const Restaurant = require('../models/restaurant');
const { errorLogger,accessLogger} = require('../helper.util');
const mongoose = require('mongoose');

// GET /restaurant : Rumesh
const getAllRestaurant = async (req, res) => {
    accessLogger.info(req.originalUrl);
    const allRestaurants = await Restaurant.find();
    if (allRestaurants) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: allRestaurants
        });
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant  Not Found",
            data: []
        });

    }
}

// GET/ Resturent / Foods : Rumesh

const RestaurantFood = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let id = req.params.id;
    const allRestaurantFood = await Restaurant.findById(id);

    if (allRestaurantFood) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: allRestaurantFood.foods
        });
    }
    else {
        res.status(404).send({
            statusCode: 404,
            message: "Food id:" + id + "  Not Found",
            data: []
        });
    }
}

// GET /restaurant/:id : PalamKubura
const getRestaurantById = async (req, res) => {
    accessLogger.info(req.originalUrl);
    const restaurant = await Restaurant.findById(req.params.id);
    if (restaurant) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: restaurant
        });
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }

}

const getLocation = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let id = req.params.id;
    let restaurant = await Restaurant.findById(id);
    if (restaurant) {
        res.status(200).send({
            statusCode: 200,
            message: "OK",
            data: restaurant.location
        });
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }
}

const createRestaurant = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let restaurant = new Restaurant({
        name: req.body.name,
        rating: req.body.rating,
        address: req.body.address,
        display_image: req.body.display_image,
    });

    if (req.body.foods && req.body.foods.length > 0) {
        let foods = [];
        for (let itm in req.body.foods) {
            foods.push({
                name: req.body.foods[itm].name,
                price: req.body.foods[itm].price,
                description: req.body.foods[itm].description,
                rating: req.body.foods[itm].rating,
                display_image: req.body.foods[itm].display_image,
            })
        }
        restaurant.foods = foods;
    }
    if (req.body.location && req.body.location.lat && req.body.location.lng) {

        restaurant.location = {
            lat: req.body.location.lat,
            lng: req.body.location.lng
        }

    }
    let err = restaurant.validateSync();
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
            let data = await restaurant.save();
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

const addFoods = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let id = req.params.id;
    let restaurant = await Restaurant.findById(id);
    if (restaurant) {
        let foods = restaurant.foods;
        let newFoods = [];
        if (Array.isArray(req.body) && req.body.length > 0) { // this should be an array of objects 
            for (let idx in req.body) {
                newFoods.push({
                    name: req.body[idx].name,
                    price: req.body[idx].price,
                    description: req.body[idx].description,
                    rating: req.body[idx].rating,
                    display_image: req.body[idx].display_image,
                })
            }
            restaurant.foods = [...foods, ...newFoods];
            let err = restaurant.validateSync();
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
                    let data = await restaurant.save();
                    res.status(201).send({
                        statusCode: 201,
                        message: "OK",
                        data: data.foods
                    });
                } catch (e) {
                    res.status(500).send({
                        statusCode: 500,
                        message: "Something Went worng. Please try again later"
                    })
                    errorLogger.debug(e.message);
                }
            }
        } else {
            res.status(400).send({
                statusCode: 400,
                message: "Bad Request: required and Array of objects,but object given "
            })
        }
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }
}
const updateRestaurant = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let id = req.params.id;
    let restaurant = await Restaurant.findById(id);
    if (restaurant) {
        restaurant.name = req.body.name;
        restaurant.rating = req.body.rating;
        restaurant.address = req.body.address;
        restaurant.display_image = req.body.display_image;
        if (req.body.foods && req.body.foods.length > 0) {
            let foods = [];
            for (let itm in req.body.foods) {
                foods.push({
                    name: req.body.foods[itm].name,
                    price: req.body.foods[itm].price,
                    description: req.body.foods[itm].description,
                    rating: req.body.foods[itm].rating,
                    display_image: req.body.foods[itm].display_image,
                })
            }
            restaurant.foods = [...restaurant.foods, ...foods];
        }
        if (req.body.location) {

            restaurant.location = {
                lat: req.body.location.lat,
                lng: req.body.location.lng
            }

        }
        let err = restaurant.validateSync();
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
                let data = await restaurant.save();
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
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }
}
const updateSingleFood = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let resId = req.params.id;
    let foodId = req.params.fid;

    let restaurant = await Restaurant.findById(resId);
    if (restaurant) {
        let index = restaurant.foods.findIndex((x) => {
            return (x._id.equals(mongoose.Types.ObjectId(foodId))
            );
        });
        if (index === -1) {
            res.status(404).send({
                statusCode: 404,
                message: "Item Doesn't Exists"
            })
        } else {
            restaurant.foods[index] = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                rating: req.body.rating,
                display_image: req.body.display_image,
            }
            let err = restaurant.validateSync();
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
                    let data = await restaurant.save();
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

    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }

}

const updateLocation = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let id = req.params.id;
    let restaurant = await Restaurant.findById(id);
    if (restaurant) {
        restaurant.location = {
            lat: req.body.lat,
            lng: req.body.lng
        }
        let err = restaurant.validateSync();
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
                let data = await restaurant.save();
                res.status(201).send({
                    statusCode: 200,
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
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }

}

const deleteRestaurant = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let id = req.params.id;
    let restaurant = await Restaurant.findById(id);
    if (restaurant) {
        try {
            await restaurant.delete();
            if (restaurant.delete) { // Soft deletecheck
                res.status(200).send({
                    statusCode: 200,
                    message: "OK",
                })
            }
        } catch (e) {
            res.status(500).send({
                statusCode: 500,
                message: "Something Went worng. Please try again later"
            })
            errorLogger.debug(e.message);
        }

    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }
}

const deleteFood = async (req, res) => {
    accessLogger.info(req.originalUrl);
    let resId = req.params.id;
    let foodId = req.params.fid;

    let restaurant = await Restaurant.findById(resId);
    if (restaurant) {
        let food = restaurant.foods.id(foodId);
        if (food) {
            food.delete();
            await restaurant.save();
            res.status(200).send({
                statusCode: 200,
                message: "Deleted",
                data: restaurant.foods
            })
        } else {
            res.status(404).send({
                statusCode: 404,
                message: "Food Item Not exists",
                data: restaurant.foods
            });
        }
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Restaurant id:" + req.params.id + " Not Found",
            data: []
        });
    }

}

module.exports = {
    getById: getRestaurantById,
    getAllRestaurants: getAllRestaurant,
    getRestaurantFood: RestaurantFood,
    getLocation: getLocation,
    createRestaurant: createRestaurant,
    addFoods: addFoods,
    updateRestaurant: updateRestaurant,
    updateSingleFood: updateSingleFood,
    updateLocation: updateLocation,
    deleteRestaurant: deleteRestaurant,
    deleteFood: deleteFood
}

