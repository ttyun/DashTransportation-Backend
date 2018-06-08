'use strict';

module.exports = {
  // App name.
  appName: 'Dash Transportation',

  // Server port.
  // port: 3000,

  // Secret for cookie sessions.
  // secret: '',

  // Configuration for Stripe.
  // API Keys: https://dashboard.stripe.com/account/apikeys
  // Connect Settings: https://dashboard.stripe.com/account/applications/settings
  stripe: {
    secretKey: 'sk_test_8SmkYxLR97iJEzFEwZpPSguZ',
    publishableKey: 'pk_test_7OcC0FO293KkuiwKKy1MuAkL',
    clientId: 'YOUR_STRIPE_CLIENT_ID',
    authorizeUri: 'https://connect.stripe.com/express/oauth/authorize',
    tokenUri: 'https://connect.stripe.com/oauth/token'
  },

  firebase: {
    apiKey: "AIzaSyC0jBBlCKEbLxmoBn3NjF3KZoGEM19Gzck",
    authDomain: "dash-transportation.firebaseapp.com",
    databaseURL: "https://dash-transportation.firebaseio.com/",
    storageBucket: "gs://dash-transportation.appspot.com"
  }

  // Configuration for MongoDB.
  // mongo: {
  //   uri: 'mongodb://localhost/rocketrides'
  // },

  // Configuration for Google Cloud (only useful if you want to deploy to GCP).
  // gcloud: {
  //   projectId: 'YOUR_PROJECT_ID'
  // }
};