<template>
	<view>
		<view class="container">
			<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/game_jsbg_02.jpg')"></image>
			<view class="js_box">
				<image class="js_tit" :src="filter.imgIP('/static_s/51daiyan/images/game_js6.png')"></image>
				<scroll-view class="js_msg" scroll-y>
					<view v-html="xy_datas[0].content">1.真实购买，即可申请成为该商品的代言人(可自主決定是否代言该商品)，代言该商品后，表明您同意您所代言的商品对其他人可见。</view>  
					<!-- <view>2.一经代言，该商品因代言人的影响力引起的二次销售，将给代言人支付代言费。(退换货周期内不可提现，过了退换货时间，商品确认成交后，代言费可及时提现至代言人微信钱包绑定银行卡)。</view> 
					<view>3.只有一层关系，您的代言收益，仅取決于您能影响到的人，其他人代言该产品后达成的二次销售，跟您无关。51代言平台严厉抵制任何形式的传销行为。</view>
					<view>4.成为代言人后，可上传该商品的代言海报、照片、短视频。并发布到动态，也可分享至微信好、群。下载海报、短视频可分享至朋友圈及第三应用。</view>
					<view>5.商家推出优选代言人活动，参与条件为购买商家商品并代言，由代言人自行拍摄相关商品的代言短视频，并获得其好友投票，票数高者胜出。胜出者将获得由商家提供的现金激励，平台将对第一名进行加V置顶推荐。</view>
					<view>6.微信传播中，通过你的微信小程序分享，点击你的传播页面进入平台的用户，将自动确认好友关系。互相关注也可确认为好友</view>
					<view>7.51代言平台将对所有平台商户进行严格管理和商品品控，也请代言人对使用体验不佳的商品不要进行代言，毕竟人设还是比较重要的。 </view> -->
				</scroll-view>
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
				xy_datas:'',
			}
		},
		/**
		  * 生命周期函数--监听页面加载
		  */
		 onLoad: function (options) {
				this.getdata_xy()
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
			this.getdata_xy()
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
			getdata_xy() {
				var that = this
				var datas = {
					keyword: 'wfjs',
				}
				// 单个请求
				service.P_get('/getClause', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.xy_datas = res.data
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
		}
	}
</script>

<style scoped>

.container{
	position: relative;
}
.h_bg{
	width: 100vw;
	height: 1606rpx;
	position: relative;
	z-index: 1;
}
.js_box{
	width:694rpx;
	height:1166rpx;
	background:rgba(255,255,255,1);
	border-radius:18px;
	position: absolute;
	top: 404rpx;
	left: 28rpx;
	right: 28rpx;
	z-index: 3;
	padding: 30rpx 28rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-sizing: border-box;
}
.js_tit{
	width: 238rpx;
	height: 34rpx;
	margin-bottom: 20rpx;
	flex: none;
}
.js_msg{
	width: 100%;
	height: 1033rpx;
	font-size:24rpx;
	font-family:PingFang SC;
	color:#666666;
	line-height:36rpx;
}
.js_msg view{
	margin-bottom: 25rpx;
}
</style>
