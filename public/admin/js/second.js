

var page = 1;
$(function(){
    
    var pageSize = 5;
    render();

   /* 二级页面添加功能
    1. 点击添加按钮,注册点击事件
    2. 弹出模态框
    3. 准备添加二级分类的表单
    4. 表单校验功能
    5. 表单校验通过,发送ajax请求
    6. 重新渲染
   */
  //弹出模态框
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
    })
    
    //动态渲染一级分类,发送ajax请求,获取到所有的一级分类
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data:{
            page: 1,
            pageSize: 100
        },
        success: function(info){
            // console.log(info);
            $('.dropdown-menu').html(template('tpl2', info));
        }
    })

    // 一级分类选择功能
    $('.dropdown-menu').on('click', 'li', function(){
        var  id = $(this).data('id');
        // console.log(id);
        //修改下拉菜单的内容
        $('.dropdown-text').text($(this).children().text());
        //动态修改
        $('[name = categoryId]').val(id);
    })

    //图片上传功能
    $('#file').fileupload({
        // dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done: function (e, data) {
            // console.log(data);
            var result = data.result.picAddr;
            // console.log(result);
            $('.img_box img').attr('src',result);
            $('[name=brandLogo]').val(result);
        }
    });


    // 渲染页面
    function render(){
        $.ajax({
            type: 'get',
            url:'/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function(info){
                console.log(info);
                $('tbody').html(template('tpl', info));
                paginator(info, render);
            }
        })
    }
})