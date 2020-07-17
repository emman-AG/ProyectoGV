const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) =>{
    const rows = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if(rows.length > 0){
        const user = rows[0];
        const validPass = await helpers.matchPass(password, user.password);
        if (validPass){
            done(null, user, req.flash('success','Welcome' + user.username));
        }else{
            done(null, false, req.flash('fail','Icorrect Password'));
        }
    }else{
        return done(null, false, req.flash('fail','El usuario no existe'));
    }
}));


//pasport necesita un nombre y le indicamos que la secion va ser local
passport.use('local.signup', new LocalStrategy({
    //propiedades de pasport
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
    newUSer.password = await helpers.encryptPassword(password);
    const result = await db.query('INSERT INTO users SET ?', [newUSer]);
    newUSer.id = result.insertId;
    return done(null, newUSer);
}));

passport.serializeUser((user, done)=> {
 done(null, user.id);
}); 

passport.deserializeUser(async (id, done) =>{
    const row = await db.query('SELECT * FROM users Where id= ?', [id]);
    done(null, row[0]);
});