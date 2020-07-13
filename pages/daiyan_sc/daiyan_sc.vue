<template>
	<view>
		<view class="container">
			<view class="dy_sc_bg">
				<image class="dy_sc_bg" src="../../static/images/images/dy_sc1_02.jpg"></image>
			</view>
			<view class="h_main">
				<view class="dy_sc_lj" @tap="jump" data-url="/pages/about/about">
					<view><image class="c_bl" src="../../static/images/images/lj_bl_05.jpg"></image>1分钟了解51代言</view>
					<text class="iconfont iconnext3"></text>
				</view>
				<!-- <view class="yhq_box">
					<view class="yhp_tit">
						<view class="yhq_t_l">共享优惠券</view>
						<view class="yhq_t_r"  @tap="jump" data-url="/pages/my_yhq/my_yhq">更多<text class="iconfont iconnext3"></text></view>
					</view>
					<view class="yhq_li">
						<!-- <image class="yhq_li" src="../../static/images/images/yhq_09.jpg"></image> --
		        <view class="yhq_li_img">
		          <image class="yhq_li_img" src="../../static/images/yhq_bg_03.png"  mode="aspectFill"></image>
		          <view class="yhq_pri">
		            <view class="d1"><text>¥10元</text> 代金券</view>
		            <view class="d2">2020.02.14-2020.02.18</view>
		          </view>
		          
		        </view>
					</view>
					<view class="yhq_user">
						<view class="user_tximg">
							<image class="user_tximg" src="{{filter.imgIP('tx.png')}}"></image>
						</view>
						<view class="user_form">来自好友<text>张鸣</text>的共享</view>
					</view>
				</view> -->
				<!-- box2 -->
				<view class="yhq_box">
					<view class="yhp_tit">
						<view class="yhq_t_l">好友的代言商品</view>
						<view class="yhq_t_r" @tap="jump" data-url="/pages/my_daiyan/my_daiyan">更多<text class="iconfont iconnext3"></text></view>
					</view>
					<view class="hy_goods">
						<view class="hy_goods_li"  @tap="jump" data-url="/pages/details/details">
							<view class="hy_goods_img">
								<image class="hy_goods_img" :src="filter.imgIP('goods.png')"></image>
							</view>
							<view class="goods_pri">
								<view class="goods_tximg">
									<image class="goods_tximg" :src="filter.imgIP('tx.png')"></image>
								</view>
								<view class="goods_mon">￥688</view>
							</view>
							<view class="hy_sy">
									<view class="hy_sy_box">代言收益</view>
									<view class="sy_mon">￥30</view>
							</view>
						</view>
						<view class="hy_goods_li"  @tap="jump" data-url="/pages/details/details">
							<view class="hy_goods_img">
								<image class="hy_goods_img" :src="filter.imgIP('goods.png')"></image>
							</view>
							<view class="goods_pri">
								<view class="goods_tximg">
									<image class="goods_tximg" :src="filter.imgIP('tx.png')"></image>
								</view>
								<view class="goods_mon">￥688</view>
							</view>
							<view class="hy_sy">
									<view class="hy_sy_box">代言收益</view>
									<view class="sy_mon">￥30</view>
							</view>
						</view>
						<view class="hy_goods_li"  @tap="jump" data-url="/pages/details/details">
							<view class="hy_goods_img">
								<image class="hy_goods_img" :src="filter.imgIP('goods.png')"></image>
							</view>
							<view class="goods_pri">
								<view class="goods_tximg">
									<image class="goods_tximg" :src="filter.imgIP('tx.png')"></image>
								</view>
								<view class="goods_mon">￥688</view>
							</view>
							<view class="hy_sy">
									<view class="hy_sy_box">代言收益</view>
									<view class="sy_mon">￥30</view>
							</view>
						</view>
					</view>
				</view>
				<!-- box3 -->
				<view class="b_list">
					<view class="b_list_tab">
						<view :class="s_type==0?'cur':''"  @tap="ss_type" data-type="0">爆款美妆</view>
						<view :class="s_type==1?'cur':''"  @tap="ss_type" data-type="1">精品服饰</view>
						<view :class="s_type==2?'cur':''"  @tap="ss_type" data-type="2">品质数码</view>
						<view :class="s_type==3?'cur':''"  @tap="ss_type" data-type="3">轻奢护肤</view>
						<view :class="s_type==4?'cur':''"  @tap="ss_type" data-type="4">限时特惠</view>
					</view>
					<view class="b_li_box">
						<view class="b_li"  v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
							<view class="li_img">
								<image class="li_img" :src="filter.imgIP('/images/goods15_02.jpg')"></image>
							</view>
							<view class="li_msg">
								<view class="li_name oh1">意式浓精品挂耳咖啡新款</view>
								<view class="goods_pri">
									<view class="goods_tximg">
										<image class="goods_tximg" :src="filter.imgIP('tx.png')"></image>
									</view>
									<view class="goods_mon">￥688</view>
								</view>
								<view class="hy_sy">
										<view class="hy_sy_box">代言收益</view>
										<view class="sy_mon">￥30</view>
										<view class="sy_xl">销量：99</view>
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
				s_type:0,
				data_list:[1,1,1,1]
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
			
			  jump(e) {
			    service.jump(e)
			  },
				ss_type(e){
					var that =this
					if(that.s_type==e.currentTarget.dataset.type) return
					console.log(e.currentTarget.dataset.type)
					that.s_type=e.currentTarget.dataset.type
				}
		}
	}
