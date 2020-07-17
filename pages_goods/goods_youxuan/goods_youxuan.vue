<template>
	<view>
		<view class="container">
			<view class="h_bg">
				<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/images/youxuan_02.jpg')"></image>
			</view>
		  <view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <block v-for="(item,idx) in datalist">
		      <view :class="type==idx?'typecur':''" :data-type="idx" @tap='bindcur'>{{item}}</view>
		    </block>
		
		  </view>
			<view class="h_main">
				
				<!-- tab -->
				<!-- <view class="list_tab">
						<view @tap="px_fuc" data-type="0">代言费
							<view class="list_px"><text class="iconfont iconXSJ-copy {{dy_mon==0?'cur':''}}"></text><text class="iconfont iconXSJ {{dy_mon==1?'cur':''}}"></text></view>
						</view>
						<view @tap="px_fuc" data-type="1">代言人数<view class="list_px"><text class="iconfont iconXSJ-copy {{dy_num==0?'cur':''}}"></text><text class="iconfont iconXSJ {{dy_num==1?'cur':''}}" ></text></view></view>
						<view @tap="px_fuc" data-type="2">价格<view class="list_px"><text class="iconfont iconXSJ-copy {{dy_pri==0?'cur':''}}"></text><text class="iconfont iconXSJ {{dy_pri==1?'cur':''}}" ></text></view></view>
				</view> -->
				<!-- goods_li -->
				<view class="goods_list2">
					<view class="goods_li2" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
						<view class="goods_li2_d1">
							<view class="goods_img2">
								<image class="goods_img2" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')"></image>
							</view>
							<view class="goods_msg">
								<view class="goods_name2 ">
									<view class="flex_1 oh1">苏泊尔IH家用大容量智能电饭锅</view>
									<view class="yx_icon">严选</view>
								</view>
								<view class="goods_pri">
									<view class="pri1">¥668</view>
									
								</view>
								<view class="goods_btn1">
									<view class="sj_list"  @tap="jump" data-url="/pages/daiyanren/daiyanren">
									  <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
									  <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
									  <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
									  <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
									  <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
									</view>
									<view class="goods_dy_num2">代言费：<text>¥30</text></view>
								</view>
							</view>
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
				data_list:[1,1,1,1,1],
				datalist:[
					'全部',
					'日用品',
					'化妆品',
				  '运动品',
					'数码产品'
				],
				type:0,
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
			bindcur(e){
				var that =this
			  console.log(e.currentTarget.dataset.type)
			  that.ype= e.currentTarget.dataset.type
				// that.getOrderList()
				
			},
			jump(e){
			  service.jump(e)
			},
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
			}
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
.tab_box{
  position: fixed;
  top: 0;
  z-index: 90;
  font-size: 30rpx;
	background: #955a59;
	color: #fff;
}
.typecur{
  padding-bottom: 12rpx;
  border-bottom: 6rpx solid #fff;
	opacity: 1;
}

.h_main{
	width: 100%;
	padding: 87rpx 28rpx 28rpx;
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
	margin: 4rpx 10rpx;
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
	/* margin-bottom: 20rpx; */
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
	color: #FE8D44;
	font-weight: bold;
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
	font-size: 36rpx;
	color: #FE8735;
	font-weight: bold;
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
.goods_name2{
	
	font-size: 30rpx;
	color: #000;
	display: flex;
	align-items: center;
	
	
}
.goods_name2 .yx_icon{
	margin-left: 10rpx;
	width:74rpx;
	height:36rpx;
	border:1rpx solid rgba(255,0,0,1);
	box-sizing: border-box;
	border-radius:4rpx;
	font-size: 24rpx;
	color: #FF4242;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sj_list{
  width: 154rpx;
  height:40rpx;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  margin-right: 20rpx;
}

.sj_li{
  width:40rpx;
  height:40rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 10rpx 0px rgba(119,119,119,0.2);
  border-radius:50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}
.sj_li:nth-child(2){
  left: 36rpx;
  z-index: 7;
}
.sj_li:nth-child(3){
  left: 72rpx;
  z-index: 8;
}
.sj_li:nth-child(4){
  left: 98rpx;
  z-index: 9;
}
.sj_li:nth-child(5){
  left: 134rpx;
  z-index: 10;
}
</style>
