const UsersService = require("../services/users.service");

exports.user_by_username = (req, res, next) => {
  const username = req.params.username;
  UsersService.getUserByUsername(username).then(
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
