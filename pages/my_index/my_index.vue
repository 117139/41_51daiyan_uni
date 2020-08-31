<template>
	<view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==0&&!datas" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view class="container">
			<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/images/my_indexbg_02.jpg')"></image>
			<view class="h_main">
				<view class="my_index_box1">
					<view class="my_index">
						<view class="user_tx">
							<image class="user_tx" :src="datas.head_portrait"></image>
							<image v-if="item.identity_id==1" class="star_v" :src="filter.imgIP('/static_s/51daiyan/images/images/star_b.png')"></image>
							<image v-if="item.identity_id==2" class="star_v" :src="filter.imgIP('/static_s/51daiyan/images/images/star_d.png')"></image>
						</view>
						<view class="user_msg">
							<view class="user_name">
								<text>{{datas.remark?datas.remark:datas.nickname}}</text> 
								<text v-if="loginMsg.id!=datas.id&&datas.is_attention==2" @tap="jump" :data-url="'/pagesA/my_setBeizhu/my_setBeizhu?id='+datas.id+'&name='+datas.remark" class="iconfont iconbeizhu" style="margin-left: 10upx;"></text>
							</view>
							<view class="daiyan_lv"><text class="iconfont iconxingzhuang60kaobei2"></text>代言星级 {{datas.advocacy_grade_value}}</view>
						</view>
						<view v-if="loginMsg.id!=datas.id" class="gz_btn gz_btn1" @tap="toroom(datas.identification_id)" :data-url="'/pages/tim/room?id='+datas.id">私信</view>
						<view v-if="loginMsg.id!=datas.id&&datas.is_attention==2" class="gz_btn" @tap="guanzhuFuc(datas.id,'cancel')">已关注</view>
						<view v-if="loginMsg.id!=datas.id&&datas.is_attention==1" class="gz_btn" @tap="guanzhuFuc(datas.id,'affirm')">+关注</view>
					</view>
					<view class="dy_id">
						<text v-if="datas.remark">昵称：{{datas.nickname}}</text>
						<text>代言号：{{datas.identification_id}}</text>
						<text>粉丝：{{datas.fans_number}}</text>
					</view>
					<view class="dy_bq">
						<view>
							<!-- <text class="iconfont iconnv"></text> -->
							{{datas.age?datas.age:0}}岁
						</view>
						<view v-if="datas.school">{{datas.school}}</view>
						<view  v-if="datas.province">{{datas.province}}{{datas.province==datas.city?'':datas.city}}{{datas.county}}</view>
					</view>
					<view class="inr_box">
						<view class="yue_li">
							<view class="zhishu"><text>{{datas.advocacy_goods_number}}</text>件</view>
							<view>代言商品</view>
						</view>
						<view class="yue_li">
							<view class="zhishu"><text>{{datas.follow_buy_goods_number}}</text>件</view>
							<view>跟随购买</view>
						</view>
						<view class="yue_li">
							<!-- <view class="zhishu"><text>{{datas.exceed_number}}</text>%</view> -->
							<view v-if="exceed_number_bl>-1" class="zhishu"> <text>{{exceed_number_bl?exceed_number_bl:0}}</text>%</view>
							<view v-if="exceed_number_bl==-1" class="zhishu"> <image class="loading_img" :src="filter.imgIP('/static_s/51daiyan/images/loading_more.gif')" mode=""></image></view>
							<view>超过好友</view>
						</view>
						<view class="yue_li">
							<view class="zhishu"><text>{{datas.public_benefit_number}}</text></view>
							<view>公益指数</view>
						</view>
					</view>
				</view>
				<view class="my_tab">
					<view :class="s_type==1?'cur':''" @tap="ss_type" data-type="1">动态</view>
					<view :class="s_type==2?'cur':''" @tap="ss_type" data-type="2">视频</view>
					<view :class="s_type==3?'cur':''" @tap="ss_type" data-type="3">相册</view>
					<view :class="s_type==4?'cur':''" @tap="ss_type" data-type="4">代言商品</view>
				</view>
				<!-- 动态 -->
				<view v-if="s_type==1" class="my_list">
					<view class="time_li" v-for="(item,idx) in data_list">
						<view class="time_v">
							<view v-if="gettime1(idx)">
								<text >{{gettime(item.create_time,1)}}</text><text class="month">{{gettime(item.create_time,2)}}月</text>
							</view>
							<view v-if="gettime1(idx)" style="font-size: 30rpx;">
								<text v-if="gettime(item.create_time,4)!=1">{{gettime(item.create_time,3)}}</text>
							</view>
						</view>
						<view class="time_box">
							<view class="dt_li">
								<view class="dt_li_d1">
									<image v-if="item.type==2" class="dt_li_d1_img" :lazy-load='true' mode="aspectFill" :src="filter.imgIP_video(item.img[0])" :data-src="filter.imgIP_video(item.img[0])"
									  @tap.stop="jump" :data-url="'/pages/my_video/my_video?uid='+uid+'&idx='+item.g_id"></image>
									<image v-if="item.type!=2" class="dt_li_d1_img" :lazy-load='true' mode="aspectFill" :src="filter.imgIP(item.img[0])" :data-src="filter.imgIP(item.img[0])" :data-array="filter.getgimgarrIP(item.img)"
									 @tap.stop="pveimg"></image>
									<view class="d1_msg">
										<view class="dt_text oh3">{{item.content}}</view>
										<view class="dt_cz">
											<view>共{{item.img.length>0?item.img.length:0}}张</view>
											<view v-if="item.a_activity_id>0&&item.is_vote==2" @tap.stop="toupiao" :data-id="item.id" :data-idx="idx" class="tp_btn">投票</view>
											<view v-if="item.a_activity_id>0&&item.is_vote==1" class="tp_btn tp_btn1">已投票</view>
										</view>
									</view>
								</view>
								<view v-for="(item1,idx1) in item.goods" class="quan_goods" @tap="jump" :data-url="'/pages/details/details?id='+item1.g_id">
									<image class="quan_goods_img" :lazy-load='true' :src="filter.imgIP(item1.g_img[0])" mode="aspectFill" :data-src="filter.imgIP(item1.g_img[0])"
									 ></image>
									<view class="quan_goods_msg">
										<!-- <view class="quan_goods_name oh1">{{item1.g_title}}</view> -->
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
							</view>
						</view>
					</view>
				</view>
				<!-- 视频 -->
				<view v-if="s_type==2" class="my_list">
					<view class="sp_list">
						<view class="sp_li sp_li_v" v-for="(item,idx) in data_list" @tap="jump" :data-url="'/pages/my_video/my_video?uid='+uid+'&idx='+item.a_id">
							<view class="sp_li_img">
								<image class="sp_li_img" :lazy-load='true' :src="filter.imgIP_video(item.img[0])" mode="aspectFill"></image>
								<view class="sp_li_img_cz">
									<image :src="filter.imgIP('/static_s/51daiyan/images/goods_play.png')"></image>
								</view>
							</view>
							<view class="sp_li_msg" style="display: none;">
								<view class="sp_li_name oh2"></view>
								<view class="sp_li_time"></view>
							</view>
						</view>
					</view>
				</view>
				<!-- 相册 -->
				<view v-if="s_type==3" class="my_list">
					<view class="sp_list">
							
							<view class="my_li_xc" v-for="(item1,idx1) in data_list">
								<!-- <image class="my_li_xc_img" :src="filter.imgIP(item1.img[0])" mode="aspectFill"
								 :data-src="filter.imgIP(item1.img[0])" :data-array="filter.getgimgarrIP(item1.img)" @tap.stop="pveimg"></image> -->
								<image class="my_li_xc_img" :lazy-load='true' :src="filter.imgIP(item1.img[0])" mode="aspectFill"
								 :data-src="filter.imgIP(item1.img[0])" @tap.stop="pveimg"></image>
								<!-- <view class="xc_gb"><text class="iconfont iconguanbi"></text></view> -->
								<view class="like_num"><text class="iconfont iconhongxinicon"></text>{{item1.praise_number}}</view>
							</view>

					</view>
					<!-- <view class="b_box">
						<view>管理</view>
						<view>上传</view>
					</view> -->
				</view>
				<!-- 代言商品 -->
				<view v-if="s_type==4" class="my_list">
					<view class="sp_list">
						<view class="sp_li sp_li_g" v-for="(item,idx) in data_list" @tap="jump" :data-url="'/pages/details/details?id='+item.g_id">
							<view class="sp_li_img">
								<image class="sp_li_img" :lazy-load='true' :src="filter.imgIP(item.g_img[0])" mode="aspectFill"></image>
							</view>
							<view class="sp_li_msg">
								<view class="sp_li_name oh2">{{item.g_title}}</view>
								<view class="sp_li_time">{{gettime(item.create_time,4)==2?gettime(item.create_time,3)+'年':''}}{{gettime(item.create_time,2)}}月{{gettime(item.create_time,1)}}日</view>
							</view>
						</view>
					</view>
				</view>
				
				<view v-if="data_list.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
				uid:'',
				htmlReset:0,
				btn_kg: 0,
				data_last:false,
				exceed_number_bl:-1,
				s_type: 1,
				datas: '',
				data_list: [],
				page: 1,
				size: 20,
				gz_type: false
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			uni.showLoading({
				title:'正在加载中'
			})
			this.uid = options.id
			this.getdata()
			this.getdata_cy()
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getdata()
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {

		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {

		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.onRetry()
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
		onShareAppMessage: function() {

		},
		methods: {
			onRetry(){
				this.getdata()
				this.data_list=[]
				this.getdata_cy()
			},
			
			// onRetry() {
			// 	this.page = 1
			// 	this.data_list = []
			// 	this.data_last=false
			// 	this.getdatalist()
			// },
			getdata_cy() {
				var that = this
				var datas = {
					id: that.uid,
				}
				// 单个请求
				service.P_get('/user/getExceedFriend', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.exceed_number_bl = res.data.exceed_number_bl
						
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			toroom(id){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/login/login',
					});
					return
				}
				this.$store.commit('createConversationActive', id)
				uni.navigateTo({
					url: '/pages/tim/room?id='+id
				})
			},
			gettime(time,type) {
				if(type==1){
					return service.gettime(time).date
				}else if(type==2){
					return service.gettime(time).month
				}else if(type==3){
					return service.gettime(time).year
				}else{
					return service.gettime(time).type
				}
			},
			gettime1(idx){
				var that =this
				if(idx==0){
					return true
				}else{
					var time1=that.data_list[idx-1].create_time
					var time2=that.data_list[idx].create_time
					if(service.gettime(time1).year==service.gettime(time2).year&&service.gettime(time1).month==service.gettime(time2).month&&service.gettime(time1).date==service.gettime(time2).date){
						return false
					}else{
						return true
					}
				}
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken?that.loginMsg.userToken:'',
					user_id: that.uid
				}
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_get('/star/homepage', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.datas = res.data
						that.btn_kg = 0
						that.htmlReset=0
						that.page = 1
						that.data_list = []
						that.data_last=false
						that.getdatalist()
					}else{
						that.htmlReset=1
					}
				}).catch(e => {
					that.btn_kg = 0
					that.htmlReset=1
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
						that.data_list[idx].is_vote=2
						
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
			getdatalist() {

				let that = this
				var jkurl = '/star/getHomepageData'
				var datas = {
					token: that.loginMsg.userToken,
					user_id: that.uid,
					type: that.s_type,
					page: that.page,
					size: that.size
				}
				if(that.data_last) return
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {

					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if (datas.length == 0) {
							// uni.showToast({
							// 	icon: 'none',
							// 	title: '暂无更多数据'
							// })
							if(that.page==1){
								that.data_list=datas
							}else{
								that.data_last=true
							}
							return
						}
						if (that.page == 1) {
							that.data_list = datas
						} else {

							that.data_list = that.datas.concat(datas)
						}

						that.page++
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})

			},

			guanzhu() {
				var that = this
				that.gz_type = !that.gz_type
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
			ss_type: function(e) {
				var that = this
				if (that.s_type == e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.s_type = e.currentTarget.dataset.type
				that.onRetry()
			},
			pveimg(e) {
				service.pveimg(e)
			},
			jump(e) {
				var that =this
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
					setTimeout(function(){
						that.btn_kg=0
					},2000)
				}
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #fff;
		position: relative;
	}

	.h_bg {
		width: 100%;
		height: 422rpx;
		position: absolute;
		top: 0;
		z-index: 1;
	}

	.h_main {
		width: 100%;
		position: relative;
		/* padding:33rpx 0; */
		box-sizing: border-box;
		z-index: 4;
	}

	.my_index_box1 {
		width: 100%;
		height: 422rpx;
		padding-top: 33rpx;
	}

	.my_index {
		display: flex;
		align-items: center;
		padding: 0 28rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.user_tx {
		width: 122rpx;
		height: 122rpx;
		border-radius: 50%;
		position: relative;
	}

	.star_v {
		width: 27rpx;
		height: 28rpx;
		position: absolute;
		bottom: 0;
		right: 0;
	}

	.user_msg {
		height: 102rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 20rpx;
	}

	.user_name {
		color: #fff;
		font-size: 32rpx;
	}

	.daiyan_lv {
		width: 165rpx;
		padding: 2rpx 15rpx;
		height: 32rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #F8AE3A;
		font-size: 22rpx;
	}

	.iconxingzhuang60kaobei2 {
		font-size: 22rpx;
	}

	.gz_btn {
		width: 122rpx;
		height: 56rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #FE8735;
		margin-left: 10rpx;
	}

	.gz_btn1 {
		background: #FE8735;
		color: #fff;
	}

	.dy_id {
		font-size: 24rpx;
		color: #fff;
		margin: 16rpx 0;
		padding: 0 28rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.dy_id text {
		margin-right: 20rpx;
	}

	.dy_bq {
		display: flex;
		margin-bottom: 50rpx;
		padding: 0 28rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	.dy_bq>view {
		padding: 10rpx 14rpx;
		border: 1rpx solid rgba(255, 255, 255, .8);
		border-radius: 10rpx;
		margin-right: 10rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #fff;
	}

	.dy_bq>view text {
		font-size: 24rpx;
		margin-right: 5rpx;
	}

	.inr_box {
		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #fff;
	}

	.yue_li {
		font-size: 24rpx;
	}

	.zhishu {
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 15rpx;
		text-align: center;
	}

	.my_tab {
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		border-bottom: 1px solid #eee;
	}

	.my_tab>view {
		font-size: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		color: #999;
		border-bottom: 6rpx solid rgba(0, 0, 0, 0);
	}

	.my_tab>view.cur {
		color: #333;
		border-bottom: 6rpx solid #F9B234;
	}

	/* my_list */
	.my_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 100rpx;
	}

	.my_li_xc {
		width: 338rpx;
		height: 338rpx;
		margin-right: 18rpx;
		margin-bottom: 23rpx;
		position: relative;
		font-size: 0;
	}

	.my_li_xc:nth-child(2n) {
		margin-right: 0;
	}

	.my_li_xc_img {
		position: absolute;
		top: 0;
		width: 338rpx;
		height: 338rpx;
		z-index: 1;
	}

	.xc_gb {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 5;
	}

	.xc_gb text {
		font-size: 32rpx;
		color: #7F7F7C;
	}

	.like_num {
		width: 100%;
		position: absolute;
		bottom: 0;
		height: 103rpx;
		background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, .5));
		display: flex;
		align-items: center;
		color: #fff;
		font-size: 26rpx;
		z-index: 6;
		padding: 40rpx 20rpx 0;
		box-sizing: border-box;
	}

	.like_num text {
		font-size: 26rpx;
		margin-right: 10rpx;
	}

	.b_box {
		width: 100%;
		position: fixed;
		bottom: 0;
		height: 98rpx;
		padding: 0 28rpx;
		background: rgba(245, 245, 245, 1);
		z-index: 99;
	}

	.b_box {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.b_box>view {
		width: 330rpx;
		height: 68rpx;
		background: rgba(254, 195, 53, 1);
		border-radius: 34rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 26rpx;
	}

	/* 动态 */
	.time_li {
		width: 100%;
		padding: 18rpx 28rpx;
		box-sizing: border-box;
		display: flex;
	}

	.time_v {
		width: 120rpx;
		font-size: 40rpx;
		color: #333;
	}

	.time_v .month {
		font-size: 24rpx;
	}

	.time_box {
		flex: 1;
	}

	.dt_li {
		margin-bottom: 32rpx;
	}

	.dt_li_d1_img {
		width: 238rpx;
		height: 238rpx;
	}

	.dt_li_d1 {
		display: flex;
		align-items: center;
	}

	.d1_msg {
		height: 238rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin-left: 20rpx;
	}

	.d1_msg {
		font-size: 28rpx;
		color: #333;
	}

	.dt_cz {
		font-size: 24rpx;
		color: #999;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.tp_btn {
		width: 166rpx;
		height: 66rpx;
		background: rgba(244, 116, 22, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 28rpx;
	}
	.tp_btn1{
		background:rgba(220,220,220,1);
	}

	.quan_goods {
		margin-top: 30rpx;
		width: 100%;
		height: 164rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
	}

	.quan_goods_img {
		width: 130rpx;
		height: 130rpx;
		border-radius: 10rpx;
		margin-right: 10rpx;
	}

	.quan_goods_msg {
		flex: 1;
	}

	.quan_goods_name {
		font-size: 24rpx;
		color: #333;
		margin-bottom: 10rpx;
	}

	.quan_goods_pri {
		color: #EB4443;
		font-size: 24rpx;
		margin-bottom: 10rpx;
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
		font-size: 22rpx;
		color: #333;
	}

	.goods_btn1 {
		padding: 0 9rpx;
		height: 38rpx;
		line-height: 38rpx;
		background: rgba(254, 135, 53, 1);
		border-radius: 10rpx;
		color: #fff;
	}

	.goods_btn2 text {
		color: #FE8735;
	}

	/* 视频 */
	.sp_list {
		width: 100%;
		padding: 28rpx;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.sp_li {
		width: 338rpx;
		/* height:480rpx; */
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		overflow: hidden;
		margin-right: 18rpx;
		margin-bottom: 23rpx;
	}

	.sp_li_g:nth-child(2n) {
		margin-right: 0;
	}
	.sp_li_v{
		width: 226rpx;
		/* height: 401rpx; */
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		border-radius: 0;
	}
	.sp_li_v:nth-child(3n) {
		margin-right: 0;
	}
	.sp_li_img {
		width: 338rpx;
		height: 338rpx;
		position: relative;
	}
	.sp_li_v .sp_li_img {
		width: 226rpx;
	}
	.sp_li_img_cz {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, .5);
	}

	.sp_li_img_cz image {
		width: 64rpx;
		height: 64rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -32rpx;
		margin-top: -32rpx;
	}

	.sp_li_msg {
		width: 100%;
		padding: 18rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.sp_li_name {
		font-size: 28rpx;
		color: #333;
		font-weight: 400;
	}

	.sp_li_time {
		font-size: 24rpx;
		color: #999;
	}

	.sp_li_img1 {
		width: 338rpx;
		height: 33r8px;
	}
</style>
