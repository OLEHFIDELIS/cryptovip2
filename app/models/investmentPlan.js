const mongoose = require('mongoose');

const InvestmentPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    minimumAmount: {
        type: mongoose.Types.Decimal128,
        required: true,
        validate: {
            validator: (v) => v >= 0,
            message: 'Minimum amount must be a decimal number'
        }
    },
    maximumAmount: {
        type: mongoose.Types.Decimal128,
        required: false,
        validate: {
            validator: (v) => v === null || v >= 0,
            message: 'Maximum amount must be a decimal number greater than or equal to 0'
        }
    },
    interestRate: {
        type: mongoose.Types.Decimal128,
        required: true,
        validate: {
            validator: (v) => v >= 0 && v <= 100,
            message: 'Interest rate must be between 0 and 100'
        }
    },
    duration: {
        type: Number,
        required: true,
        min: [1, 'Duration must be at least 1 day']
    },
    payoutFrequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'days', 'month', 'months'],
        default: 'days'
    },
    currency: {
        type: String,
        required: true,
        default: 'USD'
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true // to add createdAt and updatedAt fields
});

const InvestmentPlan = mongoose.model('InvestmentPlan', InvestmentPlanSchema);

module.exports = InvestmentPlan;