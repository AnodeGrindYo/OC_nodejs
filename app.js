const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const path = require('path');

const stuffRoutes = require('./routes/stuff');

const userRoutes = require('./routes/user');



mongoose.connect('mongodb+srv://mragodoy:K92tCSHC89r9ykLR@cluster0.edinewt.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.error('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

// tells Express to manage the images resource statically (a subdirectory of our base directory, __dirname) each time it receives a request to the /images route
app.use('/images', express.static(path.join(__dirname, 'images')));

// here we use the routes we moved in ./routes/stuff
app.use('/api/stuff', stuffRoutes);

// use the routes for users
app.use('/api/auth', userRoutes);

module.exports = app;