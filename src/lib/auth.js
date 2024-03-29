module.exports = {
    isLoggedIn(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/login');
    },

    isNotLogged(req, res, next) {
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};