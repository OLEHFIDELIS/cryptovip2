function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.returnTo = req.originalUrl 
    req.flash("error", "Login required")
    res.redirect('/login');
};

module.exports = isAuthenticated;