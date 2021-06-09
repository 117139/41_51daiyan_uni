<template>
	<view>
		<view class="container">
			<!-- 代言圈 -->
			<view class="quan_list">
				<view v-if="data_list.length==0" class="zanwu">暂无数据</view>
				<view class="quan_li" v-for="(item,idx) in data_list">
					<view class="quan_user_box">
						<image @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+item.user_id" class="quan_user_tx" :src="item.user_head_portrait"
						 mode="aspectFill"></image>
						<view class="quan_user_msg">
							<view class="quan_user_name">{{item.user_nickname}}
								<!-- mingxing -->
								<view v-if="item.use_identity_id==1" class="star_v">
									<image  :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
								</view>
								<!-- daren -->
								<view v-if="item.use_identity_id==2" class="star_v">
									<image  :src="filter.imgIP('/static_s/51daiyan/images/star_dbg.png')"></image>
									<text class="iconv iconfont"></text>
									<text class="user_v_lv">{{item.user_grade_num?item.user_grade_num:0}}</text>
								</view>
								<!-- <image v-if="item.use_identity_id==1" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
								<image v-if="item.use_identity_id==2" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image> -->
							</view>
							<view class="quan_user_time">
								<text>{{filter.getDateTime(item.create_time)}}</text>
								<text v-if="item.use_identity_id==1">明星</text>
								<text v-if="item.use_identity_id==2">达人</text>
							</view>
						</view>
						<view class="fz30 c9">{{item.audit_status_value}}</view>
						<view class="quan_user_btn" @tap.stop="jump_fabu(item)">编辑</view>
						<view class="quan_user_btn" @tap.stop="del_li" :data-id="item.id"
						 :data-idx="idx">删除</view>
					</view>
					<view class="quan_msg">
						<view class="oh4  quan_msg_text">{{item.content}}</view>
						<view v-if="item.img.length==1" class="quan_msg_img">
							<image v-if="item.type==1||item.type==3" class="one one_one" :lazy-load='true' :src="filter.imgIP(item.img[0])"
							 mode="aspectFill" :data-src="filter.imgIP(item.img[0])" @tap.stop="pveimg"></image>
							<image v-if="item.type==2" class="one one_one" :lazy-load='true' :src="filter.imgIP_video(item.img[0])" mode="aspectFill"
							 :data-src="filter.imgIP_video(item.img[0])" @tap.stop="jump" data-type="sp"
								:data-spurl="item.img" :data-url="'/pages_goods/d_video/d_video?idx='+idx1+'&a_id='+item.id"></image>
						</view>
						<view v-else class="quan_msg_img">
							<image v-if="item.type==1" v-for="(item1,idx1) in item.img" :src="filter.imgIP(item1)" mode="aspectFill"
							 :lazy-load='true' :data-src="filter.imgIP(item1)" :data-array="filter.getgimgarrIP(item.img)" @tap.stop="pveimg"></image>
							<image v-if="item.type==2" v-for="(item1,idx1) in item.img" :lazy-load='true' :src="filter.imgIP_video(item1)"
							 mode="aspectFill" @tap.stop="jump" data-type="sp"
								:data-spurl="item.img" :data-url="'/pages_goods/d_video/d_video?idx='+idx1+'&a_id='+item.id"></image>
							<!-- <image :src="filter.imgIP('/static_s/51daiyan/images/goods1.png')" mode="aspectFill" :data-src="filter.imgIP('/static_s/51daiyan/images/goods1.png')"
		  				 @tap.stop="pveimg"></image>
		  				<image :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" mode="aspectFill" :data-src="filter.imgIP('/static_s/51daiyan/images/goods.png')"
		  				 @tap.stop="pveimg"></image> -->
						</view>
					</view>
					<view v-for="(item1,idx1) in item.goods" class="quan_goods" @tap="jump" :data-url="'/pages_goods/details/details?id='+item1.g_id+'&dy_id='+item.id+'&advocacyviceId='+item1.id">
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
							<text class="iconfont iconfenxiang2" style="color: #999;"></text>分享
						</view>
						<view class="cz_li">跟随购买：{{item.follow_buy_number}}</view>
						<view class="cz_li" @tap.stop="jump" :data-url="'/pages_goods/daiyan_pl/daiyan_pl?id='+item.id"><text class="iconfont iconpinglun"></text>{{item.comment_number}}</view>
						<view class="cz_li" v-if="item.is_praise==2" @tap="guanzhuFuc_dz(4,item.id,'affirm')" :data-id="idx">
							<text class="iconfont iconzan"></text>{{item.praise_number}}
						</view>
						<view class="cz_li" v-if="item.is_praise==1" @tap="guanzhuFuc_dz(4,item.id,'cancel')" :data-id="idx">
							<text class="iconfont icondianzan2" style="color: #f00;"></text>{{item.praise_number}}
						</view>
					</view>
				</view>
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
				btn_kg:0,
				data_last:false,
				data_list: [], //代言列表
				page:1,
				size:20,
				showtk:0,
				exceed_number_bl:0
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		onLoad(option) {
			// if(option.exceed_number_bl){
				
			// 	this.exceed_number_bl=option.exceed_number_bl||0
			// }
			this.onRetry()
		},
		onShow() {
			var that =this
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.daiyan_newtype) {  
			      //将携带的参数赋值
			        
			   this.onRetry()
				 currPage.setData({
				   //直接给上一个页面赋值
				   daiyan_newtype: false,
				 });
				
			}
			
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  this.onRetry()
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
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
		methods: {
			...mapMutations(['dy_fb_fuc']),
			onRetry(){
				this.data_list=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			jump_fabu(item){
			  let that = this
				if(!item){
					
				}else{
					// var arr=[]
					// arr.push(item)
					that.dy_fb_fuc(item.goods)
				}
			 
				
				
				wx.navigateTo({
				  url: '/pagesA/daiyan_edit/daiyan_edit?id='+item.id,
				})
					
			  
			},
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
							if (that.data_list[i].id == id) {
								if (key == 'affirm') {
									that.$set(that.data_list[i], 'is_praise', 1)
									that.$set(that.data_list[i], 'praise_number', that.data_list[i].praise_number-1+2)
								} else {
									that.$set(that.data_list[i], 'is_praise', 2)
									that.$set(that.data_list[i], 'praise_number', that.data_list[i].praise_number-1)
								}
			
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
			
			},
			
			getdatalist() {
			
				let that = this
				var jkurl = '/user/advocacy'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					size:that.size
				}
				if(that.data_last) return
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						if(that.page==1){
							that.data_list=datas
						}else{
							if(datas.length==0){
							
								that.data_last=true
								
								return
							}
							that.data_list=that.data_list.concat(datas)
						}
						// that.data_list = that.data_list.concat(datas)
			
						that.page++
					}
				}).catch(e => {
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
			
			del_li(e) {
				let that = this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let id = e.currentTarget.dataset.id
				let idx = e.currentTarget.dataset.idx
				wx.showModal({
					title: '提示',
					content: '是否删除?',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if (that.btnkg == 1) {
								return
							} else {
								that.btnkg = 1
							}
							var datas = {
								token: that.loginMsg.userToken,
								ad_id:id,
							}
							// 单个请求
							service.P_post('/user/delAdvocacy', datas).then(res => {
								that.btnkg =0
								console.log(res)
								if (res.code == 1) {
									// that.page=1
									// that.getdatalist()
									// that.data_list[idx].is_vote=2
									that.data_list.splice(idx, 1)
									uni.showToast({
										icon: 'none',
										title: '操作成功'
									})
								}
							}).catch(e => {
								that.btnkg =0
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
				service.jump(e)
			},
			pveimg(e){
				service.pveimg(e)
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
		width: 100rpx;
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
