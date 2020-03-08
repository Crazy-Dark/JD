(function () {
    // 创建轮播图对象的构造函数
    function Swiper(options, wrap) {
        this.wrap = wrap || $('body');    // 传递过来的this
        this.items = options.items || [];
        this.showArrowBtn = typeof options.showArrowBtn === 'boolean' ? options.showArrowBtn : false;
        this.spotPosition = options.spotPosition ||  'center';
        this.showSpotBtn = typeof options.showSpotBtn === 'boolean' ? options.showSpotBtn  : false;
        this.type = options.type || 'fade';
        this.width = options.width || 400;
        this.height = options.height || 300;
        this.delTime = options.delTime || 2000;
        this.isAuto = typeof options.isAuto === 'boolean' ? options.isAuto : false;
        // 以上为传递过来的参数------------------------------------------
        this.nowIndex = 0;    // 当前轮播内容
        this.len = options.items.length;   // 轮播总数
        this.timer = null;
        this.lock = false;
        this.left = 0;    // 滑动时, 当前滑动的位置
        // 函数----------对数据进行初始化
        this.init = function () {
            this.createDom();    // 创建轮播图的结构
            this.initStyle();    // 初始化样式
            this.bindEvent();    // 注册事件
            if(this.isAuto) {
                this.autoMove(); // 是否自动轮播
            }
        }
    }

    // --------创建轮播图结构
    Swiper.prototype.createDom = function () {
        // 轮播图最外层-----最外层的包裹层
        const swiperDiv = $(`<div class="my-swiper"></div>`).addClass('my-swiper-' + this.type); 
        // 存放轮播的区域----使用ul>li来实现
        const swiperContentUl = $(`<ul class="my-swiper-list"></ul>`); 
        // 创建存放小圆点的区域
        const swiperSpot = $(`<div class="my-swiper-spot"></div>`);
        // 创建左右按钮
        const leftBtn = $(`<button class="my-swiper-btn left-btn">&lt;</button>`);
        const rightBtn = $(`<button class="my-swiper-btn right-btn">&gt;</button>`);
        // 遍历内容区的类数组---将要轮播的区域插入到li中
        Array.from(this.items).forEach(function(ele, index) {
            $('<li></li>').append($(ele)).appendTo(swiperContentUl);
            $('<span></span>').appendTo(swiperSpot);
        })
        // 判断轮播的方式-- slide为滑动  -- fade为淡入淡出
        if(this.type === "slide") {
            // 将第一个li元素深度克隆----添加到ul中
            swiperContentUl.find('li').eq(0).clone(true).appendTo(swiperContentUl);
        }
        // 将ul元素------放入最外层的包裹层
        swiperDiv.append(swiperContentUl);
        // 判断是否有-------按钮 
        if(this.showArrowBtn) {
            swiperDiv.append(leftBtn);
            swiperDiv.append(rightBtn);
        }
        // 判断是否有-------小圆点
        if(this.showSpotBtn) {
            swiperDiv.append(swiperSpot);
        }
        // 最后将其放入到页面中
        this.wrap.append(swiperDiv);
    }

    // --------初始化轮播图中的样式
    Swiper.prototype.initStyle = function () {
        // 最外层的包裹层-----设置宽高
        $('.my-swiper', this.wrap)
            .add('.my-swiper > .my-swiper-list > li', this.wrap)
                .css({
                    width: this.width,
                    height: this.height           
                });
        // 判断轮播的类型---- slide滑动
        if(this.type === "slide") {
            $('.my-swiper-slide ul', this.wrap).css({
                width: this.width * (this.len + 1),
                height: this.height
            });
        };
        // 如果类型为-------fade淡入淡出
        $('.my-swiper-fade > .my-swiper-list > li', this.wrap)
            .hide().eq(this.nowIndex).show();
        // 设置小圆点的位置
        $('.my-swiper >.my-swiper-spot', this.wrap).css({
            textAlign: this.spotPosition,
        }).find('span').eq(this.nowIndex).addClass("current");
    }

    // --------绑定事件
    Swiper.prototype.bindEvent = function () {
        let self = this;
        // 鼠标移入    停止自动轮播
        if(this.isAuto) {
            $('.my-swiper', this.wrap).on("mouseenter", () => {
                clearInterval(this.timer);
            }).on("mouseleave", () => {
                this.autoMove();
            })
        }
        // 点击左键
        $('.my-swiper .left-btn', this.wrap).on("click", () => {
            // 🔒
            if(this.lock) {
                return false;
            }
            this.lock = true;           
            this.change(-1);
        });
        // 右键 
        $('.my-swiper .right-btn', this.wrap).on("click", () => {
            // 🔒
            if(this.lock) {
                return false;
            }
            this.lock = true;
            this.change(1);
        });
        // 圆点
        $('.my-swiper .my-swiper-spot > span', this.wrap)
            .on("mouseenter", function (e) {
                if(self.lock) {
                    return false;
                }
            self.nowIndex = $(this).index();
            self.change();
        })
    }
    // --------轮播动画处理
    Swiper.prototype.change = function (num) {
        if(this.type == 'fade') {
            // --------------------------淡入淡出
            // 利用点击按钮传入的1和-1, 实现当前下标的改变
            num ? this.nowIndex = ((this.nowIndex + num) + this.len) % this.len : ``;
            $('.my-swiper > .my-swiper-list > li', this.wrap)
                .fadeOut()
                    .eq(this.nowIndex)
                        .fadeIn("linear",() => {this.lock = false});
        }else if (this.type === "slide") {
            // --------------------------滑动
            // 判断语句是用于----判断是否到达了两个端点, 如果到了端点直接变换
            if(this.nowIndex + num < 0|| this.nowIndex + num > this.len) {
                this.nowIndex = ((this.nowIndex + num) + (this.len + 1)) % (this.len + 1);
                $('.my-swiper-slide .my-swiper-list', this.wrap).css({
                    left: -this.width * this.nowIndex
                })
            }
            // 改变下标实现滑动效果
            num ? this.nowIndex = ((this.nowIndex + num) + (this.len + 1)) % (this.len + 1) : ``;
            $('.my-swiper-slide .my-swiper-list', this.wrap)
            .animate({
                left: -this.width * this.nowIndex
            }, () => {
                this.lock = false; 
            })
        }
        // -----------------------------小圆点的变化
        $('.my-swiper .my-swiper-spot > span', this.wrap)
            .removeClass('current')
                .eq(this.nowIndex % this.len)
                    .addClass('current');
    }

    // --------自动轮播
    Swiper.prototype.autoMove = function () {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if(this.lock) {
                return false;
            }
            this.lock = true;
            this.change(1);
        }, this.delTime)
    }
    $.fn.extend({
        swiper: function (options) {
            const obj = new Swiper(options, this);
            obj.init();
        }
    });
} ())