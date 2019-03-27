// localStroge中只能存储字符串，如果是其他类型的数据，都会转换成字符串
// 如果要在localStorage中存储复杂类型的数据，需要使用JSON.stringify()转成json字符串才能存储

// localStorage.getItem取到的数据也是json字符串， 需要使用JSON.parse()再次转回对象
$(function(){
    //增加假数据
    // localStorage.setItem('search_history', JSON.stringify(['埃迪达斯', '耐克']))
    // // 1. 历史记录的展示
  // 2. 删除某条历史记录
  // 3. 清空整个历史记录
  // 4. 增加历史记录
    var KEY = 'search_history';
  /*
   历史记录的展示
   1. 先从localstorage中获取到历史记录
   2. 转换成数组
   3. 集合模板引擎进行渲染
  */

    var getHistory = function () {
        var result = localStorage.getItem(KEY)
        // console.log(result);
        // 保证获取到的一定是个数组
        return JSON.parse(result) || []
    }

    // 封装了一个渲染历史记录的函数
    var render = function () {
        var history = getHistory()
        // console.log(history);
        $('.lt_history').html(template('tpl', { rows: history }))
    }
    render()


/*
  清空历史记录
  1. 给清空按钮注册点击事件
  2. 删除 search_history
  3. 重新渲染

  click tap
  click: 300ms延迟 为了区分是否是双击  早期的页面都是pc端的页面  视口
  tap: 解决早期的移动端的click事件的300ms延迟的问题， 穿透的bug
  fast-click: 为了解决移动端click事件的300ms

*/
    $('.lt_history').on('click', '.btn_empty', function () {
        localStorage.removeItem('search_history')
        // 重新渲染
        render();
    })


//删除历史记录的功能
    //给删除按钮注册点击事件
    //获取到要删除的下标
    //获取到localStorage中的数据
    //根据下标删除数组中的对应项
    //重新把数组存回到storage中
    //重新渲染
    $('.lt_history').on('click', '.fa-close', function (){
        var index = $(this).data('index');
        var history = getHistory();
        console.log(index, history);
        //根据下标删除数组某一项
        // 根据下标删除数组某一项  sort reverse push pop unshift shift splice
            // 参数1： start 开始的下标
            // 参数2： 删除几个  0
            // 参数3： 添加哪些值
        history.splice(index,1);
        localStorage.setItem(KEY, JSON.stringify(history));
        render();
    })

//增加历史记录的功能
    //给搜索按钮注册点击事件
    //获取到文本框的value值
    //获取到storage中的数据
    //往数组中添加这条记录,添加到数组的前面
    //把数组重新存回到storage中
    //重新渲染
    $('.lt_search button').on('click', function () {
        var value = $('.lt_search input').val()
        $('.lt_search input').val('')
        var history = getHistory()

        // 去重的操作, 判断数组中是否已经包含了value了，如果包含了，需要把这个值给删除
        var index = history.indexOf(value)
        if (index !== -1) {
            history.splice(index, 1)
        }
        history.unshift(value)
        // console.log(history)
        localStorage.setItem(KEY, JSON.stringify(history))

        render()

        // 跳转到商品搜索结果页面
        location.href = 'searchList.html?key=' + value
    })


})