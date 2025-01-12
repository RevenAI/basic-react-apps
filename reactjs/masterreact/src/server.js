import { createServer, Model } from 'miragejs';
import data from './Database/data.json'; // Assuming this contains the correct format

//if (process.env.NODE_ENV === 'development') { // Enable MirageJS only in development mode
  createServer({
    models: {
      product: Model, // Use 'product' here for MirageJS to create product models
    },

    seeds(server) {
      data.Products.forEach((product) => {
        server.create('product', product); // Create each product in MirageJS
      });
    },

    routes() {
      this.namespace = 'api'; // Define the namespace for your API

      // Define the GET endpoint to return all products
      this.get('/products', (schema) => {
        return schema.products.all().models; // Return all products from the fake database
      });

      // Define the POST endpoint to create a new product
      this.post('/products', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.products.create(attrs); // Add the new product to the fake database
      });

      // Define the PATCH endpoint to update an existing product
      this.patch('/products/:id', (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let product = schema.products.find(id); // Fix: Use 'products' (plural)
        return product.update(attrs); // Update the product in the fake database
      });

      // Define the DELETE endpoint to delete a product
      this.delete('/products/:id', (schema, request) => {
        let id = request.params.id;
        let product = schema.products.find(id); // Fix: Use 'products' (plural)
        return product.destroy(); // Delete the product from the fake database
      });
    },
  });
//}



/* 
import { createServer, Model } from 'miragejs';
import data from './data.json'; // Import your data.json file

if (process.env.NODE_ENV === 'development') {
  createServer({
    models: {
      product: Model,
    },

    seeds(server) {
      // Load data from data.json into the server's database
      data.products.forEach((product) => {
        server.create('product', product); // Create products from data.json
      });
    },

    routes() {
      this.namespace = 'api'; // Define a namespace for your API
      
      // Get all products
      this.get('/products', (schema) => {
        return schema.products.all();
      });

      // Post a new product
      this.post('/products', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.products.create(attrs);
      });

      // Patch an existing product
      this.patch('/products/:id', (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let product = schema.products.find(id);
        return product.update(attrs);
      });

      // Delete a product
      this.delete('/products/:id', (schema, request) => {
        let id = request.params.id;
        let product = schema.products.find(id);
        return product.destroy();
      });
    },
  });
}
*/
