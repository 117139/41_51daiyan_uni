<template>
	<view>
		<view class='container'>
		  <view class="set_name">
		    <view class="set_l">个人简介</view>
		    <view class="set_btn" @tap="save_val">保存</view>
		  </view>
		  <view class="set_name">
		    <textarea placeholder="请填写您的个人简介" confirm-type="保存" @confirm="save_val" @input="get_val"
				:value="uname"></textarea>
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
				uname:'',
				sname:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		onLoad() {
			this.uname=this.loginMsg.introduction
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
			  wx.stopPullDownRefresh();
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
			reset_val(){
			  this.uname=''
			},
			get_val(e){
			  console.log(e.detail )
			  this.sname= e.detail.value
			},
			save_val(){
			  if (!this.sname){
			    wx.showToast({
			      icon: 'none',
			      title: '请输入您的个人简介',
			    })
			    return
			  }
			  var data={
			  	token:this.loginMsg.userToken,
			  	introduction:this.sname,
			  }
			  service.setUsermsg(data)
			  setTimeout(function (){
			    wx.navigateBack()
			  },1000)
			  console.log(this.sname)
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
  padding: 0 28rpx;
}
.set_name{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  min-height: 95rpx;
  border-bottom: 1px solid #eee;
}
.set_l{
  font-size: 30rpx;
  color: #333;
}
.set_btn{
  font-size: 30rpx;
  color: #FE8735;
  
}
.set_name textarea{
  font-size: 30rpx;
  width: 100%;  
  height:280rpx;
  background:rgba(238,238,238,1);
  border-radius:10rpx;
  padding: 20rpx;
  box-sizing: border-box;
}
</style>
