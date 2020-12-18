<template>
	<view>
		<!-- <view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view> -->
		<view class="container">
			<view class="zanwu" v-if="datas.length==0">暂无内容</view>
			<view class="xx_li" v-for="(item,idx) in datas">
				<view class="user_tx">
					<image v-if="item.send_type!=1" class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/xtxx.png')"></image>
					<image v-else class="user_tx" :src="filter.imgIP(item.head_portrait)"></image>
				</view>
				<view class="xx_msg">

					<view v-if="item.send_type==2" class="to_msg oh2" data-url="/pagesA/my_qianbao/my_qianbao" @tap="jump" data-login="true" :data-haslogin="hasLogin">
						{{item.msg}}
					</view>
					<view v-else-if="item.send_type==3" class="to_msg oh2"  @tap="jump" :data-url="'/pages_goods/activity/activity?id='+item.send_type_obj_id">
						{{item.msg}}
					</view>
					<view v-else class="to_msg oh2">
						{{item.msg}}
					</view>
					<view class="to_name">
						<!-- <text >李勇</text> -->
						<text class="time">{{filter.getDateTime(item.create_time)}}</text>
						<text v-if="item.send_type==1&&item.is_draw==2" class="get_btn"  @tap="get_yh(item,item.send_type_obj_id)">领取</text>
						<text v-if="item.send_type==1&&item.is_draw==1" class="get_btn get_btn1">已领</text>
					</view>
				</view>
			</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
				type: 0,
				datas: [],
				htmlReset: 0,
				btnkg: 0,
				data_last: false,
				page: 1,
				size: 20,
				msg: ''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.type = options.type
			if (options.type == 1) {
				this.msg = '您代言钱包进账3元，余额变为¥235。'
			} else {
				this.msg = '您参与的【华为优选代言人活动】即将开始，敬请关注。'
			}
			this.getdatalist()
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.onRetry()
			uni.stopPullDownRefresh()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			// this.getdatalist()
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {

		},
		methods: {

			onRetry() {
				this.data_list = []
				this.page = 1
				this.btnkg = 0
				this.data_last = false
				this.getdatalist()
			},
			get_yh(item,id){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					id:id
				}
				service.P_post('/goods/getInviteCoupon',data).then(res => {
					console.log(res)
					that.btnkg=0
					if(res.code==-1){
						uni.navigateTo({
							url:'/pages/login/login'
						})
						return
					}else if(res.code==0&&res.msg=='请先登录账号~'){
						uni.navigateTo({
							url:'/pages/login/login'
						})
						return
					}else if(res.code==1){
						
						uni.showToast({
							icon:'none',
							title:'领取成功'
						})
						Vue.set(item,'is_draw',1)
					}else{
						if(res.msg){
							uni.showToast({
								icon:'none',
								title:res.msg
							})
						}else{
							uni.showToast({
								icon:'none',
								title:'操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon:'none',
						title:'操作失败'
					})
				})
			},
			
			getdatalist() {
				var that = this
				var jkurl = '/message/list'
				var datas = {
					token: that.loginMsg.userToken || '',
					type: this.type,
					page: this.page,
					size: this.size
				}
				if (that.data_last) {
					return
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						if (page_that == 1) {

							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++

					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			jump(e) {
				console.log(e.currentTarget.dataset.type)
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
	}

	.xx_li {
		width: 100%;
		background: #FFF;
		padding: 20rpx 22rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
	}

	.user_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
		margin-right: 20rpx;
	}

	.user_tx text {
		width: 14rpx;
		height: 14rpx;
		background: rgba(254, 58, 53, 1);
		border-radius: 50%;
		position: absolute;
		top: 0;
		right: 0;
	}

	.xx_msg {
		flex: 1;
	}

	.to_name {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		font-size: 30rpx;
		color: #333;
		justify-content: space-between;
	}

	.to_name .time {
		font-size: 24rpx;
		color: #999;
	}

	.to_msg {
		color: #333;
		font-size: 30rpx;
		margin-bottom: 15rpx;
	}

	.get_btn {
		width: 60rpx;
		height: 32rpx;
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		line-height: 22rpx;
		color: #f00;
		border: 1px solid #f00;
	}
	.get_btn1{
		color: #999;
		border:1px solid #999;
	}
</style>
