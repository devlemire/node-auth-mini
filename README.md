<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# Project Summary

In this project, we'll use `passport` to handle authenticating users. Passport can use many different `strategies` to authenticate users. However, we'll take a look at just one of them for this project. We are going to use the `auth0` strategy. We'll have to sign-up at `manage.auth0.com` to get an app (aka client) that we can login to. 

## Setup

* `Fork` and `clone` this repository.
* `cd` into the project directory.
* Run `npm install`.

## Step 1

### Summary

In this step, we'll install the required dependencies to use passport and the `auth0` strategy in a node application.

### Instructions

* Run `npm install --save passport passport-auth0`.

### Solution

<b> insert giphy here </b>

## Step 2

### Summary

In this step, we'll go to `manage.auth0.com` to create an account and modify the default client they give us. 

### Instructions

* Go to <a href="manage.auth0.com">Manage Auth0</a>.
* Register for an account.
  * Set the account type to `Personal`.
  * Set the role to `Developer`.
  * Set the project to `Just playing around`.
* Login to your Auth0 account.
* Go to `Clients` using the left navigation bar.
* Click on `Settings` for the default app.
  * Change the `Client Type` to `Non Interactive Client`.
  * Change the `Token Endpoint Authentication Method` to `Basic`.
  * Change the `Allowed Callback URLs` to `http://localhost:3000/login`.
  * Change the `Allowed Origins` to `http://localhost:3000`
* Click `Save Changes`.
* Keep the page open, we'll need the `domain`, `id`, and `secret` later.

## Step 3

### Summary

In this step, we'll create a `strategy.js` file that will `require` the `auth0` strategy and we'll configure it to use our newly created `auth0` client.

### Instructions

* Create a `strategy.js` file.
* Open `strategy.js`.
* Require the `passport-auth0` strategy in a variable called `Auth0Strategy`.
* Use `module.exports` to export a `new Auth0Strategy`.
  * <details>
  
    <summary> <code> Syntax </code> </summary>
    
    ```js
    module.exports = new Auth0Strategy({
      domain:       '...',
      clientID:     '...',
      clientSecret: '...',
      callbackURL:  '/login'
      },
      function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
      }
    );
    ```
    
    </details>
* Modify the `domain`, `clientID`, and `clientSecret` to use yours from `manage.auth0.com`.

### Solution

<details>

<summary> <code> strategy.js </code> </summary>

```js
const Auth0Strategy = require('passport-auth0');

module.exports = new Auth0Strategy({
   domain:       'jameslemire.auth0.com',
   clientID:     '4_8ZQzEOP6mYeoQbeAmscWFmjl-SjIVt',
   clientSecret: '409I19zLLQfdsfgdfgvtQwlDwM=fraMC234bcdM07kntJE2f4D6PdZNfzRO23417A_1OfzcM7Owtla',
   callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);
```

</details>

## Step 4

### Summary

In this step, we'll configure our app to use sessions and passport with our newly created strategy. 

### Instructions

* Open `index.js`.
* Require `passport` and `strategy` from `strategy.js`.
* Configure the app to use sessions.
* Initialize passport and configure passport to use sessions.
* Configure passport to use our required strategy.

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
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

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 5

### Summary 

In this step, we'll use the `serializeUser` and `deSerializeUser` methods of passport. These methods get called before a successful redirect. We can use these methods to pick what properties we want to store on session.

### Instructions

* Open `index.js`.
* Call the `passport.serializeUser` method and pass in a function as the first argument.
  * This function should have a `user` and `done` parameter.
  * This function should call `done` with `null` as the first argument and an object as the argument.
    * Use an object that only has the `id`, `displayName`, `nickname`, and `email` from `user`.
* Call the `passport.deSerializeUser` method and pass in a function as the first argument.
  * This function should should have a `obj` and `done `parameter.
    * `obj` will equal the object we passed into `done` from `serializeUser`.
  * This functions should call `done` with `null` as the first argument and `obj` as the second argument.
    * After `done` is finished, the value of `obj` is then stored on `req.user` and `req.session.passport.user`.

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
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
  done(null, { id: user.id, display: user.displayName, nickname: user.nickname, email: user.emails[0].value });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 6

### Summary 

In this step, we'll create a login endpoint that will call the `authenticate` method on passport. We'll then configure it to `redirect` to a `/me` endpoint on success and the `/login` endpoint on failure. We'll also enable `failureFlash` so passport can flash an error message on failure.

### Instructions

* Open `index.js`.
* Create a `GET` endpoint at `/login` that calls the `authenticate` method on passport.
  * The first argument should be a string of the strategy: `'auth0'`.
  * The second argument should be a configuration object:
    * Add a `successRedirect` property that equals `'/me'`.
    * Add a `failureRedirect` property that equals `'/login'`.
    * Add a `failureFlash` property that equals `true`.

### Solution

<details>

<summary> <code> index.js </code> </summary>

```js
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
  done(null, { id: user.id, display: user.displayName, nickname: user.nickname, email: user.emails[0].value });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get( '/login', passport.authenticate('auth0', { successRedirect: '/me', failureRedirect: '/login', failureFlash: true }) );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
```

</details>

## Step 7

Create a `/me` endpoint that sends a response of `req.user` or `req.session.passport.user`.

## Step 8

Test the strategy in your browser ( http://localhost:3000/login )



