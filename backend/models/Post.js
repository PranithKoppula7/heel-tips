const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String,
    authorId: String,
    created: Date,
    likeCount: Number,
    department: String,
    class: Number,
    likedUsers: Array
})

module.exports = mongoose.model('Post', PostSchema);