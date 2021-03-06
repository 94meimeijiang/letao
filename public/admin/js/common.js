

//实现一些公共的js功能

//加载进度条
//什么时候开始  什么时候停
    //当ajax请求开始的时候,显示进度条
    //当ajax请求结束的时候,隐藏进度条

//jquery.ajax的全局事件    会在任意一个ajax请求请求执行的时候触发
//6个全局事件
//ajaxStart  请求开始时触发
//ajaxSend   请求发送之前触发
//ajaxSuccess   请求发送成功时触发
//ajaxError    请求发送失败时触发
//ajaxComplete   请求完成时触发
//ajaxStop   请求结束时触发

// NProgress.start  开始进度条
// NProgress.done  结束进度条
$(document).ajaxStart(function () {
    NProgress.configure({ showSpinner: false });
    // console.log('请求开始了');
    NProgress.start(); 
})
$(document).ajaxStop(function () {
    // console.log('请求结束了');
    setTimeout(function () {
        NProgress.done(); 
    }, 500)
})


//二级菜单的显示与隐藏
$('.second').prev().on('click', function(){
    $(this).next().stop().slideToggle()
})

//侧滑菜单的显示与隐藏
$('.topbar .left').click(function(){
    $('.lt_aside, .lt_main, .topbar ').toggleClass('now');
})

//退出功能
$('.topbar .right').on('click', function(){
    $('#logoutModal').modal('show');
})

//给确定按钮注册点击事件, 注意: 不要在事件中注册事件
$('.confirm').on('click',function(){
    //发送Ajax请求, 告诉服务器需要退出
    // $.ajax({
    //     type:'get',
    //     url: '/employee/employeeLogout',
    //     success: function(info){
    //         if(info.success){
    //             location.href = 'login.html';
    //         }
    //     }
    // })

    //可以用$.get发送请求
    //参数1: url地址
    //参数2. 可选的data
    //参数3. success的回调
    $.get('/employee/employeeLogout', function(info){
        if (info.success) {
            location.href = 'login.html';
        }
    })
  // $.post(url, data, function(){})

})

/**
 * 
 * @param {*} info 分页的数据
 * @param {*} render  点击分页之后的回调函数  
 */
function paginator(info, render){
    $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3,
        //size 调整尺寸
        size:'small',
        //当前页
        currentpage: info.page,
        totalPages: Math.ceil(info.total / info.size),
        //分页按钮一次显示的页数
        numberOfPages: 5,
        //控制每个按钮的显示内容
        itemTexts: function(type, page, current){
            // console.log(type,page,current);
            switch(type){
                case "first":
                    return '首页'
                case "prev":
                    return '上一页'
                case "next":
                    return '下一页'
                case "last":
                    return '尾页'
                default:
                    return page
            }
        },
        //使用bootatrap的tooltip组件
        uesBootstarpTooltip: true,
        //当分页的按钮被点击的时候执行
        onPageClicked: function (a, b, c, newPage) {
            // console.log('haha',page);
            page = newPage;
            //重新发送ajax请求,渲染页面
            render();
        }

    })
}