require("dotenv").config();

const newsURL = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEWSAPI_KEY}`;

module.exports = { newsURL };
