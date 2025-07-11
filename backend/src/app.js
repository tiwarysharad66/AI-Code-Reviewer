const express = require('express');
const aiRoutes = require('./routes/ai.routes'); // Importing AI routes
const app = express();
const cors = require('cors'); // Importing CORS middleware
app.use(cors()); // Enable CORS for all routes
// This allows the server to accept requests from different origins, which is useful for development and API consumption
// in production you can restrict it to specific origins
// by passing options to cors like app.use(cors({ origin: 'http://example.com' }));
// or app.use(cors({ origin: ['http://example.com', 'http://another-example.com'] }));
// Middleware to parse JSON bodies
// This middleware is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// It is particularly useful for handling JSON data sent in POST requests.
// It allows the server to understand the JSON format and convert it into a JavaScript object that can be easily accessed in the request handler.
// For example, if a client sends a POST request with a JSON body like `{ "name": "John" }`, this middleware will parse it and make

app.use(express.json()); // Middleware to parse JSON bodies
//server ka instance
//server create //strore in app variable
app.get('/', (req, res) => { 
  
  console.log('✅ GET / called');
  res.send('Hello from Expressss!');
});
app.use('/ai', aiRoutes); // Using AI routes under /ai path
//any request in our api via /ai routes will go to ai routes 
module.exports = app;
