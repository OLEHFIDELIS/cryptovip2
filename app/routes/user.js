const express = require("express");
const isAuthenticated = require("../utills/isAuthenticated");

const User = require("../models/user.models");
const InvestmentPlans = require("../models/investmentPlan");
const Transaction = require("../models/transaction");
const UserInvestment = require("../models/userInvestments");
const Wallet = require("../models/wallet");
const catchAsync = require("../utills/catchAsync")
const passport = require('passport');
const joi = require("joi")
const router = express.Router();
const {Op} = require("sequelize")





router.get("/dashboard",isAuthenticated,catchAsync(async(req, res)=> {
    const userInfo = req.user;
    const transaction = await Transaction.find({userId: req.user.id});
    const userInvestment = await UserInvestment.find({userId: req.user.id});
    const wallet = await Wallet.find(); 
    res.render("pages/dash-board",{
        userInfo,
        transaction,
        userInvestment,
        wallet
    });
}));

router.get("/deposit",isAuthenticated,catchAsync(async(req, res)=> {
    const userInfo = req.user;
    const transaction = await Transaction.find({userId: req.user.id});
    const plans = await InvestmentPlans.find( {currency: "USD"});
    const wallets = await Wallet.find();
    res.render("pages/deposit",{
        userInfo,
        transaction,
        plans,
        wallets,
    })
}));

router.post("/deposit/address",isAuthenticated,catchAsync(async(req, res)=> {
    const userInfo = req.user;
    const amount = req.body.amount;
    const plan = await InvestmentPlans.findOne({name: req.body.plans});
    // console.log(req.body.walletid)
    const wallet = await Wallet.findOne({_id: req.body.walletid});
    console.log(wallet)
    res.render("pages/wallet",{
        userInfo,
        wallet,
        plan,
        amount,
    })
}));

router.post("/deposit/userinvestment", isAuthenticated, catchAsync(async(req,res)=> {
    const {type, amount, ecurrency, endDate, investmentPlanId, planName} = req.body
    console.log(req.user.id)
    console.log(investmentPlanId)
    const newTransaction = new Transaction({
        type: type,
        amount: amount,
        status: "pending",
        ecurrency: ecurrency,
        UserId: req.user._id
    });
    await newTransaction.save();

    const newUserInvestment = new UserInvestment({
        amount: amount,
        endDate: endDate,
        status: "pending",
        UserId: req.user.id,
        InvestmentPlanId: investmentPlanId,
        planName: planName
    });
    await newUserInvestment.save(); 

    req.flash("success", "Transaction is Pending!!");
    res.redirect( `/${req.user.id}/transaction`)
}));

router.get("/transaction", isAuthenticated,catchAsync(async(req, res)=> {
    const userInfo = req.user;
    const transactions = await Transaction.find({UserId: req.user._id});
    res.render("pages/transaction", {
        userInfo,
        transactions,
    })
}));

router.get("/investment",isAuthenticated,catchAsync(async(req, res)=> {
    const userInfo = req.user;
    const userinvestments = await UserInvestment.find({UserId: req.user._id });
    const plans = await InvestmentPlans.find({currency: "USD"});
    const [firstInvestment] = userinvestments
    // console.log(firstInvestment.InvestmentPlanId)
    res.render("pages/total-investment",{
        userInfo,
        userinvestments
    });
}));

router.get("/withdrawal",isAuthenticated,catchAsync(async(req, res)=> {
    const userInfo = req.user;
    res.render("pages/withdrawal",  {
        userInfo
    });
}));

router.post("/withdrawal",isAuthenticated,catchAsync(async(req, res)=> {
    const {type, amount, ecurrency} = req.body
    const newTransaction = new Transaction({
        type: type,
        amount: amount,
        status: "pending",
        ecurrency: ecurrency,
        UserId: req.user._id
    });
    await newTransaction.save(); 
    req.flash("success", "Transaction is Pending!!");
    res.redirect(`/${req.user.id}/transaction`)
}));

router.get("/info",isAuthenticated,catchAsync(async (req, res)=> {
    const userInfo = req.user;
    res.render("pages/user-info", {
        userInfo,
    });
}));

router.post("/info", isAuthenticated, catchAsync(async (req, res) => {
    const { fullName, email, phone } = req.body;
    const result = await User.findByIdAndUpdate(
        req.user._id,
        {
            fullName,
            email,
            phone
        },
        { new: true, runValidators: true } 
      );

    if (result) {
        req.flash("success", "Update Successful!!");
        res.redirect(`/${req.user._id}/info`);
    } else {
        req.flash("error", "User not found!");
        res.redirect(`/${req.user._id}/info`);
    }
}));


router.get("/notification", (req, res)=> {
    res.render("pages/notification");
});





module.exports = router;