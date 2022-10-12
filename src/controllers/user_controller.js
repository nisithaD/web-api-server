const User = require('../models/user');
const router = require('../routes/user');
const { errorLogger, accessLogger } = require('../helper.util');
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
        isAdmin: rq.user.isAdmin ? req.body.isAdmin : false,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }

    if (args.password !== args.confirmPassword) {
        res.status(402).send({
            statusCode: 402,
            message: `Password and confirm password mismatch`
        })
        return;
    }
    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    args.password = await bcrypt.hash(args.password, salt);

    // Check Email exists
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
            food: req.body.food.food,
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
                message: "Item already exists in the cart"
            })
        } else {
            try {
                user.cart.push(args);
                let err = user.validateSync();
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
                    await user.save();
                    res.status(200).send({
                        statusCode: 200,
                        message: "Successfully added to the cart",
                        data: user
                    })
                }
            } catch (e) {
                res.status(500).send({
                    statusCode: 500,
                    message: "Something Went wrong. Please try again later"
                })
                errorLogger.debug(e.message);
            }
        }
        
    } else {
        res.status(404).send({
            statusCode: 404,
            message: `User id:${id} Not Found.`
        })
    }
}


// Update A user : Nuwan
const updateUser = async (req, res) => {
   
    let id = req.params.id;
    let user = await User.findById(id);

    if (req.body.confirmPassword !== req.body.password) {
        res.status(402).send({
            statusCode: 402,
            message: `Password and confirm password mismatch`
        })
        return;
    }
    let salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUND));
    let encryptedPassword = await bcrypt.hash(req.body.password, salt);
    if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = encryptedPassword;
        user.address = req.body.address;
        user.phone = req.body.phone;
        user.isAdmin = req.user.isAdmin ? req.body.isAdmin : user.isAdmin;

        let err = user.validateSync();
        try {
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
                await user.save();
                res.status(201).send({
                    statusCode: 201,
                    message: "OK",
                    data: user
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
            message: `User id:${id} Not Found.`
        })
    }
}
// Update Existing Cart Item : Nuwan
const updateCart = async (req, res) => {
   
    let userId = req.params.id;
    let cartItem = req.params.iid;

    let user = await User.findById(userId);
    if (user) {
        let index = user.cart.findIndex((x) => {
            return x._id.equals(cartItem);
        })
        if (index === -1) {
            res.status(404).send({
                statusCode: 404,
                message: "Cart item not exists",
            });
        } else {
            user.cart[index].food = req.body.food;
            user.cart[index].outlet = req.body.outlet;
            user.cart[index].qty = req.body.qty;
            user.cart[index].price = req.body.price;
            user.cart[index].lineTotal = req.body.lineTotal;
            try {
                let err = user.validateSync();
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
                    await user.save();
                    res.status(201).send({
                        statusCode: 201,
                        message: "OK",
                        data: user
                    })
                }
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
            message: `User id:${id} Not Found.`
        })
    }
}


// Add to Favourites  : palamakumbura
const addFavourites = async (req, res) => {
   
    let id = req.params.id;
    // Checkfor the existsance

    let user = await User.findById(id);
    if (user) {
        let args = {
            _id: req.body.outlet
        };
        // Check Item already exists in the favourits
        let index = user.favourites.findIndex((x) => {
            return (x._id.equals(mongoose.Types.ObjectId(args._id)));
        });
        if (index !== -1) {
            res.status(303).send({
                statusCode: 303,  // https://www.rfc-editor.org/rfc/rfc7231#section-4.3.3
                message: "Restaurant is Already Exists in the Favourites"
            })
        } else {
            try {
                user.favourites.push(args);
                let err = user.validateSync();
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
                    await user.save();
                    res.status(201).send({
                        statusCode: 201,
                        message: "OK",
                        data: user
                    })
                }
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
            message: `User id:${id} Not Found.`
        })
    }
}


