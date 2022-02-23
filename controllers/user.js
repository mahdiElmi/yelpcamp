const User = require("../models/user.js");

module.exports = {
    renderRegisterForm: (req, res) => {
        res.render("users/register")
    },

    registerUser: async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            const user = new User({ username, email });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, (err) => {
                if (err) return next()
                req.flash("success", "Welcome to Yelp Camp!")
                res.redirect("/campgrounds")
            })
        } catch (e) {
            req.flash("error", e.message)
            res.redirect("/register")
        }
    },

    renderLoginForm: (req, res) => {
        res.render("users/login")
    },

    loginUser: (req, res) => {
        req.flash("success", "Welcome back!")
        const redirectUrl = req.session.returnTo || "/campgrounds"
        delete req.session.returnTo;
        res.redirect(redirectUrl)
    },

    renderLogoutForm: (req, res) => {
        req.logOut();
        req.flash("success", "successfully logged out")
        res.redirect("/campgrounds")
    }
}