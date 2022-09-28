const UserController = require('../controllers/user_controller');

const router = require('express').Router();

// TODO: Get all Users
router.get('/', (req, res) => { });
// TODO: Get specific User
router.get('/:id', (req, res) => { });
// TODO: Get User's Cart
router.get('/:id/cart', UserController.getcart);
// TODO: Get User's Wishlist : Palamkubura
router.get('/:id/wishlist', UserController.getWishlist);
// TODO:: Get User's Favourites : Palamkubura
router.get('/:id/favourites', UserController.getFavourites);

// TODO: Create User
router.post('/', (req, res) => { });
// TODO: Add to Favourites : Palamkubura
router.post('/:id/favourites', (req, res) => { });
// TODO: Add to Cart
router.post('/:id/cart', (req, res) => { });
// TODO: Add to Wishlist
router.post('/:id/wishlist', (req, res) => { });

// TODO: Upate existing user
router.put('/:id', (req, res) => { });
// TODO: Update User's Cart Item
router.put('/:id/cart/:iid', (req, res) => { });

// TODO: Delete User
router.delete('/:id', (req, res) => { });
// TODO: Delete cartItem
router.delete('/:id/cart/:iid', (req, res) => { });
// TODO: Remove Wishlist Item
router.delete('/:id/wishlist/:iid', (req, res) => { });
// TODO: Remove from favourities : Palamkubura
router.delete('/:id/favourites/:fid', (req, res) => { });



module.exports = router;