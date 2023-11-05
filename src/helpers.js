const fs = require("fs/promises");

const userNewsPreferencesFilePath = `${__dirname}/data/userNewsPreferences.json`;

const addUsers = async (users) => {
  const filePath = `${__dirname}/data/users.json`;
  return fs.writeFile(filePath, JSON.stringify(users), {
    encoding: "utf-8",
    flag: "w",
  });
};

const updateUserNewsPreferences = (userNewsPreferences) => {
  return fs.writeFile(
    userNewsPreferencesFilePath,
    JSON.stringify(userNewsPreferences),
    {
      encoding: "utf-8",
      flag: "w",
    }
  );
};

const readNewsPreferences = () => {
  return fs.readFile(userNewsPreferencesFilePath, { encoding: "utf-8" });
};

const addUserFavouriteNews = () => {};

const addUserReadNews = () => {};

module.exports = {
  addUserFavouriteNews,
  updateUserNewsPreferences,
  addUsers,
  addUserReadNews,
  readNewsPreferences,
};
