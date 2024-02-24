
const express = require('express');
const mongoose=require('mongoose')
const app = express();
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const customMiddleware = require('./middleware/customMiddleware');

const userController = require('./controllers/userController');

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


// Middleware
app.use(express.json()); // Built-in middleware for parsing JSON requests
app.use(customMiddleware.applicationLevelMiddleware); // Application-level middleware

// Routes
app.use('/auth', authRoutes); // Router-level middleware for '/auth' routes
app.use('/blogs', customMiddleware.routerLevelMiddleware, blogRoutes); // Router-level middleware for '/blogs' routes
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUser);
app.delete('/users/:id', userController.deleteUser);
app.get('/users/:id', userController.getUserById);
app.get('/users', userController.getAllUsers);
//blog
// app.get('/blog/stats', getBlogStats);
// app.get('/blog/date-range', getBlogsByDateRange);


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
