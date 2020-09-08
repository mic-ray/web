function log(req, res, next) {
    console.log('Received request of method:' + req.method);
    next();
}
module.exports = log;
