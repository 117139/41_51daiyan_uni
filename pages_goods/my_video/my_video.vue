<template>
	<view>
			<swiper :vertical="true" :circular="false" :current="current" :skip-hidden-item-layout="true" @change="changeCurrent" @animationfinish="changeItem">
			    <swiper-item :item-id="oneItemParam.a_id">
			        <video v-if="type=='dp'" title="1111111" id="myVideo0"  @fullscreenchange="fullScreen_fuc" :src="filter.imgIP(oneItemParam.obj_pic[0])" 
							 :loop="true" :poster="filter.imgIP_video(oneItemParam.obj_pic[0])" :custom-cache="true" :controls="false" 
								:show-center-play-btn="false" :show-fullscreen-btn="false" @play="eventPlay" @tap="tabVideo"></video>
			        <video v-else title="1111111" id="myVideo0"  @fullscreenchange="fullScreen_fuc" :src="filter.imgIP(oneItemParam.img[0])" 
							 :loop="true" :poster="filter.imgIP_video(oneItemParam.img[0])" :custom-cache="true" :controls="false" 
								:show-center-play-btn="false" :show-fullscreen-btn="false" @play="eventPlay" @tap="tabVideo"></video>
			    </swiper-item>
			
			    <swiper-item :item-id="twoItemParam.a_id" v-if="videoList.length>1">
			        <video v-if="type=='dp'" title="2222222" id="myVideo1"   @fullscreenchange="fullScreen_fuc" :src="filter.imgIP(twoItemParam.obj_pic[0])" 
							 :loop="true" :poster="filter.imgIP_video(twoItemParam.obj_pic[0])" :custom-cache="true" :controls="false" 
								:show-center-play-btn="false" :show-fullscreen-btn="false" @play="eventPlay" @tap="tabVideo"></video>
			        <video v-else title="2222222" id="myVideo1"   @fullscreenchange="fullScreen_fuc" :src="filter.imgIP(twoItemParam.img[0])" 
							 :loop="true" :poster="filter.imgIP_video(twoItemParam.img[0])" :custom-cache="true" :controls="false" 
								:show-center-play-btn="false" :show-fullscreen-btn="false" @play="eventPlay" @tap="tabVideo"></video>
			    </swiper-item>
			
			    <swiper-item :item-id="threeItemParam.a_id" v-if="videoList.length>2">
			        <video v-if="type=='dp'" title="3333333" id="myVideo2"   @fullscreenchange="fullScreen_fuc" :src="filter.imgIP(threeItemParam.obj_pic[0])"
							 :loop="true" :poster="filter.imgIP_video(threeItemParam.obj_pic[0])" :custom-cache="true" :controls="false" 
								:show-center-play-btn="false" :show-fullscreen-btn="false" @play="eventPlay" @tap="tabVideo"></video>
			        <video v-else title="3333333" id="myVideo2"   @fullscreenchange="fullScreen_fuc" :src="filter.imgIP(threeItemParam.img[0])"
							 :loop="true" :poster="filter.imgIP_video(threeItemParam.img[0])" :custom-cache="true" :controls="false" 
								:show-center-play-btn="false" :show-fullscreen-btn="false" @play="eventPlay" @tap="tabVideo"></video>
			    </swiper-item>
			
			</swiper>
			<cover-view class="back_btn" :style="style" @tap="back()">
				<cover-image :src="filter.imgIP('/static_s/51daiyan/images/back.png')" class="head"></cover-image>
			</cover-view>
			<cover-image :src="filter.imgIP('/static_s/51daiyan/images/bofang.png')" class="play" v-if="playMark==1" @tap="tabVideo"></cover-image>
			<!-- 用户 -->
			<!-- <cover-view :hidden="isFull" class="user flex flex-alignItems">
			    <cover-view class="user-rf">
			        <cover-view class="flex flex-alignItems name">
			            <cover-view class="name-child hide1">寻味</cover-view>
			            <cover-image :src="filter.imgIP('/static_s/51daiyan/images/dizhi.png')" class="v_address" ></cover-image>
			            <cover-view class="fz22 ">{{videoParam.site}}</cover-view>
			        </cover-view>
			    </cover-view>
			</cover-view> -->
			
			<!-- 代言商品 -->
			<!-- <cover-view class="tag" @tap="jump" data-url="/pages_goods/details/details">
			   <cover-image :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" class="v_goods_img" ></cover-image>
			   <cover-view class="goods_msg">
			      <cover-view class="oh2">{{videoParam.description}}</cover-view>
			      <cover-view class="goods_Pri1"><cover-view class="pri1">¥{{videoParam.topic}}</cover-view><cover-view class="pri2">销量191</cover-view></cover-view>
			   </cover-view>
			</cover-view> -->
			
			<cover-image :src="filter.imgIP('/static_s/51daiyan/images/bofang.png')" class="play" v-if="playMark==1" @tap="tabVideo"></cover-image>
			<!-- <view class="fullBtn"  @tap="asdasd">
			  <cover-image src="{{filter.imgIP('tx.png')}}" class="head"></cover-image>
			  <cover-view class="sp_gz">+关注</cover-view>
			</view> -->
			<!-- <view class="fullBtn"  @tap="guanzhu_fuc">
			  <cover-image :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" class="head"></cover-image>
			  <cover-view class="sp_gz">+关注</cover-view>
			</view> -->
			<!-- <view class="fullBtn fullBtn1"  @tap="videoLike">
			  <cover-view class="dianzan_cion">
			    <cover-image :src="filter.imgIP('/static_s/51daiyan/images/dianzan.png')" class="dianzan_image"></cover-image>
			  </cover-view>
			  <cover-view class="dianzan_num">{{videoParam.likeCount}}</cover-view>
			</view>
			<view class="fullBtn fullBtn2"  @tap="jump" data-url="/pages_goods/details/details">
			  <cover-image :src="filter.imgIP('/static_s/51daiyan/images/v_goods.png')" class="head"></cover-image>
			</view> -->
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	
	let videoContext = null; //video实例
	let time = null
	var add_kg=''
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				v_type:1,
				uid:'',
				idx:'',
				btn_kg: 0,
				page: 1,
				size: 20,
				
				// 视频Id
				videoId: 1,
				// 当前swiper所在的位置
				current: 0,
				// 视频列表
				videoList: [],
				// 当前播放视频
				videoParam: {},
				// 播放开关 1是暂停 2是播放
				playMark: 1,
				
				// 第一个item
				oneItemParam: {},
				// 第二个item
				twoItemParam: {},
				// 第一个item
				threeItemParam: {},
				
				fullScreen: false,
				fullScreenId: 'myVideo0',
				isFull: false,
				
				type:'',      //dp 店铺视屏
			}
		},
		onLoad: function (e) {
			that=this
			this.uid=e.uid
			this.idx=e.idx
			if(e.type){
				that.type=e.type
			}
		  // 拿到当前视频的实例
		  this.videoContext0 = wx.createVideoContext('myVideo0')
		  // 拿到当前视频的实例
		  this.videoContext1 = wx.createVideoContext('myVideo1')
		  // 拿到当前视频的实例
		  this.videoContext2 = wx.createVideoContext('myVideo2')
			/* 初始化页面视频id 及 视频下标 */
			this.videoId= e.idx || 1,
		  this.getdatalist()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName',
				'loginMsg',
				'wxlogin']),
			
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var top =StatusBar+6
				var style = `top:${top}px;`;
		
				return style
			},
			
		},
		methods: {
			back(){
				uni.navigateBack()
			},
			addlookNum() {
			
				let that = this
				var jkurl = '/videoPlay'
				var datas = {
					token: that.loginMsg.userToken,
					ad_id: that.videoParam.a_id
				}
				
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
			
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
							
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			},
			
			getdatalist() {
			
				let that = this
				var jkurl = '/star/getHomepageData'
				var datas = {
					token: that.loginMsg.userToken,
					user_id: that.uid,
					type: 2,
					page: that.page,
					size: that.size
				}
				if(that.type=='dp'){
					jkurl = jkurl='/store/adv'
					datas = {
					token: that.loginMsg.userToken,
					group_code: that.uid,
					page: that.page,
					size: that.size
					}
				}
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
			
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// if (datas.length == 0) {
						// 	uni.showToast({
						// 		icon: 'none',
						// 		title: '暂无更多数据'
						// 	})
						// 	return
						// }
						if (that.page == 1) {
							// that.data_list = datas
							
							
							
							that.videoList= datas
							let videoIndex
							if(that.type=='dp'){
								videoIndex = that.videoList.findIndex(v => v.a_id == that.videoId)
							}else{
								videoIndex = that.videoList.findIndex(v => v.a_id == that.videoId)
							}
							console.log(that.videoList, '-----------')
							let current = videoIndex % 3
									
							/* 拿到对应视频的数据 */
							console.log(186+'---------------------------------------->')
							console.log(videoIndex)
							that.getVideoParam(videoIndex)
									
							if (current === 0) {
							  that.oneItemParam= datas[videoIndex]
							}
									
							if (current === 1) {
							  that.twoItemParam= datas[videoIndex]
							}
									
							if (current === 2) {
							  that.threeItemParam= datas[videoIndex]
							}
									
							// 匹配对应数据
							that.tabItem(current, videoIndex)
									
							setTimeout(()=>{
								that.stop()
								/* 开始播放视频 */
								that.play(videoIndex)
								
								add_kg=setTimeout(()=>{
									//短视频增加播放量
									that.addlookNum()
								},1500)
							},500)
						} else {
							let newList = [...that.videoList, ...datas]
							this.videoList= newList
							// that.data_list = that.datas.concat(datas)
						}
			
						that.page++
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			},
			
			changeCurrent(e) {
			  console.log(e.detail.current)
			  if (e.detail.current == 0) {
			    this.fullScreenId= 'myVideo0'
			  } else if (e.detail.current == 1) {
			    this.fullScreenId= 'myVideo1'
			  } else if (e.detail.current == 2) {
			    this.fullScreenId= 'myVideo2'
			  }
			  // 当前视频的数据列表
			  let videoList = this.videoList
			
			  // 当前视图视频id
			  let id = e.detail.currentItemId
			
			  /* 根据当前视图视频id拿到对应的视频列表下标 */
			  let videoIndex = videoList.findIndex(v => v.a_id == id)
			  console.log('104:--------'+videoIndex)
			  /* 滑动到倒数第二个视频 加载视频列表 */
			  if (videoIndex == (videoList.length - 2)) {
					this.getdatalist()
			    // let newList = [...this.videoList, ...list2]
			    // this.videoList= newList
			  }
			},
			/**
			 *  current 变化时 修改视频容器对应的数据
			 */
			changeItem(e) {
			  // 当前item的位置
			  let current = this.current
			
			  // swiper滑到的位置
			  let swiperIndex = e.detail.current
			
			  // 如果没有切换就不执行其他操作
			  if (current == swiperIndex) return;
			
			  // 当前视频的数据列表
			  let videoList = this.videoList
			
			  // 当前视图视频id
			  let id = e.detail.currentItemId
			
			  /* 根据当前视图视频id拿到对应的视频列表下标 */
			  let videoIndex = videoList.findIndex(v => v.a_id == id)
			
			  /* 拿到对应视频的数据 */
			  this.getVideoParam(videoIndex)
			
			  // 匹配对应数据
			  this.tabItem(swiperIndex, videoIndex)
			
			 setTimeout(()=>{
			 	clearInterval(add_kg)
			 	/* 销毁视频实例 */
			 	that.stop()
			 				
			 	/* 开始播放视频 */
			 	that.play(swiperIndex)
			 	
			 	add_kg=setTimeout(()=>{
			 		//短视频增加播放量
			 		that.addlookNum()
			 	},1500)
			 },500)
			},
			// 根据swiperIndex videoIndex匹配对应数据
			tabItem(swiperIndex, videoIndex) {
			  // 当前视频的数据列表
			  let videoList = JSON.parse(JSON.stringify(this.videoList))
			
			  let next = 0
			  let first = 0
			
			  /* 上一个 */
			  if (videoIndex == 0) {
			    first = videoList.length - 1
			  } else {
			    first = videoIndex - 1
			  }
			
			  /* 下一个 */
			  if (videoIndex == videoList.length - 1) {
			    next = 0
			  } else {
			    next = videoIndex + 1
			  }
			
			  switch (swiperIndex) {
			    case 0:
			      this.twoItemParam= videoList[next]
			      this.threeItemParam= videoList[first]
			      break;
			    case 1:
			      this.oneItemParam= videoList[first]
			      this.threeItemParam= videoList[next]
			      break;
			    case 2:
			      this.oneItemParam= videoList[next]
			      this.twoItemParam= videoList[first]
			      break;
			    default:
			  }
			
			  this.current= swiperIndex
			},
			// 拿到当前视图的视频数据
			getVideoParam(videoIndex) {
			  // 当前视频的数据列表
				console.log(videoIndex)
			  let videoList = JSON.parse(JSON.stringify(this.videoList))
			  this.videoParam= videoList[videoIndex]
			},
			// 播放
			play(swiperIndex) {
			  console.log(this.videoContext0)
			  let index = parseInt(swiperIndex)
			  switch (index) {
			    case 0:
			      this.videoContext0 && this.videoContext0.play()
			      break;
			    case 1:
			      this.videoContext1 && this.videoContext1.play()
			      break;
			    case 2:
			      this.videoContext2 && this.videoContext2.play()
			      break;
			    default:
			  }
			},
			// 销毁视频 注意 必须在切换之前销毁
			stop() {
			  this.videoContext0 && this.videoContext0.pause()
			  this.videoContext1 && this.videoContext1.pause()
			  this.videoContext2 && this.videoContext2.pause()
			},
			// 开始播放 
			eventPlay(e) {
			  this.playMark= 2
			},
			// 点击视频
			tabVideo(e) {
			  // return;
			  let swiperIndex = this.current
			  let playMark = this.playMark
			  if (playMark == 2) {
			    this.stop()
			    this.playMark= 1
			  } else {
			    this.play(swiperIndex)
			    this.playMark= 2
			  }
			},
			// 点赞
			videoLike() {
			  wx.showToast({
			    title: '点赞成功',
			  })
			  return
			  // 深拷贝
			  let videoParam = JSON.parse(JSON.stringify(this.videoParam))
			
			  this.setData({
			    ['videoParam.like']: videoParam.like == 1 ? 0 : 1,
			    ['videoParam.likeCount']: videoParam.like == 1 ? videoParam.likeCount - 1 : videoParam.likeCount + 1
			  })
			},
			/**视屏进入、退出全屏 */
			asdasd(e) {
			  this.sisFull= true
			  var videoContext = wx.createVideoContext(this.fullScreenId, this);
			  videoContext.requestFullScreen();
			  this.fullScreen= true
			},
			fullScreen_fuc(e) {
			  console.log(e.detail.fullScreen)
			  if (e.detail.fullScreen) {
			    this.isFull= true
			  } else {
			    this.isFull= false
			  }
			},
			guanzhu_fuc(){
			  wx.showToast({
			    title: '关注成功',
			  })
			  return
			},
			jump(e) {
			 service.jump(e)
			}
		}
	}
