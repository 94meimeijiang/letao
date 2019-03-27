$(function(){
    //发送请求,渲染一级分类
    var renderFirst = function () {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategory',
            success: function (info) {
                console.log(info);
                $('.main_left ul').html(template('tpl_first', info))
                renderSecond(info.rows[0].id)
            }
        })

    }

    //渲染指定的二级分类
    var renderSecond =function(id){
        $.ajax({
            type: 'get',
            url:'/category/querySecondCategory',
            data: {
                id:id
            },
            success: function(info){
                $('.main_right ul').html(template('tpl_second', info))
            }
        })
    }

    //页面一加载,渲染一级分类
    renderFirst();


    //点击一级分类,渲染二级分类
    $('.main_left').on('click', 'li', function(){
        $(this).addClass('active').siblings().removeClass('active');

        var  id = $(this).data('id');
        renderSecond(id);
    })


})

