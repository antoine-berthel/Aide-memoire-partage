const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

module.exports = (passport, database) => {
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        database.query("SELECT * FROM users WHERE id="+id, (err, result) => {
            if (err) 
                throw err
            done(null, result[0])
        })
    })

    passport.use(
        'local-signup',
        new localStrategy({
            usernameField: 'login',
            passwordField: 'pwd',
            passReqToCallback: true
        },
        (req, login, password, done) => {
            database.query("SELECT * FROM users WHERE login = ?", [login], (err, result) => {
                if (err) 
                    return done(err)
                if (result.length)
                    return done(null, false, req.flash('signupMessage', 'login already use'))
                else {
                    if(password == req.body.pwdConf) {
                        var newUser = {
                            login: login,
                            password: bcrypt.hashSync(password, 10)
                        }
                        var sql = "INSERT INTO users (login, password) VALUES ( ? , ? )"
                        database.query(sql, [newUser.login, newUser.password], (err, result) => {
                            if (err) return done(err)
                            newUser.id = result.id
                            return done(null, newUser)
                        })
                    } else {
                        return done(null, false, req.flash('signupMessage', 'Different passwords'))
                    }
                }
            })
        })
    )
    passport.use(
        'local-login',
        new localStrategy({
            usernameField: 'login',
            passwordField: 'pwd',
            passReqToCallback: true
        },
        (req, login, password, done) => {
            database.query("SELECT * FROM users WHERE login = ? ", [login], (err, result) => {
                if (err)
                    return done(err)
                if (!result.length)
                    return done(null, false, req.flash('loginMessage', 'Login not exists'))
                if (!bcrypt.compareSync(password, result[0].password))
                    return done(null, false, req.flash('loginMessage', 'Password incorrect'))
                return done(null, result[0])
            })
        })
    )
}
