<template>
	<view>
		<view class="container">
		  <view class="quan_tab">
				<view :class="tab_type==0?'cur':''" data-type="0" @tap="tab_fuc">圈子介绍<text></text></view>
				<view :class="tab_type==1?'cur':''" data-type="1" @tap="tab_fuc">圈内达人<text></text></view>
				<view :class="tab_type==2?'cur':''" data-type="2" @tap="tab_fuc">圈子商品<text></text></view>
			</view>
			<view v-if="tab_type==0">
		    <view class="daiyan_msg">
		      <view class="dy_logo">
		        <image class="dy_logo" :src="filter.imgIP('tx.png')"></image>
		      </view>
		      <view class="dy_msg">
		        <!-- <view class="pd_name">体育</view> -->
		         <view class="pd_name dis_flex aic">体育
		 
		         <view  v-if="item.tp_type==1" :data-idx="idx" @tap.stop="toupiao" class="user_btn">+关注</view>
		 
		                             <view v-else class="user_btn user_btn1">已关注</view>
		 
		        </view>
		 
		        <view class="py_js"><text>简介</text>这是一个具有很多体育爱好者集结而成的圈子，里面包含各种体育达人的日常分享，以及如何辨别名牌运动器材真假等等…</view>
		      </view>
		    </view>
		    <view class="quan_list">
		      <view class="quan_li" v-for="(item,idx) in start_li" >
		        <view class="quan_user_box">
		          <image class="quan_user_tx" @tap="jump" data-url="/pages/my_index/my_index"
							 :src="filter.imgIP('tx.png')" mode="aspectFill"></image>
		          <view class="quan_user_msg">
		            <view class="quan_user_name">倪小丫 <image src="/static/images/star_b.png"></image></view>
		            <view class="quan_user_time"><text>10-14 18:03</text><text>演员</text></view>
		          </view>
		          <view v-if="item.tp_type==1" class="quan_user_btn" @tap.stop="toupiao" :data-idx="idx">为我投票</view>
		        <view wx:else class="quan_user_btn quan_user_btn1" >已投票</view>
		        </view>
		        <view class="quan_msg">
		          <view class="oh4  quan_msg_text">可能这辈子都戒不掉米饭了，吃好饭的用好锅，我为苏泊尔智能电饭锅代言。</view>
		          <view v-if="idx==2" class="quan_msg_img">
		            <image class="one" src="/static/images/goods1.png" mode="aspectFill"  :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
		          </view>
		          <view wx:else class="quan_msg_img">
		            <image :src="filter.imgIP('goods.png')" mode="aspectFill" :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
		            <image :src="filter.imgIP('goods1.png')" mode="aspectFill" :data-src="filter.imgIP('goods1.png')" @tap.stop="pveimg"></image>
		            <image :src="filter.imgIP('goods.png')" mode="aspectFill" :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
		          </view>
		        </view>
		        <view class="quan_goods" @tap="jump" data-url="/pages/details/details">
		          <image class="quan_goods_img" :src="filter.imgIP('goods1.png')" mode="aspectFill"></image>
		          <view class="quan_goods_msg">
		            <view class="quan_goods_name oh1">苏泊尔IH家用大容量智能电饭锅</view>
		            <view class="quan_goods_pri">
		              <text class="pri1">¥668</text>
		              <text class="pri2">¥1368</text>
		            </view>
		            <view class="quan_goods_btn">
		              <view class="goods_btn1">库存:11000</view>
		              <view  class="goods_btn2"><text>5200+</text>代言人</view>
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
		          <view class="cz_li">跟随购买：6321</view>
		          <view class="cz_li" @tap.stop="jump" data-url="/pages/daiyan_pl/daiyan_pl"><text class="iconfont iconpinglun"></text>1566</view>
		          <view class="cz_li" @tap.stop="zan" :data-id="idx"><text class="iconfont iconzan"></text>1566</view>
		        </view>
		      </view>
		    </view>
		  </view>
		  <view v-if="tab_type==1" class="list_box">
		    <view class="star_li" v-for="(item,idx) in start_li">
							 	<view class="star_msg">
							 		<view class="user_tx" @tap="jump" data-url="/pages/my_index/my_index">
							 			<image class="user_tx" :src="filter.imgIP('tx.png')"></image>
							 			<image class="user_v" src="../../static/images/star_b.png"></image>
							 		</view>
							 		<view class="user_msg">
							 			<view class="fwb ">张一鸣</view>
							 			<view class="oh1 fz22"><image src="../../static/images/star_jj.png"></image>简介：一线明星，知名演员…</view>
							 			<view class=""><image src="../../static/images/dy_num.png"></image>代言数量：20</view>
							 		</view>
							 		<view  v-if="item.tp_type==1" :data-idx="idx" @tap.stop="toupiao" class="user_btn">+关注</view>
							 		<view wx:else class="user_btn user_btn1">已关注</view>
							 	</view>
							 </view>
		  </view>
		  <view  v-if="tab_type==2" class="list_box list_box1">
		    <view class="list_tab">
						<view @tap="px_fuc" data-type="0">代言费
							<view class="list_px"><text class="iconfont iconXSJ-copy" :class="dy_mon==0?'cur':''"></text><text class="iconfont iconXSJ" :class="dy_mon==1?'cur':''"></text></view>
						</view>
						<view @tap="px_fuc" data-type="1">代言人数<view class="list_px"><text class="iconfont iconXSJ-copy" :class="dy_num==0?'cur':''"></text><text class="iconfont iconXSJ"  :class="dy_num==1?'cur':''"></text></view></view>
						<view @tap="px_fuc" data-type="2">价格<view class="list_px"><text class="iconfont iconXSJ-copy" :class="dy_pri==0?'cur':''"></text><text class="iconfont iconXSJ"  :class="dy_pri==1?'cur':''"></text></view></view>
				</view>
		    <!-- goods_li -->
				<view class="goods_list2">
					<view class="goods_li2" v-for="(item,idx) in data_list">
						<view class="goods_li2_d1"  @tap="jump" data-url="/pages/details/details">
							<view class="goods_img2">
								<image class="goods_img2" src="../../static/images/goods.png"></image>
							</view>
							<view class="goods_msg">
								<view class="goods_name2 oh1">苏泊尔IH家用大容量智能电饭锅</view>
								<view class="goods_pri">
									<view class="pri1">¥668</view>
									<view class="pri2">¥30</view>
								</view>
								<view class="goods_dyr"  @tap="jump" data-url="/pages/daiyanren/daiyanren">
									<text class="dyr_tit">代言人</text>
		              <view class="sj_list">
		                <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		                <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		                <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		                <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		              </view>
		              <view class="goods_kc">库存:11000</view>
								</view>
							</view>
						</view>
						
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
				tab_type:'0',
				data_list:[1,1,1,1],
				start_li: [
				  {
				    name: '未达标商户',
				    img: '/static/images/1_03.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '达标商户',
				    img: '/static/images/1_05.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '巡机单',
				    img: '/static/images/1_09.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已巡机',
				    img: '/static/images/1_10.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '装机单',
				    img: '/static/images/1_13.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已装机',
				    img: '/static/images/1_14.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '维护单',
				    img: '/static/images/1_17.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已维护',
				    img: '/static/images/1_18.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '换机单',
				    img: '/static/images/2_09.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已换机',
				    img: '/static/images/2_10.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '撤机单',
				    img: '/static/images/2_13.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已撤机',
				    img: '/static/images/2_14.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '终端交易查询',
				    img: '/static/images/2_17.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '应收列表',
				    img: '/static/images/2_18.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				
				],
				indicatorDots: true,
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
			var that =this
			console.log(options)
			that.type= options.type
			if (that.options.name){
				wx.setNavigationBarTitle({
					title: that.options.name,
				})
			}
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
			uni.stopPullDownRefresh();
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
			toupiao(e) {
			  var idx = e.currentTarget.dataset.idx
			  var newdata = this.start_li
			  newdata[idx].tp_type = 2
			  this.start_li= newdata
			},
			tab_fuc(e){
				var that =this
				if(that.tab_type==e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.tab_type=e.currentTarget.dataset.type
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
.container{
	width: 100%;
	min-height: 100vh;
	background: #f5f5f5;
  padding-top: 90rpx;
}
.quan_tab{
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background: #fff;
	border-bottom: 1px solid #eee;
  position: fixed;
  top: 0;
  z-index: 999;
}
.quan_tab view{
	color: #999999;
	font-size: 30rpx;
	position: relative;
	padding: 30rpx 0 20rpx;
}
.quan_tab view.cur{
	color: #333333;
	font-size: 30rpx;
	position: relative;
}
.quan_tab .cur text{
  content: '';
  position: absolute;
  bottom: 0rpx;
  left: 50%;
  margin-left: -25rpx;
  width:50rpx;
  height:6rpx;
  background:#F9B234;
  border-radius:3px;
}
.daiyan_msg{
	background: #fff;
	width: 100%;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}
.dy_logo{
	width:160rpx;
	height:157rpx;
	border-radius:80rpx;
}
.dy_msg{
	margin-left: 20rpx;
	flex: 1;
}
.pd_name{
	font-size: 32rpx;
	color: #333;
	margin-bottom: 25rpx;
}
.py_js{
	font-size: 24rpx;
	color: #333;
}
.py_js text{
	width:62rpx;
	height:34rpx;
	background:rgba(254,135,53,1);
	border-radius:10rpx;
	color: #fff;
	margin-right: 10rpx;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}


.goods_list{
  margin-top: 30rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10rpx;
}
.goods_li{
  position: relative;
  width:156rpx;
  height:156rpx;
}
.goods_img{
 width:156rpx;
  height:156rpx;
  border-radius:12rpx;
  position: relative;
  z-index: 1
}
.goods_play{
  position: absolute;
  bottom: 10rpx;
  right: 10rpx;
  z-index: 2;
  width:38rpx;
  height:38rpx;
}
/* quan */
.quan_list{
  width: 100%;
}
.quan_li{
  width: 100%;
  background: #fff;
  padding: 23rpx 28rpx 0;
  box-sizing: border-box;
}
.quan_li+.quan_li{
  margin-top: 20rpx;
}
.quan_user_box{
  display: flex;
  align-items: center;
}
.quan_user_tx{
  width:74rpx;
  height:74rpx;
  /* background:rgba(252,68,56,1); */
  border-radius:37rpx;
  margin-right: 22rpx;
}
.quan_user_btn{
  font-size: 28rpx;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width:168rpx;
  height:56rpx;
  background:rgba(254,58,53,1);
  border-radius:10rpx;
  margin-left: 20rpx;
}
.quan_user_msg{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.quan_user_name{
  font-size: 28rpx;
  color: #6876BD;
  display: flex;
  align-items: center;
}
.quan_user_name image{
  width: 28rpx;
  height: 28rpx;
  margin-left: 10rpx;
}
.quan_user_time{
  font-size: 22rpx;
  color: #999;
}
.quan_user_time text{
  margin-right: 20rpx;
}
.quan_msg{
  width: 100%;
  padding-left:96rpx;
  box-sizing: border-box; 
  margin-top: 16rpx;
  font-size: 30rpx;
  color: #333;

}
.quan_msg_text{
  line-height: 40rpx;
  margin-bottom: 20rpx;
}
.quan_msg_img image{
  width:196rpx;
  height:196rpx;
  border-radius:10rpx;
  margin-right: 4rpx;
  margin-bottom: 4rpx;
}
.quan_msg_img image:nth-child(3n){
  margin-right: 0;
}
.quan_msg_img image.one{
  
  max-width: 100%;
  border-radius:10px;
}
.quan_goods{
  margin-top: 16rpx;
  width: 100%;
  height:238rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
}
.quan_goods_img{
  width:196rpx;
  height:196rpx;
  border-radius:10rpx;
  margin-right: 20rpx;
}
.quan_goods_msg{
  flex: 1;
}
.quan_goods_name{
  font-size: 30rpx;
  color: #333;
  margin-bottom: 22rpx;
}
.quan_goods_pri{
  color: #EB4443;
  font-size: 30rpx;
  margin-bottom: 50rpx;
}
.quan_goods_pri .pri2{
  margin-left: 20rpx;
  text-decoration:line-through;
  color:#999;
}
.quan_goods_btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color:#333;
}
.goods_btn1{
  padding: 0 9rpx;
  height:40rpx;
  line-height: 40rpx;
  background:rgba(254,135,53,1);
  border-radius:10rpx;
  color: #fff;
}
.goods_btn2 text{
  color: #FE8735;
}
.quan_li_cz{
  width: 100%;
  margin-top: 15rpx;
  height: 70rpx;
  display: flex;
  /* flex-direction: row-reverse; */
  justify-content: space-between;
  align-items: center;
}
.quan_li_cz .iconcaozuo{
  font-size: 48rpx;
  color: #BBBBBB;
}
.cz_li{
 
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #999;
  font-size: 24rpx;
}
.cz_li text{
  font-size: 26rpx;
  color: #999;
  margin-right: 10rpx;
}
/* 达人 */
.list_box{
  width: 100%;
  padding: 0 28rpx 20rpx;
  box-sizing: border-box;
  background: #fff;
}
.star_li{
  margin: 20rpx auto;
	width: 100%;
	padding: 38rpx 28rpx;
	box-sizing: border-box;
	background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
  border-radius:18rpx;
}
.star_msg{
	display: flex;
	align-items: center;
}
.user_tx{
	width:100rpx;
	height:100rpx;
	border-radius:50%;
	position: relative;
}
.user_v{
	position: absolute;
	bottom: 0;
	right: 0;
	width: 27rpx;
	height: 28rpx;
}
.user_btn{
	width:122rpx;
	height:56rpx;
	border:2rpx solid rgba(254,135,53,1);
	border-radius:28rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #FE8735;
	margin-left: 15rpx;
  font-size: 30rpx;
}
.user_btn1{
	background:rgba(238,238,238,1);
	border:2rpx solid rgba(238,238,238,1);
	color: #BBBBBB;
}
.user_msg{
	flex: 1;
  height: 100rpx;
	margin-left: 15rpx;
	font-size: 24rpx;
}
.user_msg image{
	width: 26rpx;
	height: 25rpx;
  margin-right: 8rpx;
}
.user_msg .fwb{
	font-size: 32rpx;
}
.star_dymsg{
	width: 100%;
	padding-top: 20rpx;
	padding-left: 120rpx;
}
.dy_sp{
	width:334rpx;
	height:191rpx;
	border-radius:10rpx;
	position: relative;
}
.play_box{
	background:rgba(0,0,0,.5);
	position: absolute;	
	border-radius:10rpx;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.play_box image{
	position: absolute;
	top: 50%;
	left: 50%;
	width:64rpx;
	height:64rpx;
	margin-left: -32rpx;
	margin-top: -32rpx;
}
/* /list_box1 */
.list_box1{
  background: #F5F5F5;
}

/* list_tab */
.list_tab{
	width: 100%;
	background: #Fff;
	border-radius: 12rpx;
	padding: 20rpx;
	box-sizing: border-box;
	margin: 20rpx 0px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	font-size: 26rpx;
	color: #333;
}
.list_tab>view{
	display: flex;
	align-items: center;
}
.list_px{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: #BBBBBB;
}
.list_px .iconfont{
	
	font-size: 10rpx;
	margin: 2rpx 10rpx;
}
.list_px .cur{
	color: #FE8735;
}
.goods_list2{
	margin-top: 20rpx;
	width: 100%;
}
.goods_li2{
	width: 100%;
	border-radius: 12rpx;
	background: #fff;
	padding: 24rpx;
	box-sizing: border-box;
	margin-bottom: 20rpx;
}
.goods_li2_d1{
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}
.goods_img2{
	width: 196rpx;
	height: 196rpx;
	border-radius: 12rpx;
	
}
.goods_msg{
	height: 196rpx;
	margin-left: 20rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.goods_pri{
	display: flex;
	align-items: center;
	/* justify-content: space-between; */
}
.pri1{
	font-size: 30rpx;
	color: #C3AA76;
  margin-right: 20rpx;
}
.pri2{
	font-size: 24rpx;
	color: #999;
  text-decoration: line-through;

}
.goods_btn1{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods_dy_num2{
	font-size: 24rpx;
	color: #bbb;
}
.goods_dy_num2 text{
	font-size: 24rpx;
	color: #bbb;
}
.goods_to{
	width:152rpx;
	height:66rpx;
	background:#FE8735;
	border-radius:33rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
}
.goods_li2_d2{
	width: 100%;
	height:58rpx;
	background:rgba(250,251,253,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	padding: 0 13rpx;
	box-sizing: border-box;
}
.dy_tx{
	width:38rpx;
	height:38rpx;
	border-radius:50%;
}
.dy_star{
	font-size: 24rpx;
	color: #5E73A1;
	margin-left: 15rpx;
}
.goods_dyr{
  display: flex;
  align-items: center
}
.dy_text{
	flex: 1;
	font-size: 24rpx;
	color: #bbb;
  margin-right: 10rpx;
}

.sj_list{
  width: 154rpx;
  height:56rpx;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
}

.sj_li{
  width:56rpx;
  height:56rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 10rpx 0px rgba(119,119,119,0.2);
  border-radius:50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}
.sj_li:nth-child(2){
  left: 36rpx;
  z-index: 7;
}
.sj_li:nth-child(3){
  left: 72rpx;
  z-index: 8;
}
.sj_li:nth-child(4){
  left: 98rpx;
  z-index: 9;
}
.sj_li:nth-child(5){
  left: 134rpx;
  z-index: 10;
}
.dyr_tit{
  flex: none;
  font-size: 30rpx;
}
.goods_kc{
  flex: none;
  padding: 0 19rpx;
  height:40rpx;
  background:rgba(254,135,53,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #fff;
  margin-left: 20rpx;
}
.goods_name2{
  font-size: 30rpx;
}

.quan_user_btn1{
  background: #ddd;
}
</style>
