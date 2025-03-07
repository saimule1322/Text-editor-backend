import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/Users.js';
import dotenv from 'dotenv';
dotenv.config()

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://text-editor-backend-7dv7.onrender.com/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            image: profile.photos[0].value,
          });
          await user.save();
        }
        profile.accessToken = accessToken;
        profile.refreshToken = refreshToken;
        done(null, profile);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
