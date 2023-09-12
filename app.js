// Import the express module to help create the server's application instance.
const express = require('express');

// Create a new instance of the express application.
const app = express();

// Middleware to log every received request.
// Middleware functions are functions that have access to the request and response objects, and the next middleware function in the application’s request-response cycle.
app.use((req, res, next) => {
  console.log("Requête reçue !"); // Logs that a request was received.
  next(); // Move on to the next middleware in the stack.
});

// Middleware to set the response status to 201 (Created).
// This is just for demonstration as typically, a 201 status is used when a new resource has been created as a result of the request.
app.use((req, res, next) => {
  res.status(201); // Set the response status code to 201.
  next(); // Move on to the next middleware.
})

// Middleware to send a JSON response to the client.
// This will typically be the client's browser or any other client making the HTTP request.
app.use((req, res, next) => {
  res.json({ message: "Votre requête a bien été reçue !"}); // Send a JSON response to the client.
  next(); // Move on to the next middleware. This line may be unnecessary here since the response is already sent.
});

// Middleware to log that the response has been successfully sent.
app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !'); // Logs that the response was successfully sent.
  // There's no call to next() here as it's the last middleware in the stack.
});

// Export the app instance so it can be used in other files, like server.js in our case.
module.exports = app;
