const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
   domain:       'jameslemire.auth0.com',
   clientID:     '4_8ZQzEOP6mYeoQbeAmscWFmjl-SjIVt',
   clientSecret: '409I19zLLQEvtQwlDwMraMCclbcdM07kntJEVD6PdZNfzROh17A_1OfzcM7Owtla',
   callbackURL:  '/callback'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);