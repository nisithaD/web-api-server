const User = require('../models/user');
const router = require('../routes/user');


const getWishlist = async (req,res)=>{
    let id = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if(user){
       res.status(200).send({
        statusCode:200,
        message: "OK",
        data: user.wishlist
       })
    }else{
        res.status(404).send({
            statusCode:404,
            message: "wish List" + req.params.id +" Not found.",
        });
    }
}

const getcart = async (req,res)=>{
    let id = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if(user){
       res.status(200).send({
        statusCode:200,
        message: "OK",
        data: user.cart
       })
    }else{
        res.status(404).send({
            statusCode:404,
            message: "cart" + req.params.id +" Not found.",
        });
    }
}

const getFavourites = async (req,res)=>{
    let id = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if(user){
       res.status(200).send({
        statusCode:200,
        message: "OK",
        data: user.favourites
       })
    }else{
        res.status(404).send({
            statusCode:404,
            message: "Favourites" + req.params.id +" Not found.",
        });
    }
}

const deleteFavourites = async (req,res)=>{
    let id = req.params.id;
    let fid = req.params.id;
    // Checkif user exists
    let user = await User.findById(id);
    if(user){
        // check the favourites exists
        // If exists remove
        let fav = user.favourites.id(fid);
        if(fav){
            fav.remove();
            user.save();
            res.status(200).send({
                statusCode:200,
                message: "Deleted",
                data: user.favourites
            })
        }else{
            res.status(404).send({
                statusCode:404,
                message: "Favourites Item Not exists",
                data: user.favourites
               });
        }

    }else{
        res.status(404).send({
            statusCode:404,
            message: "wish List" + req.params.id +" Not found.",
        });
    }
}

module.exports = {
    getWishlist : getWishlist,
    getcart : getcart,
    getFavourites : getFavourites,
    deleteFavourites : deleteFavourites
}