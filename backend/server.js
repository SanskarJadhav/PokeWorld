// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Create an Express application
const app = express();

// Connect to MongoDB cloud at the login database
mongoose.connect("mongodb+srv://sanskarjadhav:*************@projects.0wab4zm.mongodb.net/pokemon?retryWrites=true&w=majority&appName=Projects");

// Import the MongoDB model for handling sign up data
const collection = require('./model/Signupschema');
const Record = require('./model/Recordshema');

// Configure body-parser middleware to parse JSON and URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use cors middleware to enable CORS
app.use(cors());

app.post('/login', (req, res) => {
    if (req.body.action === 'signin') {
        collection.findOne({ uid: req.body.uid })
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: 'User is not registered' });
            } else {
                let validPassword = result.password === req.body.password;
                if (validPassword) {
                    // Include selectedRegion and selectedStarter in the response
                    const { selectedRegion, selectedStarter } = result;
                    return res.status(200).json({ 
                        message: 'Login successful',
                        selectedRegion,
                        selectedStarter
                    });
                } else {
                    return res.status(404).json({ message: 'Password is incorrect' });
                }
            }
        })
        .catch(err => {
            res.status(500).json("Error in signing in: " + err);
        });
    } else if (req.body.action === 'signup') {
        collection.findOne({ uid: req.body.uid })
        .then((result) => {
            if (!result) {
                // If the username doesn't exist, proceed with sign-up
                const data = {
                    uid: req.body.uid,
                    email: req.body.email,
                    password: req.body.password,
                };
                // Use Mongoose to create a new document in the database
                collection.create([data])
                .then(() => res.status(200).json("Successfully Signed Up"))
                .catch(err => res.status(500).json("Error signing up: " + err));
                return;
            }
            else{// else if username is taken, response is Conflict
                return res.status(409).json("Username is taken");
            }
        })
        .catch(err => {
            // On error, respond with an error message
            res.status(500).json("Error checking username: " + err);
        });
    } else {
        res.status(400).json({ message: 'Invalid request' });
    }
});

// Route for saving selected region
app.post('/save-region', async (req, res) => {
    const {username, region} = req.body;
    try {
        await collection.findOneAndUpdate({ uid: username }, { $set: { selectedRegion: region } }, { upsert: true });
        // send a success response
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error saving region:', error);
        res.status(500).json({ error: 'Failed to save region' });
    }
});

app.post('/save-starter', async (req, res) => {
    const { username, starter } = req.body;
    try{
        await collection.findOneAndUpdate({ uid: username }, { 
            $set: { selectedStarter: starter },
            $addToSet: { pokemonCollected: starter } 
        }, { upsert: true } );
        res.status(200).json({success: true});
    } catch (error) {
        console.error('Error saving starter:', error);
        res.status(500).json({error: 'Failed to save starter' });
    }
});

app.get('/records', async (req, res) => {
    try {
      const records = await Record.find();
      res.json(records);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
app.get('/random', async (req, res) => {
    try {
      const records = await Record.find();
      // Select a random Pokémon from the array
      const randomPokemon = records[Math.floor(Math.random() * records.length)];
      res.json(randomPokemon);
    } catch (error) {
      console.error('Error fetching random Pokémon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/starter-pokemon', async (req, res) => {
    try {
      const starterPokemonName = req.query.name.toLowerCase();; // Get the starter Pokémon name from the query parameters
      const starterPokemon = await Record.findOne({ Name: starterPokemonName });
  
      if (!starterPokemon) {
        return res.status(404).json({ error: 'Starter Pokémon not found' });
      }
  
      res.json(starterPokemon); // Return the starter Pokémon document as JSON
    } catch (error) {
      console.error('Error fetching starter Pokémon:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/catch-pokemon', async (req, res) => {
    const { username, caughtPokemonName } = req.body;
    try {
        // ensuring caughtPokemonName is a string
        const pokemonName = String(caughtPokemonName);
        let user = await collection.findOneAndUpdate(
            { uid: username },
            { $addToSet: { pokemonCollected: pokemonName } },
            // avoiding duplicates
        );
        if (user) {
            res.status(200).json({ success: true, message: 'Pokemon added successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'User not found.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.post('/select-starter', async (req, res) => {
    const { username, newStarter } = req.body;
    try {
        const pokemonName = String(newStarter);
        // Update selectedStarter
        await collection.findOneAndUpdate(
            { uid: username },
            { $set: { selectedStarter: pokemonName } }
        );

        res.status(200).json({ success: true, message: 'Starter selection updated successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

app.get('/users', async (req, res) => {
    const username = req.query.name;
  
    try {
      const user = await collection.findOne({ uid: username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ pokemonCollected: user.pokemonCollected });
    } catch (error) {
      console.error('Error fetching pokemonCollected data:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/delete/:username', async (req, res) => {
    const username = req.params.username;
    try {
      // Delete the user document from the collection
      const result = await collection.deleteOne({ uid: username });
      if (result.deletedCount === 1) {
        // User account deleted successfully
        res.status(200).json({ success: true, message: 'User account deleted successfully.' });
      } else {
        // User account not found
        res.status(404).json({ success: false, message: 'User account not found.' });
      }
    } catch (error) {
      console.error('Error deleting user account:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});


// Start the server on port 4000
app.listen(4000, () => console.log("Server Started"));
