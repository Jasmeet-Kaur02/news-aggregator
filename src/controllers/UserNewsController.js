const axios = require("axios");
const UserNewsPreferences = require("../data/userNewsPreferences.json");
const UserReadNews = require("../data/userReadNews.json");
const UserFavouriteNews = require("../data/userFavouriteNews.json");
const Validation = require("../utilities/Validation");

const fetchNews = () => {};

const updateNewsPreferences = () => {};

const getNewsPreferences = () => {};

const updateReadPreferences = () => {};

const getReadPreferences = () => {};

const updateFavouritePreferences = () => {};

const getFavouritePreferences = () => {};

module.exports = {
  updateNewsPreferences,
  getNewsPreferences,
  updateReadPreferences,
  getReadPreferences,
  updateFavouritePreferences,
  getFavouritePreferences,
  fetchNews,
};
