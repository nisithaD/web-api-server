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
        request.query.redirect_to = request.session.query.redirect_to;
        request.query.email = profile.email
        request.session.query = null;
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
        return;
    }
    try {
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
            if (err) {
                res.status(401).send({
                    statusCode: 401,
                    message: err.message
                });
                return
            } else {
                let user = await User.findOne({ email: decoded.email }).select({ _id: 0, googleId: 0, favourites: 0, cart: 0, wishlist: 0, __v: 0 });
                req['user'] = user;
                next();
            }
        });


    } catch (e) {
        res.status(401).send({
            statusCode: 401,
            message: e
        });
        return
    }

}
function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).send({
            statusCode: 403,
            message: "Access Unauthorized"
        })
    }
}

module.exports = { isLoggedIn: isLoggedIn, verifyToken: verifyToken, isAdmin: isAdmin };
