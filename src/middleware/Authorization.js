const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token =
      req.headers.authorization.split(" ")[1] ?? req.headers.authorization;
    jwt.verify(token, process.env.API_KEY, (authError) => {
      if (authError) {
        return res.status(401).json({
          status: false,
          message: "Account is unauthorized.",
          data: null,
        });
      } else {
        next();
      }
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Account is unauthorized.",
      data: null,
    });
  }
};

module.exports = { verifyToken };
