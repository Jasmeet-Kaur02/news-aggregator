const fs = require("fs/promises");

const addUsers = async (users) => {
  const filePath = `${__dirname}/data/users.json`;
  return fs.writeFile(filePath, JSON.stringify(users), {
    encoding: "utf-8",
    flag: "w",
  });
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
