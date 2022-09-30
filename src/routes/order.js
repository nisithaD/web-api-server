var express = require('express');
var router = express.Router();
var { verifyToken,isLoggedIn } = require('../middlewares/authenticator');

// TODO: All Orders
router.get('/', (req, res) => { });
// TODO: Get specific Order
router.get('/:id', (req, res) => { });
// TODO: Get All Order of specific user
router.get('/user/:id', (req, res) => { });
// TODO: Get all orders of specific Restaurant
router.get('/restaurant/:id', (req, res) => { });

// TODO: Create Order
router.post('/', (req, res) => { });

// TODO: Update a Order
router.put('/:id', (req, res) => { });

// Don't Give option to delete orders

var orders_controller = require('../controllers/orders_controller');
const auth = require('../middlewares/authenticator');

router.post('/',isLoggedIn,orders_controller.create_order);
router.get('/get_all_orders',isLoggedIn,orders_controller.get_all_orders);
router.get('/:id',isLoggedIn,orders_controller.get_order);
router.put('/:id',isLoggedIn,orders_controller.update_order);
router.delete('/:id',isLoggedIn,orders_controller.delete_order);
router.get('/get_restaurant_orders/:id',isLoggedIn,orders_controller.get_restaurant_orders);
router.put('/mark_as_completed/:id',isLoggedIn,orders_controller.mark_as_completed);

module.exports = router;

