// 获取数据
function getLeftNav() {
    $.ajax({
        type: "GET",
        url: "../data/leftnavData.json",
        dataType: "json",
        success: function (data) {
            renderLeftNav(data);
            bindEventLeftNav(data)
        },
        error: function () {
            console.log("error");
        }
    })
}

// 渲染左侧的导航栏
function renderLeftNav(data) {
    $(`#nav`).empty();
    data.forEach(function (ele) {
        // -----------左侧导航栏
        let $Li = $(`<li></li>`);
        ele.name.forEach(function (ele, index, data) {
            let len = data.length - 1;
            if (index == len) {
                $(`<a href="#">${ele}</a>`).appendTo($Li);
            } else {
                $(`<a href="#">${ele}</a>`).appendTo($Li);
                $(`<span>/</span>`).appendTo($Li);
            }
        })
        $Li.appendTo($(`#nav`));
    })
}

// -----------左侧导航栏中的内容
function renderLeftNavContent(data) {
    let $Dl = $(`<dl></dl>`);
    $(`.nav-content`).empty()
    let $Dt = $(`<dt></dt>`);
    data.content.head.forEach(function (ele, index) {
        $(`
            <a href="#">
            ${ele}
            <span class="iconfont">&#xe6c9;</span>
            </a>
        `).appendTo($Dt);
    })
    $Dl.append($Dt);
    $Dl.appendTo(`.nav-content`);
    data.content.content.forEach(function (ele, index) {
        let $Dd = $(`
                <dd>
                <div class="head">
                    ${ele.head}
                    <span class="iconfont">&#xe6c9;</span>
                </div>
                </dd>`);
        let $Div = $(`<div></div>`);
        ele.content.forEach(function (ele, index) {
            $(`<span>${ele}</span>`).appendTo($Div);
        })
        $Div.appendTo($Dd)
        $Dl.append($Dd).appendTo($(`.nav-content`));
    })
}

function bindEventLeftNav(data) {
    let index;
    $(`#nav li`).mouseenter(function () {
        index = $(this).index();
        renderLeftNavContent(data[index]);
    })
    // ---------------循环事件
    // ------左侧导航区事件
    let showTimer = null;
    $(`#nav`).mouseenter(function() {
        $(`.nav-content`).css({
            display: "block"
        })
    }).mouseleave(function(){
        showTimer = setTimeout(() => {
            $(`.nav-content`).css({
                display: "none"
            })
        }, 50)
    })
    // -------左侧导航区内容事件
    $(`.nav-content`).mouseenter(function() {
        clearTimeout(showTimer)
    }).mouseleave(function() {
        $(this).css({
            display: "none"
        })
    })
}
getLeftNav();