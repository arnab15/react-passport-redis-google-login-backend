const express = require("express");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const router = express.Router();

const successRedirectUrl = "http://localhost:3000/login/success";
const errorRedirectUrl = "http://localhost:3000/login/error";

router.get(
   "/login/google",
   passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
   "/auth/google/callback",
   passport.authenticate("google", {
      failureMessage: "Cannot login to Google, please try again later!",
      failureRedirect: errorRedirectUrl,
      successRedirect: successRedirectUrl,
   }),
   (req, res) => {
      console.log("User: ", req.user);
      //res.send("Thank you for signing in!");
   }
);

router.get("/logout", isAuthenticated, (req, res, next) => {
   req.session.destroy();
   // req.logOut();
   //return res.redirect("http://localhost:3000/login");
});
module.exports = router;
