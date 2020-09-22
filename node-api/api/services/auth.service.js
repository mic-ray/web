const jwt = require("jsonwebtoken");

exports.login = credentials => {
  const token = jwt.sign(
    {
      email: credentials.email
    },
    process.env.CRYPTO_KEY,
    {
      expiresIn: "1h"
    }
  );
  return token;
};
