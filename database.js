const mysql = require('mysql')

const database = mysql.createConnection({
    host: 'localhost',
    user: 'etu21700780',
    password: 'etu21700780'
})

database.connect((err) => {
    if(err)
        throw err
    console.log('Connexion with mysql done')
})
database.query("CREATE DATABASE IF NOT EXISTS etu21700780", (err) => {
    if(err)
        throw err
    console.log("Database ok")
})

database.query("USE etu21700780", err => {
    if (err)
        throw err
    console.log("database connected")
})

database.query("CREATE TABLE IF NOT EXISTS `memos` ("
    +"`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    +"`content` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,"
    +"`owner` int(11) NOT NULL"
    +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    (err) => {
        if(err)
            throw err
        console.log("memos ok")
    }
)

database.query("CREATE TABLE IF NOT EXISTS `shared_memos` ("
    +"`memo_id` int(11) NOT NULL,"
    +"`user_id` int(11) NOT NULL,"
    +"`writeRight` int(1) NOT NULL DEFAULT 0"
    +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    (err) => {
        if (err)
            throw err
        console.log("shared_memos ok")
    }
)

database.query("CREATE TABLE IF NOT EXISTS `users` ("
    +"`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,"
    +"`login` varchar(30) CHARACTER SET utf8 NOT NULL UNIQUE KEY,"
    +"`password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL"
    +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;",
    (err) => {
        if (err)
            throw err
        console.log('users table ok')
    }
)
