const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
   {
      name: {
         type: String,
      },
      email: {
         type: String,
         unique: true,
      },
      googleId: {
         type: String,
         unique: true,
      },
      picture: {
         type: String,
      },
   },
   {
      timestamps: true,
   }
);

exports.User = mongoose.model("user", UserSchema);
