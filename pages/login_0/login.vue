<template>
	<view>
		<view class='login' v-if="canIUse">
		    <view class='header'>
		        <image src='/static/images/logo.jpg'></image>
		    </view>
		    <view>51代言</view>
		    <view class='content'>
		        <view>申请获取以下权限</view>
		        <text class='huqu'>获得你的公开信息(昵称，头像等)</text>
		    </view>
		 
		    <button class='bottom' type='primary' open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">
		        授权登录<!--由于微信官方修改了 getUserInfo 接口，所以现在无法实现一进入微信小程序就弹出授权窗口，只能通过 button 去触发,并且button里必须要加open-type="getUserInfo"才能弹出授权窗口-->   </button>
		    <view class='goback' @tap="goback">暂不授权</view>
		</view>
		 
		<view v-else>请升级微信版本</view>
	</view>
</template>

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
		methods: {
			...mapMutations(['wxshouquan']),
			/**
			* 页面上拉触底事件的处理函数
			*/
			onReachBottom: function () {
			  // 停止下拉动作
			  uni.stopPullDownRefresh();
			},
			bindGetUserInfo: function(e) {
			  if (e.detail.userInfo) {
			    //用户按了允许授权按钮后需要处理的逻辑方法体
			    console.log(e.detail.userInfo)
					this.wxshouquan(e.detail.userInfo)
					console.log('/pages/login_index/login_index')
					uni.redirectTo({
						url: '/pages/login_index/login_index'
					})
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

<style scoped>
	.login {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 100rpx 80rpx;
	}
	.header{
	  width: 150rpx;
	  height: 150rpx;
	}
	.header image{
		width: 150rpx;
		height: 150rpx;
	}
	.content{
	  margin-top: 80rpx;
	  padding: 40rpx 0;
	  width: 100%;
	  border-top: 1px solid #ddd;
	  font-size: 30rpx;
	}
	.huqu{
	  font-size: 26rpx;
	  color: #999;
	}
	.bottom {
	  margin-top: 30rpx;
	  width: 100%;
	}
	.goback{
	  margin-top:30rpx;
	  width:100%;
	  height: 80rpx;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  border-radius: 12rpx;
	  border: 1px solid #ddd;
	  background: #f4f4f4;
	}
</style>
