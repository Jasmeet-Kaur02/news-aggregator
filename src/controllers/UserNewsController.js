const axios = require("axios");
const userNewsPreferences = require("../data/userNewsPreferences.json");
const userReadNews = require("../data/userReadNews.json");
const userFavouriteNews = require("../data/userFavouriteNews.json");
const users = require("../data/users.json");
const { updateUserNewsPreferences } = require("../helpers");
const Validation = require("../utilities/Validation");

const parsedUserPreferences = JSON.parse(JSON.stringify(userNewsPreferences));

const fetchNews = (req, res) => {
  const userId = req.id;
  const userPreference = parsedUserPreferences[userId];
  let url = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWSAPI_KEY}`;

  if (userPreference) {
    const promises = [];
    Object.keys(userPreference).forEach((key) => {
      if (userPreference[key] != null) {
        promises.push(axios.get(`${url}&${key}=${userPreference[key]}`));
      }
    });
    if (promises.length) {
      Promise.all(promises)
        .then((newsRes) => {
          let news = [];
          newsRes.forEach((newsData) => {
            news = [...news, ...newsData.data.articles];
          });
          return res.status(200).json({
            status: true,
            message: "All news have been fetched successfully.",
            data: news,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            status: false,
            message: "Error while fetching news.",
            data: null,
          });
        });
    } else {
      return res.status(400).json({
        status: false,
        message: "Cannot fetch news. Please select your preferences.",
        data: null,
      });
    }
  } else {
    return res.status(400).json({
      status: false,
      message: "Cannot fetch news. Please select your preferences.",
      data: null,
    });
  }
};

const updateNewsPreferences = async (req, res) => {
  const validationRes = Validation.validateUserPreference(req.body);
  if (validationRes.status) {
    const userId = req.id;
    if (parsedUserPreferences.hasOwnProperty(userId)) {
      parsedUserPreferences[userId] = {
        sources: req.body.sources ?? parsedUserPreferences[userId].sources,
        category: req.body.category ?? parsedUserPreferences[userId].category,
        country: req.body.country ?? parsedUserPreferences[userId].country,
      };
    } else {
      parsedUserPreferences[userId] = {
        sources: req.body.sources,
        category: req.body.category,
        country: req.body.country,
      };
    }
    try {
      await updateUserNewsPreferences(parsedUserPreferences);
      return res.status(201).json({
        status: true,
        message: "News preference has been updated successfully.",
        data: parsedUserPreferences,
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

const getNewsPreferences = (req, res) => {
  const userId = req.id;
  const userPreference = parsedUserPreferences[userId];
  if (userPreference) {
    return res.status(200).json({
      status: true,
      message: "News preference have been fetched successfully.",
      data: userPreference,
    });
  } else {
    return res.status(404).json({
      status: false,
      message: "No news preference found.",
      data: null,
    });
  }
};

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
