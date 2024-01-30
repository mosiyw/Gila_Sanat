const NextAuth = require("next-auth");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  // Get the session from the NextAuth server-side session handling
  const session = await NextAuth.options.session.get(req);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Attach user information to the request
  req.user = session.user;
  next(); // Move to the next middleware
};

module.exports = { authenticate };

const isAdmin = (req, res, next) => {
  // Check if the authenticated user is an admin
  if (req.user && req.user.isAdmin) {
    // console.log("User is an admin."); // Log that the user is an admin
    next(); // Continue to the next middleware/route handler
  } else {
    console.log("User is not an admin."); // Log that the user is not an admin
    res.status(403).json({ error: "Access forbidden" });
  }
};

module.exports = { authenticate, isAdmin };
