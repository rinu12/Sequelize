const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const users = require("../models/users");
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
      users
        .findOne({ where: { id: jwt_payload.id }, raw: true })
        .then((user) => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
};
