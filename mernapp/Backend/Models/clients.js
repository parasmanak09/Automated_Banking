const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String, // Corrected: Use String instead of string
        required: true
    },
    email: {
        type: String, // Corrected: Use String instead of text
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true // Optional: Remove leading/trailing whitespace
      },
      email: {
        type: String,
        required: true,
        unique: true, // Enforces unique email addresses
        trim: true,
        lowercase: true // Optional: Store all emails in lowercase for easier comparison
      },
      password: {
        type: String,
        required: true,
        minlength: 6 // Enforces minimum password length for security
      },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
