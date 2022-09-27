var express = require('express');
var router = express.Router();
var orders_controller = require('../controllers/orders_controller');
const auth = require('../middlewares/authenticator');

router.post('/', auth, orders_controller.create_order);
router.get('/get_all_orders', auth, orders_controller.get_all_orders);
router.get('/:id', auth, orders_controller.get_order);
router.put('/:id', auth, orders_controller.update_order);
router.delete('/:id', auth, orders_controller.delete_order);
router.get('/get_restaurant_orders/:id', auth, orders_controller.get_restaurant_orders);
router.put('/mark_as_completed/:id', auth, orders_controller.mark_as_completed);

module.exports = router;
