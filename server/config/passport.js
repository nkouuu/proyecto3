const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

function configure(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .populate("notifications.userId")
      .then(user => next(false, user))
      .catch(err => next(err, false));
  });

  passport.use(
    new LocalStrategy((username, password, next) => {
      User.findOne({ username })
        .populate("notifications.userId")
        .then(user => {
          console.log(user);
          if (!user) {
            return next(null, false, { message: "Incorrect username or password" });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, { message: "Incorrect username or password" });
          }

          return next(null, user);
        })
        .catch(err => {
          if (err) {
            return next(err);
          }
        });
    })
  );
}

module.exports = configure;
