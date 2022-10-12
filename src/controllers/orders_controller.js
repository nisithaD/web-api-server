const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Order = require('../models/order');
const {accessLogger,errorLogger} = require('../helper.util');

//create order
exports.create_order = async (req, res) => {
    accessLogger.info(req.originalUrl);
    try {
        //create order
        const order = await Order.create({
            user_id: req.body.user_id,
            items: req.body.foods,
            total: req.body.total
        });

        //find user
        const user = await User.findById(req.body.user_id);
        //clear cart
        user.cart = [];
        user.save();
        //return response
        res.status(200).json({
            statusCode: 200,
            message: 'Order created successfully',
            order
        });
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            message: "Failed to create order. Please try again later"
        })
        errorLogger.debug(err.message);
    }
}

//get user's all orders
exports.get_users_orders = async (req, res) => {
    accessLogger.info(req.originalUrl);
    //get auth user
    const user = await User.findById(req.params.id);
    //get orders is deleted=false
    const orders = await Order.find({user_id: user._id, is_deleted: false}).sort({date: -1});
    //return response
    res.status(200).json({
        orders
    });
}

exports.get_all_orders = async (req, res) => {
    accessLogger.info(req.originalUrl);
    try {
        //get orders
        const orders = await Order.find().sort({date: -1});
        //return response
        res.status(200).json({
            success: true,
            orders
        });
    }catch (err){
        res.status(500).send({
            statusCode: 500,
            message: "Something Went wrong. Please try again later"
        })
        errorLogger.debug(e.message);
    }
}

//get order
exports.get_order = async (req, res) => {
    accessLogger.info(req.originalUrl);
    //get order
    const order = await Order.findById(req.params.id);
    //check if order exists
    if (!order) {
        return res.status(400).json({error: 'Order not found'});
    }
    //return response
    res.status(200).json({
        success: true,
        order
    });
}

//update order
//TODO need some fixes
exports.update_order = async (req, res) => {
    accessLogger.info(req.originalUrl);
    //get order
    const order = await Order.findById(req.params.id);
    //check if order exists
    if (!order) {
        return res.status(400).json({error: 'Order not found'});
    }
    //update order
    order.is_completed = req.body.is_completed;
    //save order
    await order.save();
    //return response
    res.status(200).json({
        success: true,
        message: 'Order updated successfully',
        order
    });
}

//delete order
exports.delete_order = async (req, res) => {
    accessLogger.info(req.originalUrl);
    try {
        // const user = await User.findById(req.params.uid);
        //get order
        const order = await Order.findById(req.params.id);
        //check if order exists
        if (!order) {
            return res.status(400).json({error: 'Order not found'});
        }
        // if (order.user_id != user._id) {
        //     return res.status(400).json({error: 'You are not authorized to delete this order'});
        // }

        //check order completed
        if (order.is_completed) {
            return res.status(400).json({
                message: 'You can not delete completed orders!'
            });
        }
        //delete order
        order.is_deleted = true;
        await order.save();

        //return response
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        });

    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            message: "Something Went wrong. Please try again later"
        })
        errorLogger.debug(e.message);
    }
}

//get restaurant's orders
exports.get_restaurant_orders = async (req, res) => {
    accessLogger.info(req.originalUrl);
    //get restaurant
    const restaurant = await Restaurant.findById(req.params.id);
    //check if restaurant exists
    if (!restaurant) {
        return res.status(400).json({error: 'Restaurant not found'});
    }
    //get orders
    const orders = await Order.find({restaurant_id: restaurant._id});
    //return response
    res.status(200).json({
        success: true,
        orders
    });
}

//mark as completed
exports.mark_as_completed = async (req, res) => {
    accessLogger.info(req.originalUrl);
    //get order
    const order = await Order.findById(req.params.id);
    //check if order exists
    if (!order) {
        return res.status(400).json({error: 'Order not found'});
    }
    //check order completed
    if (order.is_completed) {
        return res.status(400).json({error: 'Order already completed'});
    }
    //update order
    order.is_completed = true;
    //save order
    await order.save();
    //return response
    res.status(200).json({
        success: true,
        message: 'Order marked as completed successfully',
        order
    });
}

module.exports = exports;
