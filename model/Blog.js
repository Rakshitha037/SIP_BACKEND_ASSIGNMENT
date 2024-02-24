const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  publishDate: { type: Date, default: Date.now },
  category: { type: String, required: true },
  subscribersOnly: { type: Boolean, default: false },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
