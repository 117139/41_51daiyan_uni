(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/OrderDetails_sh/OrderDetails_sh"],{2124:function(t,e,o){"use strict";(function(t){o("72bd");n(o("66fd"));var e=n(o("f919"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("543d")["createPage"])},"2cc3":function(t,e,o){"use strict";var n=function(t){t.options.wxsCallMethods||(t.options.wxsCallMethods=[])};e["a"]=n},"407f":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=i(o("b704")),a=o("2f62");function i(t){return t&&t.__esModule?t:{default:t}}function r(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function s(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?r(Object(o),!0).forEach((function(e){c(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function c(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var l={data:function(){return{id:"",htmlReset:0,h_type:"",btnkg:0,htmlkg:0,datas:""}},computed:s({},(0,a.mapState)(["hasLogin","loginMsg","wxlogin"])),onLoad:function(e){var o=this;e.id&&(t.showLoading({title:"正在加载中"}),o.id=e.id,o.h_type=e.type,o.getdata())},onShow:function(){var t=this;1==t.btnkg&&(t.btnkg=0);var e=getCurrentPages(),o=e[e.length-1];if(o.data.sh_wl){t.getdata(),o.setData({sh_wl:!1});var n=e[e.length-2];n.setData({sh_wl:!0})}},onPullDownRefresh:function(){this.getdata()},methods:s(s({},(0,a.mapMutations)(["dy_fb_fuc"])),{},{order_pay:function(e){var o=this,a="/order/goPay",i={token:o.loginMsg.userToken,ids:e};1!=o.btnkg&&(o.btnkg=1,n.default.P_post(a,i).then((function(e){if(o.btnkg=0,console.log(e),1==e.code){var a=e.data;console.log(typeof a),"string"==typeof a&&(a=JSON.parse(a)),console.log(e),n.default.wxpay(e.data,"fwb").then((function(e){t.showToast({icon:"none",title:"支付成功"}),setTimeout((function(){o.onRetry()}),1e3)})).catch((function(e){o.btnkg=0,t.showToast({icon:"none",title:"微信支付失败"})}))}else e.msg?t.showToast({icon:"none",title:e.msg}):t.showToast({icon:"none",title:"操作失败"})})).catch((function(e){o.btnkg=0,console.log(e),t.showToast({icon:"none",title:"操作失败"})})))},jump:function(t){n.default.jump(t)},getnum:function(t){var e=this;if(0!=e.datas.order_goods.length){for(var o=e.datas.order_goods,n=0,a=0;a<o.length;a++)n+=1*o[a].number;return n}},jump_fabu:function(e){var o=this;if(e){var n=[];n.push(e),o.dy_fb_fuc(n)}else{if(0==o.goods_sele.length)return void t.showToast({icon:"none",title:"请先选择商品"});console.log(o.goods_sele),o.dy_fb_fuc(o.goods_sele)}wx.navigateTo({url:"/pagesA/daiyan_fabu/daiyan_fabu"})},cload:function(){this.getdata()},getdata:function(){var e=this,o={token:e.loginMsg.userToken,id:e.id};n.default.P_get("/afterSale/details",o).then((function(t){console.log(t),1==t.code?(e.htmlReset=0,e.datas=t.data):e.htmlReset=1})).catch((function(o){e.htmlReset=1,console.log(o),t.showToast({icon:"none",title:"获取数据失败"})}))},del_order:function(e){var o=this;t.showModal({title:"提示",content:"是否取消该订单",success:function(a){if(a.confirm){console.log("用户点击确定");var i="/order/cancel",r={token:o.loginMsg.userToken,id:e};n.default.post(i,r,(function(e){if(1==e.data.code){var n=e.data.data;o.htmlReset=0,"string"==typeof n&&(n=JSON.parse(n)),t.showToast({icon:"none",title:"操作成功"}),o.onRetry()}else o.htmlReset=1,e.data.msg?t.showToast({icon:"none",title:e.data.msg}):t.showToast({icon:"none",title:"操作失败"})}),(function(e){o.htmlReset=1,o.btnkg=0,t.showToast({icon:"none",title:"操作失败"})}))}else a.cancel&&console.log("用户点击取消")}})},get_goods:function(e){var o=this,a="/order/confirmReceipt",i={token:o.loginMsg.userToken,id:e};1!=o.btnkg&&(o.btnkg=1,n.default.post(a,i,(function(e){if(o.btnkg=0,1==e.data.code){var n=e.data.data;o.htmlReset=0,"string"==typeof n&&(n=JSON.parse(n)),t.showToast({icon:"none",title:"操作成功"}),o.onRetry()}else o.htmlReset=1,e.data.msg?t.showToast({icon:"none",title:e.data.msg}):t.showToast({icon:"none",title:"操作失败"})}),(function(e){o.htmlReset=1,o.btnkg=0,t.showToast({icon:"none",title:"操作失败"})})))},bindPickerChange:function(t){console.log("picker发送选择改变，携带值为",t.detail.value),this.show0=t.detail.value},bchange1:function(t){console.log("picker发送选择改变，携带值为",t.detail.value),this.show1=t.detail.value},bchange2:function(t){console.log("picker发送选择改变，携带值为",t.detail.value),this.show2=t.detail.value},cancelOrder:function(t){var e=this,o=t.currentTarget.dataset.oid;wx.showModal({title:"提示",content:"是否取消该订单?",success:function(t){t.confirm?(console.log("用户点击确定"),wx.request({url:app.IPurl+"/api/order",data:{status:-1,order_id:o,token:wx.getStorageSync("token")},header:{"content-type":"application/x-www-form-urlencoded"},dataType:"json",method:"PUT",success:function(t){-2==t.data.error&&(app.checktoken(t.data.error),e.onLoad()),1==t.data.code?(wx.showToast({title:"删除成功",duration:1e3}),setTimeout((function(){wx.navigateBack()}),1e3)):wx.showToast({title:"操作失败",duration:1e3})},fail:function(){wx.showToast({title:"操作失败",duration:1e3})}})):t.cancel&&console.log("用户点击取消")}})},gopinlun:function(e){t.navigateTo({url:"/pages/fabiaopl/fabiaopl?oid="+e.currentTarget.dataset.oid})},shouhuoBtn:function(t){var e=this,o=t.currentTarget.dataset.oid;wx.showModal({title:"提示",content:"是否确认收货?",success:function(t){if(t.confirm){if(console.log("用户点击确定"),1==e.btnkg)return;e.btnkg=1,wx.request({url:app.IPurl+"/api/order",data:{status:1,order_id:o,token:wx.getStorageSync("token")},header:{"content-type":"application/x-www-form-urlencoded"},dataType:"json",method:"PUT",success:function(t){e.btnkg=0,console.log(t.data),1==t.data.code?(wx.showToast({title:"收货成功",duration:1e3}),setTimeout((function(){wx.navigateBack()}),1e3)):t.data.msg?wx.showToast({title:t.data.msg,duration:2e3,icon:"none"}):wx.showToast({title:"网络异常",duration:2e3,icon:"none"})},fail:function(){e.btnkg=0,wx.showToast({title:"操作失败",duration:1e3})}})}else t.cancel&&console.log("用户点击取消")}})},getOrderList:function(t){var e=this;wx.request({url:app.IPurl+"/api/order/1",data:{order_id:t,token:wx.getStorageSync("token")},header:{"content-type":"application/x-www-form-urlencoded"},dataType:"json",method:"get",success:function(t){if(1==t.data.code){var o=t.data;console.log(t.data),e.Odata=o.data,e.htmlReset=0,wx.setNavigationBarTitle({title:"订单详情"})}else wx.showToast({icon:"none",title:"获取失败"}),console.log(t.data),e.htmlReset=1},fail:function(t){wx.showToast({icon:"none",title:"获取失败"}),e.htmlReset=1,console.log(t)}})},ladderpri:function(t,e){var o,n,a=this,i=a.goods.list[t].havenum,r=a.goods.list[t].pricelist,s=a.goods.list[t].order_product.goods_count;e&&(s=e);var c=0,l=[];for(var d in r){var u=r[d].lower_num,f=r[d].upper_num,g=r[d].price,h=r[d].limit_num-r[d].saled_num;if(u-1<=i&&i<f){var p=void 0;if(p=f-i,h<p&&(p=h),0==p)continue;if(s<=p){var w={numladd:u+"-"+f,jtnum:s,priladd:g,jtTotal:100*g*s/100};l.push(w);break}o=s-p;var m={numladd:u+"-"+f,jtnum:p,priladd:g,jtTotal:100*g*p/100};l.push(m)}if(i<u){if(n=f-u+1,h<n&&(n=h),0==n)continue;if(o<=n){var v={numladd:u+"-"+f,jtnum:o,priladd:g,jtTotal:100*g*o/100};l.push(v);break}o-=n;var b={numladd:u+"-"+f,jtnum:n,priladd:g,jtTotal:100*g*n/100};l.push(b)}}var k={laddermsg:l,Totalpri:c};return console.log(k),k},opengoods:function(t){var e=t.currentTarget.dataset.id;app.opengoods(e)},ewm:function(t){qrcode=new QRCode("canvas",{usingIn:this,text:t,width:qrcodeWidth,height:qrcodeWidth,colorDark:"#000",colorLight:"white",correctLevel:QRCode.CorrectLevel.H})},pay:function(){var t=this;if(1!=t.btnkg){t.btnkg=1;t=this;n.default.Pay(t.order_id,"info")}},onRetry:function(){this.onLoad()}})};e.default=l}).call(this,o("543d")["default"])},"6daf":function(t,e,o){},b492:function(t,e,o){"use strict";var n=o("6daf"),a=o.n(n);a.a},c68c:function(t,e,o){"use strict";o.r(e);var n=o("407f"),a=o.n(n);for(var i in n)"default"!==i&&function(t){o.d(e,t,(function(){return n[t]}))}(i);e["default"]=a.a},e2e6:function(t,e,o){"use strict";var n;o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement;t._self._c},i=[]},f919:function(t,e,o){"use strict";o.r(e);var n=o("e2e6"),a=o("c68c");for(var i in a)"default"!==i&&function(t){o.d(e,t,(function(){return a[t]}))}(i);o("b492");var r,s=o("f0c5"),c=o("2cc3"),l=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"1ee3f6fa",null,!1,n["a"],r);"function"===typeof c["a"]&&Object(c["a"])(l),e["default"]=l.exports}},[["2124","common/runtime","common/vendor"]]]);