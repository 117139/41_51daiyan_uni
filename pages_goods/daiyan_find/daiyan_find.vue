<template>
	<view>
		<view class="container">
			<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/find_dy_02.jpg')"></image>
			<view class="xx_box">
				<view class="xx_box1">
					<image class="hd_js" :src="filter.imgIP('/static_s/51daiyan/images/hd_js.png')"></image>
					<view class="hd_v1">平台合作品牌商征集代言人入围条件：</view>
					<view class="hd_v2">1.购买品牌商指定的商品，购买并代言。</view>
					<view class="hd_v2">2.由代言人拍摄短视频，制作代言海报，并上传。</view>
					<view class="hd_v2">3.由代言人所得票数，决定代言人排位。</view>
					<view class="hd_jl">
						<view class="hd_jl_tit">奖励：</view>
						<view class="hd_jl_li">
							<image class="" :src="filter.imgIP('/static_s/51daiyan/images/hd_jl1.png')"></image>
						</view>
						<view class="hd_jl_li">
							<image class="" :src="filter.imgIP('/static_s/51daiyan/images/hd_jl2.png')"></image>
						</view>
					</view>
				</view>

				<view class="hd_bg_tit">
					<image class="hd_bg_tit" :src="filter.imgIP('/static_s/51daiyan/images/hd_jl_tit.png')"></image>
					<view class="hdtit_tit">他们在寻找代言人</view>
				</view>
				<view v-if="store.length==0" class="zanwu">暂无数据</view>
				<scroll-view v-else class="find_user" scroll-x>
					<view class="find_user1">
						<view class="find_uimg" v-for="(item,idx) in store" @tap="jump"
						 :data-url="'/pages_goods/dp_index/dp_index?id='+item.group_code">
							<image class="find_uimg" :src="filter.imgIP(item.head_portrait)" mode="aspectFit"></image>
							<view class="find_zcc">{{item.store_name}}</view>
						</view>
					</view>
				</scroll-view>
				<view class="hd_bg_tit">
					<image class="hd_bg_tit" :src="filter.imgIP('/static_s/51daiyan/images/hd_jl_tit.png')"></image>
					<view class="hdtit_tit">品牌代言人招募</view>
				</view>
				<view v-if="activity.length==0" class="zanwu">暂无数据</view>
				<view v-else class="xx_box1 xx_box2" v-for="(item,idx) in activity">
					<view class="pp_v1">
						<view class="pp_img">
							<image class="pp_img" :src="filter.imgIP(item.head_portrait)"></image>
						</view>
						<view class="pp_msg">
							<view class="pp_d1">
								<view class="pp_name oh1">{{item.title}}</view>
								<!-- #ifdef H5 -->
								<view  @tap="jump" :data-url="'/pagesA/share/share?id='+item.id+'&user_id='+loginMsg.id">活动分享</view>
								<!-- #endif -->
								<view v-if="item.is_finish==2" class="pp_to" @tap="jump" :data-url="'/pages_goods/activity/activity?id='+item.id">活动详情<text class="iconfont iconnext3"></text>
								</view>
								<view v-else class="pp_to" @tap="jump" :data-url="'/pagesA/zhanbao/zhanbao?id='+item.id">活动战报<text class="iconfont iconnext3"></text></view>
							</view>
							<view class="pp_d2">招募<text>{{item.recruit_number}}</text>人</view>
						</view>
					</view>
					<view class="pp_jjc">
						<view class="pp_jjc_tit">奖金池</view>
						<view class="pp_ph_list">
							<view v-for="(item1,idx1) in 3" class="pp_ph_li">
								<view v-if="item.award[idx1]">{{item.award[idx1].title}}</view>
								<view v-if="item.award[idx1]">第{{item.award[idx1].ranking}}名</view>
								<view v-if="item.award[idx1]">¥{{item.award[idx1].bonus}}</view>
							</view>
							
						</view>
					</view>
					<view  v-if="item.is_finish==2" class="pp_tip">
						<view class="tip_text">活动起止时间：{{filter.getDate_ymd(item.start_time)}}-{{filter.getDate_ymd(item.end_time)}}</view>
						<view v-if="item.is_apply=='1'" class="tip_btn" :data-id="item.id" @tap="bm_fuc">报名</view>
						<view v-else class="tip_btn" style="background-color: #ddd;">已报名</view>
					</view>
					<view v-else class="pp_tip">
						<view class="tip_text">活动起止时间：已结束</view>
						<view class="tip_btn" style="background-color: #ddd;">已结束</view>
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
	var that
	export default {
		data() {
			return {
				btnkg:0,
				store: [],
				activity: []
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			that=this
				this.getdata()
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
			this.getdata()
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
		onShareTimeline(){
			return {
				title:'51代言',
				query:'pid=' + that.loginMsg.id,
			}
		},
		methods: {
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
				}
				// 单个请求
				service.P_get('/activity', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.datas = res.data
						that.store = res.data.store
						//代言数据
						that.activity = res.data.activity
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			bm_fuc(e) {
				var id = e.currentTarget.dataset.id
				// var newdata = this.pinpai
				// newdata[idx].bm = 2
				// this.pinpai= newdata
				var that=this
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				var datas = {
					token: that.loginMsg.userToken,
					id:id
				}
				// 单个请求
				service.P_post('/activity/join', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.btnkg=0
						
						that.getdata()
						uni.showToast({
							title:'报名成功'
						})
					}else{
						that.btnkg=0
						// that.getdata()
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				}).catch(e => {
						that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
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
		background: #fff;

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

		padding: 36rpx 22rpx 35rpx;
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
		margin-left: 5rpx;
		width: 128rpx;
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
