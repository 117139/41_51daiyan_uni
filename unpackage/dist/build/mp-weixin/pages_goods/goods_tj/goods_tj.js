(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages_goods/goods_tj/goods_tj"],{"12be":function(t,n,e){"use strict";(function(t){e("72bd");o(e("66fd"));var n=o(e("9b51"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"268b":function(t,n,e){},"471b":function(t,n,e){"use strict";e.r(n);var o=e("8768"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},"4cf6":function(t,n,e){"use strict";var o=e("268b"),i=e.n(o);i.a},"708f":function(t,n,e){"use strict";var o;e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}));var i=function(){var t=this,n=t.$createElement;t._self._c},a=[]},8768:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o,i=r(e("b704")),a=e("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function u(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,o)}return e}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?u(Object(e),!0).forEach((function(n){s(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):u(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function s(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var f={data:function(){return{dy_mon:0,dy_num:0,dy_pri:0,data_tj:[],data_list:[],btn_kg:0,page:1,size:20}},computed:c({},(0,a.mapState)(["hasLogin","loginMsg","wxlogin"])),onLoad:function(t){o=this,this.onRetry()},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){this.onRetry()},onReachBottom:function(){this.getdatalist()},onShareAppMessage:function(){},onShareTimeline:function(){if(o.loginMsg)return{title:"我是代言人，邀您领红包！",imageUrl:o.$store.state.loginMsg.avatarurl,query:"pid="+o.loginMsg.id}},methods:{onRetry:function(){this.page=1,this.gettuijain(),this.getdatalist()},gettuijain:function(){var n=this,e="/goodsBestRecomm",o={};i.default.P_get(e,o).then((function(e){if(n.btn_kg=0,console.log(e),1==e.code){var o=e.data;if("string"==typeof o&&(o=JSON.parse(o)),0==o.length)return n.page>1&&t.showToast({icon:"none",title:"暂无更多数据"}),void(n.btn_kg=0);n.data_tj=o,n.btn_kg=0}})).catch((function(e){n.btn_kg=0,console.log(e),t.showToast({icon:"none",title:"获取数据失败"})}))},getdatalist:function(){var n=this;if(1!=n.btn_kg){n.btn_kg=1;var e="/bestGoods",o={b:-1==n.dy_mon?"":1==n.dy_mon?"down":"up",sum:-1==n.dy_num?"":1==n.dy_num?"down":"up",p:-1==n.dy_pri?"":1==n.dy_pri?"down":"up",page:n.page,size:n.size};i.default.P_get(e,o).then((function(e){if(n.btn_kg=0,console.log(e),1==e.code){var o=e.data;if("string"==typeof o&&(o=JSON.parse(o)),0==o.length)return n.page>1&&t.showToast({icon:"none",title:"暂无更多数据"}),void(n.btn_kg=0);1==n.page?n.data_list=o:n.data_list=n.data_list.concat(o),n.btn_kg=0,n.page++}})).catch((function(e){n.btn_kg=0,console.log(e),t.showToast({icon:"none",title:"获取数据失败"})}))}},px_fuc:function(t){var n=this,e=t.currentTarget.dataset.type;0==e&&(n.dy_mon=0==n.dy_mon?1:0,n.dy_num=-1,n.dy_pri=-1),1==e&&(n.dy_mon=-1,n.dy_num=0==n.dy_num?1:0,n.dy_pri=-1),2==e&&(n.dy_mon=-1,n.dy_num=-1,n.dy_pri=0==n.dy_pri?1:0),n.onRetry()},jump:function(t){i.default.jump(t)}}};n.default=f}).call(this,e("543d")["default"])},"9b51":function(t,n,e){"use strict";e.r(n);var o=e("708f"),i=e("471b");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("4cf6");var r,u=e("f0c5"),c=e("a317"),s=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"a19e595a",null,!1,o["a"],r);"function"===typeof c["a"]&&Object(c["a"])(s),n["default"]=s.exports},a317:function(t,n,e){"use strict";var o=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};n["a"]=o}},[["12be","common/runtime","common/vendor"]]]);