!function(t, e) {
    "object"==typeof exports&&"object"==typeof module?module.exports=e(): "function"==typeof define&&define.amd?define("vue-slider-component", [], e): "object"==typeof exports?exports["vue-slider-component"]=e(): t["vue-slider-component"]=e()
}
(this, function() {
    return function(t) {
        function e(s) {
            if(i[s])return i[s].exports;
            var r=i[s]= {
                i:s, l:!1, exports: {}
            }
            ;
            return t[s].call(r.exports, r, r.exports, e), r.l=!0, r.exports
        }
        var i= {}
        ;
        return e.m=t, e.c=i, e.i=function(t) {
            return t
        }
        , e.d=function(t, i, s) {
            e.o(t, i)||Object.defineProperty(t, i, {
                configurable: !1, enumerable: !0, get: s
            }
            )
        }
        , e.n=function(t) {
            var i=t&&t.__esModule?function() {
                return t.default
            }
            :function() {
                return t
            }
            ;
            return e.d(i, "a", i), i
        }
        , e.o=function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }
        , e.p="", e(e.s=2)
    }
    ([function(t, e, i) {
        i(7);
        var s=i(5)(i(1), i(6), null, null);
        t.exports=s.exports
    }
    , function(t, e, i) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        }
        ), e.default= {
            data:function() {
                return {
                    flag: !1, size: 0, currentValue: 0, currentSlider: 0
                }
            }
            , props: {
                width: {
                    type: [Number, String], default: "auto"
                }
                , height: {
                    type: [Number, String], default: 6
                }
                , data: {
                    type: Array, default: null
                }
                , dotSize: {
                    type: Number, default: 16
                }
                , min: {
                    type: Number, default: 0
                }
                , max: {
                    type: Number, default: 100
                }
                , interval: {
                    type: Number, default: 1
                }
                , show: {
                    type: Boolean, default: !0
                }
                , disabled: {
                    type: Boolean, default: !1
                }
                , piecewise: {
                    type: Boolean, default: !1
                }
                , tooltip: {
                    type: [String, Boolean], default: "always"
                }
                , eventType: {
                    type: String, default: "auto"
                }
                , direction: {
                    type: String, default: "horizontal"
                }
                , reverse: {
                    type: Boolean, default: !1
                }
                , lazy: {
                    type: Boolean, default: !1
                }
                , clickable: {
                    type: Boolean, default: !0
                }
                , speed: {
                    type: Number, default: .5
                }
                , realTime: {
                    type: Boolean, default: !1
                }
                , value: {
                    type: [String, Number, Array], default: 0
                }
                , piecewiseLabel: {
                    type: Boolean, default: !1
                }
                , sliderStyle:[Array, Object], tooltipDir:[Array, String], formatter:[String, Function], piecewiseStyle:Object, piecewiseActiveStyle:Object, processStyle:Object, bgStyle:Object, tooltipStyle:[Array, Object], labelStyle:Object, labelActiveStyle:Object
            }
            , computed: {
                flowDirection:function() {
                    return"vue-slider-"+this.direction+(this.reverse?"-reverse": "")
                }
                , tooltipDirection:function() {
                    var t=this.tooltipDir||("vertical"===this.direction?"left": "top");
                    return Array.isArray(t)?this.isRange?t: t[1]: this.isRange?[t, t]: t
                }
                , tooltipStatus:function() {
                    return"hover"===this.tooltip&&this.flag?"vue-slider-always": this.tooltip?"vue-slider-"+this.tooltip: ""
                }
                , tooltipClass:function() {
                    return["vue-slider-tooltip-"+this.tooltipDirection, "vue-slider-tooltip"]
                }
                , isMobile:function() {
                    return"undefined"!=typeof navigator&&("touch"===this.eventType||"mouse"!==this.eventType&&/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera))
                }
                , isDisabled:function() {
                    return"none"===this.eventType||this.disabled
                }
                , disabledClass:function() {
                    return this.disabled?"vue-slider-disabled": ""
                }
                , isRange:function() {
                    return Array.isArray(this.value)
                }
                , slider:function() {
                    return this.isRange?[this.$refs.dot0, this.$refs.dot1]: this.$refs.dot
                }
                , minimum:function() {
                    return this.data?0: this.min
                }
                , val: {
                    get:function() {
                        return this.data?this.isRange?[this.data[this.currentValue[0]], this.data[this.currentValue[1]]]: this.data[this.currentValue]: this.currentValue
                    }
                    , set:function(t) {
                        if(this.data)if(this.isRange) {
                            var e=this.data.indexOf(t[0]), i=this.data.indexOf(t[1]);
                            e>-1&&i>-1&&(this.currentValue=[e, i])
                        }
                        else {
                            var s=this.data.indexOf(t);
                            s>-1&&(this.currentValue=s)
                        }
                        else this.currentValue=t
                    }
                }
                , currentIndex:function() {
                    return this.isRange?this.data?this.currentValue: [(this.currentValue[0]-this.minimum)/this.spacing, (this.currentValue[1]-this.minimum)/this.spacing]: (this.currentValue-this.minimum)/this.spacing
                }
                , indexRange:function() {
                    return this.isRange?this.currentIndex: [0, this.currentIndex]
                }
                , maximum:function() {
                    return this.data?this.data.length-1: this.max
                }
                , multiple:function() {
                    var t=(""+this.interval).split(".")[1];
                    return t?Math.pow(10, t.length): 1
                }
                , spacing:function() {
                    return this.data?1: this.interval
                }
                , total:function() {
                    return this.data?this.data.length-1: (~~((this.maximum-this.minimum)*this.multiple)%(this.interval*this.multiple)!=0&&console.error("[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible"), (this.maximum-this.minimum)/this.interval)
                }
                , gap:function() {
                    return this.size/this.total
                }
                , position:function() {
                    return this.isRange?[(this.currentValue[0]-this.minimum)/this.spacing*this.gap, (this.currentValue[1]-this.minimum)/this.spacing*this.gap]: (this.currentValue-this.minimum)/this.spacing*this.gap
                }
                , limit:function() {
                    return this.isRange?[[0, this.position[1]], [this.position[0], this.size]]: [0, this.size]
                }
                , valueLimit:function() {
                    return this.isRange?[[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]]: [this.minimum, this.maximum]
                }
                , wrapStyles:function() {
                    return"vertical"===this.direction? {
                        height: "number"==typeof this.height?this.height+"px": this.height, padding: this.dotSize/2+"px"
                    }
                    : {
                        width: "number"==typeof this.width?this.width+"px": this.width, padding: this.dotSize/2+"px"
                    }
                }
                , sliderStyles:function() {
                    return Array.isArray(this.sliderStyle)?this.isRange?this.sliderStyle: this.sliderStyle[1]: this.isRange?[this.sliderStyle, this.sliderStyle]: this.sliderStyle
                }
                , tooltipStyles:function() {
                    return Array.isArray(this.tooltipStyle)?this.isRange?this.tooltipStyle: this.tooltipStyle[1]: this.isRange?[this.tooltipStyle, this.tooltipStyle]: this.tooltipStyle
                }
                , elemStyles:function() {
                    return"vertical"===this.direction? {
                        width: this.width+"px", height: "100%"
                    }
                    : {
                        height: this.height+"px"
                    }
                }
                , dotStyles:function() {
                    return"vertical"===this.direction? {
                        width: this.dotSize+"px", height: this.dotSize+"px", left: -(this.dotSize-this.width)/2+"px"
                    }
                    : {
                        width: this.dotSize+"px", height: this.dotSize+"px", top: -(this.dotSize-this.height)/2+"px"
                    }
                }
                , piecewiseDotStyle:function() {
                    return"vertical"===this.direction? {
                        width: this.width+"px", height: this.width+"px"
                    }
                    : {
                        width: this.height+"px", height: this.height+"px"
                    }
                }
                , piecewiseDotWrap:function() {
                    if(!this.piecewise&&!this.piecewiseLabel)return!1;
                    for(var t=[], e=0;
                    e<=this.total;
                    e++) {
                        var i="vertical"===this.direction? {
                            bottom: this.gap*e-this.width/2+"px", left: 0
                        }
                        : {
                            left: this.gap*e-this.height/2+"px", top: 0
                        }
                        , s=this.reverse?this.total-e:e, r=this.data?this.data[s]:this.spacing*s+this.min;
                        t.push( {
                            style: i, label: this.formatter?this.formatting(r): r, inRange: s>=this.indexRange[0]&&s<=this.indexRange[1]
                        }
                        )
                    }
                    return t
                }
            }
            , watch: {
                value:function(t) {
                    this.flag||this.setValue(t, !0)
                }
                , max:function(t) {
                    var e=this.limitValue(this.val);
                    !1!==e&&this.setValue(e), this.refresh()
                }
                , min:function(t) {
                    var e=this.limitValue(this.val);
                    !1!==e&&this.setValue(e), this.refresh()
                }
                , show:function(t) {
                    var e=this;
                    t&&!this.size&&this.$nextTick(function() {
                        e.refresh()
                    }
                    )
                }
            }
            , methods: {
                bindEvents:function() {
                    this.isMobile?(this.$refs.wrap.addEventListener("touchmove", this.moving), this.$refs.wrap.addEventListener("touchend", this.moveEnd)): (document.addEventListener("mousemove", this.moving), document.addEventListener("mouseup", this.moveEnd), document.addEventListener("mouseleave", this.moveEnd), window.addEventListener("resize", this.refresh))
                }
                , unbindEvents:function() {
                    window.removeEventListener("resize", this.refresh), this.isMobile?(this.$refs.wrap.removeEventListener("touchmove", this.moving), this.$refs.wrap.removeEventListener("touchend", this.moveEnd)): (document.removeEventListener("mousemove", this.moving), document.removeEventListener("mouseup", this.moveEnd), document.removeEventListener("mouseleave", this.moveEnd))
                }
                , formatting:function(t) {
                    return"string"==typeof this.formatter?this.formatter.replace(/\ {
                        value\
                    }
                    /, t):this.formatter(t)
                }
                , getPos:function(t) {
                    return this.realTime&&this.getStaticData(), "vertical"===this.direction?this.reverse?t.pageY-this.offset: this.size-(t.pageY-this.offset): this.reverse?this.size-(t.clientX-this.offset): t.clientX-this.offset
                }
                , wrapClick:function(t) {
                    if(this.isDisabled||!this.clickable)return!1;
                    var e=this.getPos(t);
                    this.isRange&&(this.currentSlider=e>(this.position[1]-this.position[0])/2+this.position[0]?1: 0), this.setValueOnPos(e)
                }
                , moveStart:function(t) {
                    if(this.isDisabled)return!1;
                    this.isRange&&(this.currentSlider=t), this.flag=!0, this.$emit("drag-start", this)
                }
                , moving:function(t) {
                    if(!this.flag)return!1;
                    t.preventDefault(), this.isMobile&&(t=t.targetTouches[0]), this.setValueOnPos(this.getPos(t), !0)
                }
                , moveEnd:function(t) {
                    if(!this.flag)return!1;
                    this.$emit("drag-end", this), this.lazy&&this.isDiff(this.val, this.value)&&this.syncValue(), this.flag=!1, this.setPosition()
                }
                , setValueOnPos:function(t, e) {
                    var i=this.isRange?this.limit[this.currentSlider]: this.limit, s=this.isRange?this.valueLimit[this.currentSlider]: this.valueLimit;
                    if(t>=i[0]&&t<=i[1]) {
                        this.setTransform(t);
                        var r=(Math.round(t/this.gap)*(this.spacing*this.multiple)+this.minimum*this.multiple)/this.multiple;
                        this.setCurrentValue(r, e)
                    }
                    else t<i[0]?(this.setTransform(i[0]), this.setCurrentValue(s[0]), 1===this.currentSlider&&(this.currentSlider=0)):(this.setTransform(i[1]), this.setCurrentValue(s[1]), 0===this.currentSlider&&(this.currentSlider=1))
                }
                , isDiff:function(t, e) {
                    return Object.prototype.toString.call(t)!==Object.prototype.toString.call(e)||(Array.isArray(t)&&t.length===e.length?t.some(function(t, i) {
                        return t!==e[i]
                    }
                    ):t!==e)
                }
                , setCurrentValue:function(t, e) {
                    if(t<this.minimum||t>this.maximum)return!1;
                    this.isRange?this.isDiff(this.currentValue[this.currentSlider], t)&&(this.currentValue.splice(this.currentSlider, 1, t), this.lazy&&this.flag||this.syncValue()): this.isDiff(this.currentValue, t)&&(this.currentValue=t, this.lazy&&this.flag||this.syncValue()), e||this.setPosition()
                }
                , setIndex:function(t) {
                    if(Array.isArray(t)&&this.isRange) {
                        var e=void 0;
                        e=this.data?[this.data[t[0]], this.data[t[1]]]: [this.spacing*t[0]+this.minimum, this.spacing*t[1]+this.minimum], this.setValue(e)
                    }
                    else t=this.spacing*t+this.minimum, this.isRange&&(this.currentSlider=t>(this.currentValue[1]-this.currentValue[0])/2+this.currentValue[0]?1:0), this.setCurrentValue(t)
                }
                , setValue:function(t, e, i) {
                    var s=this;
                    if(this.isDiff(this.val, t)) {
                        var r=this.limitValue(t);
                        this.val=!1!==r?this.isRange?r.concat(): r: this.isRange?t.concat(): t, this.syncValue(e)
                    }
                    this.$nextTick(function() {
                        return s.setPosition(i)
                    }
                    )
                }
                , setPosition:function(t) {
                    this.flag||this.setTransitionTime(void 0===t?this.speed: t), this.isRange?(this.currentSlider=0, this.setTransform(this.position[this.currentSlider]), this.currentSlider=1, this.setTransform(this.position[this.currentSlider])): this.setTransform(this.position), this.flag||this.setTransitionTime(0)
                }
                , setTransform:function(t) {
                    var e=("vertical"===this.direction?this.dotSize/2-t: t-this.dotSize/2)*(this.reverse?-1: 1), i="vertical"===this.direction?"translateY("+e+"px)": "translateX("+e+"px)", s=(0===this.currentSlider?this.position[1]-t: t-this.position[0])+"px", r=(0===this.currentSlider?t: this.position[0])+"px";
                    this.isRange?(this.slider[this.currentSlider].style.transform=i, this.slider[this.currentSlider].style.WebkitTransform=i, this.slider[this.currentSlider].style.msTransform=i, "vertical"===this.direction?(this.$refs.process.style.height=s, this.$refs.process.style[this.reverse?"top": "bottom"]=r): (this.$refs.process.style.width=s, this.$refs.process.style[this.reverse?"right": "left"]=r)): (this.slider.style.transform=i, this.slider.style.WebkitTransform=i, this.slider.style.msTransform=i, "vertical"===this.direction?(this.$refs.process.style.height=t+"px", this.$refs.process.style[this.reverse?"top": "bottom"]=0): (this.$refs.process.style.width=t+"px", this.$refs.process.style[this.reverse?"right": "left"]=0))
                }
                , setTransitionTime:function(t) {
                    if(t||this.$refs.process.offsetWidth, this.isRange) {
                        for(var e=0;
                        e<this.slider.length;
                        e++)this.slider[e].style.transitionDuration=t+"s", this.slider[e].style.WebkitTransitionDuration=t+"s";
                        this.$refs.process.style.transitionDuration=t+"s", this.$refs.process.style.WebkitTransitionDuration=t+"s"
                    }
                    else this.slider.style.transitionDuration=t+"s", this.slider.style.WebkitTransitionDuration=t+"s", this.$refs.process.style.transitionDuration=t+"s", this.$refs.process.style.WebkitTransitionDuration=t+"s"
                }
                , limitValue:function(t) {
                    var e=this;
                    if(this.data)return t;
                    var i=!1;
                    return this.isRange?t=t.map(function(t) {
                        return t<e.min?(i=!0, e.min): t>e.max?(i=!0, e.max): t
                    }
                    ):t>this.max?(i=!0, t=this.max):t<this.min&&(i=!0, t=this.min), i&&t
                }
                , syncValue:function(t) {
                    t||this.$emit("callback", this.val), this.$emit("input", this.isRange?this.val.concat(): this.val)
                }
                , getValue:function() {
                    return this.val
                }
                , getIndex:function() {
                    return this.currentIndex
                }
                , getStaticData:function() {
                    this.$refs.elem&&(this.size="vertical"===this.direction?this.$refs.elem.offsetHeight: this.$refs.elem.offsetWidth, this.offset="vertical"===this.direction?this.$refs.elem.getBoundingClientRect().top+window.pageYOffset||document.documentElement.scrollTop: this.$refs.elem.getBoundingClientRect().left)
                }
                , refresh:function() {
                    this.$refs.elem&&(this.getStaticData(), this.setPosition())
                }
            }
            , mounted:function() {
                var t=this;
                "undefined"!=typeof window&&"undefined"!=typeof document&&this.$nextTick(function() {
                    t.getStaticData(), t.setValue(t.value, !0, 0), t.bindEvents()
                }
                )
            }
            , beforeDestroy:function() {
                this.unbindEvents()
            }
        }
    }
    , function(t, e, i) {
        "use strict";
        var s=i(0);
        t.exports=s
    }
    , function(t, e, i) {
        e=t.exports=i(4)(), e.push([t.i, '.vue-slider-component{position:relative;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.vue-slider-component.vue-slider-disabled{opacity:.5;cursor:not-allowed}.vue-slider-component.vue-slider-has-label{margin-bottom:15px}.vue-slider-component.vue-slider-disabled .vue-slider-dot{cursor:not-allowed}.vue-slider-component .vue-slider{position:relative;display:block;border-radius:15px;background-color:#ccc}.vue-slider-component .vue-slider:after{content:"";position:absolute;left:0;top:0;width:100%;height:100%;z-index:2}.vue-slider-component .vue-slider-process{position:absolute;border-radius:15px;background-color:#3498db;transition:all 0s;z-index:1}.vue-slider-component.vue-slider-horizontal .vue-slider-process{width:0;height:100%;top:0;left:0;will-change:width}.vue-slider-component.vue-slider-vertical .vue-slider-process{width:100%;height:0;bottom:0;left:0;will-change:height}.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-process{width:0;height:100%;top:0;right:0}.vue-slider-component.vue-slider-vertical-reverse .vue-slider-process{width:100%;height:0;top:0;left:0}.vue-slider-component .vue-slider-dot{position:absolute;border-radius:50%;background-color:#fff;box-shadow:.5px .5px 2px 1px rgba(0,0,0,.32);transition:all 0s;will-change:transform;cursor:pointer;z-index:3}.vue-slider-component.vue-slider-horizontal .vue-slider-dot{left:0}.vue-slider-component.vue-slider-vertical .vue-slider-dot{bottom:0}.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-dot{right:0}.vue-slider-component.vue-slider-vertical-reverse .vue-slider-dot{top:0}.vue-slider-component .vue-slider-tooltip-wrap{display:none;position:absolute;z-index:9}.vue-slider-component .vue-slider-tooltip{display:block;font-size:14px;white-space:nowrap;padding:2px 5px;min-width:20px;text-align:center;color:#fff;border-radius:5px;border:1px solid #3498db;background-color:#3498db}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top{top:-9px;left:50%;transform:translate(-50%,-100%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom{bottom:-9px;left:50%;transform:translate(-50%,100%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left{top:50%;left:-9px;transform:translate(-100%,-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right{top:50%;right:-9px;transform:translate(100%,-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip:before{content:"";position:absolute;bottom:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-top-color:inherit;transform:translate(-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-bottom .vue-slider-tooltip:before{content:"";position:absolute;top:-10px;left:50%;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-bottom-color:inherit;transform:translate(-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left .vue-slider-tooltip:before{content:"";position:absolute;top:50%;right:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-left-color:inherit;transform:translateY(-50%)}.vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-right .vue-slider-tooltip:before{content:"";position:absolute;top:50%;left:-10px;width:0;height:0;border:5px solid transparent;border:6px solid transparent\\0;border-right-color:inherit;transform:translateY(-50%)}.vue-slider-component .vue-slider-dot.vue-slider-hover:hover .vue-slider-tooltip-wrap{display:block}.vue-slider-component .vue-slider-dot.vue-slider-always .vue-slider-tooltip-wrap{display:block!important}.vue-slider-component .vue-slider-piecewise{position:absolute;width:100%;padding:0;margin:0;left:0;top:0;height:100%;list-style:none}.vue-slider-component .vue-slider-piecewise-item{position:absolute;width:8px;height:8px}.vue-slider-component .vue-slider-piecewise-dot{position:absolute;left:50%;top:50%;width:100%;height:100%;display:inline-block;background-color:rgba(0,0,0,.16);border-radius:50%;transform:translate(-50%,-50%);z-index:2;transition:all .3s}.vue-slider-component .vue-slider-piecewise-item:first-child .vue-slider-piecewise-dot,.vue-slider-component .vue-slider-piecewise-item:last-child .vue-slider-piecewise-dot{visibility:hidden}.vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-label,.vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-label{position:absolute;display:inline-block;top:100%;left:50%;white-space:nowrap;font-size:12px;color:#333;transform:translate(-50%,8px);visibility:visible}.vue-slider-component.vue-slider-vertical-reverse .vue-slider-piecewise-label,.vue-slider-component.vue-slider-vertical .vue-slider-piecewise-label{position:absolute;display:inline-block;top:50%;left:100%;white-space:nowrap;font-size:12px;color:#333;transform:translate(8px,-50%);visibility:visible}.vue-slider-component .vue-slider-sr-only{clip:rect(1px,1px,1px,1px);height:1px;width:1px;overflow:hidden;position:absolute!important}', ""])
    }
    , function(t, e) {
        t.exports=function() {
            var t=[];
            return t.toString=function() {
                for(var t=[], e=0;
                e<this.length;
                e++) {
                    var i=this[e];
                    i[2]?t.push("@media "+i[2]+"{"+i[1]+"}"): t.push(i[1])
                }
                return t.join("")
            }
            , t.i=function(e, i) {
                "string"==typeof e&&(e=[[null, e, ""]]);
                for(var s= {}
                , r=0;
                r<this.length;
                r++) {
                    var o=this[r][0];
                    "number"==typeof o&&(s[o]=!0)
                }
                for(r=0;
                r<e.length;
                r++) {
                    var n=e[r];
                    "number"==typeof n[0]&&s[n[0]]||(i&&!n[2]?n[2]=i: i&&(n[2]="("+n[2]+") and ("+i+")"), t.push(n))
                }
            }
            , t
        }
    }
    , function(t, e) {
        t.exports=function(t, e, i, s) {
            var r, o=t=t|| {}
            , n=typeof t.default;
            "object"!==n&&"function"!==n||(r=t, o=t.default);
            var l="function"==typeof o?o.options: o;
            if(e&&(l.render=e.render, l.staticRenderFns=e.staticRenderFns), i&&(l._scopeId=i), s) {
                var a=Object.create(l.computed||null);
                Object.keys(s).forEach(function(t) {
                    var e=s[t];
                    a[t]=function() {
                        return e
                    }
                }
                ), l.computed=a
            }
            return {
                esModule: r, exports: o, options: l
            }
        }
    }
    , function(t, e) {
        t.exports= {
            render:function() {
                var t=this, e=t.$createElement, i=t._self._c||e;
                return i("div", {
                    directives:[ {
                        name: "show", rawName: "v-show", value: t.show, expression: "show"
                    }
                    ], ref:"wrap", class:["vue-slider-component", t.flowDirection, t.disabledClass, {
                        "vue-slider-has-label": t.piecewiseLabel
                    }
                    ], style:t.wrapStyles, on: {
                        click: t.wrapClick
                    }
                }
                , [i("div", {
                    ref:"elem", staticClass:"vue-slider", style:[t.elemStyles, t.bgStyle], attrs: {
                        "aria-hidden": "true"
                    }
                }
                , [t.isMobile?[t.isRange?[i("div", {
                    ref:"dot0", class:[t.tooltipStatus, "vue-slider-dot"], style:[t.dotStyles, t.sliderStyles[0]], on: {
                        touchstart:function(e) {
                            t.moveStart(0)
                        }
                    }
                }
                , [i("span", {
                    class: ["vue-slider-tooltip-"+t.tooltipDirection[0], "vue-slider-tooltip-wrap"]
                }
                , [t._t("tooltip", [i("span", {
                    staticClass: "vue-slider-tooltip", style: t.tooltipStyles[0]
                }
                , [t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])], {
                    value: t.val[0], index: 0
                }
                )], 2)]), t._v(" "), i("div", {
                    ref:"dot1", class:[t.tooltipStatus, "vue-slider-dot"], style:[t.dotStyles, t.sliderStyles[1]], on: {
                        touchstart:function(e) {
                            t.moveStart(1)
                        }
                    }
                }
                , [i("span", {
                    class: ["vue-slider-tooltip-"+t.tooltipDirection[1], "vue-slider-tooltip-wrap"]
                }
                , [t._t("tooltip", [i("span", {
                    staticClass: "vue-slider-tooltip", style: t.tooltipStyles[1]
                }
                , [t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])], {
                    value: t.val[1], index: 1
                }
                )], 2)])]:[i("div", {
                    ref:"dot", class:[t.tooltipStatus, "vue-slider-dot"], style:[t.dotStyles, t.sliderStyles], on: {
                        touchstart: t.moveStart
                    }
                }
                , [i("span", {
                    class: ["vue-slider-tooltip-"+t.tooltipDirection, "vue-slider-tooltip-wrap"]
                }
                , [t._t("tooltip", [i("span", {
                    staticClass: "vue-slider-tooltip", style: t.tooltipStyles
                }
                , [t._v(t._s(t.formatter?t.formatting(t.val):t.val))])], {
                    value: t.val
                }
                )], 2)])]]:[t.isRange?[i("div", {
                    ref:"dot0", class:[t.tooltipStatus, "vue-slider-dot"], style:[t.dotStyles, t.sliderStyles[0]], on: {
                        mousedown:function(e) {
                            t.moveStart(0)
                        }
                    }
                }
                , [i("span", {
                    class: ["vue-slider-tooltip-"+t.tooltipDirection[0], "vue-slider-tooltip-wrap"]
                }
                , [t._t("tooltip", [i("span", {
                    staticClass: "vue-slider-tooltip", style: t.tooltipStyles[0]
                }
                , [t._v(t._s(t.formatter?t.formatting(t.val[0]):t.val[0]))])], {
                    value: t.val[0], index: 0
                }
                )], 2)]), t._v(" "), i("div", {
                    ref:"dot1", class:[t.tooltipStatus, "vue-slider-dot"], style:[t.dotStyles, t.sliderStyles[1]], on: {
                        mousedown:function(e) {
                            t.moveStart(1)
                        }
                    }
                }
                , [i("span", {
                    class: ["vue-slider-tooltip-"+t.tooltipDirection[1], "vue-slider-tooltip-wrap"]
                }
                , [t._t("tooltip", [i("span", {
                    staticClass: "vue-slider-tooltip", style: t.tooltipStyles[1]
                }
                , [t._v(t._s(t.formatter?t.formatting(t.val[1]):t.val[1]))])], {
                    value: t.val[1], index: 1
                }
                )], 2)])]:[i("div", {
                    ref:"dot", class:[t.tooltipStatus, "vue-slider-dot"], style:[t.dotStyles, t.sliderStyles], on: {
                        mousedown: t.moveStart
                    }
                }
                , [i("span", {
                    class: ["vue-slider-tooltip-"+t.tooltipDirection, "vue-slider-tooltip-wrap"]
                }
                , [t._t("tooltip", [i("span", {
                    staticClass: "vue-slider-tooltip", style: t.tooltipStyles
                }
                , [t._v(t._s(t.formatter?t.formatting(t.val):t.val))])], {
                    value: t.val
                }
                )], 2)])]], t._v(" "), [i("ul", {
                    staticClass: "vue-slider-piecewise"
                }
                , t._l(t.piecewiseDotWrap, function(e, s) {
                    return i("li", {
                        key: s, staticClass: "vue-slider-piecewise-item", style: [t.piecewiseDotStyle, e.style]
                    }
                    , [t._t("piecewise", [t.piecewise?i("span", {
                        staticClass: "vue-slider-piecewise-dot", style: [t.piecewiseStyle, e.inRange?t.piecewiseActiveStyle: null]
                    }
                    ):t._e()], {
                        label: e.label, index: s, first: 0===s, last: s===t.piecewiseDotWrap.length-1
                    }
                    ), t._v(" "), t._t("label", [t.piecewiseLabel?i("span", {
                        staticClass: "vue-slider-piecewise-label", style: [t.labelStyle, e.inRange?t.labelActiveStyle: null]
                    }
                    , [t._v("\n\t\t\t\t\t\t\t"+t._s(e.label)+"\n\t\t\t\t\t\t")]):t._e()], {
                        label: e.label, index: s, first: 0===s, last: s===t.piecewiseDotWrap.length-1
                    }
                    )], 2)
                }
                ))], t._v(" "), i("div", {
                    ref: "process", staticClass: "vue-slider-process", style: t.processStyle
                }
                )], 2), t._v(" "), t.isRange||t.data?t._e():i("input", {
                    directives:[ {
                        name: "model", rawName: "v-model", value: t.val, expression: "val"
                    }
                    ], staticClass:"vue-slider-sr-only", attrs: {
                        type: "range", min: t.min, max: t.max
                    }
                    , domProps: {
                        value: t.val
                    }
                    , on: {
                        __r:function(e) {
                            t.val=e.target.value
                        }
                    }
                }
                )])
            }
            , staticRenderFns:[]
        }
    }
    , function(t, e, i) {
        var s=i(3);
        "string"==typeof s&&(s=[[t.i, s, ""]]), s.locals&&(t.exports=s.locals);
        i(8)("1888d2fe", s, !0)
    }
    , function(t, e, i) {
        function s(t) {
            for(var e=0;
            e<t.length;
            e++) {
                var i=t[e], s=d[i.id];
                if(s) {
                    s.refs++;
                    for(var r=0;
                    r<s.parts.length;
                    r++)s.parts[r](i.parts[r]);
                    for(;
                    r<i.parts.length;
                    r++)s.parts.push(o(i.parts[r]));
                    s.parts.length>i.parts.length&&(s.parts.length=i.parts.length)
                }
                else {
                    for(var n=[], r=0;
                    r<i.parts.length;
                    r++)n.push(o(i.parts[r]));
                    d[i.id]= {
                        id: i.id, refs: 1, parts: n
                    }
                }
            }
        }
        function r() {
            var t=document.createElement("style");
            return t.type="text/css", h.appendChild(t), t
        }
        function o(t) {
            var e, i, s=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');
            if(s) {
                if(v)return f;
                s.parentNode.removeChild(s)
            }
            if(m) {
                var o=c++;
                s=p||(p=r()), e=n.bind(null, s, o, !1), i=n.bind(null, s, o, !0)
            }
            else s=r(), e=l.bind(null, s), i=function() {
                s.parentNode.removeChild(s)
            }
            ;
            return e(t), function(s) {
                if(s) {
                    if(s.css===t.css&&s.media===t.media&&s.sourceMap===t.sourceMap)return;
                    e(t=s)
                }
                else i()
            }
        }
        function n(t, e, i, s) {
            var r=i?"": s.css;
            if(t.styleSheet)t.styleSheet.cssText=g(e, r);
            else {
                var o=document.createTextNode(r), n=t.childNodes;
                n[e]&&t.removeChild(n[e]), n.length?t.insertBefore(o, n[e]): t.appendChild(o)
            }
        }
        function l(t, e) {
            var i=e.css, s=e.media, r=e.sourceMap;
            if(s&&t.setAttribute("media", s), r&&(i+="\n/*# sourceURL="+r.sources[0]+" */", i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"), t.styleSheet)t.styleSheet.cssText=i;
            else {
                for(;
                t.firstChild;
                )t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(i))
            }
        }
        var a="undefined"!=typeof document;
        if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var u=i(9), d= {}
        , h=a&&(document.head||document.getElementsByTagName("head")[0]), p=null, c=0, v=!1, f=function() {}
        , m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
        t.exports=function(t, e, i) {
            v=i;
            var r=u(t, e);
            return s(r), function(e) {
                for(var i=[], o=0;
                o<r.length;
                o++) {
                    var n=r[o], l=d[n.id];
                    l.refs--, i.push(l)
                }
                e?(r=u(t, e), s(r)):r=[];
                for(var o=0;
                o<i.length;
                o++) {
                    var l=i[o];
                    if(0===l.refs) {
                        for(var a=0;
                        a<l.parts.length;
                        a++)l.parts[a]();
                        delete d[l.id]
                    }
                }
            }
        }
        ;
        var g=function() {
            var t=[];
            return function(e, i) {
                return t[e]=i, t.filter(Boolean).join("\n")
            }
        }
        ()
    }
    , function(t, e) {
        t.exports=function(t, e) {
            for(var i=[], s= {}
            , r=0;
            r<e.length;
            r++) {
                var o=e[r], n=o[0], l=o[1], a=o[2], u=o[3], d= {
                    id: t+":"+r, css: l, media: a, sourceMap: u
                }
                ;
                s[n]?s[n].parts.push(d):i.push(s[n]= {
                    id: n, parts: [d]
                }
                )
            }
            return i
        }
    }
    ])
}

);
