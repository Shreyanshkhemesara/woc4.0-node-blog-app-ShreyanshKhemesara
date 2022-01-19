const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogScheme = new Schema({
    title: {
        type: String,
        required: true
    },
    img:
    {
        data: Buffer,
        contentType: String
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Blog = mongoose.model('Blog', blogScheme);

module.exports = Blog;