const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLogged } = require ('../lib/auth');

router.get('/signup', isNotLogged, (req, res) => {
    res.render('auth/signup')
});



router.post('/signup', isNotLogged, passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', isNotLogged, (req, res) => {
    res.render('auth/Login')
});

router.post('/login', isNotLogged, (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile')
});

router.get('/logout', (req, res) =>{
    req.logOut();
    res.redirect('/login');
});

module.exports = router;