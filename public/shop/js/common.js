
//初始化区域滚动
mui('.mui-scroll-wrapper').scroll({
   //不显示滚动条
    indicators: false
});

//初始化轮播图 

mui('.mui-slider').slider({
    interval: 3000//自动轮播周期，若为0则不自动播放，默认为0；
});