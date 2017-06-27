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

* 

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



