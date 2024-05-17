const jwt = require("jsonwebtoken");

const connectDb = require("../config/database");

const authenticateUser = async (req, res, next) => {
  try {
    const accessToken = req.header("Authorization");

    if (!accessToken) {
      return res.status(400).json({
        message: "Invalid authentication. No token present",
      });
    }

    const decodeToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

    if (!decodeToken) {
      return res.status(400).json({
        message: "Invalid authentication. Wrong token",
      });
    }

    req.user = {
      user_id: decodeToken.user_id,
    };

    next();
  } catch (error) {
    return res.status(500).json({
      message: `Authentication failed due to ${error.message}`,
    });
  }
};

module.exports = authenticateUser;
