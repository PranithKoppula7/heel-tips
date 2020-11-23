const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    pid: Number,
    bookmarkedTips: Array
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', UserSchema);