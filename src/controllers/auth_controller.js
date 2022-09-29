const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.findOne({ email: email });
    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            let data = {
                "_id": user._id,
                "name": user.name,
                "email": user.email,
                "cretedAt": Date(),
                "exp": Math.floor(Date.now() / 1000) + (60 * 60),
            }
            const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
            res.send({
                statusCode: 200,
                accessToken: token,
                expires: data.exp
            });
        } else {
            res.status(404).send({
                statusCode: 404,
                message: "Email or password is Invalid"
            })
        }
    } else {
        res.status(404).send({
            statusCode: 404,
            message: "Email or password is Invalid"
        })
    }

}
const logout = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.send('goodbye')
    });

}

const googleLogin = (req, res, next) => {
    req.session.query = req.query;
    passport.authenticate('google', { scope: ['email', 'profile'] }
    )(req, res, next)
}

const oAuthCallback = (req, res, next) => {
    passport.authenticate('google', {
        failureRedirect: '/api/auth/login'
    })(req, res, next)
}
const successRedirect = (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        id: req.user.id
    }

    const token = jwt.sign(data, jwtSecretKey);
    if (req.query.redirect_to) {
        let redirect = req.query.redirect_to;
        req.session.query = null;
        // res.redirect(redirect + "?code=" + token);
        res.redirect(301, redirect + '?code=' + token);
    } else {
        res.redirect('/api/auth/grant?code=' + token);
    }
}
const grant = (req, res, next) => {
    // Grant a code toget user
    res.send({ 'grantCode': req.query.code });
}

const accessToken = async (req, res) => {

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
            "exp": Math.floor(Date.now() / 1000) + (60 * 60),
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

}

module.exports = {
    login: login,
    googleLogin: googleLogin,
    oAuthCallback: oAuthCallback,
    successRedirect: successRedirect,
    logout: logout,
    grant: grant,
    accessToken: accessToken

}