<template>
	<view>
		<view class="container">
			<!-- goods_li -->
			<view class="zanwu" v-if="datas.length==0">暂无数据</view>
			<view class="goods_list2">
				<view class="goods_li2" v-for="(item,idx) in datas">
					<view class="goods_li2_d1" @tap="jump" :data-url="'/pages/details/details?id='+item.obj_id">
						<view class="goods_img2">
							<image class="goods_img2" :src="filter.imgIP(item.obj_img)"></image>
						</view>
						<view class="goods_msg">
							<view class="goods_name2 fz30 oh1">{{item.obj_name}}</view>
							<view class="goods_pri">
								<view class="pri1">¥{{item.v_current_price?item.v_current_price:0}}</view>
								<view class="pri2">代言费：¥{{item.advocacy_price?item.advocacy_price:0}}</view>
							</view>
							<view class="goods_btn1">
								<view class="goods_dy_num2"><text class="iconfont icondianzan2"></text>{{item.advocacy_mannumber}}代言人</view>
							</view>
						</view>
					</view>

					<view class="sc_box" @tap="guanzhuFuc" :data-id="item.obj_id">
						<view>
							<text class="iconfont iconguanbi1"></text>
							删除</view>
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
				dy_mon: 0,
				dy_num: 0,
				dy_pri: 0,
				page: 1,
				page_size: 20,
				datas: [],
				loading_type: 0
			}
		},
		onLoad() {
			this.getdata()
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function() {
				this.onRetry()
			},
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function() {
				this.getdata()
			},

			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function() {

			},
			onRetry() {
				this.btnkg = 0
				this.page = 1
				this.getdata()
			},
			getdata() {
				let that = this
				if (that.loading_type == 1) {
					return
				} else {
					that.loading_type = 1
				}
				var jkurl = '/attention/collectList'
				var data = {
					token: that.loginMsg.userToken,
					page: that.page,
					size: that.page_size
				}
				service.get(jkurl, data,
					function(res) {
						that.loading_type = 0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)

							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if (that.page == 1) {
								that.datas = datas
							} else {
								if (datas.address.length) {
									uni.showToast({
										icon: 'none',
										title: '到底了。。。'
									})
									return
								}
								that.datas = that.datas.concat(datas)
							}
							that.page++
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.loading_type = 0

						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})

					}
				)
			},
			guanzhuFuc(e) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					type: 5,
					id: e.currentTarget.dataset.id,
					operate: 'cancel',
				}
				wx.showModal({
					title: '提示',
					content: '是否删除?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if (that.btnkg == 1) {
								return
							} else {
								that.btnkg = 1
							}
							service.P_post('/attention/operation', data).then(res => {
								console.log(res)
								that.btnkg = 0
								if (res.code == -1) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
									return
								} else if (res.code == 0 && res.msg == '请先登录账号~') {
									uni.navigateTo({
										url: '/pages/login/login'
									})
									return
								} else if (res.code == 1) {
									that.onRetry()
									uni.showToast({
										icon: 'none',
										title: '操作成功'
									})
								} else {

								}
							}).catch(e => {
								that.btnkg = 0
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			},
			jump(e) {
				service.jump(e)
			},
			px_fuc(e) {
				var that = this
				var type = e.currentTarget.dataset.type
				if (type == 0) {
					that.dy_mon = !that.dy_mon
				}
				if (type == 1) {
					that.dy_num = !that.dy_num
				}
				if (type == 2) {
					that.dy_pri = !that.dy_pri
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #f5f6f8;
		position: relative;
		padding: 0rpx 28rpx 28rpx;
		box-sizing: border-box;
	}


	.goods_list2 {
		margin-top: 20rpx;
		width: 100%;
	}

	.goods_li2 {
		width: 100%;
		border-radius: 12rpx;
		background: #fff;
		padding: 20rpx 24rpx 0;
		box-sizing: border-box;
		margin-bottom: 20rpx;
	}

	.goods_li2_d1 {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.goods_img2 {
		width: 196rpx;
		height: 196rpx;
		border-radius: 12rpx;

	}

	.goods_msg {
		height: 196rpx;
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods_pri {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.pri1 {
		font-size: 30rpx;
		color: #C3AA76;
	}

	.pri2 {
		font-size: 24rpx;
		color: #999;
	}

	.goods_btn1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goods_dy_num2 {
		font-size: 24rpx;
		color: #bbb;
	}

	.goods_dy_num2 text {
		font-size: 24rpx;
		color: #bbb;
	}

	.goods_to {
		width: 152rpx;
		height: 66rpx;
		background: #FE8735;
		border-radius: 33rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
	}

	.goods_li2_d2 {
		width: 100%;
		height: 58rpx;
		background: rgba(250, 251, 253, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		padding: 0 13rpx;
		box-sizing: border-box;
	}

	.dy_tx {
		width: 38rpx;
		height: 38rpx;
		border-radius: 50%;
	}

	.dy_star {
		font-size: 24rpx;
		color: #5E73A1;
		margin-left: 15rpx;
	}

	.dy_text {
		flex: 1;
		font-size: 24rpx;
		color: #bbb;
	}

	.sc_box {
		border-top: 1px solid #eee;
		display: flex;
		align-items: center;
		width: 100%;
		height: 70rpx;
		font-size: 28rpx;
		color: #fe8735;
		flex-direction: row-reverse
	}

	.sc_box text {
		font-size: 28rpx;
		color: #fe8735;
		margin-right: 5rpx;
	}
</style>
