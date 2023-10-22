const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  // Add more fields for recorded videos and audio
});

module.exports = mongoose.model('User', userSchema);
