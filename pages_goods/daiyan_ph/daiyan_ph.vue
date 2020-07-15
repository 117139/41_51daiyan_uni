<template>
	<view>
		<view class="container">
			<view class="list">
				<view class="list_tit" :class="ph_type==1?'cur':''">
					<view class="ph_fri">
						<image  class="ph_fri " :src="ph_type==0?'../../static/images/daiyan_ph1.png':'../../static/images/daiyan_ph.png'"></image>
						<view class="pl_li" @tap="ph_fuc" data-type="0">好友排行</view>
					</view>
					<view  class="pl_li1" @tap="ph_fuc" data-type="1">世界排行</view>
				</view>
				<view class="list_tit_1">
					<view :class="ph_type1==0?'cur':''" @tap="ph_fuc1" data-type="0">代言数量排行</view>
					<view :class="ph_type1==1?'cur':''" @tap="ph_fuc1" data-type="1">代言收益排行</view>
					<view :class="ph_type1==2?'cur':''" @tap="ph_fuc1" data-type="2">公益之星排行</view>
				</view>
				<view class="dy_list">
					<view class="dy_box">
						<view class="dy_li">
							<view class="pl_num">
								<image class="pl_num" src="../../static/images/phicon_1.png"></image>
							</view>
							<view class="pl_tx"  @tap="jump" data-url="/pages/my_index/my_index">
								<image class="pl_tx" src="../../static/images/tx.png"></image>
							</view>
							<view class="ph_name">张一鸣</view>
							<view class="ph_num"><text>97</text>件</view>
							<view class="ph_btn" @tap="jump" data-url="/pages/my_index/my_index">去看看</view>
						</view>
						<view class="li_dy">代言说：喜欢运动的感觉，耐克just di it！</view>
					</view>
					<view class="dy_box">
						<view class="dy_li">
							<view class="pl_num">
								<image class="pl_num" src="../../static/images/phicon_2.png"></image>
							</view>
							<view class="pl_tx" @tap="jump" data-url="/pages/my_index/my_index">
								<image class="pl_tx" src="../../static/images/tx.png"></image>
							</view>
							<view class="ph_name">张一鸣</view>
							<view class="ph_num"><text>97</text>件</view>
							<view class="ph_btn" @tap="jump" data-url="/pages/my_index/my_index">去看看</view>
						</view>
						<view class="li_dy">代言说：喜欢运动的感觉，耐克just di it！</view>
					</view>
					<view class="dy_box">
						<view class="dy_li">
							<view class="pl_num">
								<image class="pl_num" src="../../static/images/phicon_3.png"></image>
							</view>
							<view class="pl_tx" @tap="jump" data-url="/pages/my_index/my_index">
								<image class="pl_tx" src="../../static/images/tx.png"></image>
							</view>
							<view class="ph_name">张一鸣</view>
							<view class="ph_num"><text>97</text>件</view>
							<view class="ph_btn" @tap="jump" data-url="/pages/my_index/my_index">去看看</view>
						</view>
						<view class="li_dy">代言说：喜欢运动的感觉，耐克just di it！</view>
					</view>
					<view class="dy_box">
						<view class="dy_li">
							<view class="pl_num">
								4
							</view>
							<view class="pl_tx" @tap="jump" data-url="/pages/my_index/my_index">
								<image class="pl_tx" src="../../static/images/tx.png"></image>
							</view>
							<view class="ph_name">张一鸣</view>
							<view class="ph_num"><text>97</text>件</view>
							<view class="ph_btn" @tap="jump" data-url="/pages/my_index/my_index">去看看</view>
						</view>
						<view class="li_dy">代言说：喜欢运动的感觉，耐克just di it！</view>
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
				ph_type:0,
				ph_type1:0,
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		
		},
		methods: {
			
			
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
			ph_fuc(e){
				var that =this
				 if(that.ph_type==e.currentTarget.dataset.type) return
				that.ph_type=e.currentTarget.dataset.type
			},
			ph_fuc1(e){
				var that =this
				 if(that.ph_type1==e.currentTarget.dataset.type) return
				that.ph_type1=e.currentTarget.dataset.type
			},
			jump(e) {
			  console.log(e.currentTarget.dataset.type)
			  service.jump(e)
			}
		}
	}
</script>

<style scoped>
page,.container{
	height: auto;
	min-height: 100%;
	background: #f5f5f5;
}
.container{
	padding: 20rpx 28rpx;
	box-sizing: border-box;
}

.list{
	width: 100%;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	overflow: hidden;
}
.list_tit{
	width: 100%;
	background:rgba(255,76,0,.5);
	height: 85rpx;
	display: flex;
}
.list_tit.cur{
	background:rgba(255,76,0,1);
}
.ph_fri{
	width:367rpx;
	height:85rpx;
	position: relative;
}

.pl_li{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
}

.pl_li1{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
}
.list_tit_1{
	width: 100%;
	height: 78rpx;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #999999;
	justify-content: space-around;
}
.list_tit_1 .cur{
	color: #FE9B00;
}
.dy_list{
	width: 100%;
	background: #fff;
}
.dy_box{
	width: 100%;
	padding-bottom: 20rpx;
	border-bottom: 1px solid #eee;
}
.dy_li{
	width: 100%;
	background: #fff;
	display: flex;
	align-items: center;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
}
.pl_num{
	width: 38rpx;
	height: 54rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #999;
	font-weight:600;
}
view.pl_num{
	margin-right: 26rpx;
}
.pl_tx{
	width:72rpx;
	height:72rpx;
	border-radius:50%;
}
view.pl_tx{
	margin-right: 26rpx;
}
.ph_name{
	flex: 1;
	font-size: 26rpx;
	color: #333;
}
.ph_num{
	font-size: 24rpx;
	color: #FE9B00;
}
.ph_num text{
	font-size: 36rpx;
	color: #FE9B00;
}
.ph_btn{
	margin-left: 20rpx;
	width:132rpx;
	height:63rpx;
	background:rgba(255,162,89,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 30rpx;
}

.li_dy{
	padding-left: 84rpx;
	padding-right: 28rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	color: #999;
}
</style>
