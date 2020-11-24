const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const session = require('express-session');
const cors = require('cors');
const app = express();
const path = require('path');

// Middleware
app.use(express.json());

app.use(session({
    name: "user_sid",
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(cors({origin: ['http://localhost:4200'], credentials: true}));

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db')
})

app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

// app.use(express.static('public'));


// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

app.listen(process.env.PORT || 3000);

