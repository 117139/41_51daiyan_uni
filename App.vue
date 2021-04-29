<script>
	import Vue from 'vue'
	import service from './service.js';
	import userlist from './commen/tim/user'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			var that =this
			console.log('App Launch')
			service.get_info()
			return
			// #ifdef MP-WEIXIN
			// 获取用户信息
			service.wxlogin()
			// #endif
			// #ifdef H5
				
				service.get_info()
			// #endif
			uni.getSystemInfo({
				success: function(e) {
					console.log(e.platform);
					// that.setplatform(e.platform)
					// #ifndef MP
					console.log(e.statusBarHeight)
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = wx.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
				
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		mounted() {
			/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
			 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
			 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
			 * */
			// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
			this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
			// 收到新消息
			this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
			// 会话列表更新
			this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
				this.$store.commit("updateConversationList", event.data);
			});
			// 注册 COS SDK 插件
			// this.tim.registerPlugin({'cos-wx-sdk': this.COS});
		},
		methods: {
			...mapMutations(['login','logout']),
			onReadyStateUpdate({name}) {
				const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
				//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
				this.$store.commit("toggleIsSDKReady", isSDKReady);
                //sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
			},
			
			onReceiveMessage({data: messageList}) {
				// this.handleAt(messageList);
				this.$store.commit("pushCurrentMessageList", messageList);
			},
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
			
		},
		

	}
</script>

