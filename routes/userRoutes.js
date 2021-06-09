module.exports = (passport) => {
    return {
        index : (req, res) => res.render('index', {user: req.user, message: null, page: 'main'}),
        getLogin : (req, res) => res.render('login', {message: req.flash('loginMessage'), user: req.user}),
        postLogin : passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
            session: true
        }),
        getRegister : (req, res) => res.render('signin', {message: req.flash('signupMessage'), user: req.user}),
        postRegister : passport.authenticate('local-signup', {
            successRedirect: '/login',
            failureRedirect: '/register',
            failureFlash: true,
            session: false
        }),
        logout : (req, res) => {
            if (req.user != null)
                req.logOut()
            res.redirect('/')
        }
    }
}
