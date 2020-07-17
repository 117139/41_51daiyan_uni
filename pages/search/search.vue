<template>
	<view>
		<view class="container">
			<view class="top_box">
				<view class="top_search_box">
					<view class="top_search">
						<text class="iconfont iconsousuo"></text>
						<input type="text" placeholder="搜索人名代言号/商品/品牌" />
						<text class="iconfont iconguanbi"></text>
					</view>
					<view class="top_search_cancel">取消</view>
				</view>
				<view class="search_type">
					<view :class="ss_cur==0?'cur':''" @tap="ss_type" data-type="0">用户</view>
					<view :class="ss_cur==1?'cur':''" @tap="ss_type" data-type="1">商品</view>
					<view :class="ss_cur==2?'cur':''" @tap="ss_type" data-type="2">品牌</view>
				</view>
			</view>
			<!-- 用户 -->
			 <view class="ss_list" v-if="ss_cur==0">
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null.png')"></image>
				 </view>
				 <view wx:el class="li_box" v-for="(item,id) in data_list" @tap="jump" data-url="/pages/my_index/my_index">
						<view class="user_tx">
							<image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
							<image class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
						</view>
						<view class="user_name oh1">王力宏</view>
						<view class="user_btn">+关注</view>
						<view class="user_btn user_btn1">已关注</view>
				 </view>
			 </view>
			 <!-- 商品 -->
			 <view class="ss_list ss_list1" v-if="ss_cur==1">
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null.png')"></image>
				 </view>
				 <view wx:el class="li_box goods_li" v-for="(item,id) in data_list" @tap="jump" data-url="/pages/details/details">
					 <view class="ss_goods_img">
						 <image class="ss_goods_img" :src="filter.imgIP('goods.png')"></image>
					 </view>
					 <view class="goods_msg">
						 <view class="goods_name">苏泊尔IH家用大容量智能电饭锅</view>
						 <view  class="goods_pri">
							 <view class="pri1">￥668</view>
							 <view class="pri3">代言费：¥30</view>
						 </view>
						 <view class="goods_dy">
							 <view class="goods_zan">
								 <text class="iconfont icondianzan2"></text>5200代言人
							 </view>
							 <view class="find_sj"  @tap="jump" data-url="/pages/daiyanren/daiyanren">
							   <view class="sj_list">
							     <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
							     <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
							     <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
							     <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
							     <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
							   </view>
							   <text class="iconfont iconnext3"></text>
							 </view>
						 </view>
					 </view>
				 </view>
			 </view>
			 <!-- 品牌 -->
			 <view class="ss_list" v-if="ss_cur==2">
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null.png')"></image>
				 </view>
				 <view wx:el class="li_box" v-for="(item,id) in data_list" @tap="jump" data-url="/pages/dp_index/dp_index">
					 <view class="user_tx">
					 	<image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
					 </view>
					 <view class="user_name oh1">小米51代言旗舰店</view>
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
			that.type= options.type
			if (options.name){
				wx.setNavigationBarTitle({
					title: options.name,
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
					that.ss_cur=e.currentTarget.dataset.type
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
	min-height: 100%;
	padding-top: 140rpx;
	background: #fff;
}
.top_box{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	border-bottom: 1px solid #eee;
	background: #fff;
}
.top_search_box{
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
}
.top_search{
	flex: 1;
	width:608rpx;
	height:55rpx;
	background:rgba(245,245,245,1);
	border-radius:28rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	box-sizing: border-box;
	/* margin-bottom: 13rpx; */
}
.top_search text{
	color: #BBBBBB;
}
.top_search input{
	flex: 1;
	font-size: 24rpx;
	padding: 0 15rpx;
	box-sizing: border-box;
}
.top_search_cancel{


	margin-left: 28rpx;
	font-size: 30rpx;
}
.search_type{
	padding: 10rpx 28rpx 0;
	box-sizing: border-box;
	height: 58prx;
	display: flex;
	align-items: center;
}
.search_type view{
	height: 58rpx;
	line-height: 58rpx;
	border-bottom: 2px solid rgba(0,0,0,0);
	font-size: 30rpx;
	color: #999;
	margin-right: 100rpx;
}
.search_type .cur{
	color: #333;
	font-weight: bold;
	border-bottom: 2px solid #F9B234;
}
/* 用户 */
.ss_list{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
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
	border:1px solid rgba(210,210,210,1);
	background: #fff;
	font-size: 30rpx;
	color: #999999;
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
.goods_li{
	align-items: stretch;
	border-bottom: 1px solid #eee;
}
.ss_goods_img{
	width:195rpx;
	height:196rpx;
	border-radius:10px;
}
.goods_msg{
	flex: 1;
	padding:10rpx 0 10rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.goods_name{
	font-size: 30rpx;
	color: #333;
}
.goods_pri{
	font-size: 24rpx;
	color: #999;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods_pri .pri1{
	color: #F9B234;
	font-size: 30rpx;
	font-weight: bold;
}
.goods_dy{
	font-size: 24rpx;
	color: #BBBBBB;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods_dy text{
	font-size: 24rpx;
	margin-left: 10rpx;
}
.goods_zan{
	flex: none;
}
.find_sj{
 flex: 1;
  display: flex;
  align-items: center;
}
.find_sj>text{
  color: #EEEEEE;
  font-size: 24rpx;
  margin-left: 20rpx;
}
.sj_list{
  flex: 1;
  height:52rpx;
  position: relative;
}
.sj_li{
  width:52rpx;
  height:52rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 10rpx 0px rgba(119,119,119,0.2);
  border-radius:50%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
}
.sj_li:nth-child(2){
  position: absolute;
  right: 35rpx;
  z-index: 9;
}
.sj_li:nth-child(3){
  position: absolute;
  right: 70rpx;
  z-index: 8;
}
.sj_li:nth-child(4){
  position: absolute;
  right: 105rpx;
  z-index: 7;
}
.sj_li:nth-child(5){
  position: absolute;
  right: 140rpx;
  z-index: 6;
}
.ss_list1{
  padding: 0 48rpx;
}
</style>