</script>

<style scoped>
.container{
	min-height: 100vh;
	background: #f5f6f8;
}
.dy_sc_bg{
	width: 100%;
	height: 454rpx;
}
.h_main{
	width: 100%;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
}

.dy_sc_lj{
	width: 100%;
	background: #fff;
	padding: 16rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #2b2b2b;
	font-size: 24rpx;
	margin-bottom: 20rpx;
}
.dy_sc_lj view{
	display: flex;
	align-items: center;
}
.dy_sc_lj .iconfont{
	font-size: 22rpx;
	color: #cccccc;
}
.c_bl{
	width: 10rpx;
	height: 27rpx;
	margin-right: 20rpx;
}
/* yhq_box */
.yhq_box{
	width: 100%;
	background: #fff;
	padding: 0 22rpx 20rpx;
	box-sizing: border-box;
	border-radius: 10rpx;
}
.yhp_tit{
	height: 90rpx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.yhq_t_l{
	font-size: 30rpx;
	color: #000;
}

.yhq_t_r{
	font-size: 22rpx;
	color: #ccc;
}
.yhq_t_r .iconfont{
	font-size: 22rpx;
}
.yhq_li{
	width: 100%;
	height: 234rpx;
	border-radius: 12rpx;
}
.yhq_user{
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	
}
.user_tximg{
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
}
.user_form{
	font-size: 25rpx;
	margin-left: 20rpx;
}
.user_form text{
	color: #f2b92c;
	margin: 0 5rpx;
}
.hy_goods{
	display: flex;
	
}
.hy_goods_li{
	width: 204rpx;
	margin-right: 20rpx;
}
.hy_goods_li:nth-child(3n){
	margin-right: 0;
}
.hy_goods_img{
	width: 204rpx;
	height: 204rpx;
}
.goods_pri{
	display: flex;
	align-items: center;
	margin: 12rpx 0;
}
.goods_tximg{
	width: 45rpx;
	height: 45rpx;
	border-radius: 50%;
}
.goods_mon{
	font-size: 20rpx;
	color: #ff556f;
	font-weight: bold;
	margin-left: 10rpx;
}
.hy_sy{
	display: flex;
	align-items: center;
}
.hy_sy_box{
	width: 106rpx;
	height: 34rpx;
	border-radius: 10rpx;
	border:1px solid #f8b135;
	color: #f8b135;
	font-size: 22rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sy_mon{
	font-size: 24rpx;
	color: #f8b135;
	margin-left: 10rpx;
  margin-right: 10rpx;
}
/* b_list */


.b_list{
	width: 100%;
}
.b_list_tab{
	width: 100%;
	display: flex;
	align-items: center;
}
.b_list_tab view{
	font-size: 28rpx;
	color: #333;
	width: 145rpx;
	text-align: center;
	line-height: 70rpx;
	border-bottom: 6rpx solid  rgba(0,0,0,0);
  margin: 15rpx 0;
}
.b_list_tab view.cur{
	border-bottom: 6rpx solid #f43f68;
}
.b_li_box{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.b_li{
	width: 338rpx;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
}
.b_li:nth-child(2n){
	margin-left: 18rpx;
}
.li_img{
	width: 338rpx;
	height: 338rpx;
}
.li_name{
	color: #5c5c5c;
	font-size: 26rpx;
	
	margin-bottom: 15rpx;
}
.li_msg{
	background: #fff;
	width: 100%;
	padding: 20rpx 20rpx 15rpx;
  box-sizing: border-box;
}
.sy_xl{
	color: #999;
	font-size: 24rpx;
}



.yhq_li_img{
	width:650rpx;
	height:236rpx;
	position: relative;
	z-index: 1;
}
.yhq_pri{
	width:407rpx;
	height:236rpx;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.yhq_pri .d1{
	font-size:36rpx;
	color: #fff;
}
.yhq_pri .d1 text{
	font-size:  48rpx;
}
.yhq_pri .d2{
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #fff;
}
</style>
