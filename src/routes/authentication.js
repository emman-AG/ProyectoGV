const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', (req, res) => {
    res.render('auth/signup')
});



router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', (req, res) => {
    res.render('auth/Login')
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', (req, res) => {
    res.send('profile');
});

module.exports = router;