
$(function(){
    //1.等待dom的加载
    //2.避免了全局污染
    
    var page = 1;
    var pageSize = 5;
    //发送ajax请求
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data:{
            page: page,
            pageSize: pageSize
        },
        success: function(info){
            // console.log(info);
            var html = template('user_tpl', info);
            $('tbody').html(html);

            // 分页的功能必须在ajax数据请求回来之后, 才能确定具体有多少页
            //1. 引入分页的ejs插件
            //2. 准备一个ul, 给ul一个id(注意: 一定要给ul)
            //3. 初始化分页  bootstrapPaginator
                //指定一些参数: 
                //bootstrapMajorVersion: 3  版本
                //currentpage  当前页
                //totalPages  总页数(Math.ceil(info.total / info.size),)
                // onPageClicked  通过第四个page参数就可以获取到第几页
            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentpage:page,
                totalPages:Math.ceil(info.total / info.size),
                onPageClicked: function(a,b,c,page){
                    console.log('haha');
                }

            })

        }
    })
})