// Add to wishlist  : Palamakumbura
const addToWishlist = async (req, res) => {
   
    let id = req.params.id;
    // Checkfor the existsance

    let user = await User.findById(id);
    if (user) {
        let args = {
            food: req.body.food,
            outlet: req.body.outlet
        };
        // Check Item already exists in the wishlist
        let index = user.wishlist.findIndex((x) => {
            return (x.food.equals(mongoose.Types.ObjectId(args.food)) && x.outlet.equals(mongoose.Types.ObjectId(args.outlet)));
        });
        if (index !== -1) {
            res.status(303).send({
                statusCode: 303,  // https://www.rfc-editor.org/rfc/rfc7231#section-4.3.3
                message: "Item Already Exists in the wishlist"
            })
        } else {
            try {
                user.wishlist.push(args);
                let err = user.validateSync();
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
                    await user.save();
                    res.status(201).send({
                        statusCode: 201,
                        message: "OK",
                        data: user
                    })
                }
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
            message: `User id:${id} Not Found.`
        })
    }
}

// Remove FromFavourites : Palamkubura
const deleteFavourites = async (req, res) => {
   
    let id = req.params.id;
    let fid = req.params.fid;
    // Checkif user exists
    let user = await User.findById(id);
    if (user) {
        // check the favourites exists
        // If exists remove
        let fav = user.favourites.findIndex((x) => {
            return x.equals(mongoose.Types.ObjectId(fid))
        })
        if (user.favourites[fav]) {
            user.favourites.splice(fav, 1);
            await user.save();
            res.status(200).send({
                statusCode: 200,
                message: "Deleted",
                data: user.favourites
            })
        } else {
            res.status(404).send({
                statusCode: 404,
                message: "Favourites Item Not exists",
                data: user.favourites
            });
        }

    } else {
        res.status(404).send({
            statusCode: 404,
            message: "wish List" + req.params.id + " Not found.",
        });
    }
}

// Delete wishlist Item : Palamakumbura
const deleteWishlist = async (req, res) => {
   
    let id = req.params.id;
    let user = await User.findById(id);
    let wishlistId = req.params.iid;
    if (user) {
        try {
            let index = user.wishlist.findIndex((x) => {
                return x._id.equals(wishlistId);
            })
            if (index == -1) {
                res.status(404).send({
                    statusCode: 404,
                    message: "wishlist item not exists",
                });
            } else {
                user.wishlist.id(wishlistId).remove();
                await user.save();
                res.status(200).send({
                    statusCode: 200,
                    message: "OK"
                });
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
            message: `User id:${id} Not Found.`
        })
    }
}

// Delete Cart Item : Nuwan
const deleteCartItem = async (req, res) => {
   
    let id = req.params.id;
    let user = await User.findById(id);
    let cartItem = req.params.iid;
    if (user) {
        try {
            let index = user.cart.findIndex((x) => {
                return x._id.equals(cartItem);
            })
            if (index === -1) {
                res.status(404).send({
                    statusCode: 404,
                    message: "Cart item not exists",
                });
            } else {
                user.cart.id(cartItem).remove();
                await user.save();
                res.status(200).send({
                    statusCode: 200,
                    message: "OK"
                });
            }
        } catch (e) {
            res.status(500).send({
                statusCode: 500,
                message: "Something Went wrong. Please try again later"
            })
            errorLogger.debug(e.message);
        }
    } else {
        res.status(404).send({
            statusCode: 404,
            message: `User id:${id} Not Found.`
        })
    }
}
// Delete User : Nuwan
const deleteUser = async (req, res) => {
   
    let id = req.params.id;
    let user = await User.findById(id);
    if (user) {
        try {
            await user.delete(); // Soft Delete 
            if (user.deleted) {
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
            message: `User id:${id} Not Found.`
        })
    }
}

module.exports = {
    all: index,
    specific: find,
    newUser: create,
    addToCart: addToCart,
    addFavourites: addFavourites,
    addToWishlist: addToWishlist,
    getWishlist: getWishlist,
    getcart: getcart,
    getFavourites: getFavourites,
    deleteFavourites: deleteFavourites,
    deleteWishlist: deleteWishlist,
    updateUser: updateUser,
    updateCart: updateCart,
    deleteCartItem: deleteCartItem,
    deleteUser: deleteUser,
}


