(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/Order_wuliu/Order_wuliu"],{"0c51":function(t,e,n){"use strict";var a=n("8e6c"),r=n.n(a);r.a},"8c9f":function(t,e,n){"use strict";n.r(e);var a=n("cb71"),r=n("aa9d");for(var i in r)"default"!==i&&function(t){n.d(e,t,(function(){return r[t]}))}(i);n("0c51");var o,u=n("f0c5"),c=n("c498"),s=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,"a1fa3868",null,!1,a["a"],o);"function"===typeof c["a"]&&Object(c["a"])(s),e["default"]=s.exports},"8e6c":function(t,e,n){},9553:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,r=o(n("b704")),i=n("2f62");function o(t){return t&&t.__esModule?t:{default:t}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){s(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l={data:function(){return{id:"",wl_data:"",wl_data1:{logistics:"4311701734931",logistics_name:"韵达快递",wuliu:[{time:"2021-01-12 20:28:49",status:"【临汾市】您的快件已被 赵城派出所对面 代签收，地址：赵城镇永安大街64号，如有疑问请电联快递员：续美荣【18835725582】。"},{time:"2021-01-12 18:53:54",status:"【临汾市】山西洪洞县公司赵城镇分部 快递员 续美荣18835725582 正在为您派件【95114/95121/95013/95546为韵达快递员外呼专属号码，请放心接听】"},{time:"2021-01-12 16:51:16",status:"【临汾市】已离开 山西洪洞县公司；发往 山西洪洞县公司赵城镇分部"},{time:"2021-01-12 14:36:36",status:"【临汾市】已到达 山西洪洞县公司"},{time:"2021-01-12 07:40:45",status:"【太原市】已离开 山西太原分拨中心；发往 山西洪洞县公司"},{time:"2021-01-12 07:27:46",status:"【太原市】已到达 山西太原分拨中心"},{time:"2021-01-11 02:22:47",status:"【嘉兴市】已离开 浙江杭州分拨中心；发往 山西太原分拨中心"},{time:"2021-01-11 02:19:16",status:"【嘉兴市】已到达 浙江杭州分拨中心"},{time:"2021-01-10 23:29:41",status:"【嘉兴市】已离开 浙江嘉兴分拨中心；发往 浙江杭州分拨中心"},{time:"2021-01-10 23:25:07",status:"【嘉兴市】已到达 浙江嘉兴分拨中心"},{time:"2021-01-10 21:51:01",status:"【嘉兴市】已离开 浙江桐乡市公司；发往 山西太原分拨中心"},{time:"2021-01-10 21:44:42",status:"【嘉兴市】浙江桐乡市公司 已揽收"}]}}},onLoad:function(t){a=this,a.id=t.id,a.getMsg()},computed:c({},(0,i.mapState)(["hasLogin","loginMsg","wxlogin"])),methods:{gettime:function(t,e){if(t){var n=new Date(t),a=(n.getFullYear(),n.getMonth()+1),r=n.getDate(),i=n.getHours(),o=n.getMinutes();return o<10&&(o="0"+o),1==e?a+"-"+r:i+":"+o}},getimg:function(t){return r.default.getimg(t)},getMsg:function(){var e="/order/lookLogistics",n={token:a.loginMsg.userToken,oid:a.id};a.data_last||r.default.P_get(e,n).then((function(t){if(console.log(t),1==t.code){var e=t.data;"string"==typeof e&&(e=JSON.parse(e)),a.wl_data=e}})).catch((function(e){console.log(e),t.showToast({icon:"none",title:"获取数据失败"})}))}}};e.default=l}).call(this,n("543d")["default"])},a24d:function(t,e,n){"use strict";(function(t){n("72bd");a(n("66fd"));var e=a(n("8c9f"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},aa9d:function(t,e,n){"use strict";n.r(e);var a=n("9553"),r=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=r.a},c498:function(t,e,n){"use strict";var a=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=a},cb71:function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.wl_data&&0!=t.wl_data.wuliu.length?t.__map(t.wl_data.wuliu,(function(e,n){var a=t.__get_orig(e),r=t.gettime(e.time,1),i=t.gettime(e.time,2);return{$orig:a,m0:r,m1:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[]}},[["a24d","common/runtime","common/vendor"]]]);