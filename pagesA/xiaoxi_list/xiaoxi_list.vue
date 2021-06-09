<template>
	<view>
		<!-- <view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view> -->
		<view class="container">
			<view class="zanwu" v-if="datas.length==0">暂无内容</view>
			<view class="xx_li" v-for="(item,idx) in datas">
				<view class="user_tx">
					<image v-if="item.send_type!=1" class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/xtxx.png')"></image>
					<image v-else class="user_tx" :src="filter.imgIP(item.head_portrait)"  @tap="xz_fuc(item)"></image>
				</view>
				<view class="xx_msg">

					<view v-if="item.send_type==2" class="to_msg oh2" data-url="/pagesA/my_qianbao/my_qianbao" @tap="jump" data-login="true" :data-haslogin="hasLogin">
						{{item.msg}}
					</view>
					<view v-else-if="item.send_type==3" class="to_msg oh2"  @tap="jump" :data-url="'/pages_goods/activity/activity?id='+item.send_type_obj_id">
						{{item.msg}}
					</view>
					<view v-else class="to_msg oh2" @tap="xz_fuc(item)">
						{{item.msg}}
					</view>
					<view class="to_name">
						<!-- <text >李勇</text> -->
						<text class="time">{{filter.getDateTime(item.create_time)}}</text>
						<text v-if="item.send_type==1&&item.is_draw==2" class="get_btn"  @tap="get_yh(item,item.send_type_obj_id)">领取</text>
						<text v-if="item.send_type==1&&item.is_draw==1" class="get_btn get_btn1">已领</text>
					</view>
				</view>
			</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
			<view v-if="tk_show==true" class="tk_box"  @touchmove.stop.prevent='test'>
				
				<view class="tk_main">
					<text class="iconfont iconguanbi" @tap="tk_show=false"></text>
					<image  @tap="jump" :data-url="'/pages_goods/details/details?id='+tk_data.goodsDataArr.id" class="tk_goodsimg" :src="filter.imgIP(tk_data.goodsDataArr.img[0])" mode="aspectFill"></image>
					<view  @tap="jump" :data-url="'/pages_goods/details/details?id='+tk_data.goodsDataArr.id" class="tk_goodsname oh1">{{tk_data.goodsDataArr.title}}</view>
					<view  @tap="jump" :data-url="'/pages_goods/details/details?id='+tk_data.goodsDataArr.id" class="tk_goods_pri">
						<view class="tk_pri1">¥<text>{{tk_data.goodsDataArr.current_price}}</text></view>
						<view class="tk_pri2">代言费:<text>¥{{tk_data.goodsDataArr.advocacy_price}}</text></view>
					</view>
					<view  v-if="tk_data.merchantDataArr" class="dp_b1"  @tap="jump" :data-url="'/pages_goods/dp_index/dp_index?id='+tk_data.merchantDataArr.id">
					  <view class="dp_logo">
					    <image :src="filter.imgIP(tk_data.merchantDataArr.head_portrait)" mode="aspectFill"></image>
					  </view>
					  <view class="dp_msg">
					    <view class="dp_name oh1">{{tk_data.merchantDataArr.store_name}}</view>
							<view class="dis_flex">
								<view class="dp_lv">
								  <image v-if="idx<5" v-for="(item,idx) in tk_data.merchantDataArr.rank" :src="filter.imgIP('/static_s/51daiyan/images/dp_zuan.png')"></image>
								</view>
							</view>
					   
					    <view class="dp_bq">
					      <text>代言 {{tk_data.merchantDataArr.advocacy_number?tk_data.merchantDataArr.advocacy_number:'0'}}</text>
					      <text class="flex_1">粉丝数 {{tk_data.merchantDataArr.fans_number?tk_data.merchantDataArr.fans_number:'0'}}</text>
					    </view>
						
					  </view>
					</view>
					
					<view v-if="tk_data.couponDataArr" class="yhq_li_img">
						<!-- <image v-if="item.is_use==2" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/yhq_bg_10.png')"  mode="aspectFill"></image>
						<block v-if="item.is_use==1"> -->
							<!-- <image class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/mj.png')"  mode="aspectFill"></image> -->
							<image v-if="tk_data.couponDataArr.coupon_setting_type==1" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/mj.png')"  mode="aspectFill"></image>
							<image v-if="tk_data.couponDataArr.coupon_setting_type==2" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/yhq_zk.png')"  mode="aspectFill"></image>
							<image v-if="tk_data.couponDataArr.coupon_setting_type==3" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/yhq_mf.png')"  mode="aspectFill"></image>
						<!-- </block> -->
						<view class="yhq_pri">
							<view class="d1" v-if="tk_data.couponDataArr.coupon_setting_type==1"><text>¥{{tk_data.couponDataArr.coupon_c_money*1}}元 </text> {{tk_data.couponDataArr.coupon_setting_type_value}}</view>
							<view class="d1" v-if="tk_data.couponDataArr.coupon_setting_type==2"><text>¥{{tk_data.couponDataArr.coupon_discount_ratio?tk_data.couponDataArr.coupon_discount_ratio/10:tk_data.couponDataArr.coupon_discount_ratio}}折 </text> {{tk_data.couponDataArr.coupon_setting_type_value}}</view>
							<view class="d1" v-if="tk_data.couponDataArr.coupon_setting_type==3"><text>全额抵扣</text> {{tk_data.couponDataArr.coupon_setting_type_value}}</view>
							<view class="d2">{{filter.getDate_ymd(tk_data.couponDataArr.coupon_use_start_time,'.')}}-{{filter.getDate_ymd(tk_data.couponDataArr.coupon_use_end_time,'.')}}</view>
						</view>
						
					</view>
					<view class="tk_tip">欢迎您领券免费拿商品，如果您体验还不错，希望您能为我们的商品代言！</view>
					<view v-if="tk_data.couponDataArr.is_draw==1" class="tk_sub_btn">已领取</view>
					<view v-else class="tk_sub_btn" @tap="get_yh(tk_data,tk_data.couponDataArr.id)">立即领取</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import Vue from 'vue'
	import service from '../../service.js';

	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				type: 0,
				datas: [],
				htmlReset: 0,
				btnkg: 0,
				data_last: false,
				page: 1,
				size: 20,
				msg: '',
				tk_data:'',
				tk_show:false
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.type = options.type
			if (options.type == 1) {
				this.msg = '您代言钱包进账3元，余额变为¥235。'
			} else {
				this.msg = '您参与的【华为优选代言人活动】即将开始，敬请关注。'
			}
			this.getdatalist()
		},
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.onRetry()
			uni.stopPullDownRefresh()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			// this.getdatalist()
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {

		},
		methods: {
			test(){},
			xz_fuc(item){
				var that =this
				
				var jkurl='/message/getDxyyInfo'
				var datas={
					token:that.loginMsg.userToken,
					id:item.send_type_obj_id
				}
				service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						
						if(datas.goodsDataArr.is_set==1){
							that.tk_data=datas
							that.tk_show=true
						}else{
							uni.showToast({
								icon:'none',
								title:'该商品已下架'
							})
						}
						
				
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			onRetry() {
				this.data_list = []
				this.page = 1
				this.btnkg = 0
				this.data_last = false
				this.getdatalist()
			},
			get_yh(item,id){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					id:id
				}
				// uni.showToast({
				// 	icon:'none',
				// 	title:'领取成功'
				// })
				// setTimeout(()=>{
				// 	that.tk_show=false
				// 	that.onRetry()
				// },1000)
				// return
				service.P_post('/goods/getInviteCoupon',data).then(res => {
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
						
						uni.showToast({
							icon:'none',
							title:'领取成功'
						})
						// Vue.set(item,'is_draw',1)
						setTimeout(()=>{
							that.tk_show=false
							that.onRetry()
						},1000)
					}else{
						if(res.msg){
							uni.showToast({
								icon:'none',
								title:res.msg
							})
						}else{
							uni.showToast({
								icon:'none',
								title:'操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon:'none',
						title:'操作失败'
					})
				})
			},
			
			getdatalist() {
				var that = this
				var jkurl = '/message/list'
				var datas = {
					token: that.loginMsg.userToken || '',
					type: this.type,
					page: this.page,
					size: this.size
				}
				if (that.data_last) {
					return
				}
				if (this.btnkg == 1) {
					return
				}
				this.btnkg = 1
				uni.showLoading({
					title: '正在获取数据',
					mask: true
				})
				var page_that = that.page
				service.P_get(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						if (page_that == 1) {

							that.datas = datas
						} else {
							if (datas.length == 0) {
								that.data_last = true
								return
							}
							that.datas = that.datas.concat(datas)
						}
						that.page++

					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			jump(e) {
				console.log(e.currentTarget.dataset.type)
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
	}

	.xx_li {
		width: 100%;
		background: #FFF;
		padding: 20rpx 22rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
	}

	.user_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
		margin-right: 20rpx;
	}

	.user_tx text {
		width: 14rpx;
		height: 14rpx;
		background: rgba(254, 58, 53, 1);
		border-radius: 50%;
		position: absolute;
		top: 0;
		right: 0;
	}

	.xx_msg {
		flex: 1;
	}

	.to_name {
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		font-size: 30rpx;
		color: #333;
		justify-content: space-between;
	}

	.to_name .time {
		font-size: 24rpx;
		color: #999;
	}

	.to_msg {
		color: #333;
		font-size: 30rpx;
		margin-bottom: 15rpx;
	}

	.get_btn {
		width: 60rpx;
		height: 32rpx;
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		line-height: 22rpx;
		color: #f00;
		border: 1px solid #f00;
	}
	.get_btn1{
		color: #999;
		border:1px solid #999;
	}
	.tk_box{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 900;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0,0,0,.5);
	}
	.tk_main{
		width: 568upx;
		max-height: 98%;
		background: #FFFFFF;
		border-radius: 4upx;
		padding: 20upx;
		position: relative;
		overflow-y: scroll;
	}
	.tk_goodsimg{
		width: 450upx;
		height: 450upx;
		display: block;
		margin: 0 auto 20upx;
	}
	.tk_goodsname{
		font-size: 30upx;
		line-height: 40upx;
		color: #666;
		width: 480upx;
		margin: 0 auto 10upx;
	}
	.tk_goods_pri{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 480upx;
		margin: 0 auto 10upx;
	}
	.tk_pri1{
		font-size: 26upx;
		color: #F85951;
	}
	.tk_pri1 text{
		font-size: 36upx;
		color: #F85951;
	}
	.tk_pri2{
		font-size: 26upx;
		color: #666;
	}
	.tk_pri2 text{
		font-size: 30upx;
		color: #F85951;
	}
	
	.dp_b1{
	  width: 532upx;
	  /* height: 130upx; */
	  background: #FFFFFF;
	  box-shadow: 0px 0px 18upx 0px rgba(0, 0, 0, 0.13);
	  border-radius: 4upx;
	  display: flex;
		padding: 12upx;
		margin: 0 auto 15upx;
	}
	.dp_logo{
	 width: 101upx;
	 height: 101upx;
	 border-radius: 10upx;
	}
	.dp_logo image{
	 width: 101upx;
	 height: 101upx;
	 border-radius: 10upx;
	}
	.dp_msg{
	  flex: 1;
	  height: 101upx;
	  margin-left: 20rpx;
	  /* display: flex; */
	  flex-direction: column;
	  justify-content: space-between;
	}
	.dp_name{
	  font-size: 24rpx;
	  color: #333;
	}
	.dp_lv{
	  margin-top: 10rpx;
	  display: flex;
	  align-items: center;
	  max-width:158rpx;
	  height:31rpx;
	  background:#FFEEDC;
	  border-radius:4rpx;
	  padding: 0 4rpx;
	}
	.dp_lv image{
	  width:25rpx;
	  height:21rpx;
	}
	.dp_lv image+image{
	  margin-left: 5upx;
	}
	.dp_bq{
	  font-size: 22rpx;
	  color: #333;
	  display: flex;
	  align-items: center;
	}
	
	.yhq_li_img{
		/* width:650rpx; */
	  width:568upx;
		/* height:236rpx; */
		height:206rpx;
		position: relative;
		z-index: 1;
	}
	.yhq_pri{
		width:350upx;
		height:206rpx;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 9;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.yhq_pri .d1{
		font-size:30rpx;
		color: #fff;
	}
	.yhq_pri .d1 text{
		font-size:  38rpx;
	}
	.yhq_pri .d2{
		margin-top: 10rpx;
		font-size: 20rpx;
		color: #fff;
	}
	.tk_tip{
		width: 532upx;
		margin: 25upx auto ;
		font-size: 28upx;
		color: #333;
		font-size: 28upx;
	}
	.tk_sub_btn{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 492upx;
		height: 59upx;
		background: rgba(254, 135, 53, 1);
		border-radius: 30upx;
		margin: 0 auto;
		color: #fff;
		font-size: 30upx;
	}
	.iconguanbi{
		position: absolute;
		top: 10upx;
		right: 10upx;
		font-size: 30upx;
		color: #B3B3B3;
	}
</style>
