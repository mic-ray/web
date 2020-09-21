exports.auth_login = (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(credentials);
  return res.status(200).json({
    message: "Logged in!"
  });
};

exports.auth_signup = (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(credentials);
  return res.status(200).json({
    message: "Signed up!"
  });
};
