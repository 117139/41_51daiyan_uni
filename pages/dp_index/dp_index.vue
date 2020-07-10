<template>
	<view>
		<view class="container">
		  <view class="dp_box">
		    <view class="dp_b1">
		      <view class="dp_logo">
		        <image :src="filter.imgIP('goods_02.jpg')" mode="aspectFill"></image>
		      </view>
		      <view class="dp_msg">
		        <view class="dp_name oh2">弥翼咖啡 MIYI COFFEE ROSASTERS</view>
		        <view class="dp_lv">
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		        </view>
		        <view class="dp_bq">
		          <text>代言 835</text>
		          <text class="flex_1">粉丝数</text>
		          <view class="guanzhu_btn">关注</view>
		        </view>
		
		      </view>
		    </view>
		  </view>
		  <view class="dp_type">
		    <view :class="s_type==0?'cur':''"  @tap="ss_type" data-type="0">商品</view>
		    <view :class="s_type==1?'cur':''"  @tap="ss_type" data-type="1">买家代言</view>
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
				<view v-if="s_type==0" class="goods_list">
					<view class="goods_li" @tap="jump" data-url="/pages/details/details">
						<image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"  mode="aspectFill"></image>
						<view class="goods_msg">
							<view class="oh1">奶油碧根果 整箱</view>
							<view class="goods_pri">
								<text>￥27</text>
								<text class="pr2">￥37</text>
							</view>
						</view>
					</view>
					<view class="goods_li"  @tap="jump" data-url="/pages/details/details">
						<image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"  mode="aspectFill"></image>
						<view class="goods_msg">
							<view class="oh1">奶油碧根果 整箱</view>
							<view class="goods_pri">
								<text>￥27</text>
								<text class="pr2">￥37</text>
							</view>
						</view>
					</view>
					<view class="goods_li"  @tap="jump" data-url="/pages/details/details">
						<image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"  mode="aspectFill"></image>
						<view class="goods_msg">
							<view class="oh1">奶油碧根果 整箱</view>
							<view class="goods_pri">
								<text>￥27</text>
								<text class="pr2">￥37</text>
							</view>
						</view>
					</view>
					<view class="goods_li"  @tap="jump" data-url="/pages/details/details">
						<image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"  mode="aspectFill"></image>
						<view class="goods_msg">
							<view class="oh2">奶油碧根果奶油碧根果奶油碧根果 整箱</view>
							<view class="goods_pri">
								<text>￥27</text>
								<text class="pr2">￥37</text>
							</view>
						</view>
					</view>
				</view>
				<view v-if="s_type==1" class="my_list">
					<view class="sp_list" >
						<view class="sp_li" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
							<view class="sp_li_img">
								<image class="sp_li_img" :src="filter.imgIP('/images/goods15_02.jpg')" mode="aspectFill"></image>
								<view class="sp_li_img_cz">
									<image src="../../static/images/goods_play.png"></image>
								</view>
							</view>
							<view class="sp_li_msg">
								<view class="sp_li_name oh2">三只松鼠-巨型零食大礼包 内含30包休闲食品</view>
								<view class="sp_li_time">
		              <view class="user_tximg">
		                <image src="../../static/images/tx.png"></image>
		                王力宏
		              </view>
		              <view v-if="idx==2"><text class="iconfont iconhongxinicon"></text> 390</view>
		              <view v-else class="yzan"><text class="iconfont iconhongxinicon1"></text> 390</view>
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
				
				
				s_type: 0,
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
			
			ss_type(e) {
			  var that = this
			  if (that.s_type == e.currentTarget.dataset.type) return
			  console.log(e.currentTarget.dataset.type)
			  that.s_type= e.currentTarget.dataset.type
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
			},
			jump(e) {
			  service.jump(e)
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
.dp_box{
  width:750rpx;
  height:220rpx;
  padding: 28rpx;
  box-sizing: border-box;
  background:linear-gradient(180deg,rgba(11,14,45,1),rgba(104,149,222,1));
}
.dp_type{
  font-size: 30rpx;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 78rpx;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.dp_type view{
  padding-top: 18rpx;
  padding-bottom: 18rpx;
  border-bottom: 6rpx solid transparent;
}
.dp_type .cur{
  color: #333;
  border-bottom: 6rpx solid #FF383B;
}
.h_main{
	width: 100%;
	padding: 20rpx 0 28rpx;
	box-sizing: border-box;
  background: #fff;
	position: relative;
	z-index: 3;
}
.goods_list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0 28rpx 40rpx;
  box-sizing: border-box;
}
.goods_li{
	width:338rpx;
	height:494rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
	border-radius:10rpx;
	margin-bottom: 16rpx;
}
.goods_li:nth-child(2n){
	margin-left: 18rpx;
}
.goods_img{
	width: 100%;
	height:338rpx;
	border-radius:10px 10px 0px 0px;
}
.goods_msg{
	width: 100%;
	box-sizing: border-box;
	padding: 15rpx 24rpx;
	font-size: 26rpx;
	color: #333;
}
.goods_pri{
	color: #e53030;
	font-size: 36rpx;
}
.goods_pri .pr2{
	  font-size: 28rpx;
	  font-family: "PingFangSC";
	  color: rgb(153, 153, 153);
	  text-decoration: line-through;
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
	margin-bottom: 20rpx;
}


.sp_list{
	width: 100%;
	padding: 0 28rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
}
.sp_li{
	width:338rpx;
	height:480rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
	border-radius:10rpx;
	overflow: hidden;
	margin-right: 18rpx;
	margin-bottom: 18rpx;
}
.sp_li:nth-child(2n){
	margin-right: 0;
}
.sp_li_img{
	width:342rpx;
	height: 342rpx;
	position: relative;
}
.sp_li_img_cz{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0,0,0,.5);
}
.sp_li_img_cz image{
	width:64rpx;
	height:64rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -32rpx;
	margin-top: -32rpx;
}
.sp_li_msg{
	width: 100%;
	padding: 12rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.sp_li_name{
	font-size: 28rpx;
	color: #333;
	font-weight:400;
}
.sp_li_time{
  margin-top: 10rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
	font-size: 24rpx;
	color: #999;
}
.sp_li_img1{
	width:338rpx;
	height:33r8px;
}
.user_tximg{
  font-size: 24rpx;
  color: #666;
  display: flex;
  align-items: center
}
.user_tximg image{
  width:38rpx;
  height:38rpx;
  border-radius:50%;
  margin-right: 10rpx;
}
.sp_li_time text{
  font-size: 26rpx;
}
.yzan{
  color: #F85951;
  font-size: 26rpx;
}

.dp_b1{
  width: 100%;
  display: flex;
}
.dp_logo{
  width:123rpx;
  height:123rpx;
  border-radius:10rpx;
  border:1px solid #eee;
}
.dp_logo image{
  width:123rpx;
  height:123rpx;
  border-radius:10rpx;
}
.dp_msg{
  flex: 1;
  height:123rpx;
  margin-left: 20rpx;
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
}
.dp_name{
  font-size: 28rpx;
  color: #fff;
}
.dp_lv{
  margin-top: 10rpx;
  display: flex;
  align-items: center;
  width:158rpx;
  height:38rpx;
  background:rgba(255,255,255,.8);
  border-radius:10rpx;
  padding: 0 12rpx;
}
.dp_lv image{
  width:31rpx;
  height:25rpx;
  margin-right: 10rpx;
}
.dp_bq{
  font-size: 24rpx;
  color: #fff;
  display: flex;
  align-items: center;
}
.guanzhu_btn{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  font-size: 28rpx;
  width:132rpx;
  height:60rpx;
  border:2rpx solid rgba(255,255,255,1);
  border-radius:30rpx;
}
.dp_bq text{
  margin-right: 20rpx;
}
.dp_bq .bq{
  width:28rpx;
  height:28rpx;
  background:rgba(241,241,241,1);
  border-radius:50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
