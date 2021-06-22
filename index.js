const express = require("express");
require("dotenv").config();
const session = require("./utils/sessions");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
require("./db/mongoose")();
require("./utils/passportGoogleLogin");
const app = express();
app.use(express.json());

app.use(
   express.urlencoded({
      extended: true,
   })
);
app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);
app.use(session);

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
   res.send({
      message: "Hii there",
   });
});
app.use("/", authRoute);
app.use("/", profileRoute);

app.listen(process.env.PORT, () => {
   console.log(`Server is Up on ${process.env.PORT}`);
});
