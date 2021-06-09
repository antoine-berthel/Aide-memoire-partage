module.exports = (database) => {
    return {
        delMemo : (req, res) => {
            if (req.user != null) {
                database.query("DELETE FROM memos WHERE id="+req.query.id+" AND owner="+req.user.id, err => {
                    if (err) throw err
                })
                database.query("DELETE FROM shared_memos WHERE memo_id="+req.query.id, (err) => {
                    if (err) throw err
                })
            }
            res.redirect('/')
        },
        delShareMemo : (req, res) => {
            if (req.user != null && req.user.id == req.query.owner) {
                database.query("DELETE FROM shared_memos WHERE memo_id= ? AND user_id= ?", [req.query.memo_id, req.query.user], (err) => {
                    if (err) throw err
                })
            }
            res.redirect('/share/memo?memo_id='+req.query.memo_id+'&owner='+req.query.owner)
        },
        getShareMemo : (req, res) => res.render('index', {user: req.user, message: null, page: 'share'}),
        getShareByMemo : (req, res) => res.render('index', {user: req.user, message: null, page: 'shareBy'}),
        postShareMemo : (req, res) => {
            if (req.user != null) {
                database.query("SELECT * FROM users WHERE login= ? ", [req.body.user], (err, result) => {
                    if (err) throw err
                    if(result.length) {
                        database.query("SELECT memo_id,user_id FROM shared_memos WHERE memo_id = ? AND user_id = ? ", [parseInt(req.query.memo_id, 10), result[0].id], (err, result2) => {
                            if (err) throw err
                            if (!result2.length) {
                                database.query("INSERT INTO shared_memos (memo_id, user_id, writeRight) VALUES ( ? , ? , ? )",
                                    [parseInt(req.query.memo_id, 10), result[0].id, req.body.write ? 1 : 0],
                                    (err) => {
                                            if (err) throw err
                                            res.redirect('/share/memo?memo_id='+req.query.memo_id+'&owner='+req.query.owner)
                                    })
                            } else {
                                res.render('index', {user: req.user, message: "Already shared", page: 'share'})
                            }
                        })
                    } else {
                        res.render('index', {user: req.user, message: "User not found", page: 'share'})
                    }
                })
            } else {
                res.redirect('/')
            }
        },
        getEditMemo : (req, res) => {
            if (req.user != null && req.user.id == req.query.user_id) {
                database.query("SELECT * FROM memos WHERE id=?", [req.query.memo_id], (err, result) => {
                    if(err) throw err
                    res.render('newMemo', {user: req.user, memo: result[0]})
                })
            } else {
                res.redirect('/')
            }
        },
        postEditMemo : (req, res) => {
            if (req.user != null && req.user.id == req.body.user_id) {
                database.query("UPDATE memos SET content= ? WHERE id= ?", [req.body.content, req.body.memo_id], (err) => {
                    if(err) throw err
                    if (req.query.page == 'sharedBy')
                        res.redirect('/shareBy/memo')
                })
            } else {
                res.redirect('/')
            }
        }
    }
}
