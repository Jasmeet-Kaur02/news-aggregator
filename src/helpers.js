const fs = require("fs");

const addUsers = async (users) => {
  const filePath = `${__dirname}/data/users.json`;
  return fs.writeFile(
    filePath,
    JSON.stringify(users),
    {
      encoding: "utf-8",
      flag: "w",
    },
    (err) => {
      if (err) {
        return {
          status: false,
          message: "Error while adding user",
        };
      }
      return {
        status: true,
        message: "User has been added successfully",
      };
    }
  );
};

const addUserNewsPreferences = (userNewsPreferences) => {
  const filePath = `${__dirname}/data/`;
};

const addUserFavouriteNews = () => {};

const addUserReadNews = () => {};

module.exports = {
  addUserFavouriteNews,
  addUserNewsPreferences,
  addUsers,
  addUserReadNews,
};
