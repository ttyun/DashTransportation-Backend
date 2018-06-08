const functions = require('firebase-functions');
// const stripe = require('stripe')(functions.config().stripe.token);
const config = require('./config.default.js');
const stripe = require('stripe')(config.stripe.secretKey);
const express = require('express');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// stripe.customers.create({
//   description: 'Customer for addison.jackson@example.com'
//   // source: "tok_amex" // obtained with Stripe.js
// }, function(err, customer) {
//   // asynchronously called
//   if (err) {
//    console.log("UP ERROR: " + err);
//   }
//   console.log("CUSTOMER UP: " + customer);
//   id = customer.id;
// });

// stripe.customers.retrieve(
//   id,
//   function(err, customer) {
//       if (err) {
//          console.log("THERES AN ERROR: " + err);   
//       }
//       console.log("IT WORKS: " + customer);
//       console.log("IT WORKS2: " + JSON.stringify(customer));
//   }
// );
app.use('/customer', require('./routes/api/customer'));

app.post('/ephemeral_keys/:version/:customer_id', (req, res) => {
   const stripe_customerID = req.params.customer_id;
   const stripe_version = req.params.version;

   console.log("Customer ID: " + stripe_customerID);
   console.log("REQUEST PARAMS NO STRINGIFY: " + req.params);
   console.log("REQUEST PARAMS: " + JSON.stringify(req.params));

   //var testCustomerId = "cus_CWeNHW9U75DkZ6";
   if (!stripe_version) {
      res.status(400).end();
      return;
   }
   // This function assumes that some previous middleware has determined the
   // correct customerId for the session and saved it on the request object.
   stripe.ephemeralKeys.create(
      {customer: stripe_customerID},
      {stripe_version: stripe_version}
   ).then((key) => {
      res.status(200).json(key);
      return;
   }).catch((err) => {
      console.log("500 ERROR: " + err);
      res.status(500).end();
      return err;
   });
});


const api1 = functions.https.onRequest(app);

module.exports = {
   api1
}

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
