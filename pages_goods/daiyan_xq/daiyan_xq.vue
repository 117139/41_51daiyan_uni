<template>
	<view class="container">
		
		
		<!-- 代言圈 -->
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0" class="quan_list">
			<view class="quan_li">
				<view class="quan_user_box">
					<image @tap="jump"  :data-url="'/pages/my_index/my_index?id='+datas.user_id" class="quan_user_tx" :src="datas.user_head_portrait" mode="aspectFill"></image>
					<view class="quan_user_msg">
						<view class="quan_user_name">{{datas.user_nickname}}
							<!-- mingxing -->
							<view v-if="datas.use_identity_id==1" class="star_v">
								<image  :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							</view>
							<!-- daren -->
							<view v-if="datas.use_identity_id==2" class="star_v">
								<image  :src="filter.imgIP('/static_s/51daiyan/images/star_dbg.png')"></image>
								<text class="iconv iconfont"></text>
								<text class="user_v_lv">{{datas.user_grade_num?datas.user_grade_num:0}}</text>
							</view>
							<!-- <image v-if="datas.use_identity_id==1" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							<image v-if="datas.use_identity_id==2" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image> -->
						</view>
						<view class="quan_user_time">
							<text>{{filter.getDateTime(datas.create_time)}}</text>
							<text v-if="datas.use_identity_id==1">明星</text>
							<text v-if="datas.use_identity_id==2">达人</text>
						</view>
					</view>
					<view v-if="datas.a_activity_id>0&&datas.is_vote==2" class="quan_user_btn" @tap.stop="toupiao" :data-id="datas.user_id" :data-idx="idx">为我投票</view>
					<view v-if="datas.a_activity_id>0&&datas.is_vote==1" class="quan_user_btn quan_user_btn1">已投票</view>
				</view>
				<view class="quan_msg">
					<view class="oh4  quan_msg_text">{{datas.content}}</view>
					<view v-if="datas.img.length==1" class="quan_msg_img">
						<image v-if="datas.type==1||datas.type==3" class="one one_one" :lazy-load='true' :src="filter.imgIP(datas.img[0])" mode="aspectFill" :data-src="filter.imgIP(datas.img[0])"
						 @tap.stop="pveimg"></image>
						<image v-if="datas.type==2" class="one one_one" :lazy-load='true' :src="filter.imgIP_video(datas.img[0])" mode="aspectFill" :data-src="filter.imgIP_video(datas.img[0])"
						 @tap.stop="jump" data-type="sp" :data-spurl="datas.img" :data-url="'/pages_goods/d_video/d_video?idx=0&a_id='+datas.id"></image>
					</view>
					<view v-else class="quan_msg_img">
						<image v-if="datas.type==1" v-for="(item1,idx1) in datas.img"
						 :src="filter.imgIP(item1)" mode="aspectFill" :lazy-load='true' :data-src="filter.imgIP(item1)" :data-array="filter.getgimgarrIP(datas.img)"
						 @tap.stop="pveimg"></image>
						<image v-if="datas.type==2" v-for="(item1,idx1) in datas.img" :lazy-load='true' :src="filter.imgIP_video(item1)" mode="aspectFill" 
						 @tap.stop="jump" data-type="sp" :data-spurl="datas.img" :data-url="'/pages_goods/d_video/d_video?idx='+idx1+'&a_id='+datas.id"></image>
						<!-- <image :src="filter.imgIP('/static_s/51daiyan/images/goods1.png')" mode="aspectFill" :data-src="filter.imgIP('/static_s/51daiyan/images/goods1.png')"
						 @tap.stop="pveimg"></image>
						<image :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" mode="aspectFill" :data-src="filter.imgIP('/static_s/51daiyan/images/goods.png')"
						 @tap.stop="pveimg"></image> -->
					</view>
				</view>
				<view v-for="(item1,idx1) in datas.goods" class="quan_goods" @tap="jump" 
				 :data-url="'/pages/details/details?id='+item1.g_id+'&dy_id='+datas.id+'&advocacyviceId='+item1.id">
					<image class="quan_goods_img" :lazy-load='true' :src="filter.imgIP(item1.g_img[0])" mode="aspectFill"></image>
					<view class="quan_goods_msg">
						<view class="quan_goods_name dis_flex aic"><text v-if="item1.fk_is_way==2" class="xcxdy_zy_icon">自营</text><text class="flex_1 oh1">{{item1.g_title}}</text></view>
						<view class="quan_goods_pri">
							<text class="pri1">¥{{item1.g_current_price}}</text>
							<text class="pri2">¥{{item1.g_original_price}}</text>
						</view>
						<view class="quan_goods_btn">
							<view class="goods_btn1">库存:{{item1.g_total_number}}</view>
							<view class="goods_btn2"><text>{{item1.g_advocacy_mannumber}}</text>代言人</view>
						</view>
					</view>
				</view>
				<view class="quan_li_cz">
					<!-- <text class="iconfont iconcaozuo" @tap.stop=""></text>
	        <view class="cz_li">
	          <view>
	            <text class="iconfont iconhongxinicon"></text>赞
	          </view>
	          |
	          <view>
	           <text class="iconfont iconpinglun"></text>评论
	          </view>
	        </view> -->
					
					<view class="cz_li" style="position: relative;">
						<button type="default" open-type="share" :data-id="item.id" style="position: absolute;top: 0;opacity: 0;width: 100%;height: 100%;"></button>
						<text class="iconfont iconfenxiang2" style="color: #f00;"></text>
					</view>
					<view class="cz_li">跟随购买：{{datas.follow_buy_number}}</view>
					<view class="cz_li" @tap.stop="jump" :data-url="'/pages_goods/daiyan_pl/daiyan_pl?id='+datas.id"><text class="iconfont iconpinglun"></text>{{datas.comment_number}}</view>
					<view class="cz_li" v-if="datas.is_praise==2" @tap="guanzhuFuc_dz(4,datas.id,'affirm')" :data-id="idx">
						<text class="iconfont iconzan"></text>{{datas.praise_number}}
					</view>
					<view class="cz_li" v-if="datas.is_praise==1" @tap="guanzhuFuc_dz(4,datas.id,'cancel')" :data-id="idx">
						<text class="iconfont icondianzan2" style="color: #f00;"></text>{{datas.praise_number}}
					</view>
				</view>
			</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
		</view>
		<!-- <view class="zxkf_btn">
			<button open-type="contact" bindcontact="kffuc"></button>
			<image src="../../static/images/zxkf.png"></image>
		</view> -->
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
				btn_kg:0,
				htmlReset:-1,
				datas: '',
				page: 2,
				banner: '',
				homeSeek: '',
				homeTeacher: '',
				homeVideo: ''
			}
		},
		onLoad(option) {
			var that = this
			this.id=option.id
			that.getdata()
		},
		onShow() {
			this.btn_kg=0
			if(this.hasLogin){
				if (this.isSDKReady) {
					console.log('2222')
					// this.getConversationList()
				} else {
					console.log('333333')
				}
			}
		},
		onPullDownRefresh: function() {
			wx.stopPullDownRefresh();
			this.getdata()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getdatalist()
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage(res) {
		
			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			
			return {
				title: '51代言',
				path: '/pages_goods/daiyan_xq/daiyan_xq?id=' + res.target.dataset.id,
				success: function(res) {
					console.log('成功', res)
				}
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
		watch: {
			isSDKReady(val) {
				//isSDKReady == true 
				if (val) {
					//更新用户自己的基础资料（头像+昵称+个性签名）
					this.updateUserInfo()
					//请求会话列表
					this.getConversationList()
				}
			},


		},
		methods: {
			...mapMutations(['setAbout']),
			
			guanzhuFuc_dz(type, id, key) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					type: type,
					id: id,
					operate: key,
				}
			
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				service.P_post('/attention/operation', data).then(res => {
					console.log(res)
					that.btn_kg = 0
					if (res.code == -1) {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					} else if (res.code == 0 && res.msg == '请先登录账号~') {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					} else if (res.code == 1) {
						// that.onRetry()
						if (key == 'affirm') {
							that.$set(datas, 'is_praise', 1)
							that.$set(datas, 'praise_number', datas.praise_number-1+2)
						} else {
							that.$set(datas, 'is_praise', 2)
							that.$set(datas, 'praise_number', datas.praise_number-1)
						}
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
					} else {
			
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			
			},
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
								url:'/pages/login/login'
							})
							return
						}else if(res.code==0&&res.msg=='请先登录账号~'){
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return
						}else if(res.code==1){
							that.getdata()
							uni.showToast({
								icon:'none',
								title:'操作成功'
							})
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
										url:'/pages/login/login'
									})
									return
								}else if(res.code==0&&res.msg=='请先登录账号~'){
									uni.navigateTo({
										url:'/pages/login/login'
									})
									return
								}else if(res.code==1){
									that.getdata()
									uni.showToast({
										icon:'none',
										title:'操作成功'
									})
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
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
					id:that.id
				}
				// 单个请求
				service.P_get('/publicAdvocacy/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						that.datas = res.data
						
					}else{
						that.htmlReset=1
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
			getdatalist() {

				let that = this
				var jkurl = '/getAdvocacyList'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page
				}
				if(that.data_last) return
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
						that.btn_kg=0
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (datas.length==0) {
							// uni.showToast({
							// 	icon: 'none',
							// 	title: '到底了。。。'
							// })
							that.data_last=true
							return
						}
						that.datas = that.datas.concat(datas)

						that.page++
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
			  var id = e.currentTarget.dataset.id
			  var idx = e.currentTarget.dataset.idx
				var that =this
			  var datas = {
			  	token: that.loginMsg.userToken,
			  	aau_id:id,
					activity_id:that.data_list[idx].a_activity_id
			  }
			  // 单个请求
			  service.P_post('/activity/vote', datas).then(res => {
			  	console.log(res)
			  	if (res.code == 1) {
			  		// that.page=1
			  		// that.getdatalist()
						// that.data_list[idx].is_vote=2
						that.$set(that.data_list[idx],'is_vote',2)
			  		uni.showToast({
			  			icon: 'none',
			  			title: '操作成功'
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

			zan(e) {
				console.log(e.currentTarget.dataset.id)
			},
			jump(e) {
				
				service.jump(e)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			kffuc(e) {
				console.log(e)
			},
			retry() {
				this.getdata()
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		/* padding: 30rpx 47rpx; */
	}

	.header_box {
		width: 100%;
		padding-top: 10rpx;
		background: linear-gradient(180deg, rgba(245, 195, 61, 1), rgba(254, 133, 53, 1));
	}

	.index_box1 {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5rpx 29rpx 5rpx;
		box-sizing: border-box;
	}

	.user_tx {
		width: 74rpx;
		height: 74rpx;
		border-radius: 37px;
		margin-right: 10rpx;
	}

	.sousuo_box {
		flex: 1;
		height: 55rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 28px;
		font-size: 24rpx !important;
		color: #BBBBBB !important;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}

	.sousuo_box text {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #BBBBBB;
	}

	.game_js {
		width: 165rpx;
		height: 45rpx;
		background: linear-gradient(180deg, rgba(252, 139, 17, 1), rgba(255, 85, 25, 1));
		opacity: 0.8;
		border-radius: 0px 23px 23px 0px;
		margin-left: 30rpx;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		padding-left: 50rpx;
		box-sizing: border-box;
		position: relative;
	}

	.game_js text {
		position: absolute;
		left: -20rpx;
		font-size: 60rpx;
		color: #fff;
	}

	/* index_box2 */
	.index_box2 {
		padding: 5rpx 29rpx 20rpx;
	}

	.index_box2 view {
		color: #fff;
		font-size: 30rpx;
		position: relative;
	}

	.index_box2 .cur text {
		content: '';
		position: absolute;
		bottom: -8rpx;
		left: 50%;
		margin-left: -25rpx;
		width: 50rpx;
		height: 6rpx;
		background: rgba(255, 251, 240, 1);
		border-radius: 3px;
	}

	.index_box3 {
		height: 52rpx;
		background: #FFF4EF;
		font-size: 22rpx;
		color: #f9b234;
		justify-content: flex-start;
		padding: 10rpx 28rpx;
		align-items: center;
	}

	.index_box3 text {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #f9b234;
	}

	.index_box4 {
		height: 82rpx;
		background: #fff;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;
	}

	.index_box4 text {
		color: #FE8735;
	}

	.start_list {
		width: 100%;


		background: #fff;
		height: 286rpx;
		display: flex;
		white-space: nowrap;
		margin-bottom: 20rpx;

	}

	.start_list1 {
		padding: 10rpx 29rpx 40rpx;
		box-sizing: border-box;
		height: 286rpx;
	}

	.start_li {
		display: inline-flex;
		width: 198rpx;
		height: 246rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		margin-right: 20rpx;
		flex-direction: column;
		align-items: center;
		padding: 17rpx;
		box-sizing: border-box;
	}

	.star_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
		margin-bottom: 20rpx;
	}

	.star_tx>image {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
		z-index: 1;

	}

	.star_tx view image {
		width: 27rpx;
		height: 28rpx;
		position: absolute;
		bottom: 0;
		right: -5rpx;
		z-index: 2;
	}

	.star_name {
		max-width: 100%;
		font-size: 30rpx;
		line-height: 30rpx;
		margin-bottom: 20rpx;
		color: #333;
	}

	.star_btn {
		width: 100%;
		height: 56rpx;
		background: rgba(254, 135, 53, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
	}

	.find_star {
		background: #fff;
		padding: 19rpx 29rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.find_tit {
		display: flex;
		flex-direction: column;
		justify-content: space-around
	}

	.find_tit text {
		font-size: 24rpx;
		color: #FE8735;
	}

	.find_sj {

		display: flex;
		align-items: center;
	}

	.find_sj>text {
		color: #EEEEEE;
		font-size: 24rpx;
		margin-left: 20rpx;
	}

	.sj_list {
		display: flex;
		flex-direction: row-reverse;
	}

	.sj_li {
		width: 96rpx;
		height: 96rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 10rpx 0px rgba(119, 119, 119, 0.2);
		border-radius: 50%;
		position: relative;
		z-index: 10;
	}

	.sj_li:nth-child(2) {
		position: relative;
		left: 20rpx;
		z-index: 9;
	}

	.sj_li:nth-child(3) {
		position: relative;
		left: 40rpx;
		z-index: 8;
	}

	.sj_li:nth-child(4) {
		position: relative;
		left: 60rpx;
		z-index: 7;
	}

	.sj_li:nth-child(5) {
		position: relative;
		left: 80rpx;
		z-index: 6;
	}

	/* goods_index */

	.goods_index {
		width: 100%;
		background: #fff;
		display: flex;
		margin-bottom: 20rpx;
	}

	.goods_index>view {
		flex: 1;
		padding: 15rpx 18rpx;
		box-sizing: border-box;
	}

	.goods_index>view+view {
		border-left: 1rpx solid #eee;
	}

	.goodstype_name {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.goodstype_name image {
		width: 142rpx;
		height: 40rpx;
		margin-left: 5rpx;
	}

	.goodstype_name1 image {
		width: 40rpx;
	}

	.goods_tip {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #999;
	}

	.goods_list {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
		justify-content: space-between;
		padding-bottom: 10rpx;
	}

	.goods_li {
		position: relative;
		width: 156rpx;
		height: 156rpx;
	}

	.goods_img {
		width: 156rpx;
		height: 156rpx;
		border-radius: 12rpx;
		position: relative;
		z-index: 1
	}

	.goods_play {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		z-index: 2;
		width: 38rpx;
		height: 38rpx;
	}

	/* quan */
	.quan_list {
		width: 100%;
	}

	.quan_li {
		width: 100%;
		background: #fff;
		padding: 23rpx 28rpx 0;
		box-sizing: border-box;
	}

	.quan_li+.quan_li {
		margin-top: 20rpx;
	}

	.quan_user_box {
		display: flex;
		align-items: center;
	}

	.quan_user_tx {
		width: 74rpx;
		height: 74rpx;
		/* background:rgba(252,68,56,1); */
		border-radius: 37rpx;
		margin-right: 22rpx;
	}

	.quan_user_btn {
		font-size: 28rpx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 168rpx;
		height: 56rpx;
		background: rgba(254, 58, 53, 1);
		border-radius: 10rpx;
		margin-left: 20rpx;
	}

	.quan_user_btn1 {
		background: #ddd;
	}

	.quan_user_msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.quan_user_name {
		font-size: 28rpx;
		color: #6876BD;
		display: flex;
		align-items: center;
	}

	/* .quan_user_name image {
		width: 28rpx;
		height: 28rpx;
		margin-left: 10rpx;
	} */

	.quan_user_time {
		font-size: 22rpx;
		color: #999;
	}

	.quan_user_time text {
		margin-right: 20rpx;
	}

	.quan_msg {
		width: 100%;
		padding-left: 96rpx;
		box-sizing: border-box;
		margin-top: 16rpx;
		font-size: 30rpx;
		color: #333;

	}

	.quan_msg_text {
		line-height: 40rpx;
		margin-bottom: 20rpx;
	}

	.quan_msg_img image {
		width: 196rpx;
		height: 196rpx;
		border-radius: 10rpx;
		margin-right: 4rpx;
		margin-bottom: 4rpx;
	}

	.quan_msg_img image:nth-child(3n) {
		margin-right: 0;
	}

	.quan_msg_img image.one {
		max-width: 100%;

		border-radius: 10rpx;
	}
	.quan_msg_img .one_one{
		width: 300rpx;
		height: 400rpx;
	}
	.quan_goods {
		margin-top: 16rpx;
		width: 100%;
		height: 238rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
	}

	.quan_goods_img {
		width: 196rpx;
		height: 196rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.quan_goods_msg {
		flex: 1;
	}

	.quan_goods_name {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 22rpx;
	}

	.quan_goods_pri {
		color: #EB4443;
		font-size: 30rpx;
		margin-bottom: 50rpx;
	}

	.quan_goods_pri .pri2 {
		margin-left: 20rpx;
		text-decoration: line-through;
		color: #999;
	}

	.quan_goods_btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #333;
	}

	.goods_btn1 {
		padding: 0 9rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(254, 135, 53, 1);
		border-radius: 10rpx;
		color: #fff;
	}

	.goods_btn2 text {
		color: #FE8735;
		margin-right: 5upx;
	}

	.quan_li_cz {
		width: 100%;
		margin-top: 15rpx;
		height: 70rpx;
		display: flex;
		/* flex-direction: row-reverse; */
		justify-content: space-between;
		align-items: center;
	}

	.quan_li_cz .iconcaozuo {
		font-size: 48rpx;
		color: #BBBBBB;
	}

	.cz_li {

		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #999;
		font-size: 24rpx;
	}

	.cz_li text {
		font-size: 26rpx;
		color: #999;
		margin-right: 10rpx;
	}
</style>
