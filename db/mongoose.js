const mongoose = require("mongoose");
const dbURL = process.env.DB_URL;
module.exports = () => {
   mongoose
      .connect(dbURL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      })
      .then(() => {
         console.log("Mongoose default connection is open to ", dbURL);
      })
      .catch((err) => {
         console.log("Unable to connect to data base", err);
      });
   mongoose.connection.on("disconnected", function () {
      console.log("Mongoose default connection is disconnected");
   });
};
