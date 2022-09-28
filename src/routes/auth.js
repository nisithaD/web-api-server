const router = require('express').Router();
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/authenticator');

//Create Login
router.get('/login',
  
);

//log Out
router.get('/logout', (req, res) => {
  
});

// Grant a code toget user
router.get('/grant', isLoggedIn, (req, res, next) => {
 // Grant a code toget user
 });

// Grant a code toget Get Access
router.get('/access', async (req, res) => {

});

module.exports = router;