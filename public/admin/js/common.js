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
    // console.log('请求开始了');
    NProgress.start(); 
})
$(document).ajaxStop(function () {
    // console.log('请求结束了');
    setTimeout(function () {
        NProgress.done(); 
    }, 500)
})