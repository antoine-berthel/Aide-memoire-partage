
var searchParams = new URLSearchParams(window.location.search)
var memo_id = searchParams.get('memo_id')
var owner = searchParams.get('owner')
$("#shareForm").attr('action', '/share/memo?memo_id='+memo_id+'&owner='+owner)

$.get('/get/sharedwith/memos?memo_id='+memo_id, (res) => {
    var memos = "";
    for (var val in res) {
        var user = res[val].user_id
        var del = '<a href="/del/share/memo?memo_id='+memo_id+'&user='+user+'&owner='+owner+'"><img src="../images/del.png"></a>'
        memos += '<li class="memo"><label>Shared with '+res[val].login+'</label><div class="img">'+del+'</div><p>'+res[val].content+'</p></li>'
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
