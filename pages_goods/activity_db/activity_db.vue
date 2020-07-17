<template>
	<view>
		<view class="container">
		  <view class="avtivity_box">
		    <image class="avtivity_box" :src="filter.imgIP('hd_banner.jpg')"></image>
		    <view class="hd_time">活动截止时间：2019/11/01-2019/11/03</view>
		  </view>
		  <view class="avtivity_time">
		    <image class="avtivity_time" :src="filter.imgIP('/static_s/51daiyan/images/hd_bg2.jpg')"></image>
		    <view class="avtivity_time_djs">
		      活动倒计时：
		     <text>{{hd_time.day>0?hd_time.day:0}}</text>
		     天
		     <text>{{hd_time.hh>0?hd_time.hh:0}}</text>
		     小时
		     <text>{{hd_time.mm>0?hd_time.mm:0}}</text>
		     分
		     <text>{{hd_time.min>0?hd_time.min:0}}</text>
		     秒
		    </view>
		  </view>
		  <view class="hd_db_img">
		    <image class="hd_db_img" :src="filter.imgIP('/static_s/51daiyan/images/hd_db_img.jpg')"></image>
		  </view>
		  <view class="hd_db_bg">
		    <image class="hd_db_bg" :src="filter.imgIP('/static_s/51daiyan/images/hd_db_bg.jpg')"></image>
		    <view class="hd_db_dp">
		      <view class="d1">
		        <view>人人都是代言人</view>
		        <view>我的优惠券<text class="iconfont iconnext3 fz14 cf"></text></view>
		      </view>
		      <view class="dp_msg">
		        <image :src="filter.imgIP('dp_logo.jpg')"></image>
		        <view @tap="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view>
		        <text>参与投票可获得优惠券</text>
		      </view>
		    </view>
		  </view>
		  <view class="hd_jd">晋级50强 2019/11/18-2019/11/25</view>
		 
		  <view class="db_main">
		    <view class="list_tit" :class="ph_type==1?'cur':''">
		      <view class="ph_fri">
		        <image class="ph_fri " :src="ph_type==0?'../../static/images/daiyan_ph1.png':'../../static/images/daiyan_ph.png'"></image>
		        <view class="pl_li" @tap="ph_fuc" data-type="0">为TA投票</view>
		      </view>
		      <view class="pl_li1" @tap="ph_fuc" data-type="1">活动介绍</view>
		    </view>
		    <view class="dy_list" v-if="ph_type=='0'">
		      <view class="dy_box"  v-for="(item,idx) in start_li">
		        <view class="dy_li">
		          <view class="pl_num">
		            <image v-if="idx==0" class="pl_num" :src="filter.imgIP('/static_s/51daiyan/images/phicon_1.png')"></image>
		            <image v-if="idx==1" class="pl_num" :src="filter.imgIP('/static_s/51daiyan/images/phicon_2.png')"></image>
		            <image v-if="idx==2" class="pl_num" :src="filter.imgIP('/static_s/51daiyan/images/phicon_3.png')"></image>
		            <text v-if="idx>2">{{idx+1}}</text>
		          </view>
		          <view class="pl_tx" @tap="jump" data-url="/pages/my_index/my_index">
		            <image class="pl_tx" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
		          </view>
		          <view class="ph_name">张一鸣</view>
		          <view class="ph_num">
		            <text>2200</text>人气值</view>
		          <view v-if="item.tp_type==1" @tap.stop="toupiao" :data-idx="idx" class="ph_btn">投票</view>
		          <view  v-else class="ph_btn ph_btn1">已投票</view>
		        </view>
		        <view class="li_dy">代言说：喜欢运动的感觉，耐克just di it！</view>
		      </view>
		      
		    </view>
		    <view class="dy_list" v-if="ph_type=='1'">
		      <view class="hd_js">
		        <view class="dyr_tit">耐克优选代言人：</view>
		      <view class="dyr_msg">选出最会玩，最有影响力的代言人，人人都可参与的代言人活动。自拍短视频上传，并拉动朋友参与优选投票。你就有机会成为该品牌的优选代言人，并获得现金激励。</view>
		      <video src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo-transcode-cae/2902246_e631577dd461c49ccf6939da69bce1d2_0_cae.mp4"></video>
		      </view>
		    </view>
		  </view>
		</view>
	</view>
</template>


