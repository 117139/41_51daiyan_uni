<template>
	<view>
		<view class="container">
			<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/images/my_indexbg_02.jpg')"></image>
			<view class="h_main">
				<view class="my_index_box1">
		      <view class="my_index">
		        <view class="user_tx">
		          <image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
		          <image class="star_v" :src="filter.imgIP('star_b.png')"></image>
		        </view>
		        <view class="user_msg">
		          <view class="user_name"><text>范冰冰</text> </view>
		          <view class="daiyan_lv"><text class="iconfont iconxingzhuang60kaobei2"></text>代言星级 3</view>
		        </view>
		        <view class="gz_btn gz_btn1" @tap="jump" data-url="/pages/lts/lts">私信</view>
		        <view v-if="gz_type" class="gz_btn" @tap="guanzhu">已关注</view>
		        <view v-else class="gz_btn" @tap="guanzhu">+关注</view>
		      </view>
		      <view class="dy_id">
		        <text>代言号：spzy010</text>
		        <text>粉丝：233</text>
		      </view>
		      <view class="dy_bq">
		        <view><text class="iconfont iconnv"></text> 27岁</view>
		        <view>中国政法大学</view>
		        <view>北京朝阳</view>
		      </view>
		      <view class="inr_box">
		        <view class="yue_li">
		          <view class="zhishu"><text>1135</text>件</view>
		          <view>代言商品</view>
		        </view>
		        <view class="yue_li">
		          <view class="zhishu"><text>1135</text>件</view>
		          <view>跟随购买</view>
		        </view>
		        <view class="yue_li">
		          <view class="zhishu"><text>1135</text>件</view>
		          <view>超过好友</view>
		        </view>
		        <view class="yue_li">
		          <view class="zhishu"><text>1135</text>件</view>
		          <view>公益指数</view>
		        </view>
		      </view>
		    </view>
				<view class="my_tab">
					<view :class="s_type==0?'cur':''"  @tap="ss_type" data-type="0">动态</view>
					<view :class="s_type==1?'cur':''"  @tap="ss_type" data-type="1">视频</view>
					<view :class="s_type==2?'cur':''"  @tap="ss_type" data-type="2">相册</view>
					<view :class="s_type==3?'cur':''"  @tap="ss_type" data-type="3">代言商品</view>
				</view>
				<!-- 动态 -->
				<view v-if="s_type==0" class="my_list">
					<view class="time_li" v-for="(item,idx) in data_list">
						<view class="time_v"><text>02</text><text class="month">2月</text></view>
						<view class="time_box">
							<view class="dt_li" v-for="(item1,idx1) in data_list">
								<view class="dt_li_d1">
									<image class="dt_li_d1_img" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')"  :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
									<view class="d1_msg">
										<view class="dt_text oh3">我在参选优选代言人活动，请为我投上宝贵的一票,谢谢大家！</view>
										<view class="dt_cz">
											<view>共6张</view>
											<view class="tp_btn">投票</view>
										</view>
									</view>
								</view>
								<view class="quan_goods" @tap="jump" data-url="/pages/details/details">
								  <image class="quan_goods_img" src="/static/images/goods.png" mode="aspectFill" 
									 :data-src="filter.imgIP('/static_s/51daiyan/images/goods.png')" @tap.stop="pveimg"></image>
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
						</view>
					</view>
				</view>
				<!-- 视频 -->
				<view v-if="s_type==1" class="my_list">
					<view class="sp_list">
						<view class="sp_li" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/xvideo/xvideo">
							<view class="sp_li_img">
								<image class="sp_li_img" :src="filter.imgIP('/static_s/51daiyan/images/images/goods15_02.jpg')" mode="aspectFill"></image>
								<view class="sp_li_img_cz">
									<image :src="filter.imgIP('/static_s/51daiyan/images/goods_play.png')"></image>
								</view>
							</view>
							<view class="sp_li_msg" style="display: none;">
								<view class="sp_li_name oh2">三只松鼠-巨型零食大礼包 内含30包休闲食品</view>
								<view class="sp_li_time">2月10日</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 相册 -->
				<view v-if="s_type==2" class="my_list">
		      <view class="sp_list">
		        <view class="my_li_xc" v-for="(item,idx) in data_list">
		          <image class="my_li_xc_img" :src="filter.imgIP('/static_s/51daiyan/images/images/goods15_02.jpg')" mode="aspectFill"  :data-src="filter.imgIP('/static_s/51daiyan/images/images/goods15_02.jpg')" @tap.stop="pveimg"></image>
		          <!-- <view class="xc_gb"><text class="iconfont iconguanbi"></text></view> -->
		          <view class="like_num"><text class="iconfont iconhongxinicon"></text>393</view>
		        </view>
					</view>
					<!-- <view class="b_box">
						<view>管理</view>
						<view>上传</view>
					</view> -->
				</view>
				<!-- 代言商品 -->
				<view v-if="s_type==3" class="my_list">
					<view class="sp_list">
						<view class="sp_li" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
							<view class="sp_li_img">
								<image class="sp_li_img" :src="filter.imgIP('/static_s/51daiyan/images/images/goods15_02.jpg')" mode="aspectFill"></image>
							</view>
							<view class="sp_li_msg">
								<view class="sp_li_name oh2">三只松鼠-巨型零食大礼包 内含30包休闲食品</view>
								<view class="sp_li_time">2月10日</view>
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
				s_type:0,
				data_list:[1,1,1,1,1,1,1],
				gz_type:false
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
			
			  guanzhu(){
			    var that =this
			    that.gz_type= !that.gz_type
			  },
				ss_type:function (e){
					var that =this
				  if(that.s_type==e.currentTarget.dataset.type) return
				  console.log(e.currentTarget.dataset.type)
				  that.s_type=e.currentTarget.dataset.type
				},
			  pveimg(e) {
			    service.pveimg(e)
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
  background: #fff;
	position: relative;
}
.h_bg{
	width: 100%;
	height: 422rpx;
	position: absolute;
	top: 0;
	z-index: 1;
}
.h_main{
	width: 100%;
	position: relative;
	/* padding:33rpx 0; */
	box-sizing: border-box;
	z-index: 4;
}
.my_index_box1{
  width: 100%;
	height: 422rpx;
  padding-top: 33rpx;
}
.my_index{
	display: flex;
	align-items: center;
	padding: 0 28rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.user_tx{
	width:122rpx;
	height:122rpx;
	border-radius:50%;
	position: relative;
}
.star_v{
	width: 27rpx;
	height: 28rpx;
	position: absolute;
	bottom: 0;
	right: 0;
}
.user_msg{
	height:102rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 20rpx;
}
.user_name{
	color: #fff;
	font-size: 32rpx;
}
.daiyan_lv{
	width: 165rpx;
padding: 2rpx 15rpx;
	height:32rpx;
	background:rgba(255,255,255,1);
	border-radius:8rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #F8AE3A;
	font-size: 22rpx;
}
.iconxingzhuang60kaobei2{
	font-size: 22rpx;
}
.gz_btn{
	width:122rpx;
	height:56rpx;
	background:rgba(255,255,255,1);
	border-radius:28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #FE8735;
	margin-left: 10rpx;
}
.gz_btn1{
	background: #FE8735;
	color: #fff;
}
.dy_id{
	font-size: 24rpx;
	color: #fff;
	margin: 16rpx 0;
	padding: 0 28rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.dy_id text{
	margin-right: 20rpx;
}
.dy_bq{
	display: flex;
	margin-bottom: 50rpx;
	padding: 0 28rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.dy_bq>view{
		padding: 10rpx 14rpx;
		border:1rpx solid rgba(255,255,255,.8);
		border-radius:10rpx;
		margin-right: 10rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #fff;
}
.dy_bq>view text{
	font-size: 24rpx;
	margin-right: 5rpx;
}
.inr_box{
	display: flex;
	align-items: center;
	justify-content: space-around;
	color: #fff;
}
.yue_li{
	font-size: 24rpx;
}
.zhishu{
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 15rpx;
}
.my_tab{
	height: 90rpx;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border-bottom: 1px solid #eee;
}
.my_tab>view{
	font-size: 30rpx;
	height: 90rpx;
	line-height: 90rpx;
	color: #999;
	border-bottom: 6rpx solid rgba(0,0,0,0);
}
.my_tab>view.cur{
	color: #333;
	border-bottom: 6rpx solid #F9B234;
}

/* my_list */
.my_list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding-bottom: 100rpx;
}
.my_li_xc{
	width:338rpx;
	height:338rpx;
	margin-right: 18rpx;
	margin-bottom: 23rpx;
	position: relative;
	font-size: 0;
}
.my_li_xc:nth-child(2n){
	margin-right: 0;
}
.my_li_xc_img{
	position: absolute;
	top: 0;
	width:338rpx;
	height:338rpx;
	z-index: 1;
}
.xc_gb{
	position: absolute;
	top: 10rpx;
	right: 10rpx;
	z-index: 5;
}
.xc_gb text{
	font-size: 32rpx;
	color: #7F7F7C;
}
.like_num{
	width: 100%;
	position: absolute;
	bottom: 0;
	height:103rpx;
	background-image: linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,.5));
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 26rpx;
	z-index: 6;
	padding: 40rpx 20rpx 0;
	box-sizing: border-box;
}
.like_num text{
	font-size: 26rpx;
	margin-right: 10rpx;
}
.b_box{
  width: 100%;
	position: fixed;
	bottom: 0;
	height:98rpx;
	padding: 0 28rpx;
	background:rgba(245,245,245,1);
  z-index: 99;
}
.b_box{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.b_box>view{
	width:330rpx;
	height:68rpx;
	background:rgba(254,195,53,1);
	border-radius:34rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 26rpx;
}
/* 动态 */
.time_li{
	width: 100%;
	padding: 18rpx 28rpx;
	box-sizing: border-box;
	display: flex;
}
.time_v{
	width: 120rpx;
	font-size: 40rpx;
	color: #333;
}
.time_v .month{
	font-size: 24rpx;
}
.time_box{
	flex: 1;
}
.dt_li{
	margin-bottom: 32rpx;
}
.dt_li_d1_img{
	width:238rpx;
	height:238rpx;
}
.dt_li_d1{
	display: flex;
	align-items: center;
}
.d1_msg{
	height:238rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	margin-left: 20rpx;
}
.d1_msg{
	font-size: 28rpx;
	color: #333;
}
.dt_cz{
	font-size: 24rpx;
	color: #999;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}
.tp_btn{
	width:166rpx;
	height:66rpx;
	background:rgba(244,116,22,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 28rpx;
}


.quan_goods{
  margin-top: 30rpx;
  width: 100%;
  height:164rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
}
.quan_goods_img{
  width:130rpx;
  height:130rpx;
  border-radius:10rpx;
  margin-right: 10rpx;
}
.quan_goods_msg{
  flex: 1;
}
.quan_goods_name{
  font-size: 24rpx;
  color: #333;
  margin-bottom: 10rpx;
}
.quan_goods_pri{
  color: #EB4443;
  font-size: 24rpx;
  margin-bottom: 10rpx;
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
  font-size: 22rpx;
  color:#333;
}
.goods_btn1{
  padding: 0 9rpx;
  height:38rpx;
  line-height: 38rpx;
  background:rgba(254,135,53,1);
  border-radius:10rpx;
  color: #fff;
}
.goods_btn2 text{
  color: #FE8735;
}
/* 视频 */
.sp_list{
	width: 100%;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
}
.sp_li{
	width:338rpx;
	/* height:480rpx; */
	background:rgba(255,255,255,1);
	box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
	border-radius:10rpx;
	overflow: hidden;
	margin-right: 18rpx;
	margin-bottom: 23rpx;
}
.sp_li:nth-child(2n){
	margin-right: 0;
}
.sp_li_img{
	width:338rpx;
	height: 338rpx;
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
	padding: 18rpx 20rpx;
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
	font-size: 24rpx;
	color: #999;
}
.sp_li_img1{
	width:338rpx;
	height:33r8px;
}
</style>
