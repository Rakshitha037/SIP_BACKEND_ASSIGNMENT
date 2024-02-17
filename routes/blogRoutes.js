const express = require('express');
const router = express.Router();

// Sample data for demonstration
let blogs = [
    { id: 1, authorId: 1, title: 'First Blog', content: 'This is the content of the first blog' },
    { id: 2, authorId: 1, title: 'Second Blog', content: 'This is the content of the second blog' },
    { id: 3, authorId: 2, title: 'Third Blog', content: 'This is the content of the third blog' }
];

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Success', blogs });
});

router.post('/', (req, res) => {
    const { authorId, title, content } = req.body;
    const newBlog = { id: blogs.length + 1, authorId, title, content };
    blogs.push(newBlog);
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
});

router.get('/:authorId', (req, res) => {
    const authorId = parseInt(req.params.authorId);
    if (isNaN(authorId)) {
        return res.status(400).json({ message: 'Invalid author ID' });
    }
    const authorBlogs = blogs.filter(blog => blog.authorId === authorId);
    res.status(200).json({ message: 'Success', blogs: authorBlogs });
});

module.exports = router;
