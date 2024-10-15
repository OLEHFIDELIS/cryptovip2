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
        type: Number, 
        required: true,
        default: 0
    },
    totalDeposit: {
       type: Number,
       required: true,
       default: 0
    },
    totalWithrawal: {
        type: Number,
        required: true,
        default: 0
    },
    totalEarned: {
        type: Number,
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