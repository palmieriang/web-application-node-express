const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'username', // input id="username"
      passwordField: 'password', // input id="password"
    }, (username, password, done) => {
      const user = {
        username, password
      };
      done(null, user);
    }
  ));
};
