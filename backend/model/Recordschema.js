// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Define a schema for user sign-up data
// The schema specifies the expected structure and data types for documents in a MongoDB collection
const recordTemplate = new mongoose.Schema({
    ID: Number,
    Name: String,
    Type: String,
    PixelImg: String,
    FirstImg: String,
    SecondImg: String,
    Description: String,
    WeakAgainst: String,
    StrongAgainst: String,
});


const collection2 = mongoose.model('record', recordTemplate);

module.exports = collection2;
