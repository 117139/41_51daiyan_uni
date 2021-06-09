<template>
	<view class="RedEnvelopesLzc compatibleProcessing" v-if="on" >
		<!-- <uni-nav-bar fixed="true" class="status_title" color="#000000" statusBar="true" :title="title"
			@clickLeft="back">
			<uni-icons slot="left" type="arrowleft" class="status-icon" size="17"></uni-icons>
		</uni-nav-bar> -->
		<view class="RedEnvelopesLzc-header">
			<view class="RedEnvelopesLzc-header-bg">
				<view class="RedEnvelopesLzc-header-title">
					<view class="RedEnvelopesLzc-header-title-item">
						<!-- <text>51投票红包</text> -->
						<image :src="getimg('/static_s/51daiyan/images/pro2/hb_tit_1.png')" mode="widthFix"></image>
					</view>
				</view>
				<view class="RedEnvelopesLzc-header-Tips">
					<!-- <view class="RedEnvelopesLzc-header-Tips-item-first-line">
						<image :src="headPortrait" mode=""></image>
						<text class="RedEnvelopesLzc-header-Tips-item-first-line-nick oh1">{{nick}}发出的红包</text>
					</view> -->
					<view class="RedEnvelopesLzc-header-Tips-item-second-line">
						<text class="RedEnvelopesLzc-header-Tips-item-second-line-n">{{datas.draw_money||0}}</text>
						<text class="RedEnvelopesLzc-header-Tips-item-second-line-d">{{red_type==3?'代言豆':'元'}}</text>
					</view>
					<view v-if="red_type==3" class="r_to_zh oh1" @tap="jump" data-url="/pagesA/my_qianbao1/my_qianbao1" data-login="true" :data-haslogin="hasLogin">
						<text>已存入代言豆账户 <text class="iconfont iconnext3"></text></text>
					</view>
					<view v-else class="r_to_zh oh1" data-url="/pagesA/my_qianbao/my_qianbao" @tap="jump" data-login="true" :data-haslogin="hasLogin">
						<text>已存入账户 <text class="iconfont iconnext3"></text></text>
					</view>
				</view>
			</view>
		</view>
		<view class="RedEnvelopesLzc-body-top">
			<view class="RedEnvelopesLzc-body-top-left">
				<text>已领取数量{{ datas.count_all }}个</text>
			</view>
			<view class="RedEnvelopesLzc-body-top-right">
				<text v-if="red_type==3">注：一元=100个豆</text>
			</view>
		</view>
			<!-- {{data_list}} -->
		<view class="RedEnvelopesLzc-body">
			<view class="RedEnvelopesLzc-body-item" v-for="(item,index) in data_list">
				<view class="redbao_tx ">
					<image :src="getimg(item.head_portrait)" mode="aspectFill"></image>
				</view>
				<view class="RedEnvelopesLzc-body-item-second-cum">
					<view class="RedEnvelopesLzc-body-item-second-cum-n oh1">
						{{item.nickname}}
					</view>
					<view class="RedEnvelopesLzc-body-item-second-cum-time oh1">
						{{item.create_time}}
					</view>
				</view>
				<view class="RedEnvelopesLzc-body-item-third-cum oh1">
					{{item.price}}{{red_type==3?'代言豆':'元'}}
				</view>
			</view>
			<view class="zanwu" v-if="data_list.length==0">暂无人领取</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				on:true,
				headPortrait:'/static/image/deatil/headPortrait.png',
				nick:'51代言',
				title: '红包详情',
				ReceivedAmount:1026,
				data_list:[],

				datas:'',
				red_id:'',
				red_type:'',
				size:20,
				page:1
			}
			
			
			
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				'isLogin',
				'isSDKReady',
				'conversationList'
			])
		},
		onLoad(option) {
			that=this
			this.red_id=option.id
			this.red_type=option.type
			this.getdata()
		},
		onPullDownRefresh() {
			this.page=1
			console.log(this.hasLogin)
			this.getdata()
		},
		onReachBottom() {
			
			this.getdata()
		},
		methods: {
			jump(e){
				service.jump(e)
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken||'',
					id:this.red_id,
					type:this.red_type,
					page:this.page,
					size:this.size
				}
				var page_now=this.page
				// 单个请求
				service.P_get('/publicAdvocacy/getRedPacketDetails', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						if(page_now==1){
							that.datas=res.data
							that.data_list=res.data.result
						}else{
							that.data_list=that.data_list.concat(res.data.result)
						}
						that.page++
					}else{
						if(res.msg){
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						}else{
							uni.showToast({
								icon: 'none',
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					that.htmlReset=1
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			getimg(img) {
				return service.getimg(img)
			}
		}
	}
</script>

<style scoped>
	.icon-arrow{
		margin-left: 6rpx;
	}
	.RedEnvelopesLzc {
		width: 750rpx;
		height: 100%;
	}

	.RedEnvelopesLzc-header {
		width: 100%;
		height: 506rpx;
		/* background-color: #0077AA; */
		position: relative;
	}


	.RedEnvelopesLzc-header-bg {
		width: 100%;
		height: 100%;
		/* background-color: #669900; */
		background-image: url(http://ceshi.liuzhichao.xyz/image/yunxiang/static/image/RedEnvelopesLzc/bg.png);
		background-position: center;
		background-size: cover;

	}

	.RedEnvelopesLzc-header-title {
		width: 406rpx;
		height: 107rpx;
		/* background-color: #07C160; */
		position: absolute;
		top: 28rpx;
		bottom: 371rpx;
		left: 172rpx;
		right: 172rpx;
		box-sizing: border-box;
		padding: 13rpx 88rpx 35rpx 87rpx;
	}

	.RedEnvelopesLzc-header-title-item {
		width: 100%;
		height: 100%;
		/* background-color: #795DA3; */
		display: flex;
		align-items: center;
		justify-content: center;
		
		text-shadow: 0rpx 0rpx 0rpx rgba(255, 255, 255, 0.78);
		
		/* background: linear-gradient(5rpx, #fefcf2 0%, #fdf3b7 100%); */
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;

	}

	.RedEnvelopesLzc-header-title-item image {
		width: 230upx;

	}
	.RedEnvelopesLzc-header-Tips{
		width: 690rpx;
		height: 352rpx;
		/* background-color: #123456; */
		position: absolute;
		top:154rpx;
		left:35rpx;
		right: 30rpx;
		/* opacity: 0.2; */
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.RedEnvelopesLzc-header-Tips-item-first-line{
		width: 100%;
		height: 56rpx;
		/* background-color: #007AFF; */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.RedEnvelopesLzc-header-Tips-item-first-line-nick{
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #DC7A67;
		margin-left: 16rpx;
	}
	.RedEnvelopesLzc-header-Tips-item-first-line image{
		width: 56rpx;
		height: 56rpx;
	}
	.RedEnvelopesLzc-header-Tips-item-second-line{
		width: 100%;
		height: 76rpx;
		/* background-color: #007AFF; */
		display: flex;
		align-items: baseline;
		justify-content: center;
		margin-top: 52rpx;
	}
	.RedEnvelopesLzc-header-Tips-item-second-line-n{
		font-size: 100rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #CE4031;
		line-height: 48rpx;
	}
	.RedEnvelopesLzc-header-Tips-item-second-line-d{
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #CE4031;
		/* line-height: 48rpx; */
	}
	.r_to_zh{
		width: 100%;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #DC7A67;
		margin-top: 49rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.r_to_zh .iconfont{
		font-size: 24upx;
	}
	.RedEnvelopesLzc-body-top{
		width: 100%;
		height: 82rpx;
		box-sizing: border-box;
		padding: 0 32rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.RedEnvelopesLzc-body-top-left{
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
		line-height: 48px;
	}
	.RedEnvelopesLzc-body-top-right{
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #EF5948;
	}
	
	.RedEnvelopesLzc-body{
		width: 750rpx;
		box-sizing: border-box;
		padding: 0 30rpx;
		border-top: 17rpx solid #F1F1F1;
	}
	.RedEnvelopesLzc-body-item{
		width: 100%;
		height: 135rpx;
		box-sizing: border-box;
		padding: 27rpx 0 20rpx 0;
		display: flex;
	}
	.redbao_tx{
		width: 88rpx;
		height: 88rpx;
		flex: none;
	}
	.redbao_tx image{
		width: 100%;
		height: 100%;
		border-radius: 4rpx;
	}
	.RedEnvelopesLzc-body-item-second-cum{
		width: 508rpx;
		height: 100%;
		display: flex;
		flex-direction: column;
		
	}
	.RedEnvelopesLzc-body-item-second-cum-n{
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #000000;
		margin-bottom: 20rpx;
		margin-left: 18rpx;
	}
	.RedEnvelopesLzc-body-item-second-cum-time{
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #999999;
		margin-left: 18rpx;
	}
	.RedEnvelopesLzc-body-item-third-cum{
		width:100px;
		font-size: 32rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	

	
</style>
