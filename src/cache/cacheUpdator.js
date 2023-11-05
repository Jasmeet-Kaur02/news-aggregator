const axios = require("axios");
const { newsURL } = require("../config");
const users = require("../data/users.json");
const userNewsPreferences = require("../data/userNewsPreferences.json");
const redisClient = require("../cache/redis");

const updateNewsCache = () => {
  const parsedUserPreferences = JSON.parse(JSON.stringify(userNewsPreferences));
  setInterval(() => {
    users.forEach(async (user) => {
      await redisClient
        .ttl(`news-${user.id}`)
        .then((expiredTime) => {
          const userPreference = parsedUserPreferences[user.id];
          if (expiredTime < 0 && userPreference) {
            const promises = [];
            Object.keys(userPreference).forEach((key) => {
              if (userPreference[key] != null) {
                promises.push(
                  axios.get(`${newsURL}&${key}=${userPreference[key]}`)
                );
              }
            });
            if (promises.length) {
              Promise.all(promises).then(async (newsRes) => {
                let news = [];
                newsRes.forEach((newsData) => {
                  news = [...news, ...newsData.data.articles];
                });
                await redisClient.set(`news-${user.id}`, JSON.stringify(news), {
                  EX: 60 * 60 * 24,
                  NX: true,
                });
              });
            }
          }
        })
        .catch((err) => {
          console.log("Error while getting cached news");
        });
    });
  }, 60 * 60 * 24 * 1000);
};

module.exports = { updateNewsCache };
