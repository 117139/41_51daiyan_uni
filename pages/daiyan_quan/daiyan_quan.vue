<template>
	<view>
		<view class="container">
		  <view class="index_box1">
		    <view class="sousuo_box">
		      <text class="iconfont iconsousuo"></text> 
					<input class="flex_1 c3" type="text" placeholder="搜索代言圈"
					 @input="daiyan_sousuo" 
					 confirm-type='搜索' 
					 @confirm="dy_ss_fuc"/>
		    </view>
		  </view>
		  <view class="list">
		    <view class="li_box" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/daiyan_quan_xq/daiyan_quan_xq">
		      <view class="li_img">
		        <image class="li_img" :src="filter.imgIP('tx.png')"></image>
		      </view>
		      <text class="li_name">国潮</text>
		      <view class="li_js oh2">体验国潮文化的魅力体验国潮文化的魅力</view>
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
				type:'',
				data_list:[1,1,1,1],
				daiyan_ss:''
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  var that =this
		  that.type= options.type
		  if (options.name){
		    uni.setNavigationBarTitle({
		      title: options.name,
		    })
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
		  uni.stopPullDownRefresh();
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
		methods: {
			daiyan_sousuo(e){
				console.log(e.detail.value)
				this.daiyan_ss=e.detail.value
			},
			dy_ss_fuc(e){
				console.log('sousuo')
				console.log(e.detail.value)
			},
			jump(e) {
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
	padding: 100rpx 28rpx 28rpx;
	box-sizing: border-box;
}
.list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.li_box{
	width:218rpx;
	height:306rpx;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	margin-right: 19rpx;
	margin-bottom: 19rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 17rpx;
	box-sizing: border-box;
	text-align: center;
}
.li_box:nth-child(3n){
	margin-right: 0;
}
.li_img{
	width:140rpx;
	height:140rpx;
	border-radius:50%;
	margin-bottom: 13rpx;
}
.li_name{
	font-size: 30rpx;
	color: #000;
  margin-bottom: 10rpx;
}
.li_js{
	font-size: 22rpx;
	color: #999;
}


.index_box1{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F7AC39;
  padding: 15rpx 29rpx;
  box-sizing: border-box;
  position: fixed;
  top: 0;
}


.sousuo_box{
  flex: 1;
  height:55rpx;
  background:rgba(255,255,255,1);
  border-radius:28px;
  font-size: 24rpx;
  color: #BBBBBB;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}
.sousuo_box text{
  margin-right: 20rpx;
}
</style>
