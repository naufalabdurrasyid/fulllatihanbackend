const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  password: {
    type: String,
    required: true,
  },
  _id: Schema.Types.ObjectId,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
});



const User = mongoose.model('User', UserSchema);
module.exports = User;

