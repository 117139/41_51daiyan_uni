<template>
	<view>
		<view class="about_box" v-html="aboutBody"></view>
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
				type:0
			}
		},
		computed: {
			...mapState([
				'aboutBody'
			])
		},
		onLoad(option) {
			if(option.type=='协议'){
				this.type=1
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
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
