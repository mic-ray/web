const jwt = require("jsonwebtoken");
const ApiError = require("../utils/error");

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.CRYPTO_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(new ApiError("Authentication failed", 401));
  }
};
