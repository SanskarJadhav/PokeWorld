// Import the mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Define a schema for user sign-up data
// The schema specifies the expected structure and data types for documents in a MongoDB collection
const signupTemplate = new mongoose.Schema({
    uid: String,
    email: String,     
    password: String,
    selectedRegion: String,
    selectedStarter: String,
    pokemonCollected: {
        type: Array,
        of: [String]
    }
});

// Create a model from the schema
// A model allows you to create instances of your documents, called documents
// 'data' is the name of the collection in the MongoDB cloud database
const collection = mongoose.model('user', signupTemplate);

// Export the model
// This makes the model available to our server.js file
module.exports = collection;
