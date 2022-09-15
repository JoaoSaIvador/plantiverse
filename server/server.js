const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config({ path: "./.env" });

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use('/users', require('./routes/userRouter'));
app.use('/api', require('./routes/categoryRouter'));

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
}, err => {
    if (err) {
        throw err;
    }
    console.log('Mongo DB Connection successful!');
});

// Start listening to the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server is running on port ', PORT)
});