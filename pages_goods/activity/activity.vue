<template>
	<view>
		<view class="container">
			<hongbao ref="hongbao1"></hongbao>
			<!-- <view  @tap="jump" :data-url="'/pagesA/zhanbao/zhanbao?id='+ad_id">活动战报</view> -->
			<!-- <view  @tap="jump" :data-url="'/pagesA/share/share?id='+ad_id+'&user_id='+loginMsg.id">活动分享</view> -->
		  <!-- <view class="avtivity_box">
		    <image  class="avtivity_box" :src="filter.imgIP(datas.img[0])" mode="aspectFill"></image>
		    <view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
		  </view> -->
			<image class="hdzb_bg"  :src="getimg('/static_s//51daiyan/images/pro2/hdxq_bg1_02.jpg')" mode="widthFix"></image>
			<view class="avtivity_box">
				<view class="view_zzc"></view>
				<image class="avtivity_box_img"  :src="filter.imgIP(datas.img[0])" mode="aspectFill"></image>
				<view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
				
				<view class="avtivity_time">
				  <!-- <image  class="avtivity_time" :src="filter.imgIP('/static_s/51daiyan/images/hd_bg2.jpg')"></image> -->
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
			</view>
		  <view class="hd_jl">
		    <view v-if="datas.award[1]">
		      <image :src="filter.imgIP('/static_s/51daiyan/images/pro2/hdxq_jp_03.jpg')"></image>
		      <view class="j_lv">{{datas.award[1].title}} <text>{{datas.award[1].number}}人</text></view>
		      <view class="j_mon">¥{{datas.award[1].bonus}}/人</view>
		    </view>
				<view v-else style="opacity: 0;">
					<image :src="filter.imgIP('/static_s/51daiyan/images/pro2/hdxq_jp_03.jpg')"></image>
				</view>
		    <view v-if="datas.award[0]">
		      <image :src="filter.imgIP('/static_s/51daiyan/images/pro2/hdxq_jp_06.jpg')"></image>
		      <view class="j_lv">{{datas.award[0].title}} <text>{{datas.award[0].number}}人</text></view>
		      <view class="j_mon">¥{{datas.award[0].bonus}}/人</view>
		    </view>
				<view v-else  style="opacity: 0;">
					<image :src="filter.imgIP('/static_s/51daiyan/images/pro2/hdxq_jp_06.jpg')"></image>
				</view>
		    <view v-if="datas.award[2]">
		      <image :src="filter.imgIP('/static_s/51daiyan/images/pro2/hdxq_jp_09.jpg')"></image>
		      <view class="j_lv">{{datas.award[2].title}} <text>{{datas.award[2].number}}人</text></view>
		      <view class="j_mon">¥{{datas.award[2].bonus}}/人</view>
		    </view>
				<view v-else style="opacity: 0;">
					<image :src="filter.imgIP('/static_s/51daiyan/images/pro2/hdxq_jp_09.jpg')"></image>
					<!-- <view class="j_lv">{{datas.award[2].title}} <text>{{datas.award[2].number}}人</text></view>
					<view class="j_mon">¥{{datas.award[2].bonus}}/人</view> -->
				</view>
		  </view>
			<image class="cxsp_tit" :src="getimg('/static_s/51daiyan/images/pro2/hdxq_cxsp.png')" mode="widthFix"></image>
		  <!-- 活动商品 -->
		  <!-- <view class="box_tit">参选商品</view> -->
		  <view class="goods_list">
		    <view v-for="(item,idx) in datas.goods" class="goods_li" @tap="jump" :data-url="'/pages_goods/details/details?id='+item.g_id+'&ad_id='+ad_id">
		      <image class="goods_img" :src="filter.imgIP(item.g_img[0])"></image>
		      <view class="goods_msg">
		        <view class="goods_name oh1">{{item.g_title}}</view>
		        <view class="goods_pri">
		          <view class="pri1 ">¥{{item.g_current_price}}</view>
		          <view class="pri2">代言费<text>¥{{item.advocacy_earnings}}</text></view>
		        </view>
		        <view class="goods_btn" @tap.stop="jump" :data-url="'/pages_goods/details/details?id='+item.g_id+'&ad_id='+ad_id">我要代言</view>
		      </view>
		    </view>
		    
		  </view>
		  <view v-if="hd_type==1" class="hd_tip dis_flex aic"><text class="iconfont iconlaba"></text>提示！活动开始前完成购买代言，即刻开始拉票！</view>
		  <view v-else-if="hd_type==2" class="hd_tip dis_flex aic"><text class="iconfont iconlaba"></text>提示！本场活动您仅可投一票！</view>
		  <view v-else class="hd_tip dis_flex aic"><text class="iconfont iconlaba"></text>提示！本场活动已结束！</view>
			<!-- 本场活动您仅可投一票 -->
		  <block v-if="hd_type==2">
				<view class="db_main">
					<view class="view_zzc"></view>
				  <view class="list_tit" :class="ph_type==1?'cur':''">
				    <view class="ph_fri">
				      <image class="ph_fri " :src="ph_type==0?filter.imgIP('/static_s/51daiyan/images/daiyan_ph1.png'):filter.imgIP('/static_s/51daiyan/images/daiyan_ph.png')"></image>
				      <view class="pl_li" @tap="ph_fuc" data-type="0"><text class="iconfont icontoupiao"></text>为TA投票</view>
				    </view>
				    <view class="pl_li1" @tap="ph_fuc" data-type="1"><text class="iconfont iconhuodong"></text>活动介绍</view>
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
			</block>
			<!-- <view class="hd_js" v-else> -->
			<view class="db_main " v-else>
				<view class="view_zzc"></view>
				<view class="db_main1">
					<image class="cxsp_tit" :src="getimg('/static_s/51daiyan/images/pro2/hdxq_hdjs.png')" mode="widthFix"></image>
					<view class="dyr_tit" v-if="datas.title">{{datas.title}}：</view>
					<view class="dyr_tit" v-else>{{datas.store_name}}优选代言人：</view>
					<view class="dyr_msg" v-html="datas.content">
						<!-- 选出最会玩，最有影响力的代言人，人人都可参与的代言人活动。自拍短视频上传，并拉动朋友参与优选投票。你就有机会成为该品牌的优选代言人，并获得现金激励。 -->
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
	var djs_fuc
	var that
	export default {
		data() {
			return {
				btn_kg:0,
				data_last:false,
				ad_id:'',
				hd_time:{
				  day: 0,
				  hh: 0,
				  mm: 0,
				  min:0,
				},
				page:1,
				size:20,
				datas: "",
				hd_type:1,
				star_list:[],
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
		  that =this
			that.ad_id=options.id
			that.getdata()
		  
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
		onShareTimeline(){
			return {
				title:'51代言',
				query:'pid=' + that.loginMsg.id+'id='+that.ad_id,
			}
		},
		methods: {
			open_hb_fuc(item,type){
				that.$refs.hongbao.open_hb(0,item,type)
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
					id:that.ad_id
				}
				// 单个请求
				service.P_get('/activity/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.datas = res.data
						if(res.data.isRedBag==2){
							setTimeout(function(){
								console.log(that.$refs)
								// that.open_hb_fuc(that.ad_id,3)
								that.$refs.hongbao1.open_hb(0,that.ad_id,3)
							},1000)
						}
						
						that.page=1
						this.data_last=false
						that.getdatalist()
						djs_fuc=setInterval(function () {
						  that.hd_time= that.djs(res.data.end_time*1000)
						  // console.log(that.djs())
						}, 1000);
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
						var timestamp = Date.parse(new Date())
						console.log(timestamp)
						var start_time=res.data.start_time*1000
						var end_time=res.data.end_time*1000
						if(timestamp<start_time){
							that.hd_type=1
						}else if(timestamp>end_time){
							that.hd_type=3
						}else{
							that.hd_type=2
						}
						if(that.page==1){
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
			ph_fuc(e) {
			  var that = this
			  if (that.ph_type == e.currentTarget.dataset.type) return
			  that.ph_type= e.currentTarget.dataset.type
				that.onRetry()
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
						that.getdata()
						// that.$set(that.star_list[idx],'is_vote',2)
			  	}
			  }).catch(e => {
			  	console.log(e)
			  	uni.showToast({
			  		icon: 'none',
			  		title: '操作失败'
			  	})
			  })
			},
			getimg(img){
				return service.getimg(img)
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
	/* background: #fff; */
	background: linear-gradient(90deg, #FF8F27, #FF7807);
  /* padding-bottom: 50rpx; */
  position: relative;
	padding: 50upx 30upx;
}
.hdzb_bg{
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 0;
}
.avtivity_box {
	position: relative;
	width: 100%;
	height: 336upx;
	border-radius: 20upx;
	border: 10upx solid #fff;
	/* margin-bottom: 100upx; */
}
.view_zzc{
	top: -24upx;
	z-index: 1;
	position: absolute;
	left: 15upx;
	right: 15upx;
	height: 100upx;
	background: #FFFFFF;
	border: 10px solid #FFFFFF;
	opacity: 0.55;
	border-radius: 20upx;
}
.view_zzc1{
	top: -24upx;
	border-radius: 10upx;
}
.avtivity_box_img{
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 2;
	border-radius: 8upx;
}
.hd_time{
  width: 100%;
  position: absolute;
  bottom: 36rpx;
  text-align: center;
  font-size: 24rpx;
  color: #fff;
	z-index: 2;
}
.avtivity_time{
  /* width:750rpx; */
  height:110rpx;
  position: absolute;
	z-index: 10;
	bottom: 0;
	left: 0;
	right: 0;
	background: rgba(0,0,0,.5);
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
	z-index: 11;
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
.hd_jl{
  width: 100%;
  background: #fff;
  padding: 34rpx 0 10rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hd_jl>view{
  width:220rpx;
  height:270rpx;
 /* background:rgba(255,255,255,1);
  box-shadow:4px 7rpx 20rpx 0px rgba(24,24,24,0.1); */
  border-radius:8rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 45rpx; */
  box-sizing: border-box;
	position: relative;
	padding-top: 167upx;
}
.hd_jl>view:nth-child(2){
  position: relative;
  /* top: -13rpx; */
  height: 297rpx;
	padding-top: 184upx;
}
.hd_jl image{
  width: 100%;
  height: 100%;
	position: absolute;
	top: 0;
	z-index: 2;
}
.j_lv{
  width: 100%;
  font-size: 28rpx;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
	position: relative;
	z-index: 3;
}
.j_lv text{
  height:33rpx;
	background: linear-gradient(0deg, #FF8930, #FE5C0B);
	border-radius: 10upx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
  margin-left: 10rpx;
  color: #fff;
  font-size: 22rpx;
	position: relative;
	z-index: 3;
}
.j_mon{
  margin-top: 15rpx;
  font-size: 24rpx;
  color: #999;
	position: relative;
	z-index: 3;
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
.cxsp_tit{
	display: block;
	margin: 10upx auto 50upx;
	width: 360upx;
	/* box-shadow: 1px 6px 24px 0px rgba(255, 0, 0, 0.31); */
}

/* goods_list */
.goods_list{
  width: 100%;
  box-sizing: border-box;
  /* padding: 0 28rpx; */
  display: flex;
  flex-wrap: wrap;
}
.goods_li{
  width:330rpx;
  margin-right: 30rpx;
  background:#fff;
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
  border-radius:10rpx 10rpx 0px 0px;
	display: block;
	margin: 0;
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
  /* width:750rpx; */
	width: 100%;
	height: 87upx;
	background: #FFFFFF;
	border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  box-sizing: border-box;
  font-size: 26rpx;
  color:#FF7E10;
}
.hd_tip text{
	font-size: 36upx;
	margin-right: 10upx;
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
	flex: none;
	align-items: flex-end;
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

.hd_js{
	width: 100%;
	padding: 0 30upx;
	box-sizing: border-box;
}
/* .pl_li1{
	width: 100%;
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32upx;
	color: #333;
	font-weight: bold;
} */
.dyr_tit{
  font-size: 30rpx;
  color: #333;
}
.dyr_msg{
  font-size: 28rpx;
  color: #999;
  margin: 20rpx auto;
}








.db_main{
  width: 100%;
	margin-top: 50upx;
  /* padding: 0 28rpx; */
  box-sizing: border-box;
	position: relative;
}
.list_tit{
	width: 100%;
	background:#EB8961;
	height: 85rpx;
	display: flex;
  box-shadow:0px 4px 30rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx 10rpx 0 0;
	position: relative;
	z-index: 10;
}
.list_tit.cur{
	background:rgba(255,76,0,1);
}
.ph_fri{
	width:367rpx;
	height:85rpx;
	position: relative;
	z-index: 14;
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
	z-index: 15;
}

.pl_li1{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
	color: #fff;
	position: relative;
	z-index: 15;
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
.pl_li text{
	margin-right: 8upx;
}
.pl_li1 text{
	margin-right: 8upx;
}
.db_main1{
	width: 100%;
	position: relative;
	border-radius: 10upx;
	z-index: 4;
	background: #fff;
	padding: 45upx 20upx 20upx;
	box-sizing: border-box;
}
.view_zzc{
	height: 80upx;
}
</style>
