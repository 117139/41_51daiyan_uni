<template>
	<view>
		<view class="container">
			<view class="dy_sc_bg">
				<image class="dy_sc_bg" :src="filter.imgIP('/static_s/51daiyan/images/dy_sc1_02.jpg')"></image>
			</view>
			<view class="h_main">
				<view class="dy_sc_lj" @tap="jump" data-url="/pagesA/about/about">
					<view><image class="c_bl" :src="filter.imgIP('/static_s/51daiyan/images/images/lj_bl_05.jpg')"></image>1分钟了解51代言</view>
					<text class="iconfont iconnext3"></text>
				</view>
				<!-- <view class="yhq_box">
					<view class="yhp_tit">
						<view class="yhq_t_l">共享优惠券</view>
						<view class="yhq_t_r"  @tap="jump" data-url="/pages/my_yhq/my_yhq">更多<text class="iconfont iconnext3"></text></view>
					</view>
					<view class="yhq_li">
						<!-- <image class="yhq_li" src="../../static/images/images/yhq_09.jpg"></image> --
		        <view class="yhq_li_img">
		          <image class="yhq_li_img" src="../../static/images/yhq_bg_03.png"  mode="aspectFill"></image>
		          <view class="yhq_pri">
		            <view class="d1"><text>¥10元</text> 代金券</view>
		            <view class="d2">2020.02.14-2020.02.18</view>
		          </view>
		          
		        </view>
					</view>
					<view class="yhq_user">
						<view class="user_tximg">
							<image class="user_tximg" src="{{filter.imgIP('tx.png')}}"></image>
						</view>
						<view class="user_form">来自好友<text>张鸣</text>的共享</view>
					</view>
				</view> -->
				<!-- box2 -->
				<view v-if="datas.friendGoods.length>0" class="yhq_box">
					<view class="yhp_tit">
						<view class="yhq_t_l">好友的代言商品</view>
						<view class="yhq_t_r" @tap="jump" data-url="/pages_goods/friends_daiyan/friends_daiyan?id=1">更多<text class="iconfont iconnext3"></text></view>
					</view>
					<view class="hy_goods">
						<view v-for="(item,idx) in datas.friendGoods" class="hy_goods_li"  @tap="jump" :data-url="'/pages/details/details?id='+item.g_id">
							<view class="hy_goods_img">
								<image class="hy_goods_img" :lazy-load='true' :src="filter.imgIP(item.g_img[0])"></image>
							</view>
							<view class="goods_pri">
								<view class="goods_tximg">
									<image class="goods_tximg" :lazy-load='true' :src="item.user_head_portrait"></image>
								</view>
								<view class="goods_mon">￥688</view>
							</view>
							<view class="hy_sy">
									<view class="hy_sy_box">代言收益</view>
									<view class="sy_mon">￥30</view>
							</view>
						</view>
					</view>
				</view>
				<!-- box3 -->
				<view class="b_list">
					<view class="b_list_tab">
						<view v-for="(item,idx) in datas.cateData" :class="s_type==idx?'cur':''"  @tap="ss_type" :data-type="idx">{{item.title}}</view>
					</view>
					<view class="b_li_box">
						
						<view v-if="data_list.length==0" class="zanwu">暂无数据</view>
						<view class="b_li"  v-for="(item,idx) in data_list" @tap="jump" :data-url="'/pages/details/details?id='+item.g_id">
							<view class="li_img">
								<image class="li_img" :lazy-load='true' :src="filter.imgIP(item.g_img[0])" mode="aspectFill"></image>
							</view>
							<view class="li_msg">
								<!-- <view class="li_name oh1">{{item.g_title}}</view> -->
								<view class="li_name dis_flex aic">
									<text v-if="item.fk_is_way==2" class="xcxdy_zy_icon">自营</text>
									<text class="flex_1 oh1">{{item.g_title}}</text>
								</view>
								<view class="goods_pri">
									<view class="goods_tximg" v-if="item.user_head_portrait">
										<image class="goods_tximg" :lazy-load='true' :src="item.user_head_portrait"></image>
									</view>
									<view class="goods_mon flex_1">￥{{item.g_current_price}}</view>
									<view class="sy_xl" style="font-size: 20upx;">销量：{{item.g_sale}}</view>
								</view>
								<view class="hy_sy">
										<view class="hy_sy_box">代言收益</view>
										<view class="sy_mon">￥{{item.advocacy_earnings}}</view>
										
								</view>
							</view>
						</view>
					</view>
					
					<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
	export default {
		data() {
			return {
				btn_kg:0,
				s_type:0,
				datas:'',
				data_list:[],
				data_last:false,
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
		onLoad: function (options) {
			this.getdata()
			
		},
	
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {
	
		},
	
		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function () {
	
		},
	
		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function () {
	
		},
	
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
	
		},
	
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
			this.getdata()
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
		onShareAppMessage: function () {
	
		},
		methods: {
			
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
				}
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				// 单个请求
				service.P_get('/goods', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.datas = res.data
						that.btn_kg=0
						that.onRetry()
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
			onRetry(){
				this.page=1
				this.data_list=[]
				this.data_last=false
				this.getdatalist()
			},
			getdatalist() {
			
				let that = this
				var jkurl = '/goods/getGoodsList'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					cateId:that.datas.cateData[that.s_type].id,
				}
				if(that.data_last) return
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
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
						if (datas.length==0) {
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
						if(that.page==1){
							that.data_list=datas
						}else{
							
							that.data_list = that.datas.concat(datas)
						}
			
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
			
			jump(e) {
				service.jump(e)
			},
			ss_type(e){
				var that =this
				if(that.s_type==e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.s_type=e.currentTarget.dataset.type
				that.onRetry()
			}
		}
	}
</script>

<style scoped>
.container{
	min-height: 100vh;
	background: #f5f6f8;
}
.dy_sc_bg{
	width: 100%;
	height: 454rpx;
}
.h_main{
	width: 100%;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
}

.dy_sc_lj{
	width: 100%;
	background: #fff;
	padding: 16rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	border-radius: 6rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #2b2b2b;
	font-size: 24rpx;
	margin-bottom: 20rpx;
}
.dy_sc_lj view{
	display: flex;
	align-items: center;
}
.dy_sc_lj .iconfont{
	font-size: 22rpx;
	color: #cccccc;
}
.c_bl{
	width: 10rpx;
	height: 27rpx;
	margin-right: 20rpx;
}
/* yhq_box */
.yhq_box{
	width: 100%;
	background: #fff;
	padding: 0 22rpx 20rpx;
	box-sizing: border-box;
	border-radius: 10rpx;
}
.yhp_tit{
	height: 90rpx;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.yhq_t_l{
	font-size: 30rpx;
	color: #000;
}

.yhq_t_r{
	font-size: 22rpx;
	color: #ccc;
}
.yhq_t_r .iconfont{
	font-size: 22rpx;
}
.yhq_li{
	width: 100%;
	height: 234rpx;
	border-radius: 12rpx;
}
.yhq_user{
	margin-top: 20rpx;
	display: flex;
	align-items: center;
	
}
.user_tximg{
	width: 56rpx;
	height: 56rpx;
	border-radius: 50%;
}
.user_form{
	font-size: 25rpx;
	margin-left: 20rpx;
}
.user_form text{
	color: #f2b92c;
	margin: 0 5rpx;
}
.hy_goods{
	display: flex;
	
}
.hy_goods_li{
	width: 204rpx;
	margin-right: 20rpx;
}
.hy_goods_li:nth-child(3n){
	margin-right: 0;
}
.hy_goods_img{
	width: 204rpx;
	height: 204rpx;
}
.goods_pri{
	display: flex;
	align-items: center;
	margin: 12rpx 0;
}
.goods_tximg{
	width: 45rpx;
	height: 45rpx;
	border-radius: 50%;
}
.goods_mon{
	font-size: 20rpx;
	color: #ff556f;
	font-weight: bold;
	margin-left: 10rpx;
}
.hy_sy{
	display: flex;
	align-items: center;
}
.hy_sy_box{
	width: 106rpx;
	height: 34rpx;
	border-radius: 10rpx;
	border:1px solid #f8b135;
	color: #f8b135;
	font-size: 22rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.sy_mon{
	font-size: 24rpx;
	color: #f8b135;
	margin-left: 10rpx;
  margin-right: 10rpx;
}
/* b_list */


.b_list{
	width: 100%;
}
.b_list_tab{
	width: 100%;
	/* display: flex; */
	align-items: center;
	overflow-x: scroll;
	white-space: nowrap;
}
.b_list_tab view{
	display: inline-flex;
	font-size: 28rpx;
	color: #333;
	/* width: 145rpx; */
	text-align: center;
	line-height: 70rpx;
	border-bottom: 6rpx solid  rgba(0,0,0,0);
  margin: 15rpx 20rpx;
}
.b_list_tab view.cur{
	border-bottom: 6rpx solid #f43f68;
}
.b_li_box{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.b_li{
	width: 338rpx;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
}
.b_li:nth-child(2n){
	margin-left: 18rpx;
}
.li_img{
	width: 338rpx;
	height: 338rpx;
}
.li_name{
	color: #5c5c5c;
	font-size: 26rpx;
	
	margin-bottom: 15rpx;
}
.li_msg{
	background: #fff;
	width: 100%;
	padding: 20rpx 20rpx 15rpx;
  box-sizing: border-box;
}
.sy_xl{
	color: #999;
	font-size: 24rpx;
}



.yhq_li_img{
	width:650rpx;
	height:236rpx;
	position: relative;
	z-index: 1;
}
.yhq_pri{
	width:407rpx;
	height:236rpx;
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
	font-size:36rpx;
	color: #fff;
}
.yhq_pri .d1 text{
	font-size:  48rpx;
}
.yhq_pri .d2{
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #fff;
}
</style>
