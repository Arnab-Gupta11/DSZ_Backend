const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dsz:DgOatfXNUTX6Hz17@stripe.sowhlx6.mongodb.net/dsz-backend?appName=stripe').then(() => {
  console.log('Connected to DB');
  // Just start the actual app to test it properly!
});
