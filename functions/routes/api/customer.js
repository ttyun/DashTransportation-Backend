'use strict';

var admin = require('firebase-admin');
const firebase = require('firebase');
const functions = require('firebase-functions');
const config = require('../../config.default.js');
const stripe = require('stripe')(config.stripe.secretKey);
const express = require('express');
const router = express();

const serviceAccount = require('../../DTserviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.databaseURL
});

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
// var testcon = {
//   apiKey: "AIzaSyC0jBBlCKEbLxmoBn3NjF3KZoGEM19Gzck",
//   authDomain: "dash-transportation.firebaseapp.com",
//   databaseURL: "https://dash-transportation.firebaseio.com/",
//   storageBucket: "gs://dash-transportation.appspot.com",
// };
// firebase.initializeApp(testcon);

// CREATES CUSTOMER
// This function creates the customer ID and pushes it into the firebase db
router.post('/createCID/:uid', (req, res, next) => {
   var ref = admin.database().ref('/users');
   var userRef = ref.child(req.params.uid);

   stripe.customers.create({
   
   }, function(err, customer) {
      // asynchronously called
      if (err) {
         console.log("ERROR in customer.js 'cvsdfgsdfreateCID': " + err);
         return;
      }

      var CID = {
         customerID: customer.id
      }
      
      // Update firebase database at 'users' path
      userRef.update(CID);      
   });
});

router.get('/retrieve/:cid', (req, res, next) => {
   var cid = req.params.cid;
   console.log(cid);
   stripe.customers.retrieve(
      "cus_CWzYHQQ6ZAd2du", 
      function(err, customer) {
         // asynchronously called
         if (err) {
            console.log("ERROR in customer.js 'retrieveCustomer': " + err);
            return;
         }

         res.send(customer);   
      }
   );
});

module.exports = router;
