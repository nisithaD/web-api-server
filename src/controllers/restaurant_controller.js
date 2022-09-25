const Restaurant=require('../models/restaurant');
const router = require('../routes/user');

// GET /restaurant
exports.get_all_restaurants=async(req,res)=>{
    const allRestaurants=await Restaurant.find();
    res.send(allRestaurants);
}

// GET /restaurant/:id
exports.get_restaurant_by_id=async(req,res)=>{
    const restaurant=await Restaurant.findById(req.params.id);
    res.send(restaurant);
}

// POST /restaurant
exports.create_restaurant=async(req,res)=>{

    //TODO Check if logged in user is admin

    //call to get user route
    const user=router.get('/api/user',{
    }).then(res=>res.json());
    
    console.log(user); //TODO need to test this

    if(user.is_admin=false){
        return res.status(401).json({message:"You are not authorized to create a restaurant."})
    }else{
        let exsistingRestaurant;
        try{
            exsistingRestaurant=await Restaurant.findOne({name:req.body.name});
        }catch(err){
            return res.status(500).json({message:"Something went wrong, please try again later."})
        }
        if(exsistingRestaurant){
            return res.status(422).json({message:"Restaurant name is already exists. Please try different name."})
        }
        try{
            const restaurant=new Restaurant(req.body);
            await restaurant.save();
            res.send(restaurant,200);
        }catch(err){
            return res.status(422).json({message:"Something went wrong, please try again later."})
        }
    }
}

// PUT /restaurant/:id
exports.update_restaurant=async(req,res)=>{
    
    const user=router.get('/api/user',{
    }).then(res=>res.json());

    if(user.is_admin=false){
        return res.status(401).json({message:"You are not authorized to update a restaurant."})
    }else{
    //find for restaurant
    let restaurant;
    try{
        restaurant=await Restaurant.findById(req.params.id);
    }catch(err){
        return res.status(500).json({message:"Something went wrong, please try again later."})
    }

    if(!restaurant){
        return res.status(404).json({message:"Restaurant not found."})
    }else{
        //update restaurant
            try{
                restaurant=req.body;
                await restaurant.save();
                res.send(restaurant,200);
            }catch(err){
                return res.status(422).json({message:"Something went wrong, please try again later."})
            }
        }
    }
}

// DELETE /restaurant/:id
exports.delete_restaurant=async(req,res)=>{
   
    const user=router.get('https://localhost:3000/api/user',{
    }).then(res=>res.json());

    if(user.is_admin=false){
        return res.status(401).json({message:"You are not authorized to delete a restaurant."})
    }else{
    //find for restaurant
        let restaurant;
        try{
            restaurant=await Restaurant.findById(req.params.id);
        }catch(err){
            return res.status(500).json({message:"Something went wrong, please try again later."})
        }
    if(!restaurant){
        return res.status(404).json({message:"Restaurant not found."})
    }else{
        //delete restaurant
            try{
                await restaurant.remove();
                res.send(restaurant,200);
            }catch(err){
                return res.status(422).json({message:"Something went wrong, please try again later."})
            }
        }
    }
}

