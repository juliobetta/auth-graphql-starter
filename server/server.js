const path = require('path');
const result = require('dotenv').config({ path: path.resolve(__dirname, '.env') });

if (result.error) {
  throw result.error;
}

const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./services/auth');
const webpackConfig = require('../webpack.config.js');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const app = express();

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_LAB_URI } = process.env;
const MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_LAB_URI}`;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.APP_SECRET,
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(
  webpackMiddleware(
    webpack(webpackConfig)
  )
);

module.exports = app;
