<template>
	<view>
		<view class="container">
			<view class="xx_li" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/lts/lts">
				<view class="user_tx" >
					<image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/xtxx.png')"></image>
				</view>
				<view class="xx_msg">
				
					<view class="to_msg">
						{{msg}}
					</view>
		      <view class="to_name">
						<!-- <text >李勇</text> -->
						<text class="time">2020-02-20 17:30</text>
					</view>
				</view>
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
				data_list:[
				  {},
				  {},
				  {},
				  {},
				  {},
				  {},
				],
				msg:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function (options) {
			  if (options.type==1){
			    this.msg='您代言钱包进账3元，余额变为¥235。'
			  }else{
			    this.msg= '您参与的【华为优选代言人活动】即将开始，敬请关注。'
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
			onShareAppMessage: function () {
			
			},
			jump(e) {
			  console.log(e.currentTarget.dataset.type)
			  service.jump(e)
			}
		}
	}
</script>

<style scoped>
.container{ 
	width: 100%;
  min-height: 100vh;
	background: #f5f5f5;
}
.xx_li{
	width: 100%;
	background: #FFF;
	padding: 20rpx 22rpx;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;
}
.user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	position: relative;
	margin-right: 20rpx;
}
.user_tx text{
	width:14rpx;
	height:14rpx;
	background:rgba(254,58,53,1);
	border-radius:50%;
	position: absolute;
	top: 0;
	right: 0;
}
.xx_msg{
	flex: 1;
}
.to_name{
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
	font-size: 30rpx;
	color: #333;
	justify-content: space-between;
}
.to_name .time{
	font-size: 24rpx;
	color: #999;
}
.to_msg{
	color: #333;
	font-size: 30rpx;
  margin-bottom: 15rpx;
}
</style>
