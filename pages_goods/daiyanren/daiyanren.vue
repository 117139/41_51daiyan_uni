<template>
	<view>
		<view class="container">
			<view class="goods_xx">
				<view class="quan_goods" @tap="jump" data-url="/pages/details/details">
				  <image class="quan_goods_img" src="/static/images/goods1.png" mode="aspectFill"></image>
				  <view class="quan_goods_msg">
				    <view class="quan_goods_name oh1">苏泊尔IH家用大容量智能电饭锅</view>
				    <view class="quan_goods_pri">
				      <text class="pri1">¥668</text>
				      <text class="pri2">¥1368</text>
				    </view>
				    <view class="quan_goods_btn">
				      <view class="goods_btn1">库存:11000</view>
				      <view  class="goods_btn2"><text>5200+</text>代言人</view>
				    </view>
				  </view>
				</view>
			</view>
			<!-- 用户 -->
			 <view class="ss_list">
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null.png')"></image>
				 </view>
				 <view wx:el class="li_box" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
						<view class="user_tx"  @tap="jump" data-url="/pages/my_index/my_index">
							<image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
							<image class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image>
							<!-- <image class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image> -->
						</view>
						<view class="user_name">王力宏 <text>好友</text><text class="star_bq">明星</text></view>
						<view class="user_btn">+关注</view>
						<view class="user_btn user_btn1">已关注</view>
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
				type:'',
				ss_cur:1,
				data_list:[1,1,1,1]
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
			var that =this
			console.log(that.options)
			that.setData({
				type: that.options.type
			})
			if (that.options.name){
				wx.setNavigationBarTitle({
					title: that.options.name,
				})
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
		methods: {
			ss_type(e){
				
				var that =this
				if(that.ss_cur==e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.s_cur=e.currentTarget.dataset.type
			},
			jump(e) {
			 service.jump(e)
			}
		}
	}
</script>

<style scoped>

page{
	min-height: 100%;
}
.container{
	width: 100%;
	height: auto;
	min-height: 100%;
	background: #f5f5f5;
}



/* 用户 */
.ss_list{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	background: #fff;
}
.li_box{
	width: 100%;
	display: flex;
	padding: 20rpx 0;
	align-items: center;
}
.user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	position: relative;
}
.user_v{
	position: absolute;
	bottom: 0;
	right: 0;
	width:27rpx;
	height:28rpx;
}
.user_name{
	padding: 0 20rpx;
	box-sizing: border-box;
	font-weight: bold;
	flex: 1;
	font-size:30rpx;
	line-height: 30rpx;
	color: #333333;
}
.user_btn{
	width:144rpx;
	height:60rpx;
	background:rgba(244,121,36,1);
	border:1px solid rgba(210,210,210,1);
	border-radius:30rpx;
	font-size: 30rpx;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 10rpx;
}
.user_btn1{
	border:1px solid rgba(220,220,220,1);
	background:rgba(220,220,220,1);
	font-size: 30rpx;
	color: #fff;
}
.data_null{
	width: 100%;
	height: 500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.data_null image{
	width: 122rpx;
	height: 178rpx;
}
.user_name text{
	height: 22rpx;
	font-size: 22rpx;
	line-height: 22rpx;
	padding: 2rpx 8rpx;
	color: #FE3569;
	border:1rpx solid rgba(254,53,105,1);
	border-radius:4rpx;
	box-sizing: border-box;
	margin-left: 8rpx;
}
.user_name text.star_bq{
	border:1rpx solid #FEC335;
	color: #FEC335;
}

.goods_xx{
	width: 100%;
	padding: 0 28rpx 20rpx;
	box-sizing: border-box;
	margin-bottom: 20rpx;
	background: #fff;
}
.quan_goods{
	margin-top: 10rpx;
  width: 100%;
  height:238rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
	box-sizing: border-box;
}
.quan_goods_img{
  width:196rpx;
  height:196rpx;
  border-radius:10rpx;
  margin-right: 20rpx;
}
.quan_goods_msg{
  flex: 1;
}
.quan_goods_name{
  font-size: 30rpx;
  color: #333;
  margin-bottom: 22rpx;
}
.quan_goods_pri{
  color: #EB4443;
  font-size: 30rpx;
  margin-bottom: 50rpx;
}
.quan_goods_pri .pri2{
  margin-left: 20rpx;
  text-decoration:line-through;
  color:#999;
}
.quan_goods_btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color:#333;
}
.goods_btn1{
  padding: 0 9rpx;
  height:40rpx;
  line-height: 40rpx;
  background:rgba(254,135,53,1);
  border-radius:10rpx;
  color: #fff;
}
.goods_btn2 text{
  color: #FE8735;
}
</style>
