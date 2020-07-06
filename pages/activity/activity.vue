<template>
	<view>
		<view class="container">
		  <view class="avtivity_box">
		    <image  class="avtivity_box" :src="filter.imgIP('hd_banner.jpg')"></image>
		    <view class="hd_time">活动截止时间：2019/11/01-2019/11/03</view>
		  </view>
		  <view class="avtivity_time">
		    <image  class="avtivity_time" src="/static/images/hd_bg2.jpg"></image>
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
		  <view class="hd_jl">
		    <view>
		      <image :src="filter.imgIP('hdxq_jl2.png')"></image>
		      <view class="j_lv">二等奖 <text>300人</text></view>
		      <view class="j_mon">¥500/人</view>
		    </view>
		    <view>
		      <image :src="filter.imgIP('hdxq_jl1.png')"></image>
		      <view class="j_lv">一等奖 <text>300人</text></view>
		      <view class="j_mon">¥1000/人</view>
		    </view>
		    <view>
		      <image :src="filter.imgIP('hdxq_jl3.png')"></image>
		      <view class="j_lv">三等奖 <text>300人</text></view>
		      <view class="j_mon">¥300/人</view>
		    </view>
		  </view>
		  <!-- 活动商品 -->
		  <view class="box_tit">参选商品</view>
		  <view class="goods_list">
		    <view class="goods_li" @tap="jump" data-url="/pages/details/details">
		      <image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"></image>
		      <view class="goods_msg">
		        <view class="goods_name oh1">耐克跑鞋</view>
		        <view class="goods_pri">
		          <view class="pri1 ">¥456</view>
		          <view class="pri2">代言费<text>¥26</text></view>
		        </view>
		        <view class="goods_btn" @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view>
		      </view>
		    </view>
		    <view class="goods_li" @tap="jump" data-url="/pages/details/details">
		      <image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"></image>
		      <view class="goods_msg">
		        <view class="goods_name oh1">耐克跑鞋</view>
		        <view class="goods_pri">
		          <view class="pri1 ">¥456</view>
		          <view class="pri2">代言费<text>¥26</text></view>
		        </view>
		        <view class="goods_btn" @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view>
		      </view>
		    </view>
		    <view class="goods_li" @tap="jump" data-url="/pages/details/details">
		      <image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"></image>
		      <view class="goods_msg">
		        <view class="goods_name oh1">耐克跑鞋</view>
		        <view class="goods_pri">
		          <view class="pri1 ">¥456</view>
		          <view class="pri2">代言费<text>¥26</text></view>
		        </view>
		        <view class="goods_btn" @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view>
		      </view>
		    </view>
		    <view class="goods_li" @tap="jump" data-url="/pages/details/details">
		      <image class="goods_img" :src="filter.imgIP('/images/goods15_02.jpg')"></image>
		      <view class="goods_msg">
		        <view class="goods_name oh1">耐克跑鞋</view>
		        <view class="goods_pri">
		          <view class="pri1 ">¥456</view>
		          <view class="pri2">代言费<text>¥26</text></view>
		        </view>
		        <view class="goods_btn" @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view>
		      </view>
		    </view>
		  </view>
		  <view class="hd_tip">提示！活动开始前完成购买代言，即刻开始拉票！</view>
		  <view class="hd_db">
		    <view>本期优选代言人排行榜</view>
		    <view class="jump_btn" @tap="jump" data-url="/pages/activity_db/activity_db">进入打榜页<text class="iconfont iconnext3"></text></view>
		  </view>
		  <view class="dy_list">
		    <view class="dy_box" v-for="(item,idx) in start_li">
		      <view class="dy_li">
		        <view class="pl_num">
		          <image v-if="idx==0" class="pl_num" src="../../static/images/phicon_1.png"></image>
		          <image v-if="idx==1" class="pl_num" src="../../static/images/phicon_2.png"></image>
		          <image v-if="idx==2" class="pl_num" src="../../static/images/phicon_3.png"></image>
		          <text v-if="idx>2">{{idx+1}}</text>
		        </view>
		        <view class="pl_tx" @tap="jump" data-url="/pages/my_index/my_index">
		          <image class="pl_tx" :src="filter.imgIP('tx.png')" mode="aspectFill"></image>
		        </view>
		        <view class="ph_name">张一鸣</view>
		        <view class="ph_num"><text>2200</text>人气值</view>
		        <view v-if="item.tp_type==1" @tap.stop="toupiao" :data-idx="idx" class="ph_btn">投票</view>
		        <view  v-else class="ph_btn ph_btn1">已投票</view>
		      </view>
		      <view class="li_dy">代言说：喜欢运动的感觉，耐克just di it！</view>
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
			
			djs(){
			  var nowtime = new Date(),  //获取当前时间
			    endtime = new Date("2020/9/8");  //定义结束时间
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
			  return djstime
			  // return leftd + "天" + lefth + ":" + leftm + ":" + lefts;  //返回倒计时的字符串
			},
			toupiao(e) {
			  var idx = e.currentTarget.dataset.idx
			  var newdata = this.start_li
			  newdata[idx].tp_type = 2
			  this.start_li= newdata
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
.hd_jl{
  width: 100%;
  background: #fff;
  padding: 64rpx 28rpx 10rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hd_jl>view{
  width:220rpx;
  height:270rpx;
  background:rgba(255,255,255,1);
  box-shadow:4px 7rpx 20rpx 0px rgba(24,24,24,0.1);
  border-radius:8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 45rpx;
  box-sizing: border-box;
}
.hd_jl>view:nth-child(2){
  position: relative;
  top: -13rpx;
  height: 297rpx;
}
.hd_jl image{
  width: 117rpx;
  height: 105rpx;
  margin-bottom: 25rpx;
}
.j_lv{
  width: 100%;
  font-size: 28rpx;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}
.j_lv text{
  height:33rpx;
  background:rgba(251,203,90,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
  margin-left: 10rpx;
  color: #fff;
  font-size: 22rpx;
}
.j_mon{
  margin-top: 15rpx;
  font-size: 24rpx;
  color: #999;
}
.box_tit{
  width: 100%;
  box-sizing: border-box;
  padding: 0 28rpx;
  height: 80rpx;
  font-size: 28rpx;
  display: flex;
  align-items: center;
}


/* goods_list */
.goods_list{
  width: 100%;
  box-sizing: border-box;
  padding: 0 28rpx;
  display: flex;
  flex-wrap: wrap;
}
.goods_li{
  width:330rpx;
  margin-right: 33rpx;
  background:rgba(255,255,255,1);
  box-shadow:4px 7px 20rpx 0px rgba(24,24,24,0.1);
  border-radius:10rpx;
  margin-bottom: 33rpx;
}
.goods_li:nth-child(2n){
  margin-right: 0
}
.goods_img{
  width:330rpx;
  height:330rpx;
  border-radius:10px 10px 0px 0px;
}
.goods_msg{
  width: 100%;
  padding: 15rpx 28rpx;
  box-sizing: border-box;
}
.goods_name{
  font-size: 28rpx;
  color: #333;
  margin-bottom: 15rpx;
}
.goods_pri{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 17rpx;
}
.pri1{
  font-size: 26rpx;
  color: #f73b67
}
.pri2 text{
  color: #f73b67;
  margin-left: 10rpx;
}
.goods_btn{
  width:100%;
  height:74rpx;
  background:rgba(251,203,90,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color: #fff;
}
.hd_tip{
  width:750rpx;
  height:52rpx;
  background:rgba(251,203,90,.2);
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #E3A43B;
}
.hd_db{
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  color: #333;
}
.jump_btn{
  font-size: 24rpx;
  color: #999;
}
.hd_db text{
  margin-left: 10rpx;
  color: #BFBFBF;
  font-size: 20rpx;
}
.dy_list{
	width: 100%;
	background: #fff;
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
</style>
