<template>
	<view>
		<view class="container">
			<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
			<view v-if="htmlReset==0&&!datas" class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
			</view>
			<block v-if="htmlReset==0&&datas">
				<view v-if="datas" class="dp_box">
				  <view class="dp_b1">
				    <view class="dp_logo">
				      <image :src="filter.imgIP(datas.head_portrait)" mode="aspectFill"></image>
				    </view>
				    <view class="dp_msg">
				      <view class="dp_name oh2">{{datas.store_name}}</view>
							<view>
								<view class="dp_lv">
								  <image v-if="idx<5" v-for="(item,idx) in datas.rank" :src="filter.imgIP('/static_s/51daiyan/images/dp_zuan.png')"></image>
								 
								</view>
							</view>
				     
				      <view class="dp_bq">
				        <text>代言 {{datas.advocacy_number}}</text>
				        <text class="flex_1">粉丝数 {{datas.fans_number}}</text>
				        <view v-if="!datas.is_follow" @tap.stop="guanzhuFuc(dpid,'affirm')" class="guanzhu_btn">关注</view>
				        <view v-else @tap.stop="guanzhuFuc(dpid,'cancel')" class="guanzhu_btn">已关注</view>
				      </view>
						
				    </view>
				  </view>
				</view>
				<view class="dp_type">
				  <view :class="s_type==0?'cur':''"  @tap="ss_type" data-type="0">商品</view>
				  <view :class="s_type==1?'cur':''"  @tap="ss_type" data-type="1">买家代言</view>
				</view>
				<view v-if="data_list.length==0" class="zanwu">暂无数据</view>
				<view v-if="data_list.length>0" class="h_main">
					
					<!-- tab -->
					<!-- <view class="list_tab">
							<view @tap="px_fuc" data-type="0">代言费
								<view class="list_px"><text class="iconfont iconXSJ-copy {{dy_mon==0?'cur':''}}"></text><text class="iconfont iconXSJ {{dy_mon==1?'cur':''}}"></text></view>
							</view>
							<view @tap="px_fuc" data-type="1">代言人数<view class="list_px"><text class="iconfont iconXSJ-copy {{dy_num==0?'cur':''}}"></text><text class="iconfont iconXSJ {{dy_num==1?'cur':''}}" ></text></view></view>
							<view @tap="px_fuc" data-type="2">价格<view class="list_px"><text class="iconfont iconXSJ-copy {{dy_pri==0?'cur':''}}"></text><text class="iconfont iconXSJ {{dy_pri==1?'cur':''}}" ></text></view></view>
					</view> -->
					<!-- goods_li -->
					
					<view v-if="s_type==0" class="goods_list">
						<view v-for="(item,idx) in data_list" class="goods_li" @tap="jump" :data-url="'/pages/details/details?id='+item.id">
							<image class="goods_img" :src="filter.imgIP(item.photo[0])"  mode="aspectFill"></image>
							<view class="goods_msg">
								<view class="oh1">{{item.title}}</view>
								<view class="goods_pri">
									<text>￥{{item.basics_price}}</text>
									<text class="pr2">￥{{item.basics_original_price}}</text>
								</view>
							</view>
						</view>
					</view>
					<view v-if="s_type==1" class="my_list">
						<view class="sp_list" >
							<view class="sp_li" v-for="(item,idx) in data_list"  @tap="jump" :data-url="'/pages/details/details?id='+item.g_id">
								<view class="sp_li_img">
									<image v-if="item.type==2" class="sp_li_img" :src="filter.imgIP_video(item.obj_pic[0])" mode="aspectFill"></image>
									<image v-else class="sp_li_img" :src="filter.imgIP(item.obj_pic[0])" mode="aspectFill"></image>
									<view class="sp_li_img_cz">
										<image :src="filter.imgIP('/static_s/51daiyan/images/goods_play.png')"></image>
									</view>
								</view>
								<view class="sp_li_msg">
									<view class="sp_li_name oh2">{{item.content}}</view>
									<view class="sp_li_time">
				            <view class="user_tximg">
				              <image :src="filter.imgIP(item.head_portrait)"></image>
				              {{item.nickname}}
				            </view>
				            <view v-if="!item.is_like"><text class="iconfont iconhongxinicon" style="margin-right: 8rpx;"></text> {{item.praise_number}}</view>
				            <view v-else class="yzan"><text class="iconfont iconhongxinicon1" style="margin-right: 8rpx;"></text> {{item.praise_number}}</view>
				          </view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
				</view>
			</block>
		  
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
				htmlReset:0,
				dpid:0,
				page:1,
				size:20,
				
				s_type: 0,
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
			uni.showLoading({
				title:'正在加载中'
			})
			uni.setNavigationBarTitle({
				title:'正在加载中...'
			})
			this.dpid=options.id
			this.getdata()
			this.onRetry()
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
		  this.onRetry()
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
			onRetry(){
				this.page=1
				this.data_list=[]
				this.data_last=false
				this.getdatalist()
			},
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
					group_code: that.dpid
				}
				// 单个请求
				service.P_get('/store', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						that.datas = res.data.store
						uni.setNavigationBarTitle({
							title:'店铺首页'
						})
						that.onRetry()
					}else{
						that.htmlReset=1
					}
				}).catch(e => {
					console.log(e)
					that.htmlReset=1
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			//列表
			getdatalist() {
			
				let that = this
				var jkurl = '/store/goods'
				var datas = {
					token: that.loginMsg.userToken,
					group_code: that.dpid,
					page: that.page,
					size: that.size
				}
				if(that.data_last) return
				if(that.s_type==1){
					jkurl='/store/adv'
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
						if (datas.length == 0) {
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
						if (that.page == 1) {
							that.data_list = datas
						} else {
			
							that.data_list = that.datas.concat(datas)
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
			
			//关注
			guanzhuFuc(id,key){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					type:1,
					id:id,
					operate:key,
				}
				if(key=='affirm'){
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
							that.getdata()
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
					return
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
									that.getdata()
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
			
			ss_type(e) {
			  var that = this
			  if (that.s_type == e.currentTarget.dataset.type) return
			  console.log(e.currentTarget.dataset.type)
			  that.s_type= e.currentTarget.dataset.type
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
	min-height: 100vh;
	background: #f5f6f8;
  position: relative;
}
.dp_box{
  width:750rpx;
  height:220rpx;
  padding: 28rpx;
  box-sizing: border-box;
  background:linear-gradient(180deg,rgba(11,14,45,1),rgba(104,149,222,1));
}
.dp_type{
  font-size: 30rpx;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 78rpx;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.dp_type view{
  padding-top: 18rpx;
  padding-bottom: 18rpx;
  border-bottom: 6rpx solid transparent;
}
.dp_type .cur{
  color: #333;
  border-bottom: 6rpx solid #FF383B;
}
.h_main{
	width: 100%;
	padding: 20rpx 0 28rpx;
	box-sizing: border-box;
  background: #fff;
	position: relative;
	z-index: 3;
}
.goods_list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0 28rpx 40rpx;
  box-sizing: border-box;
}
.goods_li{
	width:338rpx;
	/* height:494rpx; */
	background:rgba(255,255,255,1);
	box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
	border-radius:10rpx;
	margin-bottom: 16rpx;
}
.goods_li:nth-child(2n){
	margin-left: 18rpx;
}
.goods_img{
	width: 100%;
	height:338rpx;
	border-radius:10rpx 10rpx 0px 0px;
}
.goods_msg{
	width: 100%;
	box-sizing: border-box;
	padding: 15rpx 24rpx;
	font-size: 26rpx;
	color: #333;
}
.goods_pri{
	color: #e53030;
	font-size: 36rpx;
}
.goods_pri .pr2{
	  font-size: 28rpx;
	  font-family: "PingFangSC";
	  color: rgb(153, 153, 153);
	  text-decoration: line-through;
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
	margin: 4rpx 10rpx;
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


.sp_list{
	width: 100%;
	padding: 0 28rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-wrap: wrap;
}
.sp_li{
	width:338rpx;
	height:480rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
	border-radius:10rpx;
	overflow: hidden;
	margin-right: 18rpx;
	margin-bottom: 18rpx;
}
.sp_li:nth-child(2n){
	margin-right: 0;
}
.sp_li_img{
	width:342rpx;
	height: 342rpx;
	position: relative;
}
.sp_li_img_cz{
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0,0,0,.5);
}
.sp_li_img_cz image{
	width:64rpx;
	height:64rpx;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -32rpx;
	margin-top: -32rpx;
}
.sp_li_msg{
	width: 100%;
	padding: 12rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.sp_li_name{
	font-size: 28rpx;
	color: #333;
	font-weight:400;
}
.sp_li_time{
  margin-top: 10rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
	font-size: 24rpx;
	color: #999;
}
.sp_li_img1{
	width:338rpx;
	height:33r8px;
}
.user_tximg{
  font-size: 24rpx;
  color: #666;
  display: flex;
  align-items: center
}
.user_tximg image{
  width:38rpx;
  height:38rpx;
  border-radius:50%;
  margin-right: 10rpx;
}
.sp_li_time text{
  font-size: 26rpx;
}
.yzan{
  color: #F85951;
  font-size: 26rpx;
}

.dp_b1{
  width: 100%;
  display: flex;
}
.dp_logo{
  width:123rpx;
  height:123rpx;
  border-radius:10rpx;
  border:1px solid #eee;
}
.dp_logo image{
  width:123rpx;
  height:123rpx;
  border-radius:10rpx;
}
.dp_msg{
  flex: 1;
  height:123rpx;
  margin-left: 20rpx;
  /* display: flex; */
  flex-direction: column;
  justify-content: space-between;
}
.dp_name{
  font-size: 28rpx;
  color: #fff;
}
.dp_lv{
  margin-top: 10rpx;
  display: flex;
  align-items: center;
  width:158rpx;
  height:38rpx;
  background:rgba(255,255,255,.8);
  border-radius:10rpx;
  padding: 0 12rpx;
}
.dp_lv image{
  width:31rpx;
  height:25rpx;
  margin-right: 10rpx;
}
.dp_bq{
  font-size: 24rpx;
  color: #fff;
  display: flex;
  align-items: center;
}
.guanzhu_btn{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  font-size: 28rpx;
  width:132rpx;
  height:60rpx;
  border:2rpx solid rgba(255,255,255,1);
  border-radius:30rpx;
}
.dp_bq text{
  margin-right: 20rpx;
}
.dp_bq .bq{
  width:28rpx;
  height:28rpx;
  background:rgba(241,241,241,1);
  border-radius:50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
