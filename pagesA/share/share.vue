<template>
	<view>
		<view class="container">
			<image class="hdzb_bg"  :src="getimg('/static_s//51daiyan/images/pro2/share_bg_02.jpg')" mode="widthFix"></image>
			<view class="avtivity_box">
				<view class="view_zzc"></view>
				<image class="avtivity_box_img"  :src="filter.imgIP(datas.act_img[0])" mode="aspectFill"></image>
				<view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
				<image class="share_main_ewm" :src="filter.imgIP(datas.user_personal_code)" mode="aspectFill"></image>
			</view>
		  <view class="hd_fx_tit">
				{{datas.merchant_name}}
				<br>
				<!-- 代言人优选征集 -->
				{{datas.act_title}}
			</view>
			<image class="share_main_tx" @tap.stop="toupiao" :src="datas.user_head_portrait" mode="aspectFill"></image>
			<view class="share_main_tip">
				我在参加{{datas.merchant_name}}{{datas.act_title}}活动，需
				要您的宝贵一票
			</view>
			<view class="toupiao_btn dis_flex aic ju_c" @tap.stop="toupiao">投票并领取红包</view>
			<view class="toupiao_btn_tip" @tap="jump" :data-url="'/pages_goods/activity/activity?id='+ad_id">查看活动详情<text class="iconfont iconnext3"></text></view>
			<!-- <view class="share_main">
				<image class="share_main_bg" :src="filter.imgIP('/static_s/51daiyan/images/share_bg_02.jpg')" mode="widthFix"></image>
				<view class="share_main_box">
					<image class="share_main_tx" @tap.stop="toupiao" :src="datas.user_head_portrait" mode="aspectFill"></image>
					<view class="share_main_tx_tp" @tap.stop="toupiao"></view>
					<view class="share_main_text">我在参与{{datas.act_title}}活动，需要您的宝贵一票</view>
					
				</view>
			</view> -->
			<!-- <view class="share_bottom">
				<view class="share_tip">
					<view>1、点击头像即可投票</view>
					<view>2、每次活动没人仅可投票一次</view>
					<view>3、扫描二维码即可进入代言人的个人主页</view>
				</view>
				<image class="share_main_ewm" :src="filter.imgIP(datas.user_personal_code)" mode="aspectFill"></image>
			</view> -->
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
				user_id:'',
				gz_id:''
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
			
			if(that.loginMsg){
				return {
					title: '51代言',
					path: '/pagesA/share/share?id='+that.ad_id+'&user_id=' + that.user_id+'&pid=' + that.loginMsg.id,
					success: function(res) {
						console.log('成功', res)
					}
				}
			}else{
				return {
					title: '51代言',
					path: '/pagesA/share/share?id='+that.ad_id+'&user_id=' + that.user_id,
					success: function(res) {
						console.log('成功', res)
					}
				}
			}
		},
		onShareTimeline(){
			
			if(that.loginMsg){
				return {
					title:'我是代言人，邀您领红包！',
					imageUrl:that.$store.state.loginMsg.avatarurl,
					query:'id='+that.ad_id+'&user_id='+that.user_id,
				}
			}else{
				return {
					title:'我是代言人，邀您领红包！',
					// imageUrl:that.$store.state.loginMsg.avatarurl,
					query:'id='+that.ad_id+'&user_id='+that.user_id,
				}
			}
		},
		onLoad(option) {
			
			that=this
			that.ad_id=option.id||''
			that.user_id=option.user_id||''
			if(option.pid){
				// this.pid = option.pid
				
				console.log('静默关注--------------------------------------》')
				if(that.loginMsg.id==option.user_id){
					// return
				}else{
					// that.guanzhuFuc(option.user_id,'affirm')
					that.gz_id=options.user_id
				}
				
			}
			
			setTimeout(function(){
				if(that.gz_id){
					that.guanzhuFuc(that.gz_id,'affirm')
				}
			},1500)
			that.getdatalist()
		},
		watch:{
			hasLogin(val){
				if(val){
					if(that.gz_id){
						that.guanzhuFuc(that.gz_id,'affirm')
					}
					
				}
			}
		},
		methods: {
			guanzhuFuc(id,key){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					type:2,
					id:id,
					operate:key,
				}
				if(key=='affirm'){
					service.P_post('/attention/operation',data).then(res => {
					  console.log(res)
						that.btnkg=0
						if(res.code==-1){
							uni.navigateTo({
								url:'/pagesA/login/login'
							})
							return
						}else if(res.code==0&&res.msg=='请先登录账号~'){
							uni.navigateTo({
								url:'/pagesA/login/login'
							})
							return
						}else if(res.code==1){
							that.gz_id=''
							// that.getdata()
							// uni.showToast({
							// 	icon:'none',
							// 	title:'操作成功'
							// })
						}else{
							
						}
					}).catch(e => {
						that.btnkg=0
					  console.log(e)
						uni.showToast({
							icon:'none',
							title:'关注失败'
						})
					})
					return
				}
				wx.showModal({
					title: '提示',
					content: '是否取消关注?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							service.P_post('/attention/operation',data).then(res => {
							  console.log(res)
								that.btnkg=0
								if(res.code==-1){
									uni.navigateTo({
										url:'/pagesA/login/login'
									})
									return
								}else if(res.code==0&&res.msg=='请先登录账号~'){
									uni.navigateTo({
										url:'/pagesA/login/login'
									})
									return
								}else if(res.code==1){
									// that.getdata()
									// uni.showToast({
									// 	icon:'none',
									// 	title:'关注成功'
									// })
								}else{
									
								}
							}).catch(e => {
								that.btnkg=0
							  console.log(e)
								uni.showToast({
									icon:'none',
									title:'操作失败'
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
				
			},
			
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
			getimg(img){
				return service.getimg(img)
			},
			jump(e) {
				service.jump(e)
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
	view,text{
		position: relative;
		z-index: 2;
	}
	.container{
		width: 100%;
		height: 100vh;
		/* height: 100vh;
		overflow: hidden; */
		background: #fff;
	  position: relative;
		padding: 30upx 30upx;
		overflow: hidden;
	}
	.hdzb_bg{
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 0;
	}
	.avtivity_box {
		position: relative;
		width: 100%;
		height: 336upx;
		border-radius: 20upx;
		border: 10upx solid #fff;
		margin-bottom: 100upx;
	}
	.view_zzc{
		top: -24upx;
		z-index: 1;
		position: absolute;
		left: 15upx;
		right: 15upx;
		height: 100upx;
		background: #FFFFFF;
		border: 10px solid #FFFFFF;
		opacity: 0.55;
		border-radius: 20upx;
	}
	.view_zzc1{
		top: -24upx;
		border-radius: 10upx;
	}
	.avtivity_box_img{
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 2;
		border-radius: 8upx;
	}
	.hd_time{
	  width: 100%;
	  position: absolute;
	  bottom: 36rpx;
	  text-align: center;
	  font-size: 24rpx;
	  color: #fff;
		z-index: 2;
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
	
	
	.share_main_ewm{
		position: absolute;
		width: 107upx;
		height: 107upx;
		top: 10upx;
		right: 10upx;
		z-index: 2;
		/* top: 628upx;
		left: 562upx; */
	}
	
	
	
	.hd_fx_tit{
		font-size: 90upx;
		font-family: HuXiaoBo-NanShen;
		font-weight: normal;
		font-style: italic;
		color: #F5F5F5;
		text-shadow: 0px 0px 10px rgba(225, 37, 3, 0.57);
		text-align: center;
	}
	
	.share_main_tx{
		width: 240upx;
		height: 240upx;
		border-radius: 50%;
		border: 2upx solid #fff;
		margin: 20upx auto;
	}
	.share_main_tip{
		width: 450upx;
		margin: 10px auto 50upx;
		font-size: 30upx;
		color: #fff;
		text-align: center;
	}
	.toupiao_btn{
		font-size: 30upx;
		color: #A0380E;
		width: 647upx;
		height: 90upx;
		background: linear-gradient(0deg, #FE611A, #FECA37);
		border: 4upx solid #fff;
		box-shadow: 0px 6upx 18upx 0px rgba(157, 0, 0, 0.32);
		border-radius: 45upx;
		margin: 10upx auto 40upx;
	}
	.toupiao_btn_tip{
		font-size: 30upx;
		color: #fff;
		margin: 10px auto 0;
		padding-bottom: 20upx;
	}
	.toupiao_btn_tip text{
		font-size: 24upx;
	}
</style>
