(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!***********************************************!*\
  !*** E:/phpStudy/WWW/41_51daiyan_uni/main.js ***!
  \***********************************************/
/*! no static exports found */function(t,e,o){"use strict";(function(t){o(/*! uni-pages */4);var e=s(o(/*! vue */2)),n=s(o(/*! ./App */5)),r=s(o(/*! ./commen/tim/tim.js */11)),a=s(o(/*! ./commen/commen.js */19)),u=s(o(/*! commen/event.js */14)),c=s(o(/*! tim-wx-sdk */12)),i=s(o(/*! ./store/index.js */9));function s(t){return t&&t.__esModule?t:{default:t}}function l(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function f(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?l(Object(o),!0).forEach((function(e){p(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):l(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function p(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}e.default.config.productionTip=!1,e.default.prototype.tim=r.default.tim,e.default.prototype.$TIM=c.default,e.default.prototype.$store=i.default,e.default.prototype.$commen=a.default,e.default.prototype.event=u.default,n.default.mpType="app";var d=new e.default(f({},n.default));t(d).$mount()}).call(this,o(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,
/*!***********************************************!*\
  !*** E:/phpStudy/WWW/41_51daiyan_uni/App.vue ***!
  \***********************************************/
/*! no static exports found */,function(t,e,o){"use strict";o.r(e);var n=o(/*! ./App.vue?vue&type=script&lang=js& */6);for(var r in n)"default"!==r&&function(t){o.d(e,t,(function(){return n[t]}))}(r);o(/*! ./App.vue?vue&type=style&index=0&lang=css& */16);var a,u,c,i,s=o(/*! ../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */18),l=Object(s["default"])(n["default"],a,u,!1,null,null,null,!1,c,i);l.options.__file="App.vue",e["default"]=l.exports},
/*!************************************************************************!*\
  !*** E:/phpStudy/WWW/41_51daiyan_uni/App.vue?vue&type=script&lang=js& ***!
  \************************************************************************/
/*! no static exports found */function(t,e,o){"use strict";o.r(e);var n=o(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/phpStudy/WWW/41_51daiyan_uni/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=u(o(/*! vue */2)),r=u(o(/*! ./service.js */8)),a=(u(o(/*! ./commen/tim/user */15)),o(/*! vuex */10));function u(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function i(t){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?c(Object(o),!0).forEach((function(e){s(t,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(o)):c(Object(o)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(o,e))}))}return t}function s(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var l={onLaunch:function(){var e=this;console.log("App Launch"),t.getSystemInfo({success:function(t){console.log(t.platform),n.default.prototype.StatusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();e?(n.default.prototype.Custom=e,n.default.prototype.CustomBar=e.bottom+e.top-t.statusBarHeight):n.default.prototype.CustomBar=t.statusBarHeight+50}}),t.getSetting({success:function(o){console.log(o),1==o.authSetting["scope.userInfo"]&&(console.log("已经授权"),t.getUserInfo({success:function(o){var n=o.userInfo;console.log(n),t.setStorageSync("userInfo",o.userInfo),n&&t.login({success:function(o){var a=n,u={code:o.code,nickname:a.nickName,avatarurl:a.avatarUrl};o.code;console.log(o.code),t.request({url:r.default.IPurl+"/login",data:u,header:{"content-type":"application/x-www-form-urlencoded"},dataType:"json",method:"POST",success:function(o){console.log(o.data),1==o.data.code?(console.log("登录成功"),console.log(o.data),e.login(o.data.data),console.log("loginMsg-----------------\x3e"),t.setStorageSync("token",o.data.data.userToken),t.setStorageSync("loginmsg",o.data.data),e.event.trigger({type:"test",page:"/pages/index/index",obj:{},test:{loginmsg:o.data.data},success:function(t){}})):(t.removeStorageSync("userInfo"),t.removeStorageSync("token"),o.data.msg?t.showToast({icon:"none",title:o.data.msg}):t.showToast({icon:"none",title:"登录失败"}))},fail:function(){t.showToast({icon:"none",title:"登录失败"})}})}})}}))}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},computed:i({},(0,a.mapState)(["hasLogin","loginMsg"])),mounted:function(){var t=this;this.tim.on(this.$TIM.EVENT.SDK_READY,this.onReadyStateUpdate,this),this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED,this.onReceiveMessage),this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED,(function(e){t.$store.commit("updateConversationList",e.data)}))},methods:i(i({},(0,a.mapMutations)(["login","logout"])),{},{onReadyStateUpdate:function(t){var e=t.name,o=e===this.$TIM.EVENT.SDK_READY;this.$store.commit("toggleIsSDKReady",o)},onReceiveMessage:function(t){var e=t.data;this.$store.commit("pushCurrentMessageList",e)}})};e.default=l}).call(this,o(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"])},,,,,,,,
/*!********************************************************************************!*\
  !*** E:/phpStudy/WWW/41_51daiyan_uni/App.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************/
/*! no static exports found */,function(t,e,o){"use strict";o.r(e);var n=o(/*! -!../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=css& */17),r=o.n(n);for(var a in n)"default"!==a&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=r.a},
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/phpStudy/WWW/41_51daiyan_uni/App.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(t,e,o){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map