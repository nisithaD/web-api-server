const UserController = require('../controllers/user_controller');

const router = require('express').Router();

//  Get all Users : Nuwan
router.get('/', UserController.all);
//  Get specific User :Nuwan
router.get('/:id', UserController.specific);
//  Get User's Cart : Nuwan
router.get('/:id/cart', UserController.getcart);
//  Get User's Wishlist : Palamkubura
router.get('/:id/wishlist', UserController.getWishlist);
// : Get User's Favourites : Palamkubura
router.get('/:id/favourites', UserController.getFavourites);

//  Create User : Nuwan
router.post('/', UserController.newUser);
// TODO: Add to Favourites : Palamakumbura
router.post('/:id/favourites', UserController.addFavourites);
//  Add to Cart : Nuwan
router.post('/:id/cart', UserController.addToCart);
//  TODO: Add to Wishlist : Palamakumbura
router.post('/:id/wishlist', UserController.addToWishlist);

//  Upate existing user : Nuwan
router.put('/:id', UserController.updateUser);
//  Update User's Cart Item : Nuwan
router.put('/:id/cart/:iid', UserController.updateCart);

//  Delete User
router.delete('/:id', UserController.deleteUser);
//  Delete cartItem
router.delete('/:id/cart/:iid', UserController.deleteCartItem);
//  TODO: Remove Wishlist Item : palamakumbura //not code
router.delete('/:id/wishlist/:iid', UserController.deleteWishlist);
//  Remove from favourities : Palamkubura //error
router.delete('/:id/favourites/:fid', UserController.deleteFavourites);




module.exports = router;