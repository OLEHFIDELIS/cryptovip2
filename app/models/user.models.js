const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pasportLocalMongoose = require("passport-local-mongoose");


const UserShema = new Schema({
    username: {
       type: String,
       required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    accounBalance: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    totalDeposit: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    totalWithrawal: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    totalEarned: {
        type: mongoose.Types.Decimal128,
        required: true,
        default: 0
    },
    phone: {
        type: Number
    },
    fullName: {
        type: String
    }
},{
    timestamps: true
});
UserShema.plugin(pasportLocalMongoose);

module.exports = mongoose.model("User", UserShema);