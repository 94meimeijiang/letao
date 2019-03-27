

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
           //手动修改以及分类校验成功
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID')
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
            $form.data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    });
    //表单校验功能
    var $form = $('form');
    $form.bootstrapValidator({
        //指定不校验的类型,默认对禁用的  隐藏  不可见的不做校验
        excluded: [],
        fields: {
            //指定对谁校验
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一个一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传二级分类的图片'
                    }
                }
            }
        },
        feedbackIcons: {
            valid: 'glyphicon glyphicon-thumbs-up',
            invalid: 'glyphicon glyphicon-thumbs-down',
            validating: 'glyphicon glyphicon-refresh'
        }

        })
    
    //给表单注册校验成功的事件
    $form.on('success.form.bv', function(e){
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: $form.serialize(),
            success: function(info){
                if(info.success){
                    //隐藏模态框
                $('#addModal').modal('hide');
                //重置表单
                $form.data('bootstrapValidator').resetForm(true);
                //重新渲染第一页
                page = 1;
                render();
                // //重置下拉按钮的文字和图片
                    $('.dropdown-text').text('请选择一级分类')
                    $('.img_box img').attr('src', 'images/default.png')
                }
                
            }

        })
    })



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