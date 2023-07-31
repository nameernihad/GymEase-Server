const jwt = require("jsonwebtoken");

require("dotenv").config();

const verifyToken = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;

  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided." });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token." });
    }

    req.user = decoded;
    next();
  });
};

const generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY;
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  generateToken,
  verifyToken,
};
