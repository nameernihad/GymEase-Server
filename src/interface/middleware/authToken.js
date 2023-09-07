const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSecretKey = process.env.USER_SECRET_KEY;
const adminSecretKey = process.env.ADMIN_SECRET_KEY;
const trainerSecretKey = process.env.TRAINER_SECRET_KEY;

const verifyToken = (authHeader, expectedSecretKey, req, res, next) => {
  try {
    if (!authHeader || !expectedSecretKey) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated!", Auth: false });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, expectedSecretKey, (err, decoded) => {
      console.log(token);
      if (err) {
        console.log(err.message);
        return res.status(403).json({ error: "Invalid token" });
      }
      if (decoded) {
        req.user = decoded;
        return next();
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
      message: "Not authenticated catch !",
      Auth: false,
    });
  }
};

const userAuthToken = (req, res, next) => {
  const authHeader = req.headers.client;
  verifyToken(authHeader, userSecretKey, req, res, next);
};

const adminAuthToken = (req, res, next) => {
  const authHeader = req.headers.admin;
  verifyToken(authHeader, adminSecretKey, req, res, next);
};

const trainerAuthToken = (req, res, next) => {
  const authHeader = req.headers.trainer;
  verifyToken(authHeader, trainerSecretKey, req, res, next);
};

const generateToken = (payload, secretKey) => {
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secretKey, options);
};

module.exports = {
  generateToken,
  userAuthToken,
  adminAuthToken,
  trainerAuthToken,
};
