<template>
	<view>
		<view class="container">
		  <view class="avtivity_box">
		    <image class="avtivity_box"  :src="filter.imgIP(datas.img[0])" mode="aspectFill"></image>
		    <view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
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
		        <view v-if="hasLogin" @tap="jump" :data-url="'/pagesA/my_yhq/my_yhq?id='+ad_id">我的优惠券<text class="iconfont iconnext3 fz14 cf"></text></view>
		      </view>
		      <view class="dp_msg">
		        <image :src="filter.imgIP(datas.head_portrait)"></image>
		        <view @tap="jump_back" >我要代言</view>
		        <!-- <text>参与投票可获得优惠券</text> -->
		      </view>
		    </view>
		  </view>
		  <view class="hd_jd">活动时间： {{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
		 
		  <view class="db_main">
		    <view class="list_tit" :class="ph_type==1?'cur':''">
		      <view class="ph_fri">
		        <image class="ph_fri " :src="ph_type==0?filter.imgIP('/static_s/51daiyan/images/daiyan_ph1.png'):filter.imgIP('/static_s/51daiyan/images/daiyan_ph.png')"></image>
		        <view class="pl_li" @tap="ph_fuc" data-type="0">为TA投票</view>
		      </view>
		      <view class="pl_li1" @tap="ph_fuc" data-type="1">活动介绍</view>
		    </view>
		    <view class="dy_list" v-if="ph_type=='0'">
		      <view class="dy_box"  v-for="(item,idx) in star_list">
		        <view class="dy_li">
		          <view class="pl_num">
		            <image v-if="idx==0" class="pl_num" :src="filter.imgIP('/static_s/51daiyan/images/phicon_1.png')"></image>
		            <image v-if="idx==1" class="pl_num" :src="filter.imgIP('/static_s/51daiyan/images/phicon_2.png')"></image>
		            <image v-if="idx==2" class="pl_num" :src="filter.imgIP('/static_s/51daiyan/images/phicon_3.png')"></image>
		            <text v-if="idx>2">{{idx+1}}</text>
		          </view>
		          <view class="pl_tx" @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+item.user_id">
		            <image class="pl_tx" :src="filter.imgIP(item.head_portrait)"></image>
		          </view>
		          <view class="ph_name">{{item.nickname}}</view>
		          <view class="ph_num">
		            <text>{{item.popularity}}</text>人气值</view>
		          <view v-if="item.is_vote==2" @tap.stop="toupiao"  :data-id="item.user_id" :data-idx="idx" class="ph_btn">投票</view>
		          <view  v-else class="ph_btn ph_btn1">已投票</view>
		        </view>
		        <view class="li_dy">代言说：{{item.say}}</view>
		      </view>
		      <view v-if="data_last" class="data_last">我可是有底线的哟~</view>
		    </view>
		    <view class="dy_list" v-if="ph_type=='1'">
		      <view class="hd_js">
		        <view class="dyr_tit" v-if="datas.title">{{datas.title}}：</view>
		        <view class="dyr_tit" v-else>{{datas.store_name}}优选代言人：</view>
						<view class="dyr_msg" v-html="datas.content">
							<!-- 选出最会玩，最有影响力的代言人，人人都可参与的代言人活动。自拍短视频上传，并拉动朋友参与优选投票。你就有机会成为该品牌的优选代言人，并获得现金激励。 -->
						</view>
						<!-- <video src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-smallvideo-transcode-cae/2902246_e631577dd461c49ccf6939da69bce1d2_0_cae.mp4"></video> -->
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
	var that
	var djs_fuc
	export default {
		data() {
			return {
				btn_kg:0,
				data_last:false,
				hd_time:{
				  day: 0,
				  hh: 0,
				  mm: 0,
				  min:0,
				},
				page:1,
				size:20,
				datas:'',
				star_list: [],
				ph_type: '0',
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
		  var that =this
		  that.ad_id=options.id
			that.onRetry()
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
		  var that =this
		  that.onRetry()
		},
		
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			var that =this
			that.getdatalist()
		},
		
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {
		
		},
		methods: {
			jump_back(){
				uni.navigateBack()
			},
			onRetry(){
				var that =this
				that.page=1
				that.data_last=false
				that.getdatalist()
			},
			getdatalist() {
			
				let that = this
				var jkurl = '/activity/activityHit'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					size:that.size,
					id:that.ad_id
				}
				if(that.data_last) return
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					console.log(res)
					
					that.btn_kg=0
					if (res.code == 1) {
						var datas = res.data.user_data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.hd_type=res.data.is_act_open
						if(that.page==1){
							that.datas=res.data
							djs_fuc=setInterval(function () {
							  that.hd_time= that.djs(res.data.end_time*1000)
							  // console.log(that.djs())
							}, 1000);
							that.star_list =datas
						}else{
							if (datas.length==0) {
								that.data_last=true
								return
							}
							that.star_list = that.star_list.concat(datas)
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
			
			toupiao(e) {
			  var id = e.currentTarget.dataset.id
			  var idx = e.currentTarget.dataset.idx
				var that =this
			  var datas = {
			  	token: that.loginMsg.userToken,
			  	aau_id:id,
					activity_id:that.star_list[idx].a_activity_id
			  }
			  // 单个请求
			  service.P_post('/activity/vote', datas).then(res => {
			  	console.log(res)
			  	if (res.code == 1) {
			  		
			  		uni.showToast({
			  			icon: 'none',
			  			title: '操作成功'
			  		})
						that.$set(that.star_list[idx],'is_vote',2)
			  	}
			  }).catch(e => {
			  	console.log(e)
			  	uni.showToast({
			  		icon: 'none',
			  		title: '操作失败'
			  	})
			  })
			},
			jump(e) {
			  service.jump(e)
			},
			ph_fuc(e) {
			  var that = this
			  if (that.ph_type == e.currentTarget.dataset.type) return
			  that.ph_type= e.currentTarget.dataset.type
				that.onRetry()
			},
			djs(end_time){
			  var nowtime = new Date() //获取当前时间
			    // endtime = new Date("2020/9/8");  //定义结束时间
			  // var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
			  var lefttime =end_time - nowtime.getTime()  //距离结束时间的毫秒数
				var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24))  //计算天数
				var lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24)  //计算小时数
				var leftm = Math.floor(lefttime / (1000 * 60) % 60)  //计算分钟数
				var lefts = Math.floor(lefttime / 1000 % 60)  //计算秒数
			  var djstime={
			    day: leftd,
			    hh: lefth,
			    mm: leftm,
			    min: lefts,
			  }
			  return djstime
			  // return leftd + "天" + lefth + ":" + leftm + ":" + lefts;  //返回倒计时的字符串
			},
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
  width:52rpx;
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
