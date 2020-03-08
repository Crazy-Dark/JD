/**
 * 获取数据
 * @param {*} url 获取下拉菜单中json数据的路径
 */
function getData(url) {
    $.ajax({
        type: "GET",
        url: "../data/data.json",
        dataType: "json",
        success: function(data) {
            renderData(data);
            bindEvent(data)
        },
        error: function() {
            console.log("error");
        }
    })

}
/**
 * 对下拉菜单进行数据填充
 * @param {*} data 
 */
function renderData(data) {
    data.forEach((ele) => {
        $(`${ele.id}`).spinner(ele)
    })
}
/**
 * 事件函数
 */
function bindEvent(data) {
    data.forEach((ele) => {
        $(`${ele.id}`).on("mouseenter", function(e) {
            $(this).addClass("active").find('.my-dropdown').css("display", "block");
        });
        $(`${ele.id}`).on("mouseleave", function(e) {
            $(this).removeClass("active").find('.my-dropdown').css("display", "none");
        })
    })
}

// 插入轮播图
$("#app .seckill-2 .silder").swiper({
    items: $('.silder > div'), // 轮播内容
    showArrowBtn: true, // 是否显示左右按钮
    // spotPosition: 'right', // 小圆点的位置
    showSpotBtn: false, // 是否显示小圆点
    type: "slide", // 轮播方式
    width: 800,
    height: 260,
    isAuto: false // 是否自动轮播
})
$("#app .seckill-3").swiper({
    items: $('.seckill-3 > div'), // 轮播内容
    showArrowBtn: false, // 是否显示左右按钮
    spotPosition: 'center', // 小圆点的位置
    showSpotBtn: true, // 是否显示小圆点
    type: "slide", // 轮播方式
    width: 200,
    height: 260,
    delTime: 1500,
    isAuto: true // 是否自动轮播
})
$(".fs-col2 .main-fl").swiper({
    items: $('.main-fl > img'), // 轮播内容
    showArrowBtn: true, // 是否显示左右按钮
    spotPosition: 'left', // 小圆点的位置
    showSpotBtn: true, // 是否显示小圆点
    type: "slide", // 轮播方式
    width: 590,
    height: 470,
    isAuto: true // 是否自动轮播
})
$(".fs-col2 .main-fr").swiper({
    items: $('.main-fr > div'), // 轮播内容
    showArrowBtn: true, // 是否显示左右按钮
    // spotPosition: 'left', // 小圆点的位置
    showSpotBtn: false, // 是否显示小圆点
    type: "slide", // 轮播方式
    width: 190,
    height: 470,
    delTime: 3000,
    isAuto: true // 是否自动轮播
})

getData("../data/data.json");


