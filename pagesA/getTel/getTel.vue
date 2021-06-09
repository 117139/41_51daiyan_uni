<template>
	<view class="container">
		<image class="login_bg" :src="filter.imgIP('/static_s/51daiyan/images/loginbg.png')"></image>
		<view class="login_wx">一键获取手机号
			<button class='bottom' type='primary' open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">
			    获取手机号</button>
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
			onGetPhoneNumber(e){  
				var that =this
					if(e.detail.errMsg=="getPhoneNumber:fail user deny"){       //用户决绝授权  
	
							//拒绝授权后弹出一些提示  
							//用户按了拒绝按钮
							/*uni.showModal({
								title: '警告',
								content: '您点击了拒绝授权获取手机号，将无法登录小程序，请点击返回授权!!!',
								showCancel: false,
								confirmText: '返回授权',
								success: function(res) {
									if (res.confirm) {
										console.log('用户点击了“返回授权”')
									}
								}
							})*/
					}else{      //允许授权  
							console.log(e.detail.encryptedData)  
							//e.detail.encryptedData      //加密的用户信息  
							//e.detail.iv     //加密算法的初始向量  时要用到  
							 wx.login({  
									success: (res) => {  
											if (res.code) {         //微信登录成功 已拿到code  
													// ...doSomething  
													
													var token=uni.getStorageSync('token')
													var data = {
														encryptedData:e.detail.encryptedData,
														iv:e.detail.iv,
														code:res.code,
														token:token,
														type:2
													}
													//selectSaraylDetailByUserCard
													var jkurl = '/user/decodePhone'
													 service.post(jkurl, data,
													 	function(res) {
													 		
													 		// if (res.data.code == 1) {
													 		if (res.data.code == 1) {
													 			var datas = res.data.data
													 			console.log(typeof datas)
													 			
													 			if (typeof datas == 'string') {
													 				datas = JSON.parse(datas)
													 			}
													 			uni.showToast({
													 				icon: 'none',
													 				title: '绑定成功'
													 			})
																setTimeout(()=>{
																	uni.showLoading({
																		title:'正在登录',
																		mask:true
																	})
																	service.wxlogin(1)
																},100)
													 			
													 			
													 			
													 
													 		} else {
													 			that.btnkg=0
													 			if (res.data.msg) {
													 				uni.showToast({
													 					icon: 'none',
													 					title: res.data.msg
													 				})
													 			} else {
													 				uni.showToast({
													 					icon: 'none',
													 					title: '操作失败'
													 				})
													 			}
													 		}
													 },
													 	function(err) {
													 		that.btnkg=0
													 		
													 			uni.showToast({
													 				icon: 'none',
													 				title: '获取数据失败'
													 			})
													 	
													 	}
													 )  
											} else {  
													console.log('登录失败！' + res.errMsg)  
											}  
									}  
							})  
					}  
			},
			bindGetUserInfo: function(e) {
				var that =this
			  if (e.detail.userInfo) {
			    //用户按了允许授权按钮后需要处理的逻辑方法体
			    console.log(e.detail.userInfo)
					this.wxshouquan(e.detail.userInfo)
					service.wxlogin(1)
					/*uni.login({
					  success: function (res) {
					    // 发送 res.code 到后台换取 openId, sessionKey, unionId
					    var uinfo = e.detail.userInfo
					    let data = {
					      code: res.code,
					      nickname: uinfo.nickName,
					      avatarurl: uinfo.avatarUrl
					    }
					    let rcode = res.code
					    console.log(res.code)
					    uni.request({
					      url: service.IPurl+'/login',
					      data: data,
					      header: {
					        'content-type': 'application/x-www-form-urlencoded'
					      },
					      dataType: 'json',
					      method: 'POST',
					      success(res) {
					        console.log(res.data)
					        if (res.data.code == 1) {
					          console.log('登录成功')
					          console.log(res.data)
										that.login(res.data.data)
										// console.lo('loginMsg----------------->')
										// console.lo(that.loginMsg)
										return
					          uni.setStorageSync('token', res.data.data.userToken)
					          uni.setStorageSync('loginmsg', res.data.data)
										
					        } else {
					          uni.removeStorageSync('userInfo')
					          uni.removeStorageSync('token')
					          if(res.data.msg){
											uni.showToast({
											  icon: 'none',
											  title: res.data.msg,
											})
										}else{
											uni.showToast({
											  icon: 'none',
											  title: '登录失败',
											})
										}
					        }
						
					      },
					      fail() {
					        uni.showToast({
					          icon: 'none',
					          title: '登录失败'
					        })
					      }
					    })
					  }
					})*/
					
					// uni.redirectTo({
					// 	url: '/pages/login_index/login_index'
					// })
			    // app.globalData.userInfo = e.detail.userInfo
			    uni.setStorageSync('userInfo', e.detail.userInfo)
					// uni.setStorageSync('userWxmsg', e.detail.userInfo)
			    // app.dologin('shouquan')
			    
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
