const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simplebackend', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model with additional fields
const itemSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

const Item = mongoose.model('Item', itemSchema);

// Middleware
app.use(bodyParser.json());

// Define a route to store data
app.post('/api/items', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const newItem = new Item({ name, email, phone, message });
        const savedItem = await newItem.save();

        res.status(201).send({ message: 'Item created successfully', item: savedItem });
    } catch (error) {
        res.status(500).send({ message: 'Error creating item', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
