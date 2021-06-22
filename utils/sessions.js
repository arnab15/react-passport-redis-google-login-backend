const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("../db/redis");

const RedisStore = connectRedis(session);

module.exports = session({
   store: new RedisStore({ client: redisClient }),
   secret: "arnab123456",
   saveUninitialized: false,
   resave: false,
   name: "_sessionId",
   cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
      sameSite: "lax",
   },
});
