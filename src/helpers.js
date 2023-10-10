const fs = require("fs/promises");

const addUsers = async (users) => {
  const filePath = `${__dirname}/data/users.json`;
  return fs.writeFile(filePath, JSON.stringify(users), {
    encoding: "utf-8",
    flag: "w",
  });
};

const updateUserNewsPreferences = (userNewsPreferences) => {
  const filePath = `${__dirname}/data/userNewsPreferences.json`;
  return fs.writeFile(filePath, JSON.stringify(userNewsPreferences), {
    encoding: "utf-8",
    flag: "w",
  });
};

const addUserFavouriteNews = () => {};

const addUserReadNews = () => {};

module.exports = {
  addUserFavouriteNews,
  updateUserNewsPreferences,
  addUsers,
  addUserReadNews,
};
