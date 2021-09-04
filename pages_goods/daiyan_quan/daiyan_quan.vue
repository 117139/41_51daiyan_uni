<template>
	<view>
		<view class="container">
		  <view class="index_box1">
		    <view class="sousuo_box">
		      <text class="iconfont iconsousuo"></text> 
					<input class="flex_1 c3" type="text" placeholder="搜索代言圈"
					v-model="daiyan_ss"
					 @input="daiyan_sousuo" 
					 confirm-type='搜索' 
					 @confirm="dy_ss_fuc"/>
		    </view>
		  </view>
		  <view class="list">
		    <view class="li_box" v-for="(item,idx) in data_list" @tap="jump" :data-url="'/pages_goods/daiyan_quan_xq/daiyan_quan_xq?id='+item.id">
		      <view class="li_img">
		        <image class="li_img" :lazy-load='true' :src="filter.imgIP(item.img)" mode="aspectFill"></image>
		      </view>
		      <text class="li_name oh1">{{item.title}}</text>
		      <view class="li_js oh2">{{item.synopsis}}</view>
		    </view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
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
	var inputt
	var that
	export default {
		data() {
			return {
				type:'',
				btn_kg:0,
				data_last:false,
				page:1,
				size:30,
				data_list:[],
				daiyan_ss:''
			}
		},
		computed:{
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
		  that.type= options.type
		  
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
		  this.onRetry()
		},
		
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function () {
			this.getdata()
		},
		
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {
		
		},
		onShareTimeline(){
			
			if(that.loginMsg){
				return {
					title:'我是代言人，邀您领红包！',
					imageUrl:that.$store.state.loginMsg.avatarurl,
					query:'pid=' + that.loginMsg.id+'&type='+that.type,
				}
			}else{
				return {
					title:'我是代言人，邀您领红包！',
					// imageUrl:that.$store.state.loginMsg.avatarurl,
					query:'type='+that.type,
				}
			}
		},
		methods: {
			onRetry(){
				this.page=1
				this.data_list=[]
				this.data_last=false
				this.getdata()
			},
			
			getdata(){
				let that = this
				console.log(that.btn_kg)
				if(that.data_last) return
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				var datas={
					token: that.loginMsg.userToken,
					content:that.daiyan_ss,
					page:that.page,
					size:that.size
				
				}
				service.P_get('/circle',datas).then(res => {
				  console.log(res)
					that.btn_kg=0
					
					if(res.code==1){
						var datas = res.data
						if (datas.length == 0) {
							if(that.page==1){
								that.data_list=datas
							}else{
								that.data_last=true
							}
							
							that.btn_kg=0
							return
						}
						if(that.page==1){
							that.data_list =datas
						}else{
							
							that.data_list = that.data_list.concat(datas)
						}
						that.btn_kg=0
						that.page++
					}
				}).catch(e => {
				  console.log(e)
					that.btn_kg=0
					uni.showToast({
						icon:'none',
						title:'获取数据失败'
					})
				})
			},
			
			daiyan_sousuo(e){
				var that=this
				console.log(e.detail.value)
				// this.daiyan_ss=e.detail.value
				clearInterval(inputt)
				inputt = setTimeout(function() {
					var kw = that.daiyan_ss
					console.log(kw.length)
					if (kw.length > 0) {
						
						that.onRetry()
					
					} else {
						that.onRetry()
						// that.qy_show = that.qy_arr3
					}
				}, 1000)
			},
			dy_ss_fuc(e){
				console.log('sousuo')
				console.log(e.detail.value)
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
	padding: 100rpx 28rpx 28rpx;
	box-sizing: border-box;
}
.list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
}
.li_box{
	width:218rpx;
	height:306rpx;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	margin-right: 19rpx;
	margin-bottom: 19rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 17rpx;
	box-sizing: border-box;
	text-align: center;
}
.li_box:nth-child(3n){
	margin-right: 0;
}
.li_img{
	width:140rpx;
	height:140rpx;
	border-radius:50%;
	margin-bottom: 13rpx;
}
.li_name{
	font-size: 30rpx;
	color: #000;
  margin-bottom: 10rpx;
}
.li_js{
	font-size: 22rpx;
	color: #999;
}


.index_box1{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F7AC39;
  padding: 15rpx 29rpx;
  box-sizing: border-box;
  position: fixed;
  top: 0;
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
</style>
