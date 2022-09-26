var express = require('express');
var router = express.Router();
var favourite_controller = require('../controllers/favourites_controller');
const auth = require('../middlewares/authenticator');

router.get('/', auth,favourite_controller.get_all_favourites);
router.post('/:id', auth,favourite_controller.add_to_favourites);
router.delete('/:id', auth,favourite_controller.remove_from_favourites);

module.exports = router;
