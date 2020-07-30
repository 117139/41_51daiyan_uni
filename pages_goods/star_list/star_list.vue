<template>
	<view>

		<view class="page-content">
			<view class="container">
				<image class="h_bg" :src="filter.imgIP('/static_s/51daiyan/images/images/star_list_02.jpg')"></image>

				<view class="js_box">
					<view class="js_box1">
						<view class="show_type">
							<view class="show_type_li" :class="s_type==1?'cur':''" @tap="ss_type" data-type="1">明星</view>
							<view class="show_type_li " :class="s_type==2?'cur':''" @tap="ss_type" data-type="2">达人</view>
							<view class="flex_1"></view>
							<view class="star_ss">
								<input type="text" v-model="keyword" @input="star_search"/>
								<text class="iconfont iconsousuo" @tap="star_search"></text>
							</view>
						</view>
						<scroll-view class="js_msg" scroll-y @scrolltolower="jiazai" lower-threshold="50">
							<view v-if="datas.length==0" class="zanwu">暂无数据</view>
							<view  v-for="(item,idx) in datas" class="star_li">
								<view class="star_msg">
									<view class="user_tx" @tap="jump" :data-url="'/pages/my_index/my_index?id='+item.id">
										<image class="user_tx" :src="item.head_portrait"  mode="aspectFill"></image>
										<image v-if="s_type==1" class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
										<image v-if="s_type==2" class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image>
									</view>
									<view class="user_msg">
										<view class="fwb">{{item.nickname}}</view>
										<view class="oh1 fz22">
											<image :src="filter.imgIP('/static_s/51daiyan/images/star_jj.png')"></image>简介：{{item.introduction}}
										</view>
										<view>
											<image :src="filter.imgIP('/static_s/51daiyan/images/dy_num.png')"></image>代言数量：{{item.advocacy_goods_number?item.advocacy_goods_number:0}}
										</view>
									</view>
									<view v-if="item.is_attention==1" class="user_btn" @tap="guanzhuFuc(item.id,'affirm')">+关注</view>
									<view v-if="item.is_attention==2" class="user_btn user_btn1" @tap="guanzhuFuc(item.id,'cancel')">已关注</view>
								</view>
								<view class="star_dymsg">
									<view class="dy_sp" v-if="item.davocacy_type==2" @tap="jump" data-url="/pages/xvideo/xvideo">
										<image class="dy_sp" :src="filter.imgIP_video(item.davocacy_pic[0])" mode="aspectFill"></image>
										<view class="play_box">
											<image :src="filter.imgIP_video('/static_s/51daiyan/images/bofang.png')"></image>
										</view>
									</view>
									<image class="dy_img" v-if="item.davocacy_type==1&&item.davocacy_pic.length>1" v-for="(item1,idx1) in item.davocacy_pic" 
										:src="filter.imgIP(item1)" mode="aspectFill" :data-src="filter.imgIP(item1)" :data-array="filter.getgimgarrIP(item.davocacy_pic)"
									 @tap.stop="pveimg"></image>
									<image class="dy_img_one" v-if="item.davocacy_type==1&&item.davocacy_pic.length==1" v-for="(item1,idx1) in item.davocacy_pic" :src="filter.imgIP(item1)" mode="aspectFill" :data-src="filter.imgIP(item1)"
									 @tap.stop="pveimg"></image>
								</view>
							</view>
						</scroll-view>
					</view>
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
	var inputt
	export default {
		data() {
			return {
				btn_kg:0,
				s_type: 1,
				datas:[],
				page:1,
				size:20,
				keyword:'',
				
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
			if (options.type) {
				this.s_type = options.type
			}
			this.onRetry()
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
			console.log('触底')
			this.getdatalist()
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {

		},
		methods: {
			star_search(e){
				var that = this
				console.log(that.keyword)
				clearInterval(inputt)
				inputt = setTimeout(function() {
					var kw = that.keyword
					console.log(kw.length)
					if (kw.length > 0) {
						
						that.onRetry()
					
					} else {
						that.onRetry()
						// that.qy_show = that.qy_arr3
					}
				}, 1000)
			},
			handleHome: function() {
				wx.redirectTo({
					url: '/pages/index/index',
				})
			},
			onRetry(){
				this.page=1
				this.datas=[]
				this.getdatalist()
			},
			getdatalist() {
				let that = this
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				var jkurl = '/star'
				var datas = {
					token: that.loginMsg.userToken,
					type:that.s_type,
					page: that.page,
					size:that.size,
					keyword:that.keyword
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (datas.length == 0) {
							uni.showToast({
								icon: 'none',
								title: '暂无更多数据'
							})
							that.btn_kg=0
							return
						}
						if(that.page==1){
							that.datas =datas
						}else{
							
							that.datas = that.datas.concat(datas)
						}
						that.btn_kg=0
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
			ss_type: function(e) {
				var that = this
				if (that.s_type == e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.s_type = e.currentTarget.dataset.type
				
				that.onRetry()
			},
			guanzhuFuc(id,key){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					type:2,
					id:id,
					operate:key,
				}
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
						that.onRetry()
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
				
			},
			jiazai: function() {
				console.log('触底')
			},
			pveimg(e) {
				service.pveimg(e)
			},
			jump(e) {
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.dy_img{
		width: 150rpx;
		height: 150rpx;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}
	.dy_img_one{
		width: 470rpx;
		height: 470rpx;
	}
	.container {
		position: relative;
		min-height: 100vh;
		padding-bottom: 30rpx;
		background: #29094B;
	}

	.h_bg {
		width: 100vw;
		height: 1329rpx;
		position: relative;
		z-index: 1;
	}

	.js_box {
		width: 694rpx;
		/* height:1022rpx; */
		border: 8rpx solid rgba(255, 255, 255, 0.5);
		border-radius: 18rpx;
		position: absolute;
		top: 246rpx;
		left: 28rpx;
		right: 28rpx;
		z-index: 3;
		/* padding: 30rpx 28rpx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
	}

	.js_box1 {
		width: 100%;
		background: #Fff;
		border-radius: 16rpx;
	}

	.js_msg {
		width: 100%;
		height: 963rpx;

		box-sizing: border-box;
		font-size: 24rpx;
		font-family: PingFang SC;
		color: #666666;
		line-height: 36rpx;
	}

	.show_type {
		display: flex;
		align-items: center;
		height: 103rpx;
		border-bottom: 1px solid #eee;
		padding: 0 28rpx;
		box-sizing: border-box;
		margin-bottom: 10rpx;
	}

	.show_type_li {
		font-size: 36rpx;
		color: #333;
		margin: 0 10rpx;
		line-height: 100rpx;
	}

	.show_type_li.cur {
		font-size: 42rpx;
		border-bottom: 8rpx solid #FFE17B;
	}

	.star_ss {
		width: 310rpx;
		height: 54rpx;
		border: 1px solid rgba(191, 191, 191, 1);
		border-radius: 27rpx;
		padding: 0 15rpx;
		display: flex;
		align-items: center;
	}

	.star_ss input {
		padding: 0 10rpx;
		font-size: 30rpx;
	}

	.star_ss text {
		font-size: 30rpx;
	}

	/* star_li */

	.star_li {
		width: 100%;
		padding: 38rpx 28rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.star_msg {
		display: flex;
		align-items: center;
	}

	.user_tx {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position: relative;
	}

	.user_v {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 27rpx;
		height: 28rpx;
	}

	.user_btn {
		width: 122rpx;
		height: 56rpx;
		border: 2rpx solid rgba(254, 135, 53, 1);
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FE8735;
		margin-left: 15rpx;
	}

	.user_btn1 {
		background: rgba(238, 238, 238, 1);
		border: 2rpx solid rgba(238, 238, 238, 1);
		color: #BBBBBB;
	}

	.user_msg {
		flex: 1;
		height: 100rpx;
		margin-left: 20rpx;
		font-size: 24rpx;
	}

	.user_msg image {
		width: 22rpx;
		height: 21rpx;
		margin-right: 8rpx;
	}

	.user_msg .fwb {
		font-size: 32rpx;
	}

	.star_dymsg {
		width: 100%;
		padding-top: 20rpx;
		padding-left: 120rpx;
		box-sizing: border-box;
	}

	.dy_sp {
		width: 334rpx;
		height: 191rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.play_box {
		background: rgba(0, 0, 0, .5);
		position: absolute;
		border-radius: 10rpx;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.play_box image {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 64rpx;
		height: 64rpx;
		margin-left: -32rpx;
		margin-top: -32rpx;
	}
</style>
