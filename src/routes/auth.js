const router = require('express').Router();
const passport = require('passport');
const { isLoggedIn } = require('../middlewares/authenticator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/login',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));
router.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/api/auth/grant',
        failureRedirect: '/api/auth/login'
    })
);
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.send('goodbye')
    });

});

router.get('/grant', isLoggedIn, (req, res, next) => {
    // Grant a code toget user
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log(req.user);
    let data = {
        id: req.user.id
    }

    const token = jwt.sign(data, jwtSecretKey);
    res.send({ 'grantCode': token });
});

router.get('/access', async (req, res) => {

    let email = req.query.email;
    let grantCode = req.query.grantCode;
    const verified = jwt.verify(grantCode, process.env.JWT_SECRET_KEY);
    let user = await User.findOne({ 'email': email });
    if (user && user.googleId === verified.id) {
        let data = {
            "_id": user._id,
            "name": user.name,
            "email": user.email,
            "cretedAt": Date(),
            "iat": Math.floor(Date.now() / 1000) + (60 * 60),
        }
        const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
        res.send({
            statusCode: 200,
            accessToken: token,
            expires: data.exp
        });

    } else {
        res.status(401).send({
            statusCode: 401,
            message: "Invalid Grant Code"
        });
    }
});

module.exports = router;