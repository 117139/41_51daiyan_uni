<template>
	<view>
		<view class="container">
			<view class="tixian_box">
				<image  class="tixian_box" src="../../static/images/tx_bg_02.jpg"></image>
				<view class="money_yue">
					<view class="d1">¥<text>1000.00</text></view>
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
					<view class="tx_type1"><image src="../../static/images/images/tx_bg_05.jpg"></image> 微信提现</view>
					<icon  v-if="tx_type==0" type="success" size="18" color="#F7B43B" />
					<view v-else class="tx_type2">
						
					</view>
				</view>
				<view class="tx_type" :class="tx_type==1? 'cur':''" data-type="1" @tap="txtype_fuc">
					<view  class="tx_type1"><image src="../../static/images/images/tx_bg_09.jpg"></image> 银行卡</view>
					
					<icon  v-if="tx_type==1" type="success" size="18" color="#F7B43B" />
					<view v-else class="tx_type2">
					</view>
				</view>
			</view>
			
			<view class="tx_mon_box" v-if="tx_type==1">
				<view class="tx_mon_box_tit">
					<text>提现账号</text>
					<view @tap="jump" data-url="/pages/my_tx_add/my_tx_add"><text class="iconfont icon-tainjia" ></text> <text>添加银行卡</text></view>
				</view>
				<view class="crad_id " :class="tx_crad==0? 'cur':''" data-type="0" @tap="txcrad_fuc">
					<image src="../../static/images/cradbg.png"></image>
					<text  class="flex_1">中国建设银行  ********753</text>
					<icon  v-if="tx_crad==0" type="success" size="18" color="#F7B43B" />
					<view v-else class="tx_type2">
						
					</view>
				</view>
				<view class="crad_id " :class="tx_crad==1? 'cur':''" data-type="1" @tap="txcrad_fuc">
					<image src="../../static/images/cradbg.png"></image>
					<text class="flex_1">中国建设银行  ********753</text>
					<icon  v-if="tx_crad==1" type="success" size="18" color="#F7B43B" />
					<view v-else class="tx_type2">
						
					</view>
				</view>
			</view>
			<view class="sq_tx" @tap="tx_sub">申请提现</view>
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
				tx_type:0,
				tx_crad:0,
				tx_mon:0,
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
			wx.stopPullDownRefresh();
		},
		methods: {
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
						icon:'none',
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
</style>
