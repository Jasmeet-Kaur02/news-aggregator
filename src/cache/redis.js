const redis = require("redis");
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient
  .connect()
  .then((res) => {
    console.log("Connected to the redis");
  })
  .catch((err) => {
    console.log("Error while connecting to the redis", err);
  });

module.exports = redisClient;
