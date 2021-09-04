<template>
	<view class="container">
		<image class="login_bg" :src="filter.imgIP('/static_s/51daiyan/images/loginbg.png')"></image>
		<view class="login_wx">微信用户一键登录
			<button  v-if="canIUseGetUserProfile" class='bottom' type='primary' open-type="getUserInfo"
				lang="zh_CN" @tap="getuserprofile">
			    授权登录</button>
			<button v-else class='bottom' type='primary' open-type="getUserInfo" 
			lang="zh_CN" @getuserinfo="bindGetUserInfo">
			    授权登录</button>
		</view>
		<view class="dis_flex aic ju_c goback_btn" @tap="goback()">返回</view>
		<!-- <view  class="login_tel" @tap="jump" data-url="/pagesA/login_tel/login_tel">手机号码登陆/注册</view> -->
		<view class="login_tip" >登陆代表您已同意<text  @tap="jump" data-url="/pagesA/ysxy/ysxy?type=yhxy">51代言用户服务协议</text><text  @tap="jump" data-url="/pagesA/ysxy/ysxy?type=协议">、隐私协议、</text><text @tap="jump" data-url="/pagesA/ysxy/ysxy?type=hz">共享经济合作伙伴协议</text></view>
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
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				canIUseGetUserProfile: false
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		onLoad() {
			if (wx.getUserProfile) {
			      this.canIUseGetUserProfile= true
			    }
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
			getuserprofile(e){
				wx.getUserProfile({
					desc:'正在获取',//不写不弹提示框
					success:function(res){
							uni.setStorageSync('userInfo',res.userInfo)
							service.wxlogin(1)
						 console.log('获取成功: ',res)
					},
					fail:function(err){
						 console.log("获取失败: ",err)
					}
				})
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
			    uni.setStorageSync('userInfo', e.detail.userInfo)
					service.wxlogin(1)
					
			    
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
	width: 100%;
	padding: 0 30upx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
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
		width:560rpx;
		height:80rpx;
		margin: 30px auto;
		background: #fff;
		border-radius: 95upx;
		border: 1px solid #eee;
	}
</style>
