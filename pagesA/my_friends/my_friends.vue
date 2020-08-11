<template>
	<view>
		<view class="container">
			<view class="my_f_box">
				<view class="box_tit">
					<view class="td1">互赞、互评、投票、跟随购买</view>
					<view class="td2" @tap="paixun">互动频率 
						<text v-if="list_type=='0'" class="iconfont iconXSJ"></text>	
						<text v-else class="iconfont iconXSJ-copy"></text>	
					</view>
					<view class="td2" @tap="paixun1">代言商品 
						<text v-if="list_type1=='0'" class="iconfont iconXSJ"></text>
						<text v-else class="iconfont iconXSJ-copy"></text>
					</view>
				</view>
				<view class="data_null" v-if="data_list.length==0">
							 <image :src="filter.imgIP('/static_s/51daiyan/images/data_null1.png')"></image>
				</view>
				<view class="box_tit box_li" v-for="(item,idx) in data_list">
					<view class="td1">
						<view class="user_tx" @tap="jump" :data-url="'/pages/my_index/my_index?id='+item.u_id">
							<image class="user_tx" :src="filter.imgIP(item.head_portrait)"></image>
							<image v-if="item.identity_id==1" class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							<image v-if="item.identity_id==2" class="user_v" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image>
						</view>
						<text>{{item.nickname}}</text>
					</view>
					<view class="td2">{{item.interact}}</view>
					<view class="td2">{{item.goods_sum}}件</view>
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
				list_type:0,
				list_type1:0,
				data_list:[],
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
			this.onRetry()
		},
		methods: {
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
			onRetry(){
				this.page=1
				this.data_list=[]
				this.btn_kg=0
				this.getdatalist()
			},
			getdatalist() {
			
				let that = this
				var jkurl = '/user/friends'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					size:that.size,
					interact:that.list_type?'up':'down',
					goods_sum:that.list_type1?'up':'down',
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
			guanzhuFuc(type,id,key){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					type:type,
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
			
			paixun1(){
				var that =this
				that.list_type1=!that.list_type1
				this.onRetry()
			},
			paixun(){
				var that =this
				that.list_type=!that.list_type
				this.onRetry()
			},
			zan(e){
			  console.log(e.currentTarget.dataset.id)
			},
			jump(e){
			  service.jump(e)
			},
			kffuc(e){
				console.log(e)
			}
		}
	}
</script>

<style scoped>
page,.container{
	height: auto;
	min-height: 100%;
	background: #f5f5f5;
}
.my_f_box{
	width: 100%;
	background: #fff;
}
.my_f_box>view{
	display: flex;
	align-items: center;
}
.td1{
	width: 50%;
	font-size: 24rpx;
	color: #999;
}
.td2{
	width: 25%;
	font-size: 28rpx;
	color: #666;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
}
.td2 text{
	font-size: 10rpx;
}
.box_tit{
	min-height: 80rpx;
	padding: 20rpx 28rpx;
	box-sizing: border-box;
	border-bottom: 1px solid #eee;
}
.box_li .td1{
	font-size: 30rpx;
	color: #333;
	display: flex;
	align-items: center;
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
view.user_tx{
  margin-right: 10rpx;
}
.box_li .td2{
	color: #1E9526;
	font-size: 30rpx;
}
</style>
