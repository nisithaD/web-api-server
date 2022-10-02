var express = require('express');
var router = express.Router();
var { verifyToken,isLoggedIn } = require('../middlewares/authenticator');


var orders_controller = require('../controllers/orders_controller');
const auth = require('../middlewares/authenticator');

router.post('/',isLoggedIn,orders_controller.create_order);
router.get('/',isLoggedIn,orders_controller.get_all_orders);
router.get('/:id',isLoggedIn,orders_controller.get_order);
router.put('/:id',isLoggedIn,orders_controller.update_order);
router.delete('/:id',isLoggedIn,orders_controller.delete_order);
router.get('/restaurant/:id',isLoggedIn,orders_controller.get_restaurant_orders);
router.put('/mark_as_completed/:id',isLoggedIn,orders_controller.mark_as_completed);

module.exports = router;

