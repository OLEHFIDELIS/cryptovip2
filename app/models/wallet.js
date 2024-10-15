const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    currency: {
        type: String,
        required: true,
        enum: ['USDT trc20', 'XRP', 'LTC', 'BTC', 'ETH'], 
    },
    address: {
        type: String,
        required: true,
        unique: true 
    }
}, {
    timestamps: true 
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = Wallet;
