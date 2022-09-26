const { register,login,get_user} = require('../controllers/user_controller');
const auth = require('../middlewares/authenticator');

const router=require('express').Router();

router.post('/register',register)
router.post('/login',login)
router.get('/user',auth,get_user)


module.exports=router;