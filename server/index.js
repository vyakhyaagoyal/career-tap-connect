const express = require('express');

const app = express();
const connectDB = require("./db")

// Connect to MongoDB
connectDB().then(() => {
    console.log('Database connection established');
}).catch((error) => {
    console.error('Database connection failed:', error);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});