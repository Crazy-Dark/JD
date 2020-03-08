(function () {
    function Spinner(option, wrap) {
        this.wrap = wrap;
        this.width = option.width;
        this.allwidth = option.allwidth;
        this.left = option.left || "auto";
        this.right = option.right || "auto";
        this.direction = option.direction || "y";
        this.menuList  = option.menuList || [];
        this.init = function () {
            this.createDom();
            this.initStyle();
        }
    }

    Spinner.prototype.createDom = function (option) {
        let dropdown = $(`<div class="my-dropdown"></div>`);
        this.menuList.forEach(function(ele,inex) {
            let dl = $(`<dl></dl>`);
            if(ele.titel) {
                dt = $(`<dt>${ele.titel}</dt>`).appendTo(dl);
            }
            ele.item.forEach((ele,index) => {
                dd = $(`
                <dd>
                   <a href="${ele.href}">${ele.name}</a> 
                </dd>`).appendTo(dl);
            })
            dl.appendTo(dropdown)  
        })
        $(this.wrap).append(dropdown);
    }
    Spinner.prototype.initStyle = function() {
        $('.my-dropdown', this.wrap)
            .css({
                width: this.allwidth,
                left: this.left,
                right: this.right
            })
        $('.my-dropdown dd', this.wrap)
            .css("width", `${this.width}`)
        if(this.direction == "x") {
            $('.my-dropdown', this.wrap).css({
                padding: "20px 0px",
            })
            $('.my-dropdown dl', this.wrap)
            .css({
                float: "left",
                borderBottom: "none",
                padding: "0px 0px 0px 19px"
            })
            this.menuList.forEach((ele,index) => {
                $('.my-dropdown', this.wrap).find('dl').eq(index).css({
                    width: ele.width,
                    borderLeft: "1px solid #eee"
                })
            })

        }
    }
    
    $.fn.extend({
        spinner: function (option) {
            const obj = new Spinner(option, this);
            obj.init();
        }
    })
} ())