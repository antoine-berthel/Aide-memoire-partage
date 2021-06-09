$.get('/get/sharedby/memos', (res) => {
    var memos = "";
    for (var val in res) {
        var id = res[val].memo_id
        var user = res[val].user_id
        var edit = res[val].writeRight == 1 ? '<a href="/edit/memo?memo_id='+id+'&user_id='+user+'"><img src="../images/edit.png"></a>' : ""
        memos += '<li class="memo"><label>Shared by '+res[val].login+'</label><div class="img">'+edit+'</div><p>'+res[val].content+'</p></li>'
    }
    $('#memos').html(memos)
})

function check(input) {
    var text = input.value.split('\n')
    if (text.length > 1)
        input.value = text[0]
    if (input.value.length > 8)
        input.value = input.value.substring(0, 9);
}
