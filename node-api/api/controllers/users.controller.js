const UsersService = require("../services/users.service");

exports.user_email = (req, res, next) => {
  const email = req.params.email;

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
