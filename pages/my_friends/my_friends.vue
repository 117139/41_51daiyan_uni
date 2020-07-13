<template>
	<view>
		<view class="container">
			<view class="my_f_box">
				<view class="box_tit">
					<view class="td1">互赞、互评、投票、跟随购买</view>
					<view class="td2" @tap="paixun">互动频率 
						<text v-if="list_type=='0'" class="iconfont iconXSJ"></text>	
						<text v-else class="iconfont iconXSJ-copy"></text>	
					</view>
					<view class="td2" @tap="paixun1">代言商品 
						<text v-if="list_type1=='0'" class="iconfont iconXSJ"></text>
						<text v-else class="iconfont iconXSJ-copy"></text>
					</view>
				</view>
				<view class="box_tit box_li">
					<view class="td1">
						<view class="user_tx" @tap="jump" data-url="/pages/my_index/my_index">
							<image class="user_tx" src="../../static/images/tx.png"></image>
							<image class="user_v" src="../../static/images/star_b.png"></image>
						</view>
						<text>李勇</text>
					</view>
					<view class="td2">55</view>
					<view class="td2">1255件</view>
				</view>
				<view class="box_tit box_li">
					<view class="td1">
						<view class="user_tx">
							<image class="user_tx" src="../../static/images/tx.png"></image>
							<image class="user_v" src="../../static/images/star_b.png"></image>
						</view>
						<text>李勇</text>
					</view>
					<view class="td2">55</view>
					<view class="td2">1255件</view>
				</view>
				<view class="box_tit box_li">
					<view class="td1">
						<view class="user_tx">
							<image class="user_tx" src="../../static/images/tx.png"></image>
							<image class="user_v" src="../../static/images/star_b.png"></image>
						</view>
						<text>李勇</text>
					</view>
					<view class="td2">55</view>
					<view class="td2">1255件</view>
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
				list_type:0,
				list_type1:0,
			}
		},
		methods: {
			retry() {
			  this.getdata()
			},
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
			  uni.stopPullDownRefresh();
			  // this.getdata()
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
			
			paixun1(){
				var that =this
				that.list_type1=!that.list_type1
			},
			paixun(){
				var that =this
				that.list_type=!that.list_type
			},
			getdata(){
			  ///api/homeIndex
			  var that = this
			  uni.request({
			    url: service.IPurl + '/api/homeIndex',
			    data: {},
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'get',
			    success(res) {
			      // 停止下拉动作
			      wx.stopPullDownRefresh();
			      console.log(res.data)
			      if (res.data.code == 1) {  //数据为空
			
			        that.setData({
			          banner: res.data.data.homeBanner,
			          homeSeek: res.data.data.homeSeek,
			          homeTeacher: res.data.data.homeTeacher,
			          homeVideo: res.data.data.homeVideo,
			        })
			      } else {
			        wx.showToast({
			          icon: 'none',
			          title: '加载失败'
			        })
			
			      }
			    },
			    fail() {
			      // 停止下拉动作
			      wx.stopPullDownRefresh();
			      wx.showToast({
			        icon: 'none',
			        title: '加载失败'
			      })
			
			    },
			    complete() {
			      // // 停止下拉动作
			      // wx.stopPullDownRefresh();
			    }
			  })
			},
			zan(e){
			  console.log(e.currentTarget.dataset.id)
			},
			jump(e){
			  service.jump(e)
			},
			kffuc(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped>
page,.container{
	height: auto;
	min-height: 100%;
	background: #f5f5f5;
}
.my_f_box{
	width: 100%;
	background: #fff;
}
.my_f_box>view{
	display: flex;
	align-items: center;
}
.td1{
	width: 50%;
	font-size: 24rpx;
	color: #999;
}
.td2{
	width: 25%;
	font-size: 28rpx;
	color: #666;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
.td2 text{
	font-size: 10rpx;
}
.box_tit{
	min-height: 80rpx;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
}
.box_li .td1{
	font-size: 30rpx;
	color: #333;
	display: flex;
	align-items: center;
}
.user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	position: relative;
}
.user_v{
	position: absolute;
	bottom: 0;
	right: 0;
	width:27rpx;
	height:28rpx;
}
view.user_tx{
  margin-right: 10rpx;
}
.box_li .td2{
	color: #1E9526;
	font-size: 30rpx;
}
</style>
