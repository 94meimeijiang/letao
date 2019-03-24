
$(function(){
    var page = 1;
    var pageSize = 5;

    render();

    /*
    添加分类
    1. 点击添加分类按钮,注册点击事件
    2. 弹出模态框
    3. 进行表单校验
    4. 表单校验通过,发送ajax请求,添加一级分类
    5. 添加成功后,关闭模态框,重新渲染页面
    
    */

    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
    })

    // 表单校验功能
    $form = $('#form');
    $form.bootstrapValidator({
        fields:{
                //指定对谁校验
            categoryName :{
                validators:{
                    notEmpty:{
                        message:'一级分类的名称不能为空'
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
    $form.on('success.form.bv',function(e){
        //阻止浏览器默认的行为
        e.preventDefault();
        //发送ajax请求,校验
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: $form.serialize(),
            success: function(info){
                if(info.success){
                    //关闭模态框
                    $('#addModal').modal('hide');
                    //重置表单样式
                    $form.data('bootstrapValidator').resetForm(true);
                    //重新渲染第一页,因为最新增加的数据是添加爱第一页的
                    render(1);
                }
            }
        })
    })






    //封装渲染页面
   function render(){
       $.ajax({
           type: 'get',
           url: '/category/queryTopCategoryPaging',
           data:{
               page: page,
               pageSize: pageSize
           },
           success: function(info){
               //在模板引擎中可以直接访问info对象的属性
                var html = template('tpl', info);
                $('tbody').html(html);

                //分页
               $('#paginator').bootstrapPaginator({
                   bootstrapMajorVersion: 3,
                   currentpage: page,
                   totalPages: Math.ceil(info.total / info.size),
                   //当分页的按钮被点击的时候执行
                   onPageClicked: function (a, b, c, newPage) {
                       // console.log('haha',page);
                       page = newPage;
                       //重新发送ajax请求,渲染页面
                       render();
                   }
               })
           }
       })
   }


})