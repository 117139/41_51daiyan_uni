<template>
	<view>
		<view class="container">
			<view class="top_box">
				<view class="search_type">
					<view :class="ss_cur==99?'cur':''" @tap="ss_type" data-type="99">全部</view>
					<view :class="ss_cur==1?'cur':''" @tap="ss_type" data-type="1">店铺</view>
					<view :class="ss_cur==2?'cur':''" @tap="ss_type" data-type="2">明星</view>
					<view :class="ss_cur==3?'cur':''" @tap="ss_type" data-type="3">达人</view>
					<view :class="ss_cur==4?'cur':''" @tap="ss_type" data-type="4">代言圈</view>
					<view :class="ss_cur==5?'cur':''" @tap="ss_type" data-type="5">其他</view>
				</view>
			</view>
			 <!-- 品牌 -->
			 <view class="ss_list" v-if="ss_cur==1" >
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null1.png')"></image>
				 </view>
				 <view v-if="data_list.length>0" class="li_box" v-for="(item,idx) in data_list">
					 <view class="user_tx" @tap="jump" :data-url="'/pages/dp_index/dp_index?id='+item.obj_id">
					 	<image class="user_tx" :src="filter.imgIP(item.obj_img)"></image>
					 </view>
					 <view class="user_name oh1">小米51代言旗舰店</view>
					 <view  v-if="item.tp_type==1"  @tap.stop="toupiao" :data-idx="idx" class="user_btn">+关注</view>
						<view v-else class="user_btn user_btn1">已关注</view>
				 </view>
			 </view>
			 <!-- 代言圈 -->
			 <view class="ss_list" v-else-if="ss_cur==4" >
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null1.png')"></image>
				 </view>
				 <view v-if="data_list.length>0" class="li_box"  v-for="(item,idx) in data_list" >
					 <view class="user_tx" @tap="jump" :data-url="'/pages/daiyan_quan_xq/daiyan_quan_xq?id='+item.obj_id">
					 	<image class="user_tx" :src="filter.imgIP(item.obj_img)"></image>
					 </view>
					 <view class="user_name oh1">国潮</view>
					 <view  v-if="item.tp_type==1"  @tap.stop="toupiao" :data-idx="idx" class="user_btn">+关注</view>
						<view v-else class="user_btn user_btn1">已关注</view>
				 </view>
			 </view>
			<!-- 用户 -->
			 <view class="ss_list"  v-else>
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null1.png')"></image>
				 </view>
				 <view  v-if="data_list.length>0" class="li_box" v-for="(item,idx) in data_list" >
						<view class="user_tx" @tap="jump" :data-url="'/pages/my_index/my_index?id='+item.obj_id">
							<image class="user_tx" :src="item.obj_img"></image>
							<image class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							<image class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
						</view>
						<view class="user_name oh1">{{item.remark?item.remark:''}}</view>
						<!-- <view  v-if="item.tp_type==1"  @tap.stop="toupiao" :data-idx="idx" class="user_btn">+关注</view> -->
						<view class="user_btn user_btn1"  @tap="guanzhuFuc(item.id,'cancel')">已关注</view>
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
				type:'',
				ss_cur:99,
				data_list: [],
				size:20,
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
		  console.log(options)
		  that.type= options.type
		  if (options.name){
		    wx.setNavigationBarTitle({
		      title: options.name,
		    })
		  }
			that.onRetry()
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
			this.onRetry()
		},
		methods: {
			onRetry(){
				this.page=1
				this.data_list=[]
				this.btn_kg=0
				this.getdatalist()
			},
			getdatalist() {
			
				let that = this
				var jkurl = '/attention'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					type:that.ss_cur,
					size:that.size
				}
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
							uni.showToast({
								icon: 'none',
								title: '暂无更多数据'
							})
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
			guanzhuFuc(id,key){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					type:2,
					id:id,
					operate:key,
				}
				wx.showModal({
					title: '提示',
					content: '是否取消关注?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							service.P_post('/attention/operation',data).then(res => {
							  console.log(res)
								that.btnkg=0
								if(res.code==-1){
									uni.navigateTo({
										url:'/pages/login/login'
									})
									return
								}else if(res.code==0&&res.msg=='请先登录账号~'){
									uni.navigateTo({
										url:'/pages/login/login'
									})
									return
								}else if(res.code==1){
									that.onRetry()
									uni.showToast({
										icon:'none',
										title:'操作成功'
									})
								}else{
									
								}
							}).catch(e => {
								that.btnkg=0
							  console.log(e)
								uni.showToast({
									icon:'none',
									title:'操作失败'
								})
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
				
			},
			toupiao(e) {
			  var idx = e.currentTarget.dataset.idx
			  var newdata = this.data_list
			  newdata[idx].tp_type = 2
			  this.data_list= newdata
			},
			ss_type(e){
				
				var that =this
				if(that.ss_cur==e.currentTarget.dataset.type) return
				console.log(e.currentTarget.dataset.type)
				that.ss_cur=e.currentTarget.dataset.type
				that.onRetry()
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
	min-height: 100%;
	padding-top: 80rpx;
	background: #fff;
}
.top_box{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	border-bottom: 1px solid #eee;
	background: #fff;
}
.top_search_box{
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
}
.top_search{
	flex: 1;
	width:608rpx;
	height:55rpx;
	background:rgba(245,245,245,1);
	border-radius:28rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
	box-sizing: border-box;
	margin-bottom: 13rpx;
}
.top_search text{
	color: #BBBBBB;
}
.top_search input{
	flex: 1;
	font-size: 24rpx;
	padding: 0 15rpx;
	box-sizing: border-box;
}
.top_search_cancel{


	margin-left: 28rpx;
	font-size: 30rpx;
}
.search_type{
	padding: 10rpx 28rpx 0;
	box-sizing: border-box;
	height: 58prx;
	display: flex;
	align-items: center;
  justify-content: space-around;
}
.search_type view{
	height: 58rpx;
	line-height: 58rpx;
	border-bottom: 2px solid rgba(0,0,0,0);
	font-size: 30rpx;
	color: #999;
}
.search_type .cur{
	color: #333;
	font-weight: bold;
	border-bottom: 2px solid #F9B234;
}
/* 用户 */
.ss_list{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
}
.li_box{
	width: 100%;
	display: flex;
	padding: 20rpx 0;
	align-items: center;
}
.li_box+.li_box{
  border-top: 1px solid #eee;
}
.user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	position: relative;
}
.user_v{
	position: absolute;
	bottom: 0;
	right: 0;
	width:27rpx;
	height:28rpx;
}
.user_name{
	padding: 0 20rpx;
	box-sizing: border-box;
	font-weight: bold;
	flex: 1;
	font-size:30rpx;
	color: #333333;
}
.user_btn{
	width:144rpx;
	height:60rpx;
	background:rgba(244,121,36,1);
	border:1px solid rgba(210,210,210,1);
	border-radius:30rpx;
	font-size: 30rpx;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 10rpx;
}
.user_btn1{
	border:1px solid rgba(210,210,210,1);
	background: #fff;
	font-size: 30rpx;
	color: #999999;
}
.data_null{
	width: 100%;
	height: 500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.data_null image{
	width: 122rpx;
	height: 152rpx;
}
.goods_li{
	align-items: stretch;
	border-bottom: 1px solid #eee;
}
.ss_goods_img{
	width:195rpx;
	height:196rpx;
	border-radius:10px;
}
.goods_msg{
	flex: 1;
	padding:10rpx 0 10rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.goods_name{
	font-size: 30rpx;
	color: #333;
}
.goods_pri{
	font-size: 24rpx;
	color: #999;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods_pri .pri1{
	color: #F9B234;
	font-size: 30rpx;
	font-weight: bold;
}
.goods_dy{
	font-size: 24rpx;
	color: #BBBBBB;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.goods_dy text{
	font-size: 24rpx;
	margin-right: 10rpx;
}
.goods_zan{
	flex: none;
}
.find_sj{
 flex: 1;
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
  width:62rpx;
  height:62rpx;
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
</style>
