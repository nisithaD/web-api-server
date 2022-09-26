var express = require('express');
var router = express.Router();
var favourite_controller = require('../controllers/favourites_controller');

router.get('/', favourite_controller.get_all_favourites);
router.post('/:id', favourite_controller.add_to_favourites);
router.delete('/:id', favourite_controller.remove_from_favourites);

module.exports = router;