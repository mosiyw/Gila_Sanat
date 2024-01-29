const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectToDatabase } = require("./config/database");
const swaggerUi = require("swagger-ui-express"); // Import swaggerUi
const swaggerJsdoc = require("swagger-jsdoc");
require("dotenv").config();

// ... (the rest of your code remains the same)

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:4000"], // Replace with your frontend domain
    credentials: true, // Allow sending cookies in cross-origin requests
  })
);

// Swagger Configuration
const swaggerDocs = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to the database
connectToDatabase();

// Use environment variables
console.log("DB_URL:", process.env.DB_URL);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("ADMIN_JWT_SECRET:", process.env.ADMIN_JWT_SECRET);

// Require and use route files
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const adminRoutes = require("./routes/admin");
const categoryRoutes = require("./routes/category");
const imageGalleryRoutes = require("./routes/imageGallery");
const commentRoutes = require("./routes/comment");
const favoriteListRoutes = require("./routes/favoriteList");

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/image-gallery", imageGalleryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/favorites", favoriteListRoutes);

// ... Other app setup and route handling ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
