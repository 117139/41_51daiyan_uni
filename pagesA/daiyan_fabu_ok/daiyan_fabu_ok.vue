<template>
	<view>
		<view class="container">
		  <image class="ok_bg" :src="filter.imgIP('/static_s/51daiyan/images/fabu_ok.jpg')"></image>
		  <view class="okcz">
		    <!-- <view class="btn1" v-if="type==2" @tap='share'>保存海报图片并分享</view> -->
		    <view class="btn1" v-if="type==3" @tap='share'>保存海报图片</view>
		    <!-- <button class="btn1" v-if="type==2" open-type=''>保存海报图片</button> -->
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
				type:'',
				path:'',
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
			if(options.type){
				this.type=options.type
				this.path=options.path
			}
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
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
				console.log(res.target)
			}
			
			// return {
			// 	title: '自定义分享标题',
			// 	path: '/pages/test/test?id=123'
			// }
		},
		methods: {
			share(){
				var that=this
				uni.showLoading({
					mask:true,
					title:'正在获取图片'
				})
				uni.downloadFile({
				    url: service.imgurl+that.path,
				    success: (res) => {
				        if (res.statusCode === 200) {
				            console.log('下载成功');
										uni.hideLoading()
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success(res) {
												uni.showToast({
													title:'保存成功'
												});
											},
											fail(res) {
												console.log(res)
												uni.showToast({
													title:res
												});
											},
										})
				        }
				    }
				});
				
			},
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
  /* width:320rpx; */
	flex: 1;
  height:77rpx;
  border:1rpx solid rgba(247,172,57,1);
  border-radius:39rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color: #F7AC39;
	margin: 0 28rpx;
}
.okcz .btn1{
  background: #F7AC39;
  color: #fff;
}
</style>
