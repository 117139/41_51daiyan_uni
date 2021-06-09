<template>
	<view>
		<view class="container">
			<view class="tixian_box">
				<image  class="tixian_box" :src="filter.imgIP('/static_s/51daiyan/images/tx_bg_02.jpg')"></image>
				<view class="money_yue">
					<view class="d1">¥<text>{{my_d}}</text></view>
					<view class="d2">余额</view>
				</view>
			</view>
			<!-- 提现金额 -->
				<view class="w100" >
				<view class="cw_list"	v-for="(item1,idx1) in cw_data">
					<view class="cw1">
						<view class="fz28 c3">{{item1.change_type_value}} <text style="margin-left: 10px;font-size: 20upx;color: #666;">{{item1.is_release==1?'待入账':''}}</text></view>
						<view v-if="item1.desc!==''" class="fz24 c9">{{item1.desc}}</view>
					</view>
					<view class="cw1 cw2">
						<view class="fz32 cee1111">{{item1.symbol}}{{item1.price}}</view>
						<!-- <view v-if="item1.AddTime" class="fz24 c9">{{filter.getTime(item1.AddTime)}}</view> -->
						<view v-if="item1.create_time" class="fz24 c9">{{item1.create_time}}</view>
					</view>
				</view>
		    
		    <view v-if="data_last" class="data_last">我可是有底线的哟~</view>
		    <!-- <template is="htmlStatus" data="...htmlStatus" /> -->
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
				btnkg:0,
				data_last:false,
				page:1,
				size:20,
				my_d:0,
				cw_data:[]
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),
			
		},
		onLoad(option) {
			this.onRetry()
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
				this.cw_data=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/user/money'
				var data={
					token:that.loginMsg.userToken,
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
							that.my_d=datas.money
							if(that.page==1){
								that.cw_data=datas.data
							}else{
								if(datas.data.length==0){
								
									that.data_last=true
									
									return
								}
								that.cw_data=that.cw_data.concat(datas.data)
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
			
			
			txtype_fuc(e){
				console.log(e.currentTarget.dataset.type)
				this.tx_type=e.currentTarget.dataset.type
			},
			txcrad_fuc(e){
				console.log(e.currentTarget.dataset.type)
				this.tx_crad=e.currentTarget.dataset.type
			},
			get_val(e){
				console.log(e.detail )
				this.tx_mon= e.detail.value
			},
			tx_sub(){
				var that = this
				if(that.tx_mon==0){
					wx.showToast({
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
.container{
	min-height: 100vh;
	background: #f5f5f5;
}
.tixian_box{
	width: 100%;
	height:287rpx;
	position: relative;
	
}
.money_yue{
	position: absolute;
	top: 85rpx;
	left: 28rpx;
	color: #fff;
	font-size: 30rpx;
}

.money_yue text{
	font-size: 60rpx;
}
.money_yue .d1{
	margin-bottom: 20rpx;
}
.tx_mon_box{
	width: 100%;
	padding: 22rpx 28rpx;
	box-sizing: border-box;
	background: #fff;
	margin-bottom: 20rpx;
}
.tx_mon_box_tit{
	font-size: 30rpx;
	color: #333;
	display: flex;
	justify-content: space-between;
}
.tx_mon_box_tit view{
	display: flex;
	align-items: center;
	
}
.tx_mon_box_tit view text{
	margin-left: 10rpx;
	font-size: 30rpx;
}
.tx_int{
	font-size: 36rpx;
	color: #333;
	display: flex;
	margin-top: 10rpx;
	align-items: flex-end;
}
.tx_int text{
	margin-right: 10rpx;
}
.tx_int input{
	font-size: 48rpx;
}
.tx_type{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 87rpx;
}
.tx_type+.tx_type{
	border-top: 1px solid #eee;
}
.tx_type1{
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #666;
}
.tx_type1 image{
	width: 56rpx;
	height: 56rpx;
	margin-right: 10rpx;
}
.tx_type2{
	width:38rpx;
	height:38rpx;
	border:1px solid rgba(210,210,210,1);
	border-radius:50%;
}
.cur .tx_type2{
	border: 0;
}
.crad_id{
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #666;
	height: 88rpx;
}
.crad_id+.crad_id{
	border-top: 1rpx solid #eee;
}
.crad_id image{
	width:43rpx;
	height:44rpx;
	margin-right: 10rpx;
}
.sq_tx{
	display: flex;
	align-items: center;
	justify-content: center;
	width:352rpx;
	height:80rpx;
	background:rgba(254,135,53,1);
	border-radius:10rpx;
	font-size: 30rpx;
	color: #fff;
	margin: 50rpx auto;
}



.cw_list{
	width: 100%;
	height: 130rpx;
	padding: 25rpx 40rpx 25rpx 20rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	display: flex;
	/* flex-direction: column; */
	justify-content: space-between;
	background-color: #fff;
	margin-bottom: 2rpx;
}
.cw1{
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.cw2{
	align-items: flex-end;
}
.cee1111{
	color: #e11;
}
</style>
