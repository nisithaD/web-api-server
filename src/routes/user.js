const { register, login, verify_token, get_user } = require('../controllers/user_controller');

const router = require('express').Router();

router.post('/register', register)
router.get('/login', login)
router.get('/user', verify_token, get_user)


module.exports = router;