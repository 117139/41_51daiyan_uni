<template>
	<view>
		<view class="about_box" v-html="xy_datas[0].content"></view>
	</view>
</template>

<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				type:0,
				xy_datas:[]
			}
		},
		onLoad(option) {
			if(option.type=='协议'){
				this.type=1
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
			}
			if(option.type=='hz'){
				this.type=2
				uni.setNavigationBarTitle({
					title:'共享经济合作伙伴协议'
				})
			}
			if(option.type=='about'){
				this.type='about'
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
			}
			this.getdata_xy()
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
				// 停止下拉动作
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
			getdata_xy() {
				var that = this
				var datas = {
					keyword: 'ysxy',
				}
				if(that.type==2){
					datas = {
						keyword: 'hzxy',
					}
				}
				if(that.type=='about'){
					datas = {
						keyword: 'about',
					}
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
	.about_box{
	  width: 100%;
	  padding: 20rpx 28rpx;
	  box-sizing: border-box;
	  font-size: 28rpx;
	  color: #333;
	}
	.about_box image,.about_box img{
		max-width: 100%;
	}
</style>
