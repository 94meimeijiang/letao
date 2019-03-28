$(function(){
    // 1.区地址栏获取到key对应的遏制
    //2. 把获取到的值赋值给input框
    //3. 发送ajax请求, 获取到所有与key相关的商品,显示出来
    //4. 点击搜索的时候,还能继续搜索
    //5. 排序的功能
    //6. 加载的动画效果

    //1. 区地址栏中去获取到key的值

    var search = location.search;

    //url地址默认会对中文进行转码
    // decodeURI: 解码
    // encodeURI: 转码
    search = decodeURI(search);
    // console.log(search);

    //获取到搜索的key
    var key = search.split('=')[1];
    $('.lt_search input').val(key);
    console.log(key);

    //渲染的功能
    render();

    //搜索的功能
    $('.lt_search button').on('click', function () {
        location.href = 'searchList.html?key=' + $('.lt_search input').val()
    })


//排序功能的样式
//如果当前点击的li没有active这个类,添加这个类,移除其他的
//如果当前点击的li有active这个类,切换当前li下的小箭头的方向
$('.lt_sort li').on('click',function(){
    $this = $(this);
    if($this.hasClass('active')){
        //有
        $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down')
    }else{
        //没有
        $this.addClass('active').siblings().removeClass('active');
        //让所有的小箭头默认向下
        $('.lt-sort span').addClass('fa-angle-down').removeClass('fa-angle-up');
    }

    render();
})



    function render(){
        $('.product').html('<div class="loading"></div>')
        //发送ajax请求,获取商品数据,并且悬案
        var obj ={
            page: 1,
            pageSize: 100,
            proName: $('.lt_search input').val()
        }
        //判断是否需要传递第四个参数
        var $active = $('.lt_sort li.active');
        if($active.length > 0){
            //1.  如何确定传什么参数
            //2.  传的值是1还是2
            // console.log('需要加参数')
            // console.log($active.data('type'))
            // 判断传递的值
            var type = $active.data('type');
            var value = $active.find('span').hasClass('fa-angle-up')? 1:2;
            console.log(type,value);
            obj[type] = value;
        }


        $.ajax({
            type:"get",
            url:'/product/queryProduct',
            data:obj,
            success: function(info){
                setTimeout(function(){
                     console.log(info);
                $('.product').html(template('tpl',info));
                },1000)
               
            }
        })
    }
    
})