

$(function(){
    //获取到地址栏中的id
    //根据id获取到商品的详细信息
    //渲染商品信息

    var id = location.search.split('=')[1];

    render();

    //加入购物车的功能
    $('#addCart').on('click', function(){
        var  size = $('.lt_size span.current').text();
        if(!size){
            mui.toast('请选择一个尺码');
            return;
        }
        var num = $('.mui-numbox-input').val();

        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data:{
                productId: id,
                num: num,
                size:size
            },
            success: function(info){
                console.log(info)
                if(info.error === 400){
                    //如果没有登录,跳转到登录页面,并且把当前的地址当成from传递过去
                    location.href = "login.html?from=" + location.href;
                }
                if(info.success){
                    //登录成功
                    mui.confirm('恭喜你，添加购物车成功了', '温馨提示', ['去购物车', '继续浏览'], function(e) {
                        if (e.index === 0) {
                         location.href = 'cart.html'
                        }
                    })
                }
            }
        })
    })





    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetail',
            data: {
                id:id
            },
            success: function(info){
                console.log(info);
                // info.sizeArray = []
                // var temp = info.size.split('-')
                // for(var i = +temp[0]; i <= temp[1]; i++) {
                //   info.sizeArray.push(i)
                // }
                $('.mui-scroll').html(template('tpl',info));
                //渲染模板完成后,手动初始化轮播图
                mui('.mui-slider').slider({
                    interval: 3000
                })
                // 手动初始化numberbox
                mui('.mui-numbox').numbox()

                // 尺码的选择功能
                $('.lt_size span').on('click', function () {
                    $(this).addClass('current').siblings().removeClass('current')
                })
            }
        })
    }

})