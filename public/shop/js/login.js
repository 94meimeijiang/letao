$(function(){
    $('.btn_login').on('click',function(){
        var username = $('[name=username]').val().trim();
        if(!username){
            mui.toast('用户名不能为空')
            return
        }
        var password = $('[name=password]').val().trim();
        if (!password) {
            mui.toast('密码不能为空')
            return
        }

        $.ajax({
            type:'post',
            url:'/user/login',
            data: $('form').serialize(),
            success: function(info){
                console.log(info);
                if(info.error){
                    mui.toast('用户名或密码错误')
                }
                if(info.success){
                    //获取到地址栏中的from参数
                    // console.log(location.search);
                    var form = location.search.replace('?from=', '')
                    if(form){
                        location.href = form;
                    }else{
                        location.href = 'index.html';
                    }
                }
            }
        })
    })


})