<style>
	/*每个页面公共css */
	/* @import 'vendor/wxParse/wxParse.wxss'; */
	@import './static/css/flex.wxss';
	@import './static/css/iconfont.css';
	@import './static/css/public.css';
	
	.sousuobtn{
	  width: 30rpx;
	  height: 30rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  margin-right: 15rpx;
		position: relative;
	}
	.iconsousuo{
		font-size: 28rpx;
		color: #bbb;
		
	}
	.sousuobtn button{
		width: 30rpx;
	  height: 30rpx;
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
	.search_int{
		font-family: PingFang-SC-Medium;
		font-size: 28rpx;
		/* color: #8e8e8e; */
	}
	.hidden{
		display: none;
	}
	.zanwu{
		width: 100%;
		line-height: 240rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999;
	}
	.cD13838{
	  color: #D13838;
	}
	.hx30{
		width: 100%;
		height: 30rpx;
		background: #F6F6F6;
	}
	.tab_tit{
		width: 100%;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 34rpx;
		color: #222;
		font-weight: bold;
	}
	.xq_msg{
		width: 100%;
		/* padding: 0 30rpx 30rpx; */
		padding: 30rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	  word-wrap:break-word;
	  word-break:break-all;
	}
	.pl_pf .iconfont{
		color: #D13838;
		font-size: 40rpx;
	}
	.pl_pf .iconwujiaoxingxingxing{
		color: #666;
	}
	
	
	
	
	
	/**/
	/***/
	.popopBox{
		width: 100%;
		padding: 20rpx 28rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-bottom: 150rpx;
		height: auto;
	}
	.popopBox1{
		width: 100%;
		display: flex;
	}
	.goodsimg{
		margin-top: 16rpx;
		width: 246rpx;
		height: 246rpx;
		border:1rpx solid #d2d2d2;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 30rpx;
	}
	.goodstkjg{
		flex: 1;
		position: relative;
	}
	.closebtn{
		width: 37rpx;
		height: 37rpx;
		border-radius: 50%;
		border: 1px solid #dddddd;
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tkpri{
		font-size: 34rpx;
		color: #f75852;
		margin: 80rpx 0 25rpx;
	}
	.tkname{
		display:-webkit-box !important;
		overflow:hidden;
		text-overflow:ellipsis;
		word-break:break-all;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		line-height: 45rpx;
		font-size: 24rpx;
		color: #333;
	}
	.tkguigetit{
		font-size: 26rpx;
		color: #333;
		padding: 20rpx 0 20rpx;
	}
	.guigeBox{
		display: felx;
		align-items: center;
	}
	.guigeOne{
		/* width: 114rpx; */
		height: 50rpx;
		padding: 0 10rpx;
		border-radius: 8rpx;
		border: 1px solid #ddd;
		font-size: 26rpx;
		color: #333;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-right: 10rpx;
	  margin-bottom: 10rpx;
	}
	.guigeOne.cur{
		border: 1px solid #f75852;
		color: #f75852;
	}
	.countnum{
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #333;
		margin-top: 20rpx;
	  padding-bottom:60rpx; 
	}
	.czbtnG{
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
	}
	.czbtnG .jrgwc,.czbtnG .buybtn{
		width: 375rpx;
	}
	.shuxian{
		width: 1px;
		height: 90rpx;
		margin: 0 15rpx;
		background-color: #eeeeee;
	}
	.contbox{
		width: 100%;
		padding: 10rpx 28rpx;
		box-sizing: border-box;
	  background-color:#fff;
	}
	
	
	
	.tcc{
		width: 80vw;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.hiddenbox{
		width: 0;
		height: 0;
		overflow: hidden;
		opacity: 0;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: -1;
	}
	
	.htoi{
		position: relative;
		width:750px;height:1206px;
		/* box-shadow:4rpx 4rpx 8rpx rgba(0,0,0,0.5); */
		/* margin-top: 20px; */
		/* transform:scale(.5); */
		opacity: 0;
		z-index: -1;
	}
	.showimg{
		width: 375rpx;
		height: 603rpx;
		margin-top: 20px;
		background-color: #eee;
	}
	.saveimg{
		width: 300rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #f75852;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		margin-top: 40rpx;
		margin-bottom: 20px;
	  position: relative;
	}
	action-sheet-item{
		padding: 0!important;
		position: relative;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	action-sheet-item button {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff!important;
		opacity: 0;
	}
	.guige{
		position: relative;
	}
	
	
	/*步进器*/
	.steppera{
		width: 148rpx;
		height: 45rpx;
		border: 1px solid #dcdcdc;
		display: flex;
		overflow: hidden;
		align-items: stretch;
	}
	.steppera .vanipt{
		width: 60rpx;
	  max-height: 100%;
	  min-height: 100%;
		padding: 0;
	  height: 40rpx;
		line-height: 40rpx;
		border-left: 1px solid #dcdcdc;
		border-right: 1px solid #dcdcdc;
		border-bottom: 0;
		border-top: 0;
		box-sizing: border-box;
		background-color: #fff;
		margin: 0;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.steppera .vantjia,.steppera .vantjian{
		width: 45rpx;
		height: 43rpx;
		background-color: #fff;
		margin: 0;
		text-align: center;
		display: flex;
		align-items: center;
		font-size: 40rpx;
		line-height: 40rpx;
		justify-content: center;
	}
	.data_last{
		line-height: 100rpx;
		text-align: center;
		width: 100%;
		font-size: 24rpx;
		color: #666;
	}
	.xcxdy_zy_icon{
		padding: 2upx 5upx;
		background: #ff0000;
		border-radius: 4upx;
		font-size: 20upx;
		line-height: 22upx;
		height: 26upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		color: #fff;
		display: flex;
		align-items: center;
		margin-right: 8upx;
	}
	.loading_def{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}
	.loading_def_img{
		width: 200rpx!important;
		height: 200rpx!important
	}
	
	
	
	
	.star_v {
		width: 35rpx;
		height: 35rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0 8upx;
	}
	.star_v1{
		position: absolute;
		bottom: 0;
		right: 0;
	}
	
	.star_v image{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 20;
	}
	.star_v .iconv{
		font-size: 25upx;
		color: #fff;
		position: relative;
		z-index: 21;
	}
	.star_v .user_v_lv{
		font-size: 12upx;
		color: #fff;
		margin-left: -10upx;
		margin-top: 4upx;
		position: relative;
		z-index: 21;
	}
</style>
