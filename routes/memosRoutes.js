module.exports = (database) => {
    return {
        getAddMemo : (req, res) => {
            if (req.user != null) {
                res.render('newMemo', {user: req.user, memo: null})
            } else {
                res.redirect('/')
            }
        },
        postAddMemo : (req, res) => {
            if (req.user != null) {
                var sql = "INSERT INTO memos (content, owner) VALUES ( ? , ? )"
                database.query(sql, [req.body.content, req.user.id], err => {
                    if(err) throw err
                })
            }
            res.redirect('/')
        },
        getMemos : (req, res) => {
            if (req.user != null) {
                database.query("SELECT * FROM memos WHERE owner="+req.user.id, (err, result) => {
                    if(err) throw err
                    res.json(result)
                })
            } else {
                res.redirect('/')
            }
        },
        getSharedByMemos : (req, res) => {
            if (req.user != null) {
                database.query('SELECT * FROM memos m JOIN shared_memos ON m.id=memo_id join users u ON m.owner=u.id WHERE user_id='+req.user.id, (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            } else {
                res.redirect('/')
            }
        },
        getSharedWithMemos : (req, res) => {
            if (req.user != null) {
                database.query('SELECT * FROM memos m JOIN shared_memos ON m.id=memo_id join users u ON user_id=u.id WHERE m.owner='+req.user.id+' AND m.id='+req.query.memo_id, (err, result) => {
                    if (err) throw err
                    res.json(result)
                })
            } else {
                res.redirect('/')
            }
        }
    }
}
