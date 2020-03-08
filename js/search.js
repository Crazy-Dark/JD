// + function () {
    const placeholders = ["保险柜", "行车记录仪", "矿泉水"]
    $("#logo").hover(function () {
        $('.title-hover', this).fadeIn();
    }, function () {
        setTimeout(() => {
            $('.title-hover', this).fadeOut();
        }, 2000)
    })

    // 给搜索框中添加文字，动态改变
    function addPlaceholder() {
        let count = 1;
        let holderTimer = setInterval(() => {
            $('#search input').prop('placeholder', placeholders[count]);
            count++;
            count = count % placeholders.length;
        }, 2000);
    }
    addPlaceholder()
    // 当在输入框中输入文字时，显示数据
    function delSearchData(data) {
        var result = data.result || [];
        console.log(result)
        $(`#search .wordList`).empty();
        result.forEach(function(ele, index) {
            let str = `约为${parseInt(ele[1])}个商品`
            $(`<li><a>${ele[0]}</a><span>${str}</span></li>`).appendTo($(`#search .wordList`));
        });
        $(`#search .wordList`).append($(`<li>关闭</li>`));
        $(`#search .wordList`).css({display: "block"})
    }
    // 当鼠标输入内容请求的数据
    var getDataTimer = null;
    $("#search input").on("keyup", function () {
        var val = $(this).val();
        if (val) {
            clearTimeout(getDataTimer);
            getDataTimer = setTimeout(() => {
                $.ajax({
                    type: "GET",
                    url: "https://suggest.taobao.com/sug",
                    data: {
                        code: "utf-8",
                        q: val,
                        _ksTS: "1581495093000 _3225",
                        callback: "delSearchData",
                        k: 1,
                        area: "c2c",
                        bucketid: 10
                    },
                    dataType: "jsonp"
                })
            }, 500);
        }else{
            $(`#search .wordList`).empty();
            $(`#search .wordList`).css({display: "none"})
        }
    })
    // 从提示文字框移除时
    let showTimer = null;
    $(`#search .wordList`).on("mouseleave",function(){
        showTimer = setTimeout(() =>{
            $(this).hide();
        },200) 
    }).mouseenter(function() {
        clearTimeout(showTimer);
    })
    // 搜索框
    $("#search input").on("mouseenter", function() {
        clearTimeout(showTimer);
        var val = $(this).val();
        if(val) {
            $(`#search .wordList`).show();
        }
    }).mouseleave(function() {
        showTimer = setTimeout(() =>{
            $(`#search .wordList`).hide();
        },200) 
    })
    


    // jsonp回调函数


// }()