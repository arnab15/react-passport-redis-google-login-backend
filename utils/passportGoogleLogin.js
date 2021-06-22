const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user");

passport.use(
   new GoogleStrategy(
      {
         clientID: process.env.GOOGLE_CLIENT_ID,

         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         callbackURL: "http://localhost:4000/auth/google/callback",
         passReqToCallback: true,
      },
      async (req, acccessToken, refreshToken, profile, cb) => {
         //  console.log("Acess Token Refresh Token", acccessToken);
         //  console.log("refresh token", refreshToken);
         const { id, name, emails, photos } = profile;

         const email = emails[0].value;
         const emailVerified = emails[0].verified;
         const fullName = `${name.givenName} ${name.familyName}`;
         const profilePic = photos[0].value;

         if (emailVerified) {
            try {
               let user = await User.findOne({
                  googleId: id,
               });

               if (!user) {
                  const createnewUser = new User({
                     googleId: id,
                     name: fullName,
                     email,
                     picture: profilePic,
                  });

                  const newUser = await createnewUser.save();
                  return cb(null, newUser);
               } else {
                  return cb(null, user);
               }
            } catch (error) {
               cb(new Error(error.message), null);
            }
         } else {
            return cb(new Error("Email Not verified", null));
         }
      }
   )
);

passport.serializeUser((user, cb) => {
   cb(null, user.googleId);
});

passport.deserializeUser(async (id, cb) => {
   if (id) {
      try {
         const user = await User.findOne({ googleId: id });

         if (user) {
            return cb(null, user);
         } else {
            return cb(new Error("User Not Found"), null);
         }
      } catch (error) {
         return cb(new Error(error.message), null);
      }
   } else {
      return cb(new Error("No id present for dserialization"), null);
   }
});
