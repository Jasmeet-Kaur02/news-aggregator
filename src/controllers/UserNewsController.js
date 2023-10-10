const axios = require("axios");
const userNewsPreferences = require("../data/userNewsPreferences.json");
const userReadNews = require("../data/userReadNews.json");
const userFavouriteNews = require("../data/userFavouriteNews.json");
const users = require("../data/users.json");
const { updateUserNewsPreferences } = require("../helpers");
const Validation = require("../utilities/Validation");

const fetchNews = () => {};

const updateNewsPreferences = async (req, res) => {
  const validationRes = Validation.validateUserPreference(req.body);
  if (validationRes.status) {
    const userId = req.id;
    const parsedPreferences = JSON.parse(JSON.stringify(userNewsPreferences));
    if (parsedPreferences.hasOwnProperty(userId)) {
      parsedPreferences[userId] = {
        source: req.body.source ?? parsedPreferences[userId].source,
        category: req.body.category ?? parsedPreferences[userId].category,
        country: req.body.country ?? parsedPreferences[userId].country,
      };
    } else {
      parsedPreferences[userId] = {
        source: req.body.source,
        category: req.body.category,
        country: req.body.country,
      };
    }
    try {
      await updateUserNewsPreferences(parsedPreferences);
      return res.status(201).json({
        status: true,
        message: "News preference has been updated successfully.",
        data: parsedPreferences,
      });
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: err,
        data: null,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      messsage: validationRes.message,
      data: null,
    });
  }
};

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
