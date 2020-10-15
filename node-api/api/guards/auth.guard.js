const jwt = require("jsonwebtoken");
const ApiError = require("../utils/error");

const authError = new ApiError("Authentication failed", 401);

exports.verifyToken = (req, res, next) => {
  try {
    // Get and verify token from request headers
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.CRYPTO_KEY);
    req.user = payload;
    next();
  } catch (error) {
    next(authError);
  }
};

exports.verifyUser = (req, res, next) => {
  try {
    // Get and verify token from request headers
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.CRYPTO_KEY);
    // Check if requested username is equal to verified one
    if (req.params.username !== payload.username)
      return next(new ApiError(authError.message, 403));
    req.user = payload;
    next();
  } catch (error) {
    next(authError);
  }
};
