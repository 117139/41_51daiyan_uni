(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/my_setBeizhu/my_setBeizhu"],{2316:function(e,t,n){"use strict";var o=function(e){e.options.wxsCallMethods||(e.options.wxsCallMethods=[])};t["a"]=o},4150:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n("b704")),r=n("2f62");function u(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s={data:function(){return{o_id:"",uname:"",sname:""}},computed:i({},(0,r.mapState)(["hasLogin","loginMsg"])),onLoad:function(e){this.o_id=e.id,this.uname=e.name},methods:{onPullDownRefresh:function(){wx.stopPullDownRefresh()},onReachBottom:function(){},onShareAppMessage:function(){},reset_val:function(){this.uname=""},get_val:function(e){console.log(e.detail),this.sname=e.detail.value},save_val:function(){var t=this,n={token:t.loginMsg.userToken,remark:t.uname,user_id:t.o_id},r="/attention/setRemark";o.default.P_post(r,n).then((function(n){console.log(n),t.btnkg=0,-1!=n.code&&(0!=n.code||"请先登录账号~"!=n.msg)?1==n.code&&(e.showToast({icon:"none",title:"操作成功"}),setTimeout((function(){wx.navigateBack()}),1e3)):e.navigateTo({url:"/pagesA/login/login"})})).catch((function(n){t.btnkg=0,console.log(n),e.showToast({icon:"none",title:"操作失败"})})),console.log(t.uname)}}};t.default=s}).call(this,n("543d")["default"])},4211:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var r=function(){var e=this,t=e.$createElement;e._self._c},u=[]},5100:function(e,t,n){"use strict";(function(e){n("72bd");o(n("66fd"));var t=o(n("616f"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"616f":function(e,t,n){"use strict";n.r(t);var o=n("4211"),r=n("8fde");for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n("b090");var a,i=n("f0c5"),c=n("2316"),s=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,"0ee30710",null,!1,o["a"],a);"function"===typeof c["a"]&&Object(c["a"])(s),t["default"]=s.exports},"8fde":function(e,t,n){"use strict";n.r(t);var o=n("4150"),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},b090:function(e,t,n){"use strict";var o=n("f0da"),r=n.n(o);r.a},f0da:function(e,t,n){}},[["5100","common/runtime","common/vendor"]]]);