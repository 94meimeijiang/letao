 var page = 1;
$(function(){
    //1.等待dom的加载
    //2.避免了全局污染
    
   
    var pageSize = 5;
    var id, isDelete;
    // 渲染页面
    render();

    //启用和禁用功能
    //1 给启用和禁用按钮注册点击事件
    //2. 弹出模态框
    //3. 给确定注册点击事件
    //4. 发送ajax请求,启用获取禁用用户
    $('tbody').on('click', '.btn',function(){
        //弹出模态框
        $('#userModal').modal('show');
        // //获取到用户的id以及启用禁用的状态
        id = $(this).parent().data('id');
        // var idDelete = $(this).text() === '启用' ? 1 : 0;
        isDelete = $(this).hasClass('btn-success') ? 1 : 0;
        // console.log(id, isDelete);
    })

    //发送ajax请求,获取用户数据
    $('.update').on('click',function(){
        // console.log('启用');
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function(info){
                if(info.success){
                    //关闭模态框,重新渲染数据
                    $('#userModal').modal('hide');
                    //重新渲染页面
                    render();
                }
            }
        })
    })


    //发送ajax请求渲染页面
    //封装起来
    function render(){
         $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data:{
            page: page,
            pageSize: pageSize
        },
        success: function(info){
            // console.log(info);
            //在模板引擎中可以直接访问info对象的属性
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
            // $('#paginator').bootstrapPaginator({
            //     bootstrapMajorVersion: 3,
            //     currentpage:page,
            //     totalPages:Math.ceil(info.total / info.size),
            //     //当分页的按钮被点击的时候执行
            //     onPageClicked: function(a,b,c,newPage){
            //         // console.log('haha',page);
            //         page = newPage;
            //         //重新发送ajax请求,渲染页面
            //         render();
            //     }

            // })
            paginator(info, render);

        }
    })
    }
   
})