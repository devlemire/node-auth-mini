const express = require('express');
const session = require('express-session');
const passport = require('passport');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();
app.use( session({
  secret: 'sup dude',
  resave: false,
  saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/callback', passport.authenticate('auth0', { failureRedirect: '/failed' }),
  ( req, res ) => {
    res.redirect('/me');
  } 
);

app.get('/me', ( req, res, next) => {
  if ( !req.user ) {
    res.redirect('/login');
  } else {
    res.status(200).send( JSON.stringify( req.user, null, 10 ) );
  }
});

app.get('/login', passport.authenticate('auth0', {}));

app.get('/failed', ( req, res, next) => {
  res.status(500).send('You are not authorized!');
});

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );