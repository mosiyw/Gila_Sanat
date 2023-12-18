const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "eCommerce API",
      version: "1.0.0",
      description: "API documentation for your Express project",
    },
    servers: [
      {
        url: "http://localhost:5000", // Replace with your server URL
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        BasicAuth: {
          // Use Basic Authentication
          type: "http",
          scheme: "basic",
          description: "Basic authentication with email and password",
        },
      },
    },
    security: [{ BasicAuth: [] }], // Enable Basic Authentication globally
  },
  apis: [
    // Define the paths to your route files here
    "./routes/admin.js",
    "./routes/auth.js",
    "./routes/cart.js",
    "./routes/categories.js",
    "./routes/orders.js",
    "./routes/products.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
