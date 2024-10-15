const mongoose = require('mongoose');

const UserInvestmentSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    InvestmentPlanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InvestmentPlan',
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
    endDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'terminated', 'pending'],
        required: true,
        default: 'pending'
    },
    interestEarned: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    totalEarned: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    planName: {
        type: String,
        required: false
    }
}, {
    timestamps: true // automatically adds `createdAt` and `updatedAt`
});

const UserInvestment = mongoose.model('UserInvestment', UserInvestmentSchema);

module.exports = UserInvestment;
