const express = require("express");
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utills/catchAsync")
const  User  = require('../models/user.models');
const  InvestmentPlan = require('../models/investmentPlan');


const {storeReturnTo} = require("../utills/storeReturnTo")

router.get("/", catchAsync(async(req, res) => {
    const plans =  await InvestmentPlan.find({currency: "USD"});
    res.render("pages/index", {
        plans
    });
}));

router.get("/about", (req, res) => {
    res.render("pages/about");
});

router.get("/investment",catchAsync(async(req, res) => {
    const plans =  await InvestmentPlan.find({currency: "USD"});
    res.render("pages/investment", {
        plans  
    });
}));

router.get("/contact", (req, res) => {
    res.render("pages/contact");
});

router.get("/reviews", (req, res) => {
    res.render("pages/reviews");
});

router.get("/faq", (req, res) => {
    res.render("pages/FAQ");
});

router.get("/terms", (req, res) => {
    res.render("pages/terms");
});

router.get("/register", (req, res) => {
    res.render("pages/register");
});

router.post("/register", catchAsync(async (req, res, next) => {
    try {
        const {email, username, password} = req.body;
        const user = new User({email ,username});
        const newUser = await User.register(user, password); 
        req.login(newUser, err => {
            if(err) return next(err);
            req.flash("success", "Registration Successful!!");
            res.redirect("/login");
        });

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/register");  
    }

}));

router.get("/login", (req, res) => {
   res.render("pages/login")
});

router.post("/login",storeReturnTo,catchAsync(async(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { 
          return next(err); 
        }
        
        if (!user) {
          // Authentication failed, redirect to login with failure message
          req.flash("error", "Password or username is incorrect")
          return res.redirect('/login');
        }
    
        // Log the user in (create session)
        req.logIn(user, (err) => {
          if (err) { 
            return next(err); 
          }
    
          // Access user id after successful login
          const userId = user.id;
    
          // Redirect to the user's personalized dashboard
          req.flash("success", `${user.username} Sucessfuly Loged In`)
          const redirectUrl = res.locals.returnTo || `/${userId}/dashboard`;
          return res.redirect(redirectUrl );
        });
      })(req, res, next);
}));

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        req.flash("success", "Logout successful!");
        res.redirect('/login');
    });
});

router.get("/seed-data", async (req, res) => {
    try {

        if (process.env.ENVIRONMENT == "dev") {
            // await userSeedRecords();
            await investmentPlanSeedRecords();
            await walletAdressSeeder()
            console.log("Running")
        }
    } catch (error) {
        console.log(error)
        return res.render("pages/404", { message: error.massage })
    }
});

module.exports = router;
