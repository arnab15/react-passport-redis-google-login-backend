const redis = require("redis");

const redisClient = redis.createClient({
   port: process.env.REDIS_PORT,
   host: process.env.REDIS_HOST,
});

redisClient.on("connect", (message) => {
   console.log(`Redis Connected successfully`);
});
redisClient.on("disconnect", (message) => {
   console.log(`Redis server disconnected`);
});
redisClient.on("error", () => {
   console.log("Unable to connect redis client");
});
module.exports = redisClient;
