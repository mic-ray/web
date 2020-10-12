const UsersService = require("../services/users.service");
const ApiError = require("../utils/error");

exports.user_email = (req, res, next) => {
  const email = req.params.email;
  const user = req.user;
  // If requested email is not the same
  // as was authenticated return error
  if (email !== user.email)
    return next(new ApiError("Authorization failed", 403));
  UsersService.getUserByEmail(email).then(
    result => {
      return res.status(200).json({
        result: "User found!",
        user: result
      });
    },
    err => next(err)
  );
};

exports.user_check_email = (req, res, next) => {
  const email = req.params.email;

  UsersService.checkEmail(email).then(
    () => {
      return res.status(200).json({
        result: "E-Mail available!",
        email: email
      });
    },
    err => next(err)
  );
};
