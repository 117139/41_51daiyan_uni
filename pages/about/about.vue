<template>
	<view>
		<view class="about_box">
		  51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言51代言
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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
			
			}
		}
	}
</script>

<style scoped>
	.about_box{
	  width: 100%;
	  padding: 20rpx 28rpx;
	  box-sizing: border-box;
	  font-size: 28rpx;
	  color: #333;
	}
	.about_box image,.about_box img{
		max-width: 100%;
	}
</style>
