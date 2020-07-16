<template>
	<view>
		<view class="container">
		
		  <!-- 代言圈 -->
		  <view class="quan_list">
		    <view class="quan_li" v-for="(item,idx) in start_li">
		      <view class="quan_user_box">
		        <image @tap="jump" data-url="/pages/my_index/my_index" class="quan_user_tx" src="/static/images/tx.png" mode="aspectFill"></image>
		        <view class="quan_user_msg">
		          <view class="quan_user_name">倪小丫 <image src="/static/images/star_b.png"></image></view>
		          <view class="quan_user_time"><text>10-14 18:03</text><text>演员</text></view>
		        </view>
		        <!-- <view class="quan_user_btn">为我投票</view> -->
		      </view>
		      <view class="quan_msg">
		        <view class="oh4  quan_msg_text">可能这辈子都戒不掉米饭了，吃好饭的用好锅，我为苏泊尔智能电饭锅代言。</view>
		        <view v-if="idx==2" class="quan_msg_img">
		          <image class="one" src="/static/images/goods.png" mode="aspectFill"></image>
		        </view>
		        <view v-else class="quan_msg_img">
		          <image :src="filter.imgIP('goods.png')"  mode="aspectFill" :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
		          <image :src="filter.imgIP('goods.png')"  mode="aspectFill" :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
		          <image :src="filter.imgIP('goods.png')"  mode="aspectFill" :data-src="filter.imgIP('goods.png')" @tap.stop="pveimg"></image>
		        </view>
		      </view>
		      <view class="quan_goods"  @tap="jump" data-url="/pages/details/details">
		        <image class="quan_goods_img" :src="filter.imgIP('goods.png')" mode="aspectFill"></image>
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
		        <view class="cz_li" @tap.stop="zan" data-id="idx"><text class="iconfont iconzan"></text>1566</view>
		      </view>
		    </view>
		  </view>
		  <!-- <view class="zxkf_btn">
				<button open-type="contact" bindcontact="kffuc"></button>
				<image src="../../static/images/zxkf.png"></image>
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
	export default {
		data() {
			return {
				banner: '',
				homeSeek: '',
				homeTeacher: '',
				homeVideo: '',
				start_li:[
				  {
				    name: '未达标商户',
				    img: '/static/images/1_03.jpg',
				    url: '/pages/list/list',
				    type: '1'
				  },
				  {
				    name: '达标商户',
				    img: '/static/images/1_05.jpg',
				    url: '/pages/list/list',
				    type: '2'
				  },
				  {
				    name: '巡机单',
				    img: '/static/images/1_09.jpg',
				    url: '/pages/list/list',
				    type: '2'
				  },
				  {
				    name: '已巡机',
				    img: '/static/images/1_10.jpg',
				    url: '/pages/list/list',
				    type: '3'
				  },
				  {
				    name: '装机单',
				    img: '/static/images/1_13.jpg',
				    url: '/pages/list/list',
				    type: '4'
				  },
				  {
				    name: '已装机',
				    img: '/static/images/1_14.jpg',
				    url: '/pages/list/list',
				    type: '5'
				  },
				  {
				    name: '维护单',
				    img: '/static/images/1_17.jpg',
				    url: '/pages/list/list',
				    type: '6'
				  },
				  {
				    name: '已维护',
				    img: '/static/images/1_18.jpg',
				    url: '/pages/list/list',
				    type: '7'
				  },
				  {
				    name: '换机单',
				    img: '/static/images/2_09.jpg',
				    url: '/pages/list/list',
				    type: '8'
				  },
				  {
				    name: '已换机',
				    img: '/static/images/2_10.jpg',
				    url: '/pages/list/list',
				    type: '9'
				  },
				  {
				    name: '撤机单',
				    img: '/static/images/2_13.jpg',
				    url: '/pages/list/list',
				    type: '10'
				  },
				  {
				    name: '已撤机',
				    img: '/static/images/2_14.jpg',
				    url: '/pages/list/list',
				    type: '11'
				  },
				  {
				    name: '终端交易查询',
				    img: '/static/images/2_17.jpg',
				    url: '/pages/list/list',
				    type: '12'
				  },
				  {
				    name: '应收列表',
				    img: '/static/images/2_18.jpg',
				    url: '/pages/list/list',
				    type: '13'
				  },
				  
				],
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 1000,
				circular: true
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  var that =this
		  // that.getdata()
		},
		
		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function () {
		
		},
		retry() {
		  this.getdata()
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
		  // this.getdata()
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
			getdata(){
			  ///api/homeIndex
			  var that = this
			  const htmlStatus1 = htmlStatus.default(that)
			  wx.request({
			    url: app.IPurl + '/api/homeIndex',
			    data: {},
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'get',
			    success(res) {
			      // 停止下拉动作
			      wx.stopPullDownRefresh();
			      htmlStatus1.finish()
			      console.log(res.data)
			      if (res.data.code == 1) {  //数据为空
			
			        that.setData({
			          banner: res.data.data.homeBanner,
			          homeSeek: res.data.data.homeSeek,
			          homeTeacher: res.data.data.homeTeacher,
			          homeVideo: res.data.data.homeVideo,
			        })
			      } else {
			        htmlStatus1.error()
			        wx.showToast({
			          icon: 'none',
			          title: '加载失败'
			        })
			
			      }
			    },
			    fail() {
			      // 停止下拉动作
			      wx.stopPullDownRefresh();
			      htmlStatus1.error()
			      wx.showToast({
			        icon: 'none',
			        title: '加载失败'
			      })
			
			    },
			    complete() {
			      // // 停止下拉动作
			      // wx.stopPullDownRefresh();
			    }
			  })
			},
			zan(e){
			  console.log(e.currentTarget.dataset.id)
			},
			jump(e){
			  service.jump(e)
			},
			pveimg(e) {
			  service.pveimg(e)
			},
			kffuc(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped>
.container{
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  /* padding: 30rpx 47rpx; */
}
.header_box{
  width: 100%;
  background:linear-gradient(180deg,rgba(245,195,61,1),rgba(254,133,53,1));
}
.index_box1{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rpx 29rpx;
  box-sizing: border-box;
}

.user_tx{
  width:74rpx;
  height:74rpx;
  border-radius:37px;
  margin-right: 10rpx;
}
.sousuo_box{
  flex: 1;
  height:55rpx;
  background:rgba(255,255,255,1);
  border-radius:28px;
  font-size: 24rpx;
  color: #BBBBBB;
  box-sizing: border-box;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
}
.sousuo_box text{
  margin-right: 20rpx;
}
.game_js{
  width:165rpx;
  height:45rpx;
  background:linear-gradient(180deg,rgba(252,139,17,1),rgba(255,85,25,1));
  opacity:0.8;
  border-radius:0px 23px 23px 0px;
  margin-left: 30rpx;
  font-size: 24rpx;
  color: #fff;
  display: flex;
  align-items: center;
  padding-left: 50rpx;
  box-sizing: border-box;
  position: relative;
}
.game_js text{
  position: absolute;
  left: -20rpx;
  font-size: 60rpx;
}
/* index_box2 */
.index_box2 {
  padding: 5rpx 29rpx 20rpx;
}
.index_box2 view{
  color: #fff;
  font-size: 30rpx;
  position: relative;
}
.index_box2  .cur text{
  content: '';
  position: absolute;
  bottom: -8rpx;
  left: 50%;
  margin-left: -25rpx;
  width:50rpx;
  height:6rpx;
  background:rgba(255,251,240,1);
  border-radius:3px;
}
.index_box3{
  height:52rpx;
  background: #FFF4EF;
  font-size: 22rpx;
  color: #f9b234;
  justify-content: flex-start;
  align-items: center;
}
.index_box3 text{
  margin-right: 20rpx;
}
.index_box4{
  height:82rpx;
  background: #fff;
  justify-content: space-between;
  font-size: 24rpx;
  color: #999;
}
.index_box4 text{
  color: #FE8735;
}
.start_list{
  width: 100%;
  
  
  background: #fff;
  height: 286rpx;
  display: flex;
  white-space: nowrap;
  margin-bottom: 20rpx;

}
.start_list1{
  padding: 10rpx 29rpx 40rpx;
  box-sizing: border-box;
  height: 286rpx;
}
.start_li{
  display: inline-flex;
  width:198rpx;
  height:246rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  margin-right: 20rpx;
  flex-direction: column;
  align-items: center;
  padding: 17rpx;
  box-sizing: border-box;
}

.star_tx{
  width:82rpx;
  height:82rpx;
  border-radius:50%;
  position: relative;
  margin-bottom: 20rpx;
}
.star_tx>image{
  width:82rpx;
  height:82rpx;
  border-radius:50%;
  position: relative;
  z-index: 1;
  
}
.star_tx view image{
  width:27rpx;
  height:28rpx;
  position: absolute;
  bottom: 0;
  right: -5rpx;
  z-index: 2;
}
.star_name{
  font-size: 30rpx;
  line-height: 30rpx;
  margin-bottom: 20rpx;
  color: #333;
}
.star_btn{
  width: 100%;
  height:56rpx;
  background:rgba(254,135,53,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color: #fff;
}
.find_star{
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
.find_tit{
  display: flex;
  flex-direction: column;
  justify-content: space-around
}
.find_tit text{
  font-size: 24rpx;
  color: #FE8735;
}
.find_sj{
 
  display: flex;
  align-items: center;
}
.find_sj>text{
  color: #EEEEEE;
  font-size: 24rpx;
  margin-left: 20rpx;
}
.sj_list{
  display: flex;
  flex-direction: row-reverse;
}
.sj_li{
  width:96rpx;
  height:96rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 10rpx 0px rgba(119,119,119,0.2);
  border-radius:50%;
  position: relative;
  z-index: 10;
}
.sj_li:nth-child(2){
  position: relative;
  left: 20rpx;
  z-index: 9;
}
.sj_li:nth-child(3){
  position: relative;
  left: 40rpx;
  z-index: 8;
}
.sj_li:nth-child(4){
  position: relative;
  left: 60rpx;
  z-index: 7;
}
.sj_li:nth-child(5){
  position: relative;
  left: 80rpx;
  z-index: 6;
}
/* goods_index */

.goods_index{
  width: 100%;
  background: #fff;
  display: flex;
  margin-bottom: 20rpx;
}
.goods_index>view{
  flex: 1;
  padding: 15rpx;
}
.goods_index>view+view{
  border-left:1rpx solid #eee;
}
.goodstype_name{
  font-size: 30rpx;
  color: #333;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.goodstype_name image{
  width: 142rpx;
  height: 40rpx;
  margin-left: 5rpx;
}
.goodstype_name1 image{
  width: 40rpx;
}
.goods_tip{
  margin-top: 8rpx;
  font-size: 24rpx;
  color: #999;
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
  margin-bottom: 16rpx;
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
  /* min-width:352rpx; */
  max-width: 100%;
  border-radius:10px;
}
.quan_goods{
  margin-top: 30rpx;
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
</style>
