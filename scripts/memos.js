$.get('/get/memos', (res) => {
    var memos = "";
    for (var val in res) {
        var id = res[val].id
        var owner = res[val].owner
        var del = '<a href="/del/memo?id='+id+'&owner='+owner+'"><img src="../images/del.png"></a>'
        var edit = '<a href="/edit/memo?memo_id='+id+'&user_id='+owner+'"><img src="../images/edit.png"</a>'
        var share = '<a href="/share/memo?memo_id='+id+'&owner='+owner+'"><img src="../images/s.png"></a>'
        memos += '<li class="memo"><div class="img">'+share+edit+del+'</div><p>'+res[val].content+'</p></li>'
    }
    $('#memos').html(memos)
})
