const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.API_KEY, (authError, authRes) => {
      if (authError) {
        return res.status(500).json({
          status: false,
          message: "Error while authenticating account.",
          data: null,
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Authentication error.",
      data: null,
    });
  }
};

module.exports = { verifyToken };
