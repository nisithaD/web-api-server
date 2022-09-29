const router = require('express').Router();
const { isLoggedIn } = require('../middlewares/authenticator');
const UserController = require('../controllers/user_controller');
const AuthController = require('../controllers/auth_controller');

// User Login : Nuwan
router.post('/login', AuthController.login);
// User Registration : Nuwan
router.post('/register', UserController.newUser);

// Google oAuth login: Nuwan
router.get('/google/login', AuthController.googleLogin);
// Google OAuth callback : Nuwan
router.get('/callback', AuthController.oAuthCallback, AuthController.successRedirect);
// user Logout : Nuwan
router.get('/logout', AuthController.logout);
// provide the grant token for access token : Nuwan 
router.get('/grant', isLoggedIn, AuthController.grant);
// Access token : Nuwan
router.get('/access', AuthController.accessToken);

module.exports = router;