<template>
	<view>
		<view class='container'>
			<view class="set_name">
				<view class="set_l">售后物流</view>
				<view class="set_btn" @tap="save_val">保存</view>
			</view>
			<picker @change="bindPickerChange" data-type="wl_list" value="" :range="wl_list"   class="set_name">
				<!-- <input class="set_int" placeholder="请填写您的售后物流公司" v-model="wl_gs" maxlength="20"></input> -->
				<view class="picker_box" >
					<view>{{wl_list[wl_idx]}}</view>
					<text class="iconfont iconnext3"></text>
				</view>
			</picker>
			<view class="set_name">
				<input class="set_int" placeholder="请填写您的售后物流单号" v-model="wl_num" maxlength="50"></input>
				<view class="set_btn" @tap="wl_num=''">
					<text class="iconfont iconguanbi1"></text>
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
				id: '',
				datas:'',
				wl_list:[],
				wl_idx:0,
				wl_gs: '',
				wl_num: ''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		onLoad(option) {
			that = this
			that.id = option.id
			that.getdata()
			// this.uname=this.loginMsg.nickname
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function() {
				wx.stopPullDownRefresh();
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
			
			bindPickerChange(e){
				console.log(e)
				var datas=e.currentTarget.dataset
				if(datas.type=='wl_list'){
					this.wl_idx=e.detail.value
				}
			},
			save_val() {
				/*if (!this.wl_gs) {
					wx.showToast({
						icon: 'none',
						title: '请填写您的售后物流公司',
					})
					return
				}*/
				if (!this.wl_num) {
					wx.showToast({
						icon: 'none',
						title: '请填写您的售后物流单号',
					})
					return
				}
				var datas = {
					token: this.loginMsg.userToken,
					id: that.id,
					logistics_name: that.wl_list[that.wl_idx],
					logistics: this.wl_num,
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					mask: true,
					title: '正在提交'
				})
				var jkurl = '/afterSale/receiptLogistics'
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(res)
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						})
						var pages = getCurrentPages(); //当前页面
						var prevPage = pages[pages.length - 2]; //上一页面
						prevPage.setData({
							//直接给上一个页面赋值
							sh_wl: true,
						});

						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							})
						}, 1000)



					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				console.log(this.uname)
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
					id: that.id
				}
				// 单个请求
				service.P_get('/afterSale/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						// that.catelist=res.data
						that.wl_list = res.data.zc_logistics
					}else{
						that.htmlReset=1
					}
				}).catch(e => {
					that.htmlReset=1
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
	page {
		overflow-y: auto !important;
		background: #fff;
	}

	.container {
		width: 750rpx;
		min-height: 100vh;

		background: #fff;
		padding: 0 28rpx;
	}

	.set_name {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 95rpx;
		border-bottom: 1px solid #eee;
	}

	.set_l {
		font-size: 30rpx;
		color: #333;
	}

	.set_btn {
		font-size: 30rpx;
		color: #FE8735;

	}

	.set_int {
		flex: 1;
		font-size: 30rpx;
	}

	.set_btn text {
		color: #BBBBBB;
		font-size: 45rpx;
	}
	.picker_box{
		width: 690upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		color: #333;
	}
</style>
