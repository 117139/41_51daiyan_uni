<template>
	<view>
		<official-account class="gzgzh_btn"></official-account>
		<view class="container">
			
		  <view class="header_box">
		    <view class="user_box" v-if="!hasLogin">
		      <view class="user_tx" data-url="/pagesA/login/login" @tap='jump'>
		        <image class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/mr_tx.jpg')"></image>
		      </view>
		      <view class="user_msg" data-url="/pagesA/login/login" @tap='jump'>
		        <view class="user_name">登录</view>
		      </view>
		    </view>
		
		    <view v-else class="user_box">
		      <view class="user_tx">
		        <image class="user_tx" @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+loginMsg.id" :src="loginMsg.avatarurl"></image>
						<!-- mingxing -->
						<view v-if="loginMsg.identity_id==1" class="star_v star_v1">
							<image  :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
						</view>
						
						<!-- daren -->
						<view v-if="loginMsg.identity_id==2" class="star_v star_v1">
							<image  :src="filter.imgIP('/static_s/51daiyan/images/star_dbg.png')"></image>
							<text class="iconv iconfont"></text>
							<text class="user_v_lv">{{loginMsg.user_grade_num?loginMsg.user_grade_num:0}}</text>
						</view>
						
		      </view>
		      <!-- <view class="user_tx">
						<image class="user_tx" src="../../static/images/tx.jpg"></image>
					</view> -->
		      <view class="user_msg">
		        <view class="user_name">
		          <text>{{loginMsg.nickname}}</text>
		          <view class="daiyan_lv">
		            <text class="iconfont iconxingzhuang60kaobei2"></text>代言星级 {{loginMsg.advocacy_grade_value}}</view>
		        </view>
		        <view class="user_id">代言ID: {{loginMsg.identification_id}}</view>
		      </view>
		      <view @tap="jump" data-url="/pagesA/mymsg/mymsg">
		        <text class="iconfont iconshezhi"></text>
		      </view>
		    </view>
				
				
		    <view class="user_money user_money1">
		      <view class="user_money_tit" data-url="/pagesA/my_tx/my_tx" @tap="jump_money" data-login="true" :data-haslogin="hasLogin">
		        <view class="v1">
		          <text class="iconfont iconyue"></text>
		          <view class="v1_tit">余额</view>
		          <text class="yue_tip">（可提现）</text>
		        </view>
		        <view class="v1">
		          <view class="v1_tit">¥{{loginMsg.money?loginMsg.money:0}}</view>
		        </view>
		        <view class="v2">立即提现
		          <text class="iconfont iconnext3"></text>
		        </view>
		      </view>
		
		      <view class="inr_box">
		        <view class="yue_li">
		          <view class="yue_num">¥{{loginMsg.stay_entry_money?loginMsg.stay_entry_money:0}}</view>
		          <view>待入账收益</view>
		        </view>
		        <view class="yue_li">
		          <view class="yue_num">¥{{loginMsg.yet_entry_money?loginMsg.yet_entry_money:0}}</view>
		          <view>已入账收益</view>
		        </view>
		        <view class="yue_li">
		          <view class="yue_num">¥{{loginMsg.yet_withdraw_money?loginMsg.yet_withdraw_money:0}}</view>
		          <view>已提现收益</view>
		        </view>
		      </view>
		    </view>
		  </view>
			
			
		  <view class="my_mian">
		    <view class="user_money user_money" v-if="hasLogin">
		      <view class="user_money_tit">
		        <view class="v1">
		          <text class="iconfont iconshuju"></text>
		          <view class="v1_tit">我的代言指数</view>
		        </view>
		      </view>
		
		      <view class="inr_box">
		        <view class="yue_li">
		          <view>代言商品</view>
		          <view class="zhishu">
		            <text>{{loginMsg.advocacy_goods_number?loginMsg.advocacy_goods_number:0}}</text>件</view>
		        </view>
		        <view class="yue_li">
		          <view>跟随购买</view>
		          <view class="zhishu">
		            <text>{{loginMsg.follow_buy_goods_number?loginMsg.follow_buy_goods_number:0}}</text>件</view>
		        </view>
		        <view class="yue_li">
		          <view>超过好友</view>
		          <view v-if="exceed_number_bl>-1" class="zhishu"> <text>{{exceed_number_bl?exceed_number_bl:0}}</text>%</view>
		          <view v-if="hasLogin&&exceed_number_bl==-1" class="zhishu"> <image class="loading_img" :src="filter.imgIP('/static_s/51daiyan/images/loading_more.gif')" mode=""></image></view>
		          <view v-if="!hasLogin" class="zhishu"> <text>0</text>%</image></view>
		        </view>
		        <view class="yue_li">
		          <view>公益指数</view>
		          <view class="zhishu">
		            <text>{{loginMsg.public_benefit_number?loginMsg.public_benefit_number:0}}</text></view>
		        </view>
		      </view>
		    </view>
		    <view class="user_money mt20"  v-if="hasLogin">
		      <view class="user_money_tit" @tap="jump" data-url="/pagesA/OrderList/OrderList"  data-login="true" :data-haslogin="hasLogin">
		        <view class="v1">
		          <text class="iconfont icondingdan"></text>
		          <view class="v1_tit">我的订单</view>
		        </view>
		        <view class="v2">查看更多
		          <text class="iconfont iconnext3"></text>
		        </view>
		      </view>
		
		      <view class="inr_box">
		        <view class="yue_li" @tap="jump" data-url="/pagesA/OrderList/OrderList?type=1"  data-login="true" :data-haslogin="hasLogin">
		          <image class="order_icon" :src="filter.imgIP('/static_s/51daiyan/images/my21.png')"></image>
		          <view>待付款</view>
		        </view>
		        <view class="yue_li" @tap="jump" data-url="/pagesA/OrderList/OrderList?type=3" data-login="true" :data-haslogin="hasLogin">
		          <image class="order_icon" :src="filter.imgIP('/static_s/51daiyan/images/my20.png')" ></image>
		          <view>待收货</view>
		        </view>
		        <view class="yue_li" @tap="jump" data-url="/pagesA/OrderList/OrderList?type=5" data-login="true" :data-haslogin="hasLogin">
		          <image class="order_icon" :src="filter.imgIP('/static_s/51daiyan/images/my22.png')"></image>
		          <view>待代言</view>
		        </view>
		        <view class="yue_li" @tap="jump" data-url="/pagesA/OrderList_sh/OrderList_sh" data-login="true" :data-haslogin="hasLogin">
		          <image class="order_icon" :src="filter.imgIP('/static_s/51daiyan/images/my23.png')"></image>
		          <view>退换/售后</view>
		        </view>
		      </view>
		    </view>
		    <view class="my_list">
		      <view v-if="loginMsg.auth_status==1" class="fx_li  mt20" @tap="jump" data-url="/pagesA/my_rz1/my_rz1" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_20.png')"></image>
		        <view class="fx_tit">51认证申请</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view v-else class="fx_li  mt20" @tap="jump" data-url="/pagesA/my_rz3/my_rz3" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_20.png')"></image>
		        <view class="fx_tit">51认证申请</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" @tap="jump" data-url="/pagesA/myaddress/myaddress" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_14.png')"></image>
		        <view class="fx_tit">地址管理</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li " @tap="jump" data-url="/pagesA/my_daiyan/my_daiyan" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_04.png')"></image>
		        <view class="fx_tit">我的代言</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" @tap="jump" data-url="/pagesA/my_guanzhu/my_guanzhu" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_08.png')"></image>
		        <view class="fx_tit">我的关注</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" @tap="jump" data-url="/pagesA/my_shoucang/my_shoucang" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_10.png')"></image>
		        <view class="fx_tit">我的收藏</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" @tap="jump" data-url="/pagesA/my_yhq/my_yhq" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_12.png')"></image>
		        <view class="fx_tit">我的优惠券</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" data-url="/pagesA/my_qianbao/my_qianbao" @tap="jump" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_14.png')"></image>
		        <view class="fx_tit">我的钱包</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" @tap="jump" data-url="/pagesA/my_qianbao1/my_qianbao1" data-login="true" :data-haslogin="hasLogin">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_16.png')"></image>
		        <view class="fx_tit">我的代言豆</view>
		        <text class="iconfont iconnext3"></text>
		      </view>
		      <view class="fx_li" @tap="jump" data-url="/pagesA/ysxy/ysxy?type=about">
		        <image class="li_icon" :src="filter.imgIP('/static_s/51daiyan/images/ny_18.png')"></image>
		        <view class="fx_tit">关于51代言</view>
		        <text class="iconfont iconnext3"></text>
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
	export default {
		data() {
			return {
				exceed_number_bl:-1,
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		watch: {
			hasLogin(newval,oldval){
				var that =this
				console.log(newval)
				if(newval==true){
					this.btn_kg=0
					setTimeout(()=>{
						that.getdata()
					},1000)
				}
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  if(this.hasLogin){
				service.wxlogin()
				
			}else{
				uni.stopPullDownRefresh();
			}
		},
		onLoad() {
			if(this.hasLogin){
				service.wxlogin()
			}
		},
		onShow() {
			if(this.hasLogin){
				this.getdata()
			}
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
		
		},
		
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {
		
		},
		methods: {
			jump_money(e){
				if(this.loginMsg.id_number){
					service.jump(e)
				}else{
					wx.showModal({
					  title: '提示',
					  content: '请先完成实名认证',
					  success(res) {
					    if (res.confirm) {
					      console.log('用户点击确定')
					     uni.navigateTo({
					     	url:'/pagesA/my_rz_sm/my_rz_sm'
					     })
					    } else if (res.cancel) {
					      console.log('用户点击取消')
					    }
					  }
					})
				}
				
			},
			getdata() {
				var that = this
				var datas = {
					id: that.loginMsg.id,
				}
				// 单个请求
				service.P_get('/user/getExceedFriend', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.exceed_number_bl = res.data.exceed_number_bl
						uni.setStorageSync('exceed_number_bl',res.data.exceed_number_bl)
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			jump(e){
			  service.jump(e)
			},
			pveimg(e) {
			  service.pveimg(e)
			},
		}
	}
</script>

<style scoped>
	.loading_img{
		width: 30rpx;
		height: 30rpx;
	}
.container{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
}
.header_box{
	width: 100%;
	height:175rpx;
	background:linear-gradient(180deg,rgba(245,195,61,1),rgba(254,133,53,1));
	border-bottom-left-radius: 40rpx;
	border-bottom-right-radius: 40rpx;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
	margin-bottom: 200rpx;
	position: relative;
}
.user_box{
	display: flex;
	align-items: center;
}
.user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	margin-right: 30rpx;
	position: relative;
}

.user_msg{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.user_name{
	font-size: 30rpx;
	color: #fff;
	display: flex;
	align-items: center;
}
.daiyan_lv{
	padding: 2rpx 15rpx;
	height:32rpx;
	background:rgba(255,255,255,1);
	border-radius:8rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #F8AE3A;
	font-size: 22rpx;
	margin-left: 20rpx;
}
.iconxingzhuang60kaobei2{
	font-size: 22rpx;
}
.user_id{
	font-size: 24rpx;
	color: #fff;
}
.iconshezhi{
	font-size: 32rpx;
	position: relative;
	top: -15rpx;
  color: #fff;
}
.user_money{
	width:694rpx;
	height:238rpx;
	background:rgba(255,255,255,1);
	border-radius:12rpx;
}
.user_money1{
	position: absolute;
	top: 120rpx;
}
/* user_money_tit */
.user_money_tit{
	width: 100%;
	height: 73rpx;
	padding: 0 22rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
}
.user_money_tit .v1{
	font-size: 28rpx;
	color: #333;
	display: flex;
	align-items: center;
}
.user_money_tit .v2{
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #999;
}
.v2 .iconfont{
	font-size: 24rpx;
	color: #999;
	margin-left: 10rpx;
}
.v1_tit{
	font-weight: bold;
	font-size: 28rpx;
}
.v1 .iconfont{
	font-size: 28rpx;
	color: #F5C33D;
	margin-right: 10rpx;
}
.v1 .yue_tip{
	font-size: 22rpx;
	color: #333;
}
.inr_box{
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.yue_li{
	padding-top: 30rpx;
	text-align: center;
	font-size: 24rpx;
	color: #333;
}
.yue_num{
	color: #F8AF3A;
	font-size: 30rpx;
	font-weight: bold;
	margin-bottom: 23rpx;
}

.my_mian{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
}
.zhishu{
	margin-top: 22rpx;
}
.zhishu text{
	color: #F8AE3A;
	margin-right: 10rpx;
}
.order_icon{
	width: 48rpx;
	height: 48rpx;
	margin-bottom: 10rpx;
}



.my_list{
	border-radius: 10rpx;
	padding-bottom: 50px;
}

.fx_li{
  width: 100%;
  background: #fff;
  height: 90rpx;
  padding-right: 28rpx;
	display: flex;
	align-items: center;
	margin-bottom: 3rpx;
	box-sizing: border-box;
	overflow: hidden;
}
.fx_li:first-child{
	border-top-left-radius: 12rpx;
	border-top-right-radius: 12rpx;
}
.fx_li:last-child{
	border-bottom-left-radius: 12rpx;
	border-bottom-right-radius: 12rpx;
}
.li_icon{
  width: 90rpx;
  height: 90rpx;
}
.fx_tit{
	flex:1;
	display: flex;
	align-items: center;
	font-size: 30rpx;
	color: #333;
}
.fx_r_img{
	position: relative;
}
.fx_r_img image{
	width: 63rpx;
	height: 63rpx;
}
.fx_r_img text{
	position: absolute;
	top: 0;
	right: 0;
	width: 14rpx;
	height: 14rpx;
	background: #FE3A35;
	border-radius:50%;
}
.iconnext3{
	margin-left: 20rpx;
	font-size: 28rpx;
	color: #BBBBBB;
}
.mt20{
	margin-top: 20rpx;
}
</style>
