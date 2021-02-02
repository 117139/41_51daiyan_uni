<template>
	<view class="container">
		<image class="login_bg" :src="filter.imgIP('/static_s/51daiyan/images/loginbg.png')"></image>
		<view class="login_wx">微信用户一键登录
			<button class='bottom' type='primary' open-type="getUserInfo" 
			lang="zh_CN" @getuserinfo="bindGetUserInfo">
			    授权登录</button>
		</view>
		<view class="dis_flex aic ju_c goback_btn" @tap="goback()">返回</view>
		<!-- <view  class="login_tel" @tap="jump" data-url="/pages/login_tel/login_tel">手机号码登陆/注册</view> -->
		<view class="login_tip" >登陆代表您已同意<text  @tap="jump" data-url="/pagesA/ysxy/ysxy?type=协议">51代言用户服务协议、隐私协议、</text><text @tap="jump" data-url="/pagesA/ysxy/ysxy?type=hz">共享经济合作伙伴协议</text></view>
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				canIUse: uni.canIUse('button.open-type.getUserInfo')
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {
			...mapMutations(['wxshouquan','login']),
			jump(e){
			  service.jump(e)
			},
			pveimg(e) {
			  service.pveimg(e)
			},
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
				// 停止下拉动作
				uni.stopPullDownRefresh();
			},
			
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function () {
			
			},
			
			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function () {
			
			},
			bindGetUserInfo: function(e) {
				var that =this
			  if (e.detail.userInfo) {
			    //用户按了允许授权按钮后需要处理的逻辑方法体
			    console.log(e.detail.userInfo)
					this.wxshouquan(e.detail.userInfo)
					uni.showLoading({
						title:'正在登录',
						mask:true
					})
					service.wxlogin(1)
					
			    uni.setStorageSync('userInfo', e.detail.userInfo)
			    
			  } else {
			    //用户按了拒绝按钮
			    uni.showModal({
			      title: '警告',
			      content: '您点击了拒绝授权，将无法登录小程序，请点击返回授权!!!',
			      showCancel: false,
			      confirmText: '返回授权',
			      success: function(res) {
			        if (res.confirm) {
			          console.log('用户点击了“返回授权”')
			        }
			      }
			    })
			  }
			},
			goback(){
			  uni.navigateBack()
			}
		}
	}
</script>

<style  scoped>
.login_bg{
	width: 649rpx;
	height: 353rpx;
	margin: 100rpx auto;
}
.login_wx{
	width:560rpx;
	height:80rpx;
	background:linear-gradient(0deg,rgba(252,132,26,1),rgba(247,183,51,1));
	border-radius:40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 30rpx;
	position: relative;
}
.login_tel{
	margin-top: 50rpx;
	text-align: center;
	font-size: 28rpx;
	color: #666;
}
.login_tip{
	position: fixed;
	bottom: 100rpx;
	text-align: center;
	font-size: 30rpx;
	color: #999;
}
.login_tip text{
	color: #F8AE2E;
	font-size: 28rpx;
}

.bottom {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity:0 ;
	width: 100%;
}
	.goback_btn{
		width: 690upx;
		height: 95upx;
		margin: 30px auto;
		background: #fff;
		border-radius: 95upx;
		border: 1px solid #eee;
	}
</style>
