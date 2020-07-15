<template>
	<view>
		<view class='container'>
		  
		  <view class="set_name">
		    <view class="set_l">开户银行</view>
		    <input class="set_int" placeholder="请填写开户银行" @input="get_val" :value="yname"></input>
		    
		  </view>
		  <view class="set_name">
		    <view class="set_l">持卡人姓名</view>
		    <input class="set_int" placeholder="请填写持卡人姓名" @input="get_val1" :value="xname"></input>
		    
		  </view>
		  <view class="set_name">
		    <view class="set_l">卡号</view>
		    <input class="set_int" placeholder="请填写卡号" @input="get_val2" :value="crad_id"></input>
		    
		  </view>
		  <view class="sq_tx" @tap="save_val">申请提现</view>
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
				yname:'',
				xname:'',
				crad_id: '',
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
		},
		methods: {
			reset_val(){
			  this.uname=''
			}, 
			bindTimeChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.shengri = e.detail.value
			  this.shengri= this.shengri
			},
			get_val(e) {
			  console.log(e.detail)
			  this.yname= e.detail.value
			},
			get_val1(e) {
			  console.log(e.detail)
			  this.xname= e.detail.value
			},
			get_val2(e) {
			  console.log(e.detail)
			  this.crad_id= e.detail.value
			},
			save_val() {
			  if (!this.yname) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入开户银行',
			    })
			    return
			  }
			  if (!this.xname) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入持卡人姓名',
			    })
			    return
			  }
			  if (!this.crad_id) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入卡号',
			    })
			    return
			  }
			  wx.showToast({
			    title: '保存',
			  })
			  setTimeout(function () {
			    wx.navigateBack()
			  }, 1000)
			  console.log(this.yname)
			  console.log(this.xname)
			  console.log(this.crad_id)
			}
		}
	}
</script>

<style scoped>
page{
	overflow-y: auto!important;
	background: #fff;
}
.container{
	width: 750rpx;
	min-height: 100vh;
	
	background: #fff;
  padding: 20rpx 28rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.set_name{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
	background:rgba(245,245,245,1);
	border-radius:10rpx;
  height: 95rpx;
  border-bottom: 1px solid #eee;
	margin-bottom: 20rpx;
	padding: 0 28rpx;
	box-sizing: border-box;
}
.set_l{
  font-size: 30rpx;
  color: #BBBBBB;
	width: 5em;
}
.set_btn{
  font-size: 30rpx;
  color: #FE8735;
  
}
.set_int{
  flex: 1;
  font-size: 30rpx;
  text-align: center;
}
.set_btn text{
  color: #BBBBBB;
  font-size: 45rpx;
}
.msg_val{
  flex: 1;
  flex-direction: row-reverse
}
.sq_tx{
	display: flex;
	align-items: center;
	justify-content: center;
	width:694rpx;
	height:80rpx;
	background:rgba(254,135,53,1);
	border-radius:10rpx;
	font-size: 30rpx;
	color: #fff;
	margin: 50rpx auto;
}
</style>
