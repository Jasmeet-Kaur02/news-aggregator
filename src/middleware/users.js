const users = require("../data/users.json");

const validateUserId = (req, res, next) => {
  const parsedUsers = JSON.parse(JSON.stringify(users));
  const userId = req.params.id;
  if (parsedUsers.some((user) => user.id === userId)) {
    req.id = userId;
    next();
  } else {
    return res.status(404).json({
      status: false,
    });
  }
};

module.exports = { validateUserId };
