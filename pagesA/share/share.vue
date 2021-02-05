<template>
	<view>
		<view class="container">
		  <view class="avtivity_box">
		    <image class="avtivity_box"  :src="filter.imgIP(datas.act_img[0])" mode="aspectFill"></image>
		    <view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
		  </view>
			<view class="share_main">
				<image class="share_main_bg" :src="filter.imgIP('/static_s/51daiyan/images/share_bg_02.jpg')" mode="widthFix"></image>
				<!-- <image class="share_main_bg" src="/static/images/share_bg_02.jpg" mode="widthFix"></image> -->
				<view class="share_main_box">
					<image class="share_main_tx" @tap.stop="toupiao" :src="datas.user_head_portrait" mode="aspectFill"></image>
					<view class="share_main_tx_tp" @tap.stop="toupiao"></view>
					<view class="share_main_text">我在参与{{datas.act_title}}活动，需要您的宝贵一票</view>
					
				</view>
			</view>
			<view class="share_bottom">
				<view class="share_tip">
					<view>1、点击头像即可投票</view>
					<view>2、每次活动没人仅可投票一次</view>
					<view>3、扫描二维码即可进入代言人的个人主页</view>
				</view>
				<image class="share_main_ewm" :src="filter.imgIP(datas.user_personal_code)" mode="aspectFill"></image>
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
				datas:'',
				ad_id:'',
				user_id:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		
		onShareAppMessage() {
			
		},
		onLoad(option) {
			
			that=this
			that.ad_id=option.id||''
			that.user_id=option.user_id||''
			that.getdatalist()
		},
		methods: {
			getdatalist() {
			
				let that = this
				var jkurl = '/activity/activityDetailsVote'
				var datas = {
					token: that.loginMsg.userToken||'',
					act_id:that.ad_id,
					user_id:that.user_id
				}
				if(that.data_last) return
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					console.log(res)
					
					that.btn_kg=0
					if (res.code == 1) {
						var datas = res.data.user_data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas=res.data
						
					}
				}).catch(e => {
					
					that.btn_kg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
				
			},
			toupiao(e) {
			  // var id = this.user_id
			  // var idx = e.currentTarget.dataset.idx
				var that =this
			  var datas = {
			  	token: that.loginMsg.userToken,
			  	aau_id:that.user_id,
					activity_id:that.ad_id
			  }
			  // 单个请求
			  service.P_post('/activity/vote', datas).then(res => {
			  	console.log(res)
			  	if (res.code == 1) {
			  		
			  		uni.showToast({
			  			icon: 'none',
			  			title: '投票成功'
			  		})
			  	}
			  }).catch(e => {
			  	console.log(e)
			  	uni.showToast({
			  		icon: 'none',
			  		title: '操作失败'
			  	})
			  })
			},
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		/* height: 100vh;
		overflow: hidden; */
		background: #fff;
	  position: relative;
		padding-bottom: 30upx;
	}
	.avtivity_box{
	  position: relative;
	  width: 100%;
	  height: 336rpx;
	}
	.hd_time{
	  width: 100%;
	  position: absolute;
	  bottom: 36rpx;
	  text-align: center;
	  font-size: 24rpx;
	  color: #fff;
	}
	.avtivity_time{
	  width:750rpx;
	  height:110rpx;
	  position: relative;
	}
	.share_main{
		/* width: 100%; */
		width: 690upx;
		/* min-height: calc(100vh - 336upx); */
		height: 750upx;
		position: relative;
		border-radius: 30upx;
		margin: 10upx auto;
		box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.2);
		overflow: hidden;
	}
	.share_main_bg{
		width: 100%;
		/* min-height: calc(100vh - 336upx); */
		min-height: 750upx;
		position: relative;
		z-index: 0;
		top: 0;
		left: 0;
	}
	.share_main_box{
		position: absolute;
		z-index: 1;
		width: 100%;
		top: 0;
		left: 0;
	}
	.share_main_tx{
		width: 146upx;
		height: 146upx;
		border-radius: 50%;
		position: absolute;
		top: 122upx;
		/* left: 307upx; */
		left: 50%;
		margin-left: -73upx;
	}
	.share_main_tx_tp{
		position: absolute;
		top: 272upx;
		width: 500upx;
		left: 50%;
		margin-left: -250upx;
		height: 100upx;
	}
	.share_main_text{
		position: absolute;
		top: 518upx;
		left: 50%;
		width: 690upx;
		margin-left: -345upx;
		font-size: 30upx;
		color: #333;
		font-weight: bold;
		text-align: center;
	}
	
	.share_bottom{
		width: 690upx;
		padding: 30upx;
		background: #fff;
		
		box-shadow: 1px 3px 10px 0px rgba(0, 0, 0, 0.2);
		border-radius: 30upx;
		margin-top: 10upx;
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.share_tip{
		width: 480upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 24upx;
		color: #333;
	}
	.share_main_ewm{
		/* position: absolute; */
		width: 143upx;
		height: 143upx;
		/* top: 628upx;
		left: 562upx; */
	}
</style>
