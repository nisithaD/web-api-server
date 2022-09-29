function log(req, res, next) {
    console.log("Get all  Functionality");
    console.log('Time:', Date.now())
    next();
}
module.exports = log;