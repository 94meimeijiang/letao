$.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    success: function (info) {
        console.log(info)
        if (info.error) {
            location.href = 'login.html?from=' + location.href
        }

        $('.userinfo').html(template('tpl', info))
    }
})


//退出
// 点击按钮,发送ajax请求
$('.btn_logout').on('click',function(){
    $.ajax({
        type:'get',
        url: '/user/logout',
        success: function(info){
            console.log(info);
            if (info.success) {
                location.href = 'login.html?from=' + location.href
            }
        }
    })
})