const express = require('express');
const router = express.Router();

// Sample data for demonstration
let authors = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password456' }
];

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const author = authors.find(a => a.email === email && a.password === password);
    if (!author) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // In a real application, you would generate and send a token for authentication
    res.status(200).json({ message: 'Login successful', author });
});

router.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const existingAuthor = authors.find(a => a.email === email);
    if (existingAuthor) {
        return res.status(400).json({ message: 'Email already registered' });
    }
    const newAuthor = { id: authors.length + 1, name, email, password };
    authors.push(newAuthor);
    res.status(201).json({ message: 'Author registered successfully', author: newAuthor });
});

module.exports = router;
