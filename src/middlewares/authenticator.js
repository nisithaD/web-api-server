const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user');
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:" + process.env.PORT + "/api/auth/callback",
    passReqToCallback: true,
},
    async function (request, accessToken, refreshToken, profile, done) {

        let user = await User.find({ "email": profile.email });
        let err = null;
        if (user.length <= 0) {
            // Create a user
            try {
                user = await User.create({
                    "googleId": profile.id,
                    "name": profile.displayName,
                    "email": profile.email
                });
            } catch (e) {
                err = e;  // 
            }
        }
        return done(err, profile);
    }
));
passport.serializeUser((user, done) => {
    done(null, user)
});
passport.deserializeUser((user, done) => {
    done(null, user)
});

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

function verifyToken(req, res, next) {
    const token = req.header(process.env.TOKEN_HEADER_KEY);
    if (!token) {
        res.status(401).send({
            statusCode: 401,
            message: 'Access Token is Required'
        });
    }
    try {
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log(err.message);
                res.status(401).send({
                    statusCode: 401,
                    message: err.message
                });
            } else {
                next();
            }
        });


    } catch (e) {
        res.status(401).send({
            statusCode: 401,
            message: e
        });
    }

}

module.exports = { isLoggedIn: isLoggedIn, verifyToken: verifyToken };