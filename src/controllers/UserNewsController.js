const axios = require("axios");
const userNewsPreferences = require("../data/userNewsPreferences.json");
const userReadNews = require("../data/userReadNews.json");
const userFavouriteNews = require("../data/userFavouriteNews.json");
const { updateUserNewsPreferences } = require("../helpers");
const Validation = require("../utilities/Validation");
const redisClient = require("../cache/redis");
const { newsURL } = require("../config");

const parsedUserPreferences = JSON.parse(JSON.stringify(userNewsPreferences));

const fetchNews = async (req, res) => {
  const userId = req.id;
  const userPreference = parsedUserPreferences[userId];

  if (userPreference) {
    await redisClient
      .get(`news-${userId}`)
      .then(async (cachedNews) => {
        if (cachedNews) {
          return res.status(200).json({
            status: true,
            message: "All news have been fetched successfully.",
            data: JSON.parse(cachedNews),
          });
        } else {
          const promises = [];
          Object.keys(userPreference).forEach((key) => {
            if (userPreference[key] != null) {
              promises.push(
                axios.get(`${newsURL}&${key}=${userPreference[key]}`)
              );
            }
          });

          if (promises.length) {
            Promise.all(promises)
              .then(async (newsRes) => {
                let news = [];
                newsRes.forEach((newsData) => {
                  news = [...news, ...newsData.data.articles];
                });
                await redisClient.set(`news-${userId}`, JSON.stringify(news), {
                  EX: 60 * 60 * 24,
                  NX: true,
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
        }
      })
      .catch((err) => {
        console.log(err, "Error while fetching news.");
      });
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
