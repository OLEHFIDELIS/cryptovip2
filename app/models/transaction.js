const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    // userId field if you are referencing a User schema (commented out in original)
    UserId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming reference to a User schema by ObjectId
        ref: 'User', // Reference the User collection
        required: true
    },
    type: {
        type: String,
        enum: ['deposit', 'withdrawal', 'interest'],
        required: true
    },
    amount: {
        type: mongoose.Types.Decimal128,
        required: true,
        validate: {
            validator: (v) => v >= 0.01,
            message: 'Amount must be at least 0.01'
        }
    },  
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        required: true,
        default: 'pending'
    },
    ecurrency: {
        type: String,
        required: false
    }
}, {
    timestamps: true // automatically creates `createdAt` and `updatedAt`
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;