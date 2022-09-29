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
// TODO: Add to Favourites : Palamkubura
router.post('/:id/favourites', (req, res) => { });
//  Add to Cart : Nuwan
router.post('/:id/cart', UserController.addToCart);
//  TODO: Add to Wishlist : Palamkubura
router.post('/:id/wishlist', (req, res) => { });

//  Upate existing user : Nuwan
router.put('/:id', UserController.updateUser);
//  Update User's Cart Item : Nuwan
router.put('/:id/cart/:iid', UserController.updateCart);

//  Delete User
router.delete('/:id', UserController.deleteUser);
//  Delete cartItem
router.delete('/:id/cart/:iid', UserController.deleteCartItem);
//  TODO: Remove Wishlist Item
router.delete('/:id/wishlist/:iid', (req, res) => { });
//  Remove from favourities : Palamkubura
router.delete('/:id/favourites/:fid', UserController.deleteFavourites);




module.exports = router;