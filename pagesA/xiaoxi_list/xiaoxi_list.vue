<template>
	<view>
		<!-- <view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view> -->
		<view class="container" >
			<view class="zanwu" v-if="data_list.length==0">暂无内容</view>
			<view class="xx_li" v-for="(item,idx) in data_list">
				<view class="user_tx" >
					<image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/xtxx.png')"></image>
				</view>
				<view class="xx_msg">
				
					<view class="to_msg">
						{{msg}}
					</view>
		      <view class="to_name">
						<!-- <text >李勇</text> -->
						<text class="time">2020-02-20 17:30</text>
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
				data_list:[
				  {},
				  {},
				  {},
				  {},
				  {},
				  {},
				],
				htmlReset:0,
				btnkg:0,
				data_last:0,
				page:1,
				size:20,
				msg:''
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
		onLoad: function (options) {
		  if (options.type==1){
		    this.msg='您代言钱包进账3元，余额变为¥235。'
		  }else{
		    this.msg= '您参与的【华为优选代言人活动】即将开始，敬请关注。'
		  }
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
		  this.onRetry()
		},
		
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
		this.getdatalist()
		},
		
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {
		
		},
		methods: {
		
			onRetry(){
				this.data_list=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/order'
				var data={
					token:that.loginMsg.userToken,
					type:that.type==0?99:that.type,
					page:that.page,
					size:that.size
				}
				if(that.data_last) return
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.get(jkurl, data,
					function(res) {
						that.btnkg=0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							that.htmlReset=0
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if(that.page==1){
								that.data_list=datas
							}else{
								if(datas.length==0){
								
									that.data_last=true
									
									return
								}
								that.data_list=that.data_list.concat(datas)
							}
							that.page++
						} else {
							that.htmlReset=1
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
						that.htmlReset=1
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			jump(e) {
			  console.log(e.currentTarget.dataset.type)
			  service.jump(e)
			}
		}
	}
</script>

<style scoped>
.container{ 
	width: 100%;
  min-height: 100vh;
	background: #f5f5f5;
}
.xx_li{
	width: 100%;
	background: #FFF;
	padding: 20rpx 22rpx;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
	display: flex;
	align-items: center;
}
.user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	position: relative;
	margin-right: 20rpx;
}
.user_tx text{
	width:14rpx;
	height:14rpx;
	background:rgba(254,58,53,1);
	border-radius:50%;
	position: absolute;
	top: 0;
	right: 0;
}
.xx_msg{
	flex: 1;
}
.to_name{
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 10rpx;
	font-size: 30rpx;
	color: #333;
	justify-content: space-between;
}
.to_name .time{
	font-size: 24rpx;
	color: #999;
}
.to_msg{
	color: #333;
	font-size: 30rpx;
  margin-bottom: 15rpx;
}
</style>
