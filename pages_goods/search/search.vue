<template>
	<view>
		<view class="container">
			<view class="top_box">
				<view class="top_search_box">
					<view class="top_search">
						<!-- <text class="iconfont iconsousuo"></text> -->
						<view @tap="xz_pop=true" class="dis_flex t_search_s aic">{{ss_cur=='user'?'用户':ss_cur=='goods'?'商品':ss_cur=='brand'?'品牌':''}} <text class="iconfont iconXSJ"></text></view>
						<!-- <input type="text" placeholder="搜索人名代言号/商品/品牌" v-model="daiyan_ss" @input="daiyan_sousuo"
							confirm-type='搜索' @confirm="onRetry" /> -->
						<input type="text" placeholder="搜索人名代言号/商品" v-model="daiyan_ss" @input="daiyan_sousuo"
							confirm-type='搜索' @confirm="onRetry" />
						<text class="iconfont iconguanbi" @tap="daiyan_ss=''"></text>
					</view>
					<view class="top_search_cancel" @tap="daiyan_ss=''">取消</view>
				</view>
				<view class="xz_zzc" v-if="xz_pop==true"  @tap="xz_pop=false" @touchmove.stop.prevent="xz_pop=false">
					<view class="search_xz" @tap.stop="test_fuc">
						<view @tap.stop="ss_type" data-type="user">用户</view>
						<view @tap.stop="ss_type" data-type="goods">商品</view>
						<!-- <view @tap.stop="ss_type" data-type="brand">品牌</view> -->
					</view>
				</view>
				<!-- <view class="xz_zzc" v-if="xz_pop1==true" @tap="xz_pop1=false" @touchmove.stop.prevent="xz_pop1=false">
					<view class="ss_history_tit">历史记录</view>
				</view> -->
				<!-- <view class="search_type">
					<view :class="ss_cur=='user'?'cur':''" @tap="ss_type" data-type="user">用户</view>
					<view :class="ss_cur=='goods'?'cur':''" @tap="ss_type" data-type="goods">商品</view>
					<view :class="ss_cur=='brand'?'cur':''" @tap="ss_type" data-type="brand">品牌</view>
				</view> -->
			</view>

			<view class="ss_list">
				<view v-if="data_list.length==0">
					<view class="ss_history_tit dis_flex aic ju_b">
						<text>历史记录</text>
						<text @tap="clearKey" class="iconfont iconshanchushu"></text>
					</view>
					<view class="ss_history_list">
						<view class="ss_history_li" v-for="(item,index) in searchKey" :key='index' @click="ls_search(item)">
						{{item}}
						</view>
					</view>
					<view class="ss_history_tit dis_flex aic ju_b">
						<text>热门商品</text>
						<text></text>
					</view>
					<view class="ss_history_list">
						<view class="ss_history_li" v-for="(item,index) in ss_goods" :key='index' @tap="jump"
						:data-url="'/pages_goods/details/details?id='+item.id">
						{{item.title}}
						</view>
					</view>
				</view>
				<view class="data_null" v-if="data_list.length==0">
					<image :src="filter.imgIP('/static_s/51daiyan/images/data_null.png')"></image>
				</view>
				<block v-if="data_list.length>0" v-for="(item,id) in data_list">
					<!-- 用户 -->
					<view v-if="ss_cur=='user'" class="li_box">
						<view class="user_tx">
							<image class="user_tx" :lazy-load='true' :src="filter.imgIP(item.head_portrait)" @tap="jump"
								:data-url="'/pagesA/my_index/my_index?id='+item.id"></image>
							<!-- mingxing -->
							<view v-if="item.identity_id==1" class="star_v star_v1">
								<image :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							</view>
							<!-- daren -->
							<view v-if="item.identity_id==2" class="star_v star_v1">
								<image :src="filter.imgIP('/static_s/51daiyan/images/star_dbg.png')"></image>
								<text class="iconv iconfont"></text>
								<text class="user_v_lv">{{item.user_grade_num?item.user_grade_num:0}}</text>
							</view>
							<!-- <image v-if="item.identity_id==1" class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							<image v-if="item.identity_id==2" class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image> -->
						</view>
						<view class="user_name oh1" @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+item.id">
							{{item.nickname}}</view>
						<view v-if="!item.is_follow" class="user_btn" @tap.stop="guanzhuFuc(2,item.id,'affirm')">+关注
						</view>
						<view v-else class="user_btn user_btn1" @tap.stop="guanzhuFuc(2,item.id,'cancel')">已关注</view>
					</view>
					<!-- 商品 -->
					<view v-if="ss_cur=='goods'" class="li_box goods_li" @tap="jump"
						:data-url="'/pages_goods/details/details?id='+item.id">
						<view class="ss_goods_img">
							<image class="ss_goods_img" :lazy-load='true' :src="filter.imgIP(item.g_pic[0])"></image>
						</view>
						<view class="goods_msg">
							<view class="goods_name oh2">{{item.g_title}}</view>
							<view class="goods_pri">
								<view class="pri1">￥{{item.g_price}}</view>
								<view class="pri3">代言费：¥{{item.basics_advocacy_price}}</view>
							</view>
							<view class="goods_dy">
								<view class="goods_zan">
									<text class="iconfont icondianzan2"></text> {{item.advocacy_mannumber}} 代言人
								</view>
								<view class="find_sj">
									<view class="sj_list">
										<image @tap.stop="jump"
											:data-url="'/pages_goods/daiyanren/daiyanren?id='+item.id"
											v-for="(item1,idx1) in item.adv_user" class="sj_li"
											:src="filter.imgIP(item1.head_portrait)" mode="aspectFill"></image>
									</view>
									<text class="iconfont iconnext3"></text>
								</view>
							</view>
						</view>
					</view>

					<!-- 品牌 -->
					<view v-if="ss_cur=='brand'" class="li_box">
						<view class="user_tx" @tap="jump"
							:data-url="'/pages_goods/dp_index/dp_index?id='+item.group_code">
							<image class="user_tx" :lazy-load='true' :src="filter.imgIP(item.head_portrait)"></image>
						</view>
						<view class="user_name oh1" @tap="jump"
							:data-url="'/pages_goods/dp_index/dp_index?id='+item.group_code">{{item.store_name}}</view>
						<view v-if="!item.is_follow" class="user_btn"
							@tap.stop="guanzhuFuc(1,item.group_code,'affirm')">+关注</view>
						<view v-else class="user_btn user_btn1" @tap.stop="guanzhuFuc(1,item.group_code,'cancel')">已关注
						</view>
					</view>
				</block>
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
	var that
	export default {
		data() {
			return {
				btn_kg: 0,
				type: '',
				ss_cur: 'user',
				daiyan_ss: '',
				data_list: [],
				page: 1,
				size: 20,
				xz_pop:false,
				
				
				
				searchKey:[],
				ss_goods:[]
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),

		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			that = this
			that.type = options.type
			if (options.name) {
				wx.setNavigationBarTitle({
					title: options.name,
				})
			}
			var vv = uni.getStorageSync('searchLocal')||[];
			// console.log(vv)
			if(vv.length>0){
				var arr = vv.split("-");
				this.searchKey = arr;
			}
			that.getss_goods()
			// this.onRetry()
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
			if(that.data_list.length>0){
				this.getdatalist()
			}
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {

		},
		methods: {
			test_fuc(){
				
			},
			ls_search(item){
				that.daiyan_ss=item
				that.onRetry()
			},
			clearKey: function() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '点击确定将删除所有历史信息，确定删除吗？',
					success: function(res) {
						if (res.confirm) {
							that.searchKey = [];
							// uni.setStorage({
							// 	key: 'searchLocal',
							// 	data: that.searchKey
							// });
							uni.removeStorageSync('searchLocal')
						} else if (res.cancel) {
			
						}
					}
				});
			
			},
			onRetry() {
				this.page = 1
				this.data_list = []
				this.getdatalist()
				this.getss_goods()
			},
			
			getss_goods() {
				let that = this
				console.log(that.btn_kg)
				
				var datas = {}
				service.P_get('/getRecommendGoods', datas).then(res => {
					console.log(res)
			
					if (res.code == 1) {
						that.ss_goods = res.data
						
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			getdatalist() {
				let that = this
				console.log(that.btn_kg)
				if(that.ss_cur=='user'){
					if(!that.daiyan_s){
						uni.showToast({
							icon:'none',
							title:'请先输入搜索内容'
						})
						return
					}
				}
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				var datas = {
					token: that.loginMsg.userToken,
					type: that.ss_cur,
					search: that.daiyan_ss,
					page: that.page,
					size: that.size

				}
				service.P_get('/search', datas).then(res => {
					console.log(res)
					that.btn_kg = 0

					if (res.code == 1) {
						var datas = res.data
						if (datas.length == 0) {
							if (that.page > 1) {
								uni.showToast({
									icon: 'none',
									title: '暂无更多数据'
								})
							}

							that.btn_kg = 0
							return
						}
						if (that.page == 1) {
							that.data_list = datas
						} else {

							that.data_list = that.data_list.concat(datas)
						}
						that.btn_kg = 0
						that.page++
					}
				}).catch(e => {
					console.log(e)
					that.btn_kg = 0
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			daiyan_sousuo(e) {
				var that = this
				console.log(e.detail.value)
				// this.daiyan_ss=e.detail.value
				clearInterval(inputt)
				inputt = setTimeout(function() {
					var kw = that.daiyan_ss
					console.log(kw.length)
					if (kw.length > 0) {
						var newArr = that.searchKey;
						 var repeat= false;
						for(var j=0;j<newArr.length;j++){
						       
						      if(newArr[j]==kw){
						          repeat=true;
						          
						      }
						}
						if(!repeat){
							 newArr.push(kw);
							 that.searchKey = newArr;
							 var newStr = newArr.join('-');
							 uni.setStorage({
							 	key: 'searchLocal',
							 	data: newStr
							 });
						}
						console.log('that.searchKey--------->')
						console.log(that.searchKey)
						that.onRetry()

					} else {
						that.onRetry()
						// that.qy_show = that.qy_arr3
					}
				}, 800)
			},
			ss_type(e) {

				var that = this
				if (that.ss_cur == e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.ss_cur = e.currentTarget.dataset.type
				that.xz_pop=false
				if(that.ss_cur=='goods'){
					that.onRetry()
				}else{
					that.data_list=[]
				}
			},
			guanzhuFuc(type, id, key) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					type: type,
					id: id,
					operate: key,
				}
				if (key == 'affirm') {
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
								url: '/pagesA/login/login'
							})
							return
						} else if (res.code == 0 && res.msg == '请先登录账号~') {
							uni.navigateTo({
								url: '/pagesA/login/login'
							})
							return
						} else if (res.code == 1) {
							// that.onRetry()

							for (var i = 0; i < that.data_list.length; i++) {
								console.log(i)
								var li_id
								if (type == 1) {
									li_id = that.data_list[i].group_code
								}
								if (type == 2) {
									li_id = that.data_list[i].id
								}
								if (li_id == id) {

									// that.data_list[i].is_friend=2
									// that.$set(that.data_list,i,that.data_list[i])
									that.$set(that.data_list[i], 'is_follow', 1)
								}
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
					return
				}
				wx.showModal({
					title: '提示',
					content: '是否取消关注?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							service.P_post('/attention/operation', data).then(res => {
								console.log(res)
								that.btn_kg = 0
								if (res.code == -1) {
									uni.navigateTo({
										url: '/pagesA/login/login'
									})
									return
								} else if (res.code == 0 && res.msg == '请先登录账号~') {
									uni.navigateTo({
										url: '/pagesA/login/login'
									})
									return
								} else if (res.code == 1) {
									// that.onRetry()

									for (var i = 0; i < that.data_list.length; i++) {
										var li_id = ''
										if (type == 1) {
											li_id = that.data_list[i].group_code
										}
										if (type == 2) {
											li_id = that.data_list[i].id
										}
										console.log(i)
										if (li_id == id) {
											// that.data_list[i].is_friend=1
											// that.$set(that.data_list,i,that.data_list[i])
											that.$set(that.data_list[i], 'is_follow', '')
										}
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
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
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
		min-height: 100%;
		/* padding-top: 140rpx; */
		padding-top: 80rpx;
		/* #ifdef H5 */

		/* padding-top: calc(140rpx + calc(44px + env(safe-area-inset-top))); */
		/* #endif */
		background: #fff;
	}

	.top_box {
		position: fixed;
		top: 0;
		/* #ifdef H5 */

		top: calc(44px + env(safe-area-inset-top));
		/* #endif */
		left: 0;
		right: 0;
		border-bottom: 1px solid #eee;
		background: #fff;
		z-index: 800;
	}

	.top_search_box {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 0 28rpx 10upx;
		box-sizing: border-box;
	}

	.top_search {
		flex: 1;
		width: 608rpx;
		height: 55rpx;
		background: rgba(245, 245, 245, 1);
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		/* margin-bottom: 13rpx; */
	}

	.top_search text {
		color: #BBBBBB;
	}

	.top_search input {
		flex: 1;
		font-size: 24rpx;
		padding: 0 15rpx;
		box-sizing: border-box;
	}

	.top_search_cancel {


		margin-left: 28rpx;
		font-size: 30rpx;
	}

	.search_type {
		padding: 10rpx 28rpx 0;
		box-sizing: border-box;
		height: 58rpx;
		display: flex;
		align-items: center;
	}

	.search_type view {
		height: 58rpx;
		line-height: 58rpx;
		border-bottom: 2px solid rgba(0, 0, 0, 0);
		font-size: 30rpx;
		color: #999;
		margin-right: 100rpx;
	}

	.search_type .cur {
		color: #333;
		font-weight: bold;
		border-bottom: 2px solid #F9B234;
	}

	/* 用户 */
	.ss_list {
		width: 100%;
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.li_box {
		width: 100%;
		display: flex;
		padding: 20rpx 0;
		align-items: center;
	}

	.user_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
	}

	/* .user_v {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 27rpx;
		height: 28rpx;
	} */

	.user_name {
		padding: 0 20rpx;
		box-sizing: border-box;
		font-weight: bold;
		flex: 1;
		font-size: 30rpx;
		color: #333333;
	}

	.user_btn {
		width: 144rpx;
		height: 60rpx;
		background: rgba(244, 121, 36, 1);
		border: 1px solid rgba(210, 210, 210, 1);
		border-radius: 30rpx;
		font-size: 30rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
	}

	.user_btn1 {
		border: 1px solid rgba(210, 210, 210, 1);
		background: #fff;
		font-size: 30rpx;
		color: #999999;
	}

	.data_null {
		width: 100%;
		height: 500rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.data_null image {
		width: 122rpx;
		height: 178rpx;
	}

	.goods_li {
		align-items: stretch;
		border-bottom: 1px solid #eee;
	}

	.ss_goods_img {
		width: 195rpx;
		height: 196rpx;
		border-radius: 10rpx;
	}

	.goods_msg {
		flex: 1;
		padding: 10rpx 0 10rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.goods_name {
		font-size: 30rpx;
		color: #333;
	}

	.goods_pri {
		font-size: 24rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goods_pri .pri1 {
		color: #F9B234;
		font-size: 30rpx;
		font-weight: bold;
	}

	.goods_dy {
		font-size: 24rpx;
		color: #BBBBBB;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goods_dy text {
		font-size: 24rpx;
		margin-left: 10rpx;
	}

	.goods_zan {
		flex: none;
	}

	.find_sj {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.find_sj>text {
		color: #EEEEEE;
		font-size: 24rpx;
		margin-left: 20rpx;
	}

	.sj_list {
		flex: 1;
		height: 52rpx;
		position: relative;
	}

	.sj_li {
		width: 52rpx;
		height: 52rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 10rpx 0px rgba(119, 119, 119, 0.2);
		border-radius: 50%;
		position: absolute;
		top: 0;
		right: 0;
		z-index: 10;
	}

	.sj_li:nth-child(2) {
		position: absolute;
		right: 35rpx;
		z-index: 9;
	}

	.sj_li:nth-child(3) {
		position: absolute;
		right: 70rpx;
		z-index: 8;
	}

	.sj_li:nth-child(4) {
		position: absolute;
		right: 105rpx;
		z-index: 7;
	}

	.sj_li:nth-child(5) {
		position: absolute;
		right: 140rpx;
		z-index: 6;
	}

	.ss_list1 {
		padding: 0 48rpx;
	}
	.t_search_s{
		font-size: 24upx;
		padding: 0 10upx;
		border-right: 1px solid #DEDEDE;
	}
	.t_search_s text{
		font-size: 12upx;
	}
	.xz_zzc{
		position: fixed;
		top: 55upx;
		/* #ifdef H5 */
		top: 140upx;
		/* #endif */
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 900;
		background: rgba(255,255,255,1);
		padding: 30upx;
	}
	.search_xz{
		position: fixed;
		top: 55upx;
		/* #ifdef H5 */
		top: 140upx;
		/* #endif */
		left: 30upx;
		
		padding: 20upx 50upx;
		background: #fff;
		box-shadow: 0px 1px 10px 0px rgb(119,119,119,.3);
	}
	.search_xz view{
		font-size: 26upx;
		line-height: 50upx;
	}
	.ss_history_tit{
		font-size: 30upx;
		color: #333;
		margin-bottom: 10upx;
	}
	.ss_history_tit text{
		font-size: 30upx;
	}
	.ss_history_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		padding: 10upx 0 20upx;
	}
	.ss_history_li{
		padding: 2px 8px;
		background: #F7F7F7;
		border-radius: 2rpx;
		font-size: 24rpx;
		margin: 10upx;
		margin-bottom: 10upx;
	}
</style>
