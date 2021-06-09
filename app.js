const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()

const passport = require('passport')
const flash = require('connect-flash')
const mysql = require('mysql')

const port = 8080

require('./database')

const database = mysql.createConnection({
    host: 'localhost',
    user: 'etu21700780',
    password: 'etu21700780',
    database: 'etu21700780'
})

database.connect((err) => {
    if(err)
        throw err
    console.log('Connexion to databae done')
})

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.use(session({
    name: 'id',
    secret: 'test',
    resave: false,
    saveUninitialized: false
}))

require('./passport/passport-config')(passport, database)

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.static(__dirname))

const {
    getAddMemo,
    postAddMemo,
    getMemos,
    getSharedByMemos,
    getSharedWithMemos
} = require('./routes/memosRoutes')(database)

const {
    delMemo,
    delShareMemo,
    getShareMemo,
    getShareByMemo,
    postShareMemo,
    getEditMemo,
    postEditMemo
} = require('./routes/actionMemosRoutes')(database)

const {
    index,
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
} = require('./routes/userRoutes')(passport)

app.get('/', index)

app.get('/login', getLogin)

app.post('/login', postLogin)

app.get('/register', getRegister)

app.post('/register', postRegister)

app.get('/logout', logout)

app.get('/add/memo', getAddMemo)

app.post('/add/memo', postAddMemo)

app.get('/get/memos', getMemos)

app.get('/get/sharedby/memos', getSharedByMemos)

app.get('/get/sharedwith/memos', getSharedWithMemos)

app.get('/del/memo', delMemo)

app.get('/del/share/memo', delShareMemo)

app.get('/share/memo', getShareMemo)

app.get('/shareby/memo', getShareByMemo)

app.post('/share/memo', postShareMemo)

app.get('/edit/memo', getEditMemo)

app.post('/edit/memo', postEditMemo)

app.listen(port, () => {
    console.log(`Listening: ${port}`)
})
