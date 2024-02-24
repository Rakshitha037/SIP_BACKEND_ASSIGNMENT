// routes/searchRoutes.js
const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const { term } = req.query;
    const blogs = await Blog.find({ title: { $regex: term, $options: 'i' } }, 'title');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
