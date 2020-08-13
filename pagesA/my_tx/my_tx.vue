<template>
	<view>
		<view class="container">
			<view class="tixian_box">
				<image class="tixian_box" :src="filter.imgIP('/static_s/51daiyan/images/tx_bg_02.jpg')"></image>
				<view class="money_yue">
					<view class="d1">¥<text>{{loginMsg.money}}</text></view>
					<view class="d2">可提现金额</view>
				</view>
			</view>
			<!-- 提现金额 -->
			<view class="tx_mon_box">
				<view class="tx_mon_box_tit">提现金额</view>
				<view class="tx_int"><text>￥</text><input type="number" placeholder="0.00" @input="get_val" :value="uname" /></view>
			</view>
			<view class="tx_mon_box">
				<view class="tx_mon_box_tit">提现方式</view>
				<view class="tx_type" :class="tx_type==0? 'cur':''" data-type="0" @tap="txtype_fuc">
					<view class="tx_type1">
						<image :src="filter.imgIP('/static_s/51daiyan/images/images/tx_bg_05.jpg')"></image> 微信提现
					</view>
					<!-- <icon  v-if="tx_type==0" type="success" size="18" color="#F7B43B" /> -->
					<image v-if="tx_type==0" class="tx_type2" src="../../static/images/duigou.png"></image>
					<view v-else class="tx_type2">

					</view>
				</view>
				<view class="tx_type" :class="tx_type==1? 'cur':''" data-type="1" @tap="txtype_fuc">
					<view class="tx_type1">
						<image :src="filter.imgIP('/static_s/51daiyan/images/images/tx_bg_09.jpg')"></image> 银行卡
					</view>

					<!-- <icon  v-if="tx_type==1" type="success" size="18" color="#F7B43B" /> -->

					<image v-if="tx_type==1" class="tx_type2" src="../../static/images/duigou.png"></image>
					<view v-else class="tx_type2">
					</view>
				</view>
			</view>

			<view class="tx_mon_box"  v-if="tx_type==1">
				<view class="tx_mon_box_tit">
					<text>提现账号</text>
					<view @tap="jump" data-url="/pagesA/my_tx_add/my_tx_add"><text class="iconfont icon-tainjia"></text> <text>添加银行卡</text></view>
				</view>
				

			</view>
			<view class="zanwu" v-if="bank_list.length==0">暂无数据</view>
			
			
			<uni-swipe-action v-if="tx_type==1" style="width: 750upx;background: #fff;">
				<uni-swipe-action-item v-for="(item,idx) in bank_list" :options="options" 
					@click="onClick($event,idx,item.id,item)" @change="change"
					:data-id='item.id'>
					<view  class="crad_id " :class="tx_crad==idx? 'cur':''">
						<image :src="filter.imgIP('/static_s/51daiyan/images/cradbg.png')"></image>
						<text class="flex_1">{{item.cardholder}} {{item.card}}</text>
						<!-- <icon   type="success" size="18" color="#F7B43B" /> -->
						<image :data-type="idx" @tap="txcrad_fuc" v-if="tx_crad==idx" class="tx_type2" src="../../static/images/duigou.png"></image>
						<view  :data-type="idx" @tap="txcrad_fuc" v-else class="tx_type2"></view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
			<view class="sq_tx" @tap="tx_sub">申请提现</view>
		</view>

	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	import uniSwipeAction from '../../components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '../../components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				tx_type: 0,
				tx_crad: 0,
				tx_mon: 0,
				bank_list: [],
				options: [{
					text: '编辑',
					style: {
						color: '#3171F5',
						backgroundColor: 'rgba(87,107,149,.2)'
					}
				}, {
					text: '删除',
					style: {
						color: '#E64340',
						backgroundColor: 'rgba(230,67,64,.2)'
					}
				}]
			}
		},
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				'order_ls_data'
			])
		},
		onLoad: function(option) {
			var that = this
			if (option.type) {
				that.form_type = option.type
				that.yhlist_idx = option.idx
			}
			this.getbankCard()
		},
		onShow() {
			this.getbankCard()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			wx.stopPullDownRefresh();
		},
		methods: {

			change(open) {
				console.log('当前开启状态：' + open)
			},
			onClick(e, idx, id, item) {
				console.log(e)
				console.log(idx)
				// console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
				if (e.index == 0) {
					console.log(item)
					// uni.navigateTo({
					// 	url:'../fabu_set/fabu?id='+id+'&type='+item.type
					// })
				}
				if (e.index == 1) {
					this.sc_d_fuc(id)
				}
			},
			sc_d_fuc(id) {
				uni.showToast({
					icon: 'none',
					title: '删除' + id
				})
			},
			getbankCard() {
				// const pageState1 = pageState.default(this)
				// /cart
				let that = this
				var jkurl = '/bankCard'
				var datas = {
					token: that.loginMsg.userToken
				}

				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						that.bank_list = datas

					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},

			txtype_fuc(e) {
				console.log(e.currentTarget.dataset.type)
				this.tx_type = e.currentTarget.dataset.type
			},
			txcrad_fuc(e) {
				console.log(e.currentTarget.dataset.type)
				this.tx_crad = e.currentTarget.dataset.type
			},
			get_val(e) {
				console.log(e.detail)
				this.tx_mon = e.detail.value
			},
			tx_sub() {
				var that = this
				if (that.tx_mon == 0) {
					wx.showToast({
						icon: 'none',
						title: '请输入提现金额',
					})
					return
				}
				wx.showToast({
					title: '提现',
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
		min-height: 100vh;
		background: #f5f5f5;
	}

	.tixian_box {
		width: 100%;
		height: 287rpx;
		position: relative;

	}

	.money_yue {
		position: absolute;
		top: 85rpx;
		left: 28rpx;
		color: #fff;
		font-size: 30rpx;
	}

	.money_yue text {
		font-size: 60rpx;
	}

	.money_yue .d1 {
		margin-bottom: 20rpx;
	}

	.tx_mon_box {
		width: 100%;
		padding: 22rpx 28rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 20rpx;
	}

	.tx_mon_box_tit {
		font-size: 30rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
	}

	.tx_mon_box_tit view {
		display: flex;
		align-items: center;

	}

	.tx_mon_box_tit view text {
		margin-left: 10rpx;
		font-size: 30rpx;
	}

	.tx_int {
		font-size: 36rpx;
		color: #333;
		display: flex;
		margin-top: 10rpx;
		align-items: flex-end;
	}

	.tx_int text {
		margin-right: 10rpx;
	}

	.tx_int input {
		font-size: 48rpx;
	}

	.tx_type {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 87rpx;
	}

	.tx_type+.tx_type {
		border-top: 1px solid #eee;
	}

	.tx_type1 {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #666;
	}

	.tx_type1 image {
		width: 56rpx;
		height: 56rpx;
		margin-right: 10rpx;
	}

	

	
	.crad_id {
		width: 100%;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #666;
		height: 88rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0 28rpx;
	}

	.crad_id+.crad_id {
		border-top: 1rpx solid #eee;
	}

	.crad_id image {
		width: 43rpx;
		height: 44rpx;
		margin-right: 10rpx;
	}
	.tx_type2 {
			width: 38rpx!important;
			height: 38rpx!important;
			border: 1px solid rgba(210, 210, 210, 1);
			border-radius: 50%;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			box-sizing: border-box;
			margin-right: 0!important;
		}
		.cur .tx_type2 {
			border: 0;
		}
		
	.sq_tx {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 352rpx;
		height: 80rpx;
		background: rgba(254, 135, 53, 1);
		border-radius: 10rpx;
		font-size: 30rpx;
		color: #fff;
		margin: 50rpx auto;
	}
</style>
