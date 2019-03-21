$(function () {
    //用户名: 必填  长度3-9位
    //密码: 必填  长度 6-12位

    //表单校验
    //bootstrapValidator 在表单提交的时候做校验
    //如果表单校验失败了,阻止表单的提交,提示信息
    //如果表单校验成功了, 让表单继续提交
    var $form = $('#form'); 
    $form.bootstrapValidator( {
        //指定需要校验的字段, 对应到表单中的name属性
        fields: {
            username: {
                //校验的规则
                validators: {
                    notEmpty: {
                        message:'用户名不能为空'
                    }, 
                    stringLength: {
                        min:3, 
                        max:9, 
                        message:'用户名长度必须是3-9位'
                    }
                }
            }, 
            password: {
                //校验的规则
                validators: {
                    notEmpty: {
                        message:'密码不能为空'
                    }, 
                    stringLength: {
                        min:6, 
                        max:12, 
                        message:'密码长度必须是6-12位'
                    }
                }
                
            }
        }, 
        feedbackIcons: {
            valid:'glyphicon glyphicon-ok', 
            invalid:'glyphicon glyphicon-remove', 
            validating:'glyphicon glyphicon-refresh'
        }
    })

    //给表单注册校验成功的事件
    $form.on('success.form.bv', function (e) {
        //阻止浏览器的默认行为
        e.preventDefault(); 
        //发送ajax请求
        $.ajax( {
            type:'post', 
            url:'/employee/employeeLogin', 
            data:$form.serialize(), 
            success:function (info) {
                if (info.error === 1000) {
                    alert('用户名不存在'); 
                }
                if (info.error === 1001) {
                    alert('密码错误'); 
                }
                if (info.success) {
                    //登录成功
                    location.href = 'index.html'; 
                }
            }
        })
    })

    //表单重置功能
    $('[type=reset]').on('click', function () {
        //调用表单插件的resetForm方法
        $form.data('bootstrapValidator').resetForm(true); 
    })
})