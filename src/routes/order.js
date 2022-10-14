var express = require('express');
var router = express.Router();
var { verifyToken,isLoggedIn, isAdmin} = require('../middlewares/authenticator');


var orders_controller = require('../controllers/orders_controller');
const auth = require('../middlewares/authenticator');

router.post('/',verifyToken,isLoggedIn,orders_controller.create_order);
router.get('/user/:id',verifyToken,isLoggedIn,orders_controller.get_users_orders);
router.get('/',verifyToken,isLoggedIn,isAdmin,orders_controller.get_all_orders);
router.get('/:id',verifyToken,isLoggedIn,orders_controller.get_order);
router.put('/:id',verifyToken,isLoggedIn,orders_controller.update_order);
router.delete('/:id',verifyToken,isLoggedIn,orders_controller.delete_order);
router.get('/restaurant/:id',verifyToken,isLoggedIn,orders_controller.get_restaurant_orders);
router.put('/mark_as_completed/:id',verifyToken,isLoggedIn,orders_controller.mark_as_completed);

module.exports = router;

