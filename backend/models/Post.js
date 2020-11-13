const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    author: String,
    crated: Date,
    likeCount: Number,
    isLiked: false,
    department: String,
    class: Number
})

module.exports = mongoose.model('Post', PostSchema);