const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const session = require('express-session');
const cors = require('cors');
const app = express();

app.get('/', (req, res) => {
    res.send('we are home');
});

// Middleware
app.use(express.json());

app.use(session({
    name: "user_sid",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db')
})


app.listen(3000);

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);