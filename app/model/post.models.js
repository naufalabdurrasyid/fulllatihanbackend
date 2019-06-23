const mongoose = require('mongoose')
const Schema = mongoose.Schema


const postSchema = Schema({
    author: String,
    content: String,
  });

  module.exports = mongoose.model('Post',postSchema);