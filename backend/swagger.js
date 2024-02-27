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
        url: `${
          process.env.PRODUCTION_URL
            ? process.env.PRODUCTION_URL
            : "http://localhost:5000"
        }`, // Replace with your server URL
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
    "./routes/admin/adminSwagger.js",
    "./routes/auth/authSwagger.js",
    "./routes/cart/cartSwagger.js",
    "./routes/categories/categorySwagger.js",
    "./routes/favoriteList/favoritesSwagger.js",
    "./routes/orders/ordersSwagger.js",
    "./routes/products/productsSwagger.js",
    "./routes/address/addressSwagger.js",
    "./routes/brands/brandsSwagger.js",
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