<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	var djs_fuc
	export default {
		data() {
			return {
				hd_time:{
				  day: 0,
				  hh: 0,
				  mm: 0,
				  min:0,
				},
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
				ph_type: '0',
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  var that =this
		  djs_fuc=setInterval(function () {
		    that.hd_time= that.djs()
		    console.log(that.djs())
		  }, 1000);
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
		  clearInterval(djs_fuc) 
		},
		
		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function () {
		  clearInterval(djs_fuc) 
		},
		
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
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
			jump(e) {
			  service.jump(e)
			},
			ph_fuc(e) {
			  var that = this
			  if (that.ph_type == e.currentTarget.dataset.type) return
			  that.ph_type= e.currentTarget.dataset.type
			},
			djs(){
			  var nowtime = new Date(),  //获取当前时间
			    endtime = new Date("2020/6/8");  //定义结束时间
			  var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
			    leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
			    lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
			    leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
			    lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
			  var djstime={
			    day: leftd,
			    hh: lefth,
			    mm: leftm,
			    min: lefts,
			  }
				if(lefttime<0){
					clearInterval(djs_fuc) 
				}
			  return djstime
			  // return leftd + "天" + lefth + ":" + leftm + ":" + lefts;  //返回倒计时的字符串
			}
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	min-height: 100vh;
	background: #fff;
  padding-bottom: 50rpx;
  position: relative;
}
.avtivity_box{
  position: relative;
  width: 100%;
  height: 336rpx;
}
.hd_time{
  width: 100%;
  position: absolute;
  bottom: 36rpx;
  text-align: center;
  font-size: 24rpx;
  color: #fff;
}
.avtivity_time{
  width:750rpx;
  height:110rpx;
  position: relative;
}
.avtivity_time_djs{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #fff;
  font-size: 30rpx;
}
.avtivity_time_djs text{
  width:46rpx;
  height:60rpx;
  background:rgba(255,255,255,1);
  border:1px solid rgba(191,191,191,1);
  border-radius:10rpx;
  color: #333;
  margin: 0 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}



.hd_jd{
  width:750rpx;
  height:80rpx;
  
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #999999;
}
/* 代言人list */
.dy_list{
	width: 100%;
	background: #fff;
  box-shadow:0px 4px 30rpx 0px rgba(119,119,119,0.3);
  border-radius:0 0 10rpx 10rpx;
}
.dy_box{
	width: 100%;
	padding-bottom: 20rpx;
	border-bottom: 1px solid #eee;
}
.dy_li{
	width: 100%;
	background: #fff;
	display: flex;
	align-items: center;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
}
.pl_num{
	width: 38rpx;
	height: 54rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #999;
	font-weight:600;
}
view.pl_num{
	margin-right: 26rpx;
}
.pl_tx{
	width:72rpx;
	height:72rpx;
	border-radius:50%;
}
view.pl_tx{
	margin-right: 26rpx;
}
.ph_name{
	flex: 1;
	font-size: 26rpx;
	color: #333;
}
.ph_num{
  display: flex;
  flex-direction: column;
	font-size: 24rpx;
	color: #BBBBBB;
}
.ph_num text{
	font-size: 36rpx;
  line-height: 36rpx;
	color: #FE9B00;
}
.ph_btn{
	margin-left: 20rpx;
	width:132rpx;
	height:63rpx;
	background:rgba(255,162,89,1);
	border-radius:10rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-size: 30rpx;
}
.ph_btn1{
  background:#D2D2D2;
}
.li_dy{
	padding-left: 84rpx;
	padding-right: 28rpx;
	box-sizing: border-box;
	margin-top: 10rpx;
	font-size: 24rpx;
	color: #999;
}

.list{
	width: 100%;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	overflow: hidden;
}
.list_tit{
	width: 100%;
	background:rgba(255,76,0,.5);
	height: 85rpx;
	display: flex;
  box-shadow:0px 4px 30rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx 10rpx 0 0;
}
.list_tit.cur{
	background:rgba(255,76,0,1);
}
.ph_fri{
	width:367rpx;
	height:85rpx;
	position: relative;
}
.pl_li{
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
}

.pl_li1{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
}
.db_main{
  width: 100%;
  padding: 0 28rpx;
  box-sizing: border-box;
}

/* daiyantit */
.hd_db_img{
  width: 100%;
  height: 171rpx;
}
.hd_db_bg{
  width: 694rpx;
  height: 404rpx;
  margin: 20rpx auto;
  box-shadow:0px 4rpx 30rpx 0px rgba(119,119,119,0.3);
  position: relative;
}
image.hd_db_bg{
  margin: 0;
}
.hd_db_dp{
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  right: 20rpx;

}
.hd_db_dp .d1{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 24rpx;
}
.hd_db_dp .d1 view:first-child{
  font-size: 28rpx;
}
.dp_msg{
  margin-top: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dp_msg image{
  width:147rpx;
  height:147rpx;
  border-radius:18rpx;
  margin-bottom: 20rpx;
}
.dp_msg view{
  width:255rpx;
  height:77rpx;
  background:rgba(255,76,0,1);
  border-radius:39rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color: #fff;
  margin-bottom: 20rpx;
}

.dp_msg text{
 font-size: 24rpx;
 color: #fff;
}
.hd_js{
  width: 100%;
  padding: 35rpx;
  box-sizing: border-box;

}
.dyr_tit{
  font-size: 28rpx;
  color: #333;
}
.dyr_msg{
  font-size: 28rpx;
  color: #999;
  margin: 20rpx auto;
}
.hd_js video{
  width:621rpx;
  height:350rpx;
  border-radius:10rpx;
}
</style>
