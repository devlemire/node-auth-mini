# node-auth-mini
Node Auth 1 - Mini

## Step 1

Install and save `passport` and `passport-auth0`

## Step 2

Go to Auth0 Dashboard, register for a personal account, modify the settings of the default app

* client type: non interactive client
* token endpoint auth method: basic
* callback url: http://localhost:3000/login
* allowed origins: http://localhost:3000

## Step 3

Create a strategy js file. Require auth0 strat. Create a new strategy and export it. Get your client domain, id, and secret from manage.auth0.com

## Step 4

Require passport and strategy in index.js. Configure the app to use sessions. Initialize passport and configure passport to use sessions.

## Step 5

Create a `serialize` and `deserialize` endpoint. Use serialize to grab the user id, display name, nickname, and email.

## Step 6

Create a login endpoint that uses `passport.authenticate` and redirects to `/me` on success and `/login` on failure. Enable failureFlash.

## Step 7

Create a `/me` endpoint that sends a response of `req.user` or `req.session.passport.user`.

## Step 8

Test the strategy in your browser ( http://localhost:3000/login )



