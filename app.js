const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const middleware = require('./middleware');

// Set the port for the application
const port = process.env.PORT || 3000;

const app = express();



// Define routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.updateProduct);
app.delete('/products/:id', api.deleteProduct);

// Middleware for error handling
app.use(middleware.handleError);
app.use(middleware.notFound);


// Apply middleware functions
app.use(middleware.cors);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