</script>

<style scoped>
.back_btn{
	position: fixed;
	top: 50px;
	left: 15px;
	width: 74rpx;
	height: 74rpx;
	background: rgba(0,0,0,.5);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	
}
.back_btn cover-image{
	width: 40upx;
	height: 40upx;
}
swiper {
  width: 100vw;
  height: 100vh;
  background: #756C69;
}

swiper video {
  width: 100vw;
  height: 100vh;
  /* margin-top: 100rpx; */
  /* width:749rpx;
  height:727rpx; */
  display: block;
}

.play {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 128rpx;
  height: 128rpx;
}

.fullBtn {
  position: fixed;
  right: 50rpx;
  color: #fff;
  top: 50%;
  height: 128rpx;
  /* background-color: pink; */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.video-pic{
  width: 100vw;
  height: 100vh;
  display: block;
}


/**index.wxss**/
.index{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.video-box {
  width: 100vw;
  height: 100vh;
  transition: all 0.4s cubic-bezier(1, 1, 0, 0.42);
  transform: translate(0%, 0%);
  position: relative;
}

.video-box .video-list {
  position: absolute;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.video-box .video-list video {
  display: block;
  width: 100vw;
  height: 100vh;
}

.user {
  color: #fff;
  /* border-radius: 48rpx; */
  /* height: 90rpx; */
  position: absolute;
  bottom: 274rpx;
  left: 30rpx;
  z-index: 13;
  font-size: 30rpx;
}

.user .user-rf {
  min-width: 500rpx;
}

.yiguanzhu {
  width: 114rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
  color: #ddd;
  height: 40rpx;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

.name {
}

.name  .name-child {
  margin-right: 20rpx;
  max-width: 360rpx;
}

.site {
  font-size: 24rpx;
  margin-top: 10rpx;
}

.site .address {
  width: 24rpx;
  height: 26rpx;
  margin-right: 10rpx;
  display: inline-block;
}

.head {
  width: 90rpx;
  height: 90rpx;
  border-radius: 50%;
  /* margin-right: 18rpx; */
}

.label {
  min-width: 90rpx;
  height: 44rpx;
  border-radius: 28rpx;
  background: #ff6619;
  font-size: 22rpx;
}

.label .zhengque {
  width: 20rpx;
  height: 20rpx;
  margin-right: 6rpx;
  display: inline-block;
}

.icon-box {
  width: 80rpx;
  position: absolute;
  right: 20rpx;
  bottom: 160rpx;
  z-index: 13;
  text-align: center;
  font-size: 22rpx;
}

.icon-box  .icon-list {
  margin-top: 40rpx;
  padding: 0;
  background: rgba(0, 0, 0, 0);
  border: none;
  box-shadow: none;
  line-height: 1.4;
  color: #fff;
  font-size: 24rpx;
}

.icon-box  .icon-list image {
  margin-bottom: 6rpx;
}

.icon-box  .icon-list	.dianzan {
  width: 56rpx;
  height: 58rpx;
}

.icon-box  .icon-list	.pinglun {
  width: 60rpx;
  height: 56rpx;
}

.icon-box  .icon-list	.fenxiang {
  width: 60rpx;
  height: 46rpx;
}

.icon-box  .icon-list	.schu {
  width: 44rpx;
  height: 58rpx;
}

.icon-box  .icon-list	.font-list {
  font-size: 24rpx;
  line-height: 1.1;
}

.icon-box  .icon-list:after {
  border: none;
}

.tag {
  position: absolute;
  color: #fff;
  max-width: 520rpx;
  /* height: 160rpx; */
  bottom: 60rpx;
  left: 30rpx;
  font-size: 26rpx;
  z-index: 13;
  width:520rpx;
  height:200rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
}

.tag .tag-child {
  padding: 0 20rpx;
  height: 42rpx;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4rpx;
  font-size: 24rpx;
  margin-bottom: 14rpx;
}

.tag .jinghao {
  display: inline-block;
  width: 18rpx;
  height: 18rpx;
  margin-right: 8rpx;
}

.progress-bar-box {
  width: 750rpx;
  height: 6rpx;
  background: #bebebe;
  border-radius: 6rpx;
  z-index: 18;
  position: fixed;
  bottom: 0;
  left: 0;
}

.progress-bar-box  .progress {
  width: "0%";
  height: 6rpx;
  background: #f26624;
  border-radius: 6rpx;
  z-index: 14;
  position: absolute;
  bottom: 0;
  left: 0;
}
/*修改 */
.sp_gz{
  background:rgba(244,92,126,1);
  border-radius:18rpx;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  font-size: 22rpx;
  line-height: 22rpx;
  padding: 6rpx 12rpx;
  position: relative;
  top: -10rpx;
}
.dianzan_cion{
  width:74rpx;
  height:74rpx;
  background:rgba(0,0,0,1);
  border-radius:50%;
  font-size: 22rpx;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dianzan_image{
  width:36rpx;
  height:37rpx;
}
.dianzan_num{
  font-size: 20rpx;
  margin-top: 10rpx;
}

.fullBtn1{
  margin-top: 160rpx;
  margin-right: 10rpx;
}
.fullBtn2{
  margin-top: 320rpx;
}
.v_address{
  width:18rpx;
  height:20rpx;
  margin-right: 8rpx;
}
.v_goods_img{
  flex: none;
  width:160rpx;
  height:160rpx;
  border-radius:10rpx;
  margin-right: 20rpx;
}
.goods_msg{
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30rpx;
  color: #333;
}
.goods_msg .oh2{
  width: 100%;
  white-space:pre-wrap;
}
.goods_Pri1{
  display: flex;
  align-items: center;
  font-size: 24rpx;
  color: #999;
}
.goods_Pri1 .pri1{
  color: #EB4443;
  font-size: 30rpx;
  width: 50%;
  font-weight: bold;
}
</style>
