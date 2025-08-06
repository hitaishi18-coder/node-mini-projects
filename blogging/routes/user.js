const { Router } = require('express');
const user = require('../models/user');

const router = Router();

// GET: Sign In Page
router.get('/signin', (req, res) => {
    return res.render('signin', { error: null, user: null });
});

// GET: Sign Up Page
router.get('/signup', (req, res) => {
    return res.render('signup', { error: null, user: null });
});

// POST: Sign In
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const token = await user.matchpasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect('/');
    } catch (error) {
        try {
            return res.status(401).render("signin", {
                error: "Incorrect email or password",
                user: null
            });
        } catch (renderErr) {
            return next(renderErr);
        }
    }
});

// POST: Sign Up
router.post('/signup', async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        await user.create({
            fullName,
            email,
            password,
        });
        console.log("User registered:", email);
        return res.redirect('/');
    } catch (error) {
        console.error("Signup error:", error.message);

        const errorMsg = (error.code === 11000)
            ? "Email already registered"
            : "Signup failed. Please try again.";

        try {
            return res.status(400).render("signup", {
                error: errorMsg,
                user: null
            });
        } catch (renderErr) {
            return next(renderErr);
        }
    }
});


router.get('/logout' , (req,res)=> {
    res.clearCookie("token").redirect("/")
})

module.exports = router;
