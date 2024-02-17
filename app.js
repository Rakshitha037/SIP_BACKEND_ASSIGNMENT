const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const customMiddleware = require('./middleware/customMiddleware');

// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON requests
app.use(customMiddleware.applicationLevelMiddleware); // Application-level middleware

// Routes
app.use('/auth', authRoutes); // Router-level middleware for '/auth' routes
app.use('/blogs', customMiddleware.routerLevelMiddleware, blogRoutes); // Router-level middleware for '/blogs' routes

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
