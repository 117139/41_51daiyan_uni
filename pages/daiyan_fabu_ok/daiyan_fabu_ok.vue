<template>
	<view>
		<view class="container">
		  <image class="ok_bg" :src="filter.imgIP('fabu_ok.jpg')"></image>
		  <view class="okcz">
		    <view class="btn1">保存图片并分享</view>
		    <view class="btn2" @tap="goindex">回到首页</view>
		  </view>
		</view>
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
				
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		
		},
		
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {
		
		},
		
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
		
		},
		
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function () {
		
		},
		
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
		
		},
		
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
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
		methods: {
			goindex(){
			  wx.reLaunch({
			    url: '/pages/index/index',
			  })
			}
		}
	}
</script>

<style scoped>
.ok_bg{
  width: 100%;
  height: 798rpx;
}
.okcz{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around 
}
.okcz view{
  width:320rpx;
  height:77rpx;
  border:1rpx solid rgba(247,172,57,1);
  border-radius:39rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color: #F7AC39;
}
.okcz .btn1{
  background: #F7AC39;
  color: #fff;
}
</style>
