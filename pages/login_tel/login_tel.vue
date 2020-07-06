<template>
	<view>
		<view class="container">

			<view class="header">
				<image src="/static/images/logo.png"></image>
			</view>
			<form class="w100" @submit="formSubmit">
				<view class="srkbox mb60">
					<text class="iconfont iconshouji cc2"></text>
					<input type="number" name="tel" @blur='oniptblur' placeholder="请输入手机号" />
					<view v-if="setstate==0" class="getcode" @tap="getcode">获取验证码</view>
					<view v-if="setstate==1" class="getcode">{{time}}s后重新获取</view>

				</view>

				<!-- <view class="srkbox mb60">
					<text class="iconfont iconsuo cc2"></text>
					<input wx:if="{{showpwd==1}}" type="password" name="pwd"
					 maxlength="18" placeholder="密码由6-18位字母或数字组成"
					 bindblur='oniptblurpwd' value="{{pwd}}"/>
					<input wx:if="{{showpwd==0}}" type="text" name="pwd" 
					maxlength="18" placeholder="密码由6-18位字母或数字组成"
					bindblur='oniptblurpwd' value="{{pwd}}"/>
					<text wx:if="{{showpwd==1}}" class="iconfont iconiconcloseeye cc2" data-type="0" bindtap="toggless"></text>
					<text wx:if="{{showpwd==0}}" class="iconfont iconyanjing cc2" data-type="1" bindtap="toggless"></text>
				</view> -->

				<view class="srkbox mb60">
					<text class="iconfont iconanquan cc2"></text>
					<input type="text" name="code" placeholder="验证码" />
				</view>

				<view class="tjbtn">
					登录
					<button class="definebtn" form-type="submit">提交</button>
				</view>
				<!-- <view class="denglu" bindtap="goback">返回登录</view> -->
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnkg: 0, //o ok    1off
				pwd: '',
				showpwd: 1,
				tel: '',
				yzm: '',
				setstate: 0,
				time: 60,
			}
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function() {

			},

			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function() {

			},

			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function() {

			},

			oniptblur(e) {
				console.log(e.detail.value)
				this.setData({
					tel: e.detail.value
				})
			},
			getcode() {
				let that = this

				if (that.data.tel == '' || !(/^1\d{10}$/.test(that.data.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.data.btnkg == 1) {
					return
				} else {
					that.setData({
						btnkg: 1
					})
				}
				wx.showToast({
					icon: 'none',
					title: '发送成功'
				})
				that.codetime()
				that.setData({
					btnkg: 0
				})
				return

				wx.request({
					url: app.IPurl + '/api/phoneCode',
					data: {
						// tokenstr:that.data.tokenstr,
						phone: that.data.tel
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					method: 'POST',
					success(res) {
						that.setData({
							btnkg: 0
						})
						if (res.data.code = 1) {
							wx.showToast({
								icon: 'none',
								title: '发送成功'
							})
							that.codetime()
						} else {
							that.setData({
								btnkg: 0
							})
							if (res.data.msg) {
								wx.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								wx.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}

						// console.log(res.data.code)
						// that.setData({
						// 	yzm:res.data.code.substr(0,4)
						// })
						// console.log(that.data.yzm)
						// that.codetime()
					},
					fail(err) {
						that.setData({
							btnkg: 0
						})
						wx.showToast({
							icon: 'none',
							title: '操作失败'
						})
						console.log(err)
					}
				})

			},
			codetime() {
				let that = this
				let time = 60
				let st = setInterval(function() {
					if (time == 0) {
						that.setData({
							setstate: 0,
						})
						clearInterval(st);
					} else {
						let news = time--;
						// console.log(news)
						that.setData({
							setstate: 1,
							time: news
						})

					}
				}, 1000);
			},
			//提交表单
			formSubmit(e) {
				// console.log(app.globalData.userInfo)
				// let uinfo=app.globalData.userInfo
				// console.log(uinfo.nickName)
				//  if (uinfo===null){
				//    wx.showToast({
				//      title: '您的授权已失效，请重新授权',
				//      duration: 2000,
				//      icon: 'none'
				//    });
				//    setTimeout(function(){
				//      wx.reLaunch({
				//        url: '/pages/shouquan/shouquan',
				//        fail: (err) => {
				//          console.log("失败: " + JSON.stringify(err));
				//        }
				//      })
				//    },500) 
				//    return
				//  }
				// console.log(uinfo.avatarUrl)
				let that = this
				console.log('form发生了submit事件，携带数据为：', e.detail.value)
				let formresult = e.detail.value

				if (!(/^1\d{10}$/.test(formresult.tel))) {
					wx.showToast({
						title: '手机号码有误',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				if (formresult.code == '') {
					wx.showToast({
						title: '验证码不能为空',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				// if (formresult.pwd.length<6) {
				// 	wx.showToast({
				// 		title: '密码长度不能小于6位',
				// 		duration: 2000,
				// 		icon:'none'
				// 	});
				// 	return false;
				// }

				// return
				if (that.data.btnkg == 1) {
					return
				} else {
					that.setData({
						btnkg: 1
					})
				}
				wx.showLoading({
					title: '正在登录中',
					mask: true
				})

				setTimeout(function() {
					wx.showToast({
						title: '登录成功',
						duration: 1000,
						icon: 'none'
					});
					that.setData({
						btnkg: 0
					})
					wx.reLaunch({
						url: '/pages/index/index'
					})
				}, 500);
				return
				wx.request({
					url: app.IPurl + '/api/loginBindUser',
					data: {
						token: wx.getStorageSync('token'),
						phone: formresult.tel,
						password: formresult.pwd,
						code: formresult.code
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					method: 'POST',
					success(res) {
						console.log(res.data)
						wx.hideLoading()
						if (res.data.code == 1) {
							wx.showToast({
								title: '注册成功',
								duration: 1000,
								icon: 'none'
							});
							setTimeout(function() {
								that.setData({
									btnkg: 0
								})
								wx.reLaunch({
									url: '/pages/index/index'
								})
							}, 500);

							wx.setStorageSync('login', 'login')

						} else {
							that.setData({
								btnkg: 0
							})
							if (res.data.msg) {
								wx.showToast({
									title: res.data.msg,
									duration: 2000,
									icon: 'none'
								});
							} else {
								wx.showToast({
									title: '网络异常',
									duration: 2000,
									icon: 'none'
								});
							}
						}
					},
					fail() {
						that.setData({
							btnkg: 0
						})
						wx.hideLoading()
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						});
					}
				})
			},
			goback() {
				wx.navigateBack()
			},
			toggless(e) {
				console.log(e.currentTarget.dataset.type)
				this.setData({
					showpwd: e.currentTarget.dataset.type
				})
			},
			oniptblurpwd(e) {
				console.log(e.detail.value)
				this.setData({
					pwd: e.detail.value
				})
			},
		}
	}
</script>

<style scoped>
	.container {
		padding: 0 28px;
	}

	.header {
		width: 100%;
		height: 300rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.header image {
		width: 250rpx;
		height: 180rpx;
	}

	.srkbox {
		width: 100%;
		line-height: 50rpx;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
	}

	.srkbox input {
		flex: 1;
		min-width: 0;
		padding-left: 15px;
		box-sizing: border-box;
		font-size: 28rpx;
	}

	.mb60 {
		margin-bottom: 60rpx;
	}

	.tjbtn {
		width: 560rpx;
		height: 80rpx;
		background: linear-gradient(0deg, rgba(252, 132, 26, 1), rgba(247, 183, 51, 1));
		border-radius: 40rpx;
		color: #fff;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		color: #fff;
		margin: 0 auto;
	}

	.tjbtn button {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
	}

	.denglu {
		margin-top: 30rpx;
		margin-left: 50rpx;
		font-size: 28rpx;
		color: #010101;
	}

	.getcode {
		font-size: 28rpx;
		color: #C5C5C5;
	}
</style>
