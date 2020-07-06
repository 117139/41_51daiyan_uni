<template>
	<view>
		<view class="container">
			<image class="h_bg" :src="filter.imgIP('/images/find_dy_02.jpg')"></image>
			<view class="xx_box">
				<view class="xx_box1">
					<image class="hd_js" src="../../static/images/hd_js.png"></image>
					<view class="hd_v1">平台合作品牌商征集代言人入围条件：</view>
					<view class="hd_v2">1.购买品牌商制定的商品，购买并代言。</view>
					<view class="hd_v2">2.有代言人拍摄短视频，制作代言海报，并上传。</view>
					<view class="hd_v2">3.有代言人所得票数，决定代言人排位。</view>
					<view class="hd_jl">
						<view class="hd_jl_tit">奖励：</view>
						<view class="hd_jl_li">
							<image class="" :src="filter.imgIP('hd_jl1.png')"></image>
						</view>
						<view class="hd_jl_li">
							<image class="" :src="filter.imgIP('hd_jl2.png')"></image>
						</view>
					</view>
				</view>

				<view class="hd_bg_tit">
					<image class="hd_bg_tit" src="../../static/images/hd_jl_tit.png"></image>
					<view class="hdtit_tit">他们在寻找代言人</view>
				</view>
				<scroll-view class="find_user" scroll-x>
					<view class="find_user1">
						<view class="find_uimg" v-for="(item,idx) in data_list" @tap="jump"
						 data-url="/pages/activity/activity">
							<image class="find_uimg" :src="filter.imgIP('goods.png')"></image>
							<view class="find_zcc">曼特宁咖啡</view>
						</view>
					</view>
				</scroll-view>
				<view class="hd_bg_tit">
					<image class="hd_bg_tit" src="../../static/images/hd_jl_tit.png"></image>
					<view class="hdtit_tit">品牌代言人招募</view>
				</view>
				<view class="xx_box1 xx_box2" v-for="(item,idx) in pinpai">
					<view class="pp_v1">
						<view class="pp_img">
							<image class="pp_img" :src="filter.imgIP('tx.png')"></image>
						</view>
						<view class="pp_msg">
							<view class="pp_d1">
								<view class="pp_name oh1">耐克代言人优选招募</view>
								<view class="pp_to" @tap="jump" data-url="/pages/activity/activity">活动详情<text class="iconfont iconnext3"></text></view>
							</view>
							<view class="pp_d2">招募<text>60</text>人</view>
						</view>
					</view>
					<view class="pp_jjc">
						<view class="pp_jjc_tit">奖金池</view>
						<view class="pp_ph_list">
							<view class="pp_ph_li">
								<view>一等奖</view>
								<view>第1～10名</view>
								<view>¥10000</view>
							</view>
							<view class="pp_ph_li">
								<view>二等奖</view>
								<view>第11～25名</view>
								<view>¥500</view>
							</view>
							<view class="pp_ph_li">
								<view>三等奖</view>
								<view>第26～60名</view>
								<view>¥300</view>
							</view>
						</view>
					</view>
					<view class="pp_tip">
						<view class="tip_text">活动起止时间：2019年1月1日</view>
						<view v-if="item.bm=='1'" class="tip_btn" :data-idx="idx" @tap="bm_fuc">报名</view>
						<view v-else class="tip_btn">已报名</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				data_list: [1, 1, 1, 1],
				pinpai: [{
						bm: 1
					},
					{
						bm: 1
					},
					{
						bm: 1
					},
				]
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {

		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {

		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {

		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {

		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			uni.stopPullDownRefresh();
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {

		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {

		},
		methods: {

			bm_fuc(e) {
				var idx = e.currentTarget.dataset.idx
				var newdata = this.pinpai
				newdata[idx].bm = 2
				this.pinpai= newdata
			},
			jump(e) {
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.container {
		position: relative;
		min-height: 100vh;
		background: #f7b43b;
		padding-top: 393rpx;
		padding-bottom: 60rpx;
	}

	.h_bg {
		width: 100vw;
		height: 715rpx;
		position: absolute;
		z-index: 1;
		top: 0;
	}

	.xx_box {
		width: 100%;
		position: relative;
		z-index: 3;
		padding: 0 28rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.xx_box1 {
		width: 100%;
		background: rgba(255, 246, 230, 1);
		border: 6rpx solid rgba(250, 138, 84, 1);
		border-radius: 18rpx;
		padding: 99rpx 35rpx 35rpx;
		box-sizing: border-box;
		position: relative;
	}

	.hd_js {
		position: absolute;
		top: 23rpx;
		left: 0;
		width: 156rpx;
		height: 52rpx;
	}

	.hd_v1 {
		font-size: 28rpx;
		margin-bottom: 15rpx;
		color: #000;
	}

	.hd_v2 {
		font-size: 28rpx;
		color: #666;
	}

	.hd_jl {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
	}

	.hd_jl_tit {
		font-size: 26rpx;
		color: #FE5606;
	}

	.hd_jl_li {
		width: 248rpx;
		height: 137rpx;
		background: rgba(254, 86, 6, 1);
		/* opacity:0.2; */
		border-radius: 10rpx;
		margin-left: 16rpx;
		overflow: hidden;
	}

	.hd_jl_li image {
		width: 248rpx;
		height: 137rpx;
	}

	.hd_bg_tit {
		width: 304rpx;
		height: 57rpx;
		position: relative;
		z-index: 1;
	}

	view.hd_bg_tit {

		margin: 32rpx auto;
	}

	.hdtit_tit {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 57rpx;
		z-index: 3;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
	}

	.find_user {
		width: 100%;
		height: 164rpx;
		display: flex;
		white-space: nowrap;
	}

	.find_user1 {
		height: 164rpx;
	}

	.find_uimg {
		display: inline-flex;
		width: 274rpx;
		height: 164rpx;

		border-radius: 10rpx;
		position: relative;
		z-index: 1;
		overflow: hidden;
	}

	view.find_uimg {
		margin-right: 12rpx;
	}

	.find_zcc {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		background: rgba(0, 0, 0, .3);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
	}

	/* xx_box2 */
	.xx_box2 {

		padding-top: 36rpx;
	}

	.xx_box2+.xx_box2 {
		margin-top: 20rpx;
	}

	.pp_v1 {
		display: flex;
		align-items: center;
	}

	.pp_img {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
	}

	view.pp_img {
		margin-right: 16rpx;
	}

	.pp_msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.pp_d1 {
		display: flex;
		align-items: center;
	}

	.pp_name {
		flex: 1;
		font-size: 30rpx;
		color: #333;
	}

	.pp_to {
		font-size: 24rpx;
		color: #999;
		display: flex;
		align-items: center;
	}

	.pp_to text {
		font-size: 24rpx;
	}

	.pp_d2 {
		font-size: 24rpx;
		color: #999;
	}

	.pp_d2 text {
		color: #FE6605;
	}

	.pp_jjc {
		margin-top: 10rpx;
		display: flex;
	}

	.pp_jjc_tit {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 75rpx;
		height: 164rpx;
		background: rgba(254, 102, 5, .5);
		font-size: 26rpx;
		color: #fff;
		writing-mode: vertical-lr;
	}

	.pp_ph_list {

		flex: 1;
	}

	.pp_ph_li {
		display: flex;
		height: 54rpx;
		background: rgba(254, 102, 5, .2);
		font-size: 26rpx;
		color: #FD7E14;
	}

	.pp_ph_li view {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.pp_ph_li:nth-child(2n) {
		background: rgba(254, 102, 5, .4);
	}

	.pp_tip {
		margin-top: 10rpx;
		width: 100%;
		height: 52rpx;
		display: flex;
		align-items: center;
	}

	.tip_text {
		font-size: 22rpx;
		color: #999;
		flex: 1;
	}

	.tip_btn {
		margin-left: 10rpx;
		width: 142rpx;
		height: 52rpx;
		background: rgba(254, 102, 5, 1);
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tip_btn1 {
		background: #DCDCDC;
	}
</style>
