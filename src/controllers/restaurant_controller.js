const Restaurant = require('../models/restaurant');

// GET /restaurant : Rumesh
const getAllRestaurant = async (req, res) => {
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

// GET / Foods : Rumesh

const RestaurantFood = async (req, res) => {
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

module.exports = {
    getById: getRestaurantById,
    getAllRestaurants: getAllRestaurant,
    getRestaurantFood: RestaurantFood
}

