const mongoose = require('mongoose');

const transactionObject = {
    type: {
        type: String,
        default: 'deposit'
    },
    money: {
        type: Number,
        default: 0
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
};

transactionObject.timestamp.getHour = function() {
    return new Date(this.valueOf()).getHours();
};

transactionObject.timestamp.getMinute = function() {
    return new Date(this.valueOf()).getMinutes();
};

const vaultObject = {
    no: {
        type: Number,
        default: 1
    },
    balance: {
        type: Number,
        default: 0
    },
    days: {
        type: Number,
        default: 10
    }
};

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    balance: {
        type: Number,
        default: 0
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    transactions: {
        type: [transactionObject],
        default: [transactionObject]
    },
    vault: {
        type: [vaultObject],
        default: [vaultObject]
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
