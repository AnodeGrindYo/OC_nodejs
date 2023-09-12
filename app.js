// Import the express module to help create the server's application instance.
const express = require('express');

// Import the body-parser module, which extracts the entire body portion of an incoming request and exposes it on `req.body`.
const bodyParser = require('body-parser');

// Create a new instance of the express application.
const app = express();

// Define a middleware that sets up headers to handle Cross-Origin Resource Sharing (CORS) issues.
// CORS headers tell the browser to let a web application running at one origin (domain) have permission 
// to access selected resources from a server at a different origin.
app.use((req, res, next) => {

  // Allow any domain to access this API by setting the origin to '*'.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Define which headers can be used as part of the request.
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  // Define which HTTP methods are allowed when accessing the resource in response to a preflight request.
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  // Proceed to the next middleware in the chain.
  next();
});

app.use(bodyParser.json());
// The above middleware will parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.
// This is especially useful for handling JSON post requests.

// Define a middleware that responds to POST requests made to "/api/stuff".
// It logs the incoming request body and sends a JSON response indicating the object was created.
app.post('/api/stuff', (req, res, next) => {
  // Log the request body to the console. This is typically the data sent by the client.
  console.log(req.body);

  // Respond with a status code of 201 (indicating creation) and send a JSON response.
  res.status(201).json({
    message: "Objet créé !"
  });
});

// Define a middleware for the route "/api/stuff".
// This middleware will handle any requests made to "/api/stuff" and send a JSON response with a list of items.
app.use('/api/stuff', (req, res, next) => {
  
  // An array of mock data representing two items.
  const stuff = [
    {
      _id: 'oeihfzeoi',
      title: 'Mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 4900,
      userId: 'qsomihvqios',
    },
    {
      _id: 'oeihfzeomoihi',
      title: 'Mon deuxième objet',
      description: 'Les infos de mon deuxième objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      price: 2900,
      userId: 'qsomihvqios',
    },
  ];

  // Set the response status code to 200 (OK) and send the 'stuff' array as a JSON response.
  // This will return the mock data to the client when they access the "/api/stuff" route.
  res.status(200).json(stuff);
});

// Export the app instance so it can be used in other files, like server.js in our case.
module.exports = app;
