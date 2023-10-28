const jwt = require("jsonwebtoken");
const uuid4 = require("uuid4");

const createToken = () => {
  return new Promise((resolve, reject) => {
    const app_access_key = process.env.ACCESS_KEY;
    const app_secret = process.env.SECRET_KEY;
    const payload = {
      access_key: app_access_key,
      type: "management",
      version: 2,
      iat: Math.floor(Date.now() / 1000),
      nbf: Math.floor(Date.now() / 1000),
    };

    jwt.sign(
      payload,
      app_secret,
      {
        algorithm: "HS256",
        expiresIn: "24h",
        jwtid: uuid4(),
      },
      (err, token) => {
        if (err) {
          reject(err); 
        } else {
          resolve(token); 
        }
      }
    );
  });
};

module.exports = {
  createToken,
};
