const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
   const { fullname } = req.body;
    const newUSer = {
        username,
        password,
        fullname
    };

    await db.query('INSERT INTO users SET ?', [newUser]);


}));


//passport.serializeUser((usr, done)=> {

//}); 