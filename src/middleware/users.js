const fs = require("fs/promises");
const path = require("path");

const validateUserId = (req, res, next) => {
  const filePath = path.join(__dirname, "..", "data", "users.json");
  fs.readFile(filePath, { encoding: "utf-8" })
    .then((users) => {
      const parsedUsers = JSON.parse(users);
      const userId = req.params.id;
      if (parsedUsers.some((user) => user.id === userId)) {
        req.id = userId;
        next();
      } else {
        return res.status(404).json({
          status: false,
          message: "User with the provided id doesn't not exists.",
          data: null,
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
        data: null,
      });
    });
};

module.exports = { validateUserId };
