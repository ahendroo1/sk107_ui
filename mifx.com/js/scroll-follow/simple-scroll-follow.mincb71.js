/**
 * @file jquery.simple-scroll-follow
 * @version 3.1.0
 * @author Yuusaku Miyazaki <toumin.m7@gmail.com>
 * @license MIT
 */
!function(a){"object"==typeof module&&"object"==typeof module.exports?a(require("jquery"),window,document):a(jQuery,window,document)}(function(a,b,c,d){a.fn.simpleScrollFollow=function(b){var c=Array.prototype.slice.call(arguments,1);return this.each(function(){a.fn.simpleScrollFollow.processEach(this,b,c)})},a.fn.simpleScrollFollow.processEach=function(b,c,d){var e=a(b).data("simple-scroll-follow");return e&&c in e&&"_"!=c.charAt(0)?(e[c].apply(e,d),"call public method"):"object"!=typeof c&&c?(console.error('Sub-method "'+c+'" does not exist on $.simpleScrollFollow'),"error"):(a(b).data("simple-scroll-follow",new a.simpleScrollFollow(b,c)),"init plugin")},a.simpleScrollFollow=function(c,d){this._setOption(d),this._setFollow(c);var e=this;a(b).scroll(function(){e._handleScroll.call(e)}),this.timer=!1,a(b).resize(function(){e._handleResize.call(e)})},a.extend(a.simpleScrollFollow.prototype,{setEnabled:function(a){return a===d||a?this.option.enabled=!0:(this._moveDefaultPosition(),this.option.enabled=!1)},_moveDefaultPosition:function(){a(this.follow.elem).css({position:"",top:"",bottom:"",left:"",right:""}).width("")},_setFollow:function(b){return this.follow={elem:b,width:a(b).width(),offset_top:a(b).offset().top,offset_bottom:this._calcOffsetBottom(b),offset_left:a(b).offset().left,position_top:"auto"==a(b).css("top")?0:Number(a(b).css("top").replace(/px$/,""))}},_setOption:function(b){return this.option=a.extend({enabled:!0,limit_elem:a("body"),min_width:0,upper_side:null,lower_side:null},b),"string"==typeof this.option.limit_elem&&(this.option.limit_elem=a(this.option.limit_elem)),this.option},_calcOffsetBottom:function(b){return a(b).offset().top+this._calcElemHeight(b)},_calcElemHeight:function(b){return a(b).height()+Number(a(b).css("border-top-width").replace(/px$/,""))+Number(a(b).css("border-bottom-width").replace(/px$/,""))+Number(a(b).css("padding-top").replace(/px$/,""))+Number(a(b).css("padding-bottom").replace(/px$/,""))},_handleScroll:function(){if(!this.option.enabled)return!1;if(a(b).width()<this.option.min_width)return this._moveDefaultPosition.call(this),!1;var c={scroll_top:this._getUpperSide(),scroll_bottom:this._getLowerSide()},d={offset_top:a(this.follow.elem).offset().top,offset_bottom:this._calcOffsetBottom(this.follow.elem)},e={offset_bottom:this._calcOffsetBottom(this.option.limit_elem)};return!(e.offset_bottom-this.follow.offset_top<d.offset_bottom-d.offset_top)&&(this._handleScrollMain(c,d,e),!0)},_getUpperSide:function(){var c=a(b).scrollTop();if(this.option.upper_side){var d=this._calcOffsetBottom(this.option.upper_side);c<d&&(c=d)}return c},_getLowerSide:function(){var c=a(b).scrollTop()+a(b).height();if(this.option.lower_side){var d=a(this.option.lower_side).offset().top;c>d&&(c=d)}return c},_handleScrollMain:function(a,b,c){return a.scroll_top<this.follow.offset_top?(this._move1(),1):a.scroll_top>c.offset_bottom?(this._move2(b,c),2):a.scroll_bottom-a.scroll_top>b.offset_bottom-b.offset_top?c.offset_bottom-a.scroll_top<b.offset_bottom-b.offset_top?(this._move2(b,c),3):(this._move3(),4):a.scroll_bottom>c.offset_bottom?(this._move2(b,c),5):a.scroll_bottom-this.follow.offset_top>b.offset_bottom-b.offset_top?(this._move4(),6):(this._move1(),7)},_move1:function(){a(this.follow.elem).css({position:"absolute",top:"",bottom:"",left:"",right:""}).width(this.follow.width)},_move2:function(b,c){a(this.follow.elem).css({position:"absolute",top:c.offset_bottom-this.follow.offset_top-(b.offset_bottom-b.offset_top)+this.follow.position_top,bottom:"auto",left:"",right:""}).width(this.follow.width)},_move3:function(){a(this.follow.elem).css({position:"fixed",top:this._getPositionToStickToWindow(this.option.upper_side),bottom:"auto",left:this.follow.offset_left,right:"auto"}).width(this.follow.width)},_move4:function(){a(this.follow.elem).css({position:"fixed",top:"auto",bottom:this._getPositionToStickToWindow(this.option.lower_side),left:this.follow.offset_left,right:"auto"}).width(this.follow.width)},_getPositionToStickToWindow:function(a){return a?this._calcElemHeight(a):0},_handleResize:function(){!1!==this.timer&&clearTimeout(this.timer);var c=this;return this.timer=setTimeout(function(){c._moveDefaultPosition.call(c),c._setFollow.call(c,c.follow.elem),a(b).trigger("scroll")},200)}})});