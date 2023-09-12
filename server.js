// Load the built-in http module to help create the server.
const http = require('http');

// Load our custom app module, likely containing the express configuration and middleware.
const app = require('./app');

// A utility function to ensure the port is a number and within a valid range.
const normalizePort = val => {
  const port = parseInt(val, 10); // Convert the value to an integer base 10.

  // If the port isn't a number (NaN), then return the original value.
  if (isNaN(port)) {
    return val;
  }
  
  // If the port is a valid number and non-negative, return it.
  if (port >= 0) {
    return port;
  }
  
  // Otherwise, return false.
  return false;
};

// Get the port from environment variables or default to 3000 if not set.
const port = normalizePort(process.env.PORT || "3000");
app.set('port', port);  // Set the port for the app.

// A utility function to handle specific server errors.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;  // If the error is not related to listening, throw it.
  }

  const address = server.address();  // Get the server address.

  // Determine if the address is a named pipe or a port number.
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  // Handle specific error codes.
  switch (error.code) {
    case 'EACCESS':
      console.error(bind + ' requires elevated privileges.');  // Permission issues.
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');  // Address already in use.
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Create the server using our app.
const server = http.createServer(app);

// Attach an error event handler to handle server errors.
server.on('error', errorHandler);

// Attach a listening event handler to log when the server is ready to receive requests.
server.on('listening', () => {

  const address = server.address();  // Get the server address again.

  // Determine if the address is a named pipe or a port number.
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;

  console.log('Listening on ' + bind);  // Log the server status.
});

// Instruct the server to listen on the specified port.
server.listen(port);
