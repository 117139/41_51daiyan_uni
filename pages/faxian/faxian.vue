<template>
	<view>
		<view class="container">
		  <view class="fx_li" @tap="jump" data-url="/pages_goods/daiyan_find/daiyan_find">
		    <image class="li_icon"  :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_02.jpg')"></image>
				<view class="fx_tit">寻找代言人</view>
				<view class="fx_r_img">
					<image v-if="datas.length>0" :src="filter.imgIP(datas[0].head_portrait)"></image>
					<!-- <text></text> -->
				</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view class="fx_li mt20" @tap="jump" data-url="/pages_goods/daiyan_sc/daiyan_sc">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_05.jpg')"></image>
				<view class="fx_tit">代言商城</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view class="fx_li" @tap="jump" data-url="/pages_goods/star_list/star_list?type=1">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_07.jpg')"></image>
				<view class="fx_tit">明星达人秀</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view class="fx_li" @tap="jump" data-url="/pages_goods/daiyan_quan/daiyan_quan">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_09.jpg')"></image>
				<view class="fx_tit">代言圈</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
			<view class="fx_li" @tap="jump" data-url="/pages_goods/zb_list/zb_list">
			  <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_05.jpg')"></image>
				<view class="fx_tit">直播</view>
			  <text class="iconfont iconnext3"></text>
			</view>
		  <view class="fx_li mt20" @tap="jump" data-url="/pagesA/my_friends/my_friends" data-login="true" :data-haslogin="hasLogin">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_11.jpg')"></image>
				<view class="fx_tit">我的好友</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view class="fx_li"  @tap="jump" data-url="/pagesA/my_guanzhu/my_guanzhu" data-login="true" :data-haslogin="hasLogin">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_13.jpg')"></image>
				<view class="fx_tit">我的关注</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view class="fx_li" @tap="jump" data-url="/pagesA/my_fans/my_fans" data-login="true" :data-haslogin="hasLogin">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_15.jpg')"></image>
				<view class="fx_tit">我的粉丝</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view class="fx_li mt20" @tap="jump" data-url="/pages_goods/daiyan_ph/daiyan_ph" data-login="true" :data-haslogin="hasLogin">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/faxian_17.jpg')"></image>
				<view class="fx_tit">代言排行</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		  <view v-if="loginMsg.identity_id==1||loginMsg.identity_id==2" class="fx_li mt20" 
				@tap="jump" data-url="/pages_goods/goods_youxuan/goods_youxuan"  data-login="true" :data-haslogin="hasLogin">
		    <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/images/fx_02.jpg')"></image>
				<view class="fx_tit">优选代言池</view>
		    <text class="iconfont iconnext3"></text>
		  </view>
		</view>
	</view>
</template>
<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import service from '../../service.js';
	export default {
		data() {
			return {
				btnkg:0,
				datas:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		onLoad() {
			this.getdata()
		},
		onPullDownRefresh() {
			this.getdata()
		},
		methods: {
			getdata() {
				var that = this
				if(that.btnkg=1){
					return
				}
				that.btnkg=1
				var datas = {
					token: that.loginMsg.userToken,
				}
				// 单个请求
				service.P_get('', datas).then(res => {
					console.log(res)
					that.btnkg=0
					if (res.code == 1) {
						that.datas = res.data.activityArr
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			jump(e){
			  service.jump(e)
			},
			pveimg(e) {
			  service.pveimg(e)
			},
		}
	}
</script>

<style scoped>
.container{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}
.fx_li{
  width: 100%;
  background: #fff;
  height: 90rpx;
  padding-right: 28rpx;
	display: flex;
	align-items: center;
	margin-bottom: 3rpx;
	
	box-sizing: border-box;
}
.li_icon{
  width: 90rpx;
  height: 90rpx;
}
.fx_tit{
	flex:1;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #333;
}
.fx_r_img{
	position: relative;
}
.fx_r_img image{
	width: 67rpx;
	height: 67rpx;
  display: block;
}
.fx_r_img text{
	position: absolute;
	top: 0;
	right: 0;
	width: 14rpx;
	height: 14rpx;
	background: #FE3A35;
	border-radius:50%;
}
.iconnext3{
	margin-left: 20rpx;
	font-size: 28rpx;
	color: #BBBBBB;
}
.mt20{
	margin-top: 20rpx;
}
</style>
