<template>
	<view>
		<view class="container">
			<view class="h_bg">
				<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/images/goods_tj_02.jpg')"></image>
			</view>
			<view class="h_main">
				<view class="goods_box1">
					<view class="goods_li1"  @tap="jump" data-url="/pages/details/details">
						<view class="goods_img">
							<image class="goods_img" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')"></image>
							<view class="goods_dy_num"><text class="iconfont icondianzan2"></text>111代言</view>
						</view>
						<view class="goods_name1 oh1">兰蔻第二代小黑</view>
						<view class="goods_pri1 ">¥858</view>
					</view>
					<view class="goods_li1"  @tap="jump" data-url="/pages/details/details">
						<view class="goods_img">
							<image class="goods_img" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')"></image>
							<view class="goods_dy_num"><text class="iconfont icondianzan2"></text>111代言</view>
						</view>
						<view class="goods_name1 oh1">兰蔻第二代小黑</view>
						<view class="goods_pri1 ">¥858</view>
					</view>
					<view class="goods_li1"  @tap="jump" data-url="/pages/details/details">
						<view class="goods_img">
							<image class="goods_img" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')"></image>
							<view class="goods_dy_num"><text class="iconfont icondianzan2"></text>111代言</view>
						</view>
						<view class="goods_name1 oh1">兰蔻第二代小黑</view>
						<view class="goods_pri1 ">¥858</view>
					</view>
				</view>
				<!-- tab -->
				<view class="list_tab">
						<view @tap="px_fuc" data-type="0">代言费
							<view class="list_px"><text class="iconfont iconXSJ-copy" :class="dy_mon==0?'cur':''"></text><text class="iconfont iconXSJ"  :class="dy_mon==1?'cur':''"></text></view>
						</view>
						<view @tap="px_fuc" data-type="1">代言人数<view class="list_px"><text class="iconfont iconXSJ-copy" :class="dy_num==0?'cur':''"></text><text class="iconfont iconXSJ" :class="dy_num==1?'cur':''"></text></view></view>
						<view @tap="px_fuc" data-type="2">价格<view class="list_px"><text class="iconfont iconXSJ-copy" :class="dy_pri==0?'cur':''"></text><text class="iconfont iconXSJ" :class="dy_pri==1?'cur':''"></text></view></view>
				</view>
				<!-- goods_li -->
				<view class="goods_list2">
					<view class="goods_li2" v-for="(item,idx) in data_list"  @tap="jump" data-url="/pages/details/details">
						<view class="goods_li2_d1">
							<view class="goods_img2">
								<image class="goods_img2" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')"></image>
							</view>
							<view class="goods_msg">
								<view class="goods_name2 oh1 fz30">苏泊尔IH家用大容量智能电饭锅</view>
								<view class="goods_pri">
									<view class="pri1">¥668</view>
									<view class="pri2">代言费：¥30</view>
								</view>
								<view class="goods_btn1">
									<view class="goods_dy_num2"><text class="iconfont icondianzan2"></text>5200代言人</view>
									<view class="goods_to"  >去看看</view>
								</view>
							</view>
						</view>
						<view class="goods_li2_d2">
							<view class="dy_tx">
								<image class="dy_tx" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
							</view>
							<view class="dy_star">王力宏代言：</view>
							<view class="dy_text oh1">穿上去特别舒服，打篮球更有感觉了感觉了感觉了感觉了</view>
						</view>
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
				dy_mon:0,
				dy_num:0,
				dy_pri:0,
				data_list:[1,1,1,1,1]
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
			
			px_fuc(e){
				var that=this
				var type=e.currentTarget.dataset.type
				if(type==0){
					that.dy_mon=!that.data.dy_mon
				}
				if(type==1){
					that.dy_num=!that.data.dy_num
				}
				if(type==2){
					that.dy_pri=!that.data.dy_pri
				}
			},
			jump(e) {
			  service.jump(e)
			},
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	min-height: 100vh;
	background: #f5f6f8;
  position: relative;
}
.h_bg{
	position: absolute;
	top: 0;
	z-index: 1;
	width: 100%;
	height: 269rpx;
}
.h_main{
	width: 100%;
	padding: 117rpx 28rpx 28rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 3;
}
.goods_box1{
	width: 100%;
	border-radius: 12rpx;
	background: #fff;
	padding: 20rpx;
	box-sizing: border-box;
	display: flex;
}
.goods_li1{
	width: 204rpx;
	margin-right: 20rpx;
}
.goods_li1:nth-child(3){
	margin-right: 0;
}
.goods_img{
	width: 204rpx;
	height: 204rpx;
	border-radius: 12rpx;
	position: relative;
	overflow: hidden;
}
.goods_dy_num{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 37rpx;
	display: flex;
	align-items: center;
	padding: 0 10rpx;
	box-sizing: border-box;
	background:rgba(0,0,0,1);
	color: #C3AA76;
	font-size: 22rpx;
}
.goods_dy_num .iconfont{
	color: #C3AA76;
	font-size: 22rpx;
	margin-right: 5rpx;
}
.goods_name1{
	font-size: 26rpx;
	color: #000;
	margin-top: 18rpx;
}
.goods_pri1{
	margin-top: 15prx;
	font-size: 24rpx;
	color: #C3AA76;
}
/* list_tab */
.list_tab{
	width: 100%;
	background: #Fff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-sizing: border-box;
	margin: 20rpx 0px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-size: 26rpx;
	color: #333;
}
.list_tab>view{
	display: flex;
	align-items: center;
}
.list_px{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #BBBBBB;
}
.list_px .iconfont{
	
	font-size: 10rpx;
	margin: 2rpx 10rpx;
}
.list_px .cur{
	color: #FE8735;
}
.goods_list2{
	margin-top: 20rpx;
	width: 100%;
}
.goods_li2{
	width: 100%;
	border-radius: 12rpx;
	background: #fff;
	padding: 24rpx;
	box-sizing: border-box;
	margin-bottom: 20rpx;
}
.goods_li2_d1{
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}
.goods_img2{
	width: 196rpx;
	height: 196rpx;
	border-radius: 12rpx;
	
}
.goods_msg{
	height: 196rpx;
	margin-left: 20rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.goods_pri{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.pri1{
	font-size: 30rpx;
	color: #C3AA76;
}
.pri2{
	font-size: 24rpx;
	color: #999;
}
.goods_btn1{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods_dy_num2{
	font-size: 24rpx;
	color: #bbb;
}
.goods_dy_num2 text{
	font-size: 24rpx;
	color: #bbb;
}
.goods_to{
	width:152rpx;
	height:66rpx;
	background:#FE8735;
	border-radius:33rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
}
.goods_li2_d2{
	width: 100%;
	height:58rpx;
	background:rgba(250,251,253,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	padding: 0 13rpx;
	box-sizing: border-box;
}
.dy_tx{
	width:38rpx;
	height:38rpx;
	border-radius:50%;
}
.dy_star{
	font-size: 24rpx;
	color: #5E73A1;
	margin-left: 15rpx;
}
.dy_text{
	flex: 1;
	font-size: 24rpx;
	color: #bbb;
}
</style>
