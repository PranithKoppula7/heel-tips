const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config')
const authRoute = require('./routes/auth');

const app = express();

app.get('/', (req, res) => {
    res.send('we are home');
});


app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, 
{ useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db')
})


app.listen(3000);

app.use('/api/user', authRoute);