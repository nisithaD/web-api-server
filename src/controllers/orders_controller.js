const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Order = require('../models/order');

//create order
exports.create_order = async (req, res) => {
    //get auth user
    try{
        const user = await User.findById(req.user._id);
        //get restaurant
        const restaurant = await Restaurant.findById(req.body.restaurant_id);
        //check if restaurant exists
        if (!restaurant) {
            return res.status(400).json({ error: 'Restaurant not found' });
        }else{
            //calculate restaurent items total
            let total = 0;
            req.body.items.forEach(item => {
                //get item from restaurant
                const restaurantItem = restaurant.items.find(restaurantItem => restaurantItem._id == item.item_id);
                //check if item exists
                if (!restaurantItem) {
                    return res.status(400).json({ error: 'Item not found!' });
                }else{
                    //calculate total
                    total += restaurantItem.price * item.quantity;
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
    try{
        //create order
        const order = await Order.create({
            user_id: user._id,
            restaurant_id: req.body.restaurant_id,
            items: req.body.items,
            total: total
        });
        //return response
        res.status(200).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    }catch(err){
        res.status(500).send({
            statusCode: 500,
            message: "Failed to create order. Please try again later"
        })
        errorLogger.debug(e.message);
    }
}

//get user's all orders
exports.get_all_orders = async (req, res) => {
    //get auth user
    const user = await User.findById(req.user._id);
    //get orders
    const orders = await Order.find({ user_id: user._id });
    //return response
    res.status(200).json({
        success: true,
        orders
    });
}

//get order
exports.get_order = async (req, res) => {
    //get order
    const order = await Order.findById(req.params.id);
    //check if order exists
    if (!order) {
        return res.status(400).json({ error: 'Order not found' });
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
    //get order
    const order = await Order.findById(req.params.id);
    //check if order exists
    if (!order) {
        return res.status(400).json({ error: 'Order not found' });
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
    try{
        const user= await User.findById(req.user._id);
        //get order
        const order = await Order.findById(req.params.id);
    }catch(err){
        res.status(500).send({
            statusCode: 500,
            message: "Something Went worng. Please try again later"
        })
        errorLogger.debug(e.message);
    }
    //check if order exists
    if (!order) {
        return res.status(400).json({ error: 'Order not found' });
    }

    if(order.user_id != user._id){
        return res.status(400).json({ error: 'You are not authorized to delete this order' });
    }
    //check order completed
    if (order.is_completed) {
        return res.status(400).json({ error: 'You can not delete completed order' });
    }
    //delete order
    await order.remove();
    //return response
    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    });
}

//get restaurant's orders
exports.get_restaurant_orders = async (req, res) => {
    //get restaurant
    const restaurant = await Restaurant.findById(req.params.id);
    //check if restaurant exists
    if (!restaurant) {
        return res.status(400).json({ error: 'Restaurant not found' });
    }
    //get orders
    const orders = await Order.find({ restaurant_id: restaurant._id });
    //return response
    res.status(200).json({
        success: true,
        orders
    });
}

//mark as completed
exports.mark_as_completed = async (req, res) => {
    //get order
    const order = await Order.findById(req.params.id);
    //check if order exists
    if (!order) {
        return res.status(400).json({ error: 'Order not found' });
    }
    //check order completed
    if (order.is_completed) {
        return res.status(400).json({ error: 'Order already completed' });
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