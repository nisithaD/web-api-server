const Restaurant=require('../models/restaurant');
// const router = require('../routes/user');


const get_restaurant_by_id=async(req,res)=>{
    const restaurant = await Restaurant.findById(req.params.id);
    if(restaurant){
        res.status(200).send({
            statusCode:200,
            message: "OK",
            data:restaurant
        });
    }else{
        res.status(404).send({
            statusCode: 404,
            message: "Resturant Id:" + req.params.id +" Not found."
        });
    }
   
}

module.exports ={
    getById: get_restaurant_by_id
}