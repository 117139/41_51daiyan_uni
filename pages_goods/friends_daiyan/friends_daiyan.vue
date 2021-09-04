<template>
	<view>
		<view class="container">
		  <!-- goods_li -->
				<view class="goods_list2">
					
					<view v-if="data_list.length==0" class="zanwu">暂无数据</view>
					<view class="goods_li2" v-for="(item,idx) in data_list">
						<view class="goods_li2_d1"  @tap="jump" :data-url="'/pages_goods/details/details?id='+item.g_id">
							<view class="goods_img2">
								<image class="goods_img2"  :lazy-load='true' :src="filter.imgIP(item.g_img[0])"></image>
							</view>
							<view class="goods_msg">
								<view class="goods_name2 fz30 oh1">{{item.g_name}}</view>
								<view class="goods_pri">
									<view class="pri1">¥{{item.g_current_price}}</view>
									<view class="pri2">代言费：¥{{item.advocacy_earnings}}</view>
								</view>
								<view class="goods_btn1">
									<view class="goods_dy_num2"><text class="iconfont icondianzan2"></text>{{item.advocacy_mannumber}}代言人</view>
								</view>
							</view>
						</view>
						<view class="goods_li2_d2">
							<view class="dy_tx">
								<image class="dy_tx" :src="filter.imgIP(item.user_head_portrait)"></image>
							</view>
							<view class="dy_star">{{item.nickname}}代言：</view>
							<view class="dy_text oh1">{{item.content}}</view>
						</view>
		        <!-- <view class="sc_box" @tap="del_li" :data-id="idx">
		         
		        </view> -->
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
	export default {
		data() {
			return {
				btn_kg:0,
				data_list: [],
				page:1,
				size:20
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		onLoad() {
			that=this
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
		onShareTimeline(){
			if(that.loginMsg){
				return {
					title:'我是代言人，邀您领红包！',
					imageUrl:that.$store.state.loginMsg.avatarurl,
					query:'pid=' + that.loginMsg.id,
				}
			}else{
				
			}
		},
		methods: {
			onRetry(){
				this.page=1
				this.data_list=[]
				this.getdatalist()
			},
			getdatalist() {
			
				let that = this
				var jkurl = '/goods/getFriendsGoods'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
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
			
			del_li(e){
				let that =this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let id=e.currentTarget.dataset.id
				wx.showModal({
					title: '提示',
					content: '是否删除?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(that.btnkg==1){
								return
							}else{
								that.btnkg=1
							}
							uni.showToast({
								icon:'none',
								title:'删除'
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
				
			},
			jump(e){
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
  padding: 0rpx 28rpx 28rpx;
	box-sizing: border-box;
}


.goods_list2{
	margin-top: 20rpx;
	width: 100%;
}
.goods_li2{
	width: 100%;
	border-radius: 12rpx;
	background: #fff;
	padding: 24rpx 24rpx;
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
	justify-content: space-between;
}
.pri1{
	font-size: 30rpx;
	color: #C3AA76;
}
.pri2{
	font-size: 24rpx;
	color: #999;
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
.dy_text{
	flex: 1;
	font-size: 24rpx;
	color: #bbb;
}
.sc_box{
  display: flex;
  align-items: center;
  width: 100%;
  height: 70rpx;
  font-size: 28rpx;
  color: #fe8735;
  flex-direction: row-reverse
}
.sc_box text{
  font-size: 28rpx;
  color: #fe8735;
	margin-right: 5rpx;
}
</style>
