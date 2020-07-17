<template>
	<view>
		<view class="container log-list">
			<view v-if="datas.length==0" class="zanwu">暂无数据</view>
		  <view class="addressOne" v-for="(item,idx) in datas" @tap="xz_add" :data-idx="idx">
				<view class="addp1">
					<text class="mr20">{{item.name}}</text>
					<text>{{item.phone}}</text>
				</view>
				<view class="addp2">{{item.province}}{{item.city}}{{item.area}} {{item.address}}</view>
				<view class="addsetting">
					<view class="setting1 flex_1 c3 " :class="item.is_default==1?'mricon1':''" :data-id="item.id" @tap="selecmr">
						<view class="mricon " :class="item.is_default==1?'mricon1':''">
							<icon  v-if="item.is_default==1" size="13" type="success" color="#F7B43B" />
		
						</view>
						默认地址
					</view>
					<view class="setcz c3">
						<view class="setting2" :data-id="idx" @tap="addressEdit">
							<!-- <text class="iconfont icondingdan fz26 mr5"></text> -->
		          编辑
						</view>
						<view class="setting3" :data-id="item.id" @tap="addressDel">
							<!-- <text class="iconfont iconshanchu fz26 mr5"></text> -->
		          删除
						</view>
					</view>
				</view>
			</view>
			<view class="fixbottom">
				<navigator class="addbtn" url="/pagesA/addressEdit/addressEdit">
					<view class="addicon">
						<!-- <image :src="filter.imgIP('/static_s/51daiyan/images/addicon.png')"></image> -->
					</view>
					添加新地址
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				btnkg:0,
				moren:1,
				page:1,
				page_size:20,
				datas: [],
				mridx:0,
				form_type:0
			}
		},
		onLoad: function (option) {
		  var that =this
		  if(option.type){
		    that.form_type=option.type
		  }
			// this.getaddlist()
		},
		onShow(){
		
			this.onRetry()
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
			this.getaddlist()
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {
			xz_add(e){
			  var that =this
			  if (that.form_type!=1){
			    return
			  }
			  console.log(e.currentTarget.dataset.idx)
			  var idx = e.currentTarget.dataset.idx
			  var pages = getCurrentPages();   //当前页面
			  var prevPage = pages[pages.length - 2];   //上一页面
			  prevPage.setData({
			    //直接给上一个页面赋值
			    addresschose: that.addresslist[idx],
			  });
			
			  wx.navigateBack({
			    //返回
			    delta: 1
			  })
			},
			selecmr(e){
				let that =this
			  var id = e.currentTarget.dataset.id
			 
				console.log(e.currentTarget.dataset.id)
				// let id=e.currentTarget.dataset.id
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				///address/default
				var jkurl='/user/address/default'
				var data={
					token:that.loginMsg.userToken,
					id:id
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg=0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							uni.showToast({
								icon:'none',
								title:'操作成功'
							})
							that.onRetry()
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			addressEdit(e){
				
				console.log(e.currentTarget.dataset.id)
				let address=this.datas[e.currentTarget.dataset.id]
				 address=JSON.stringify(address)
				wx.navigateTo({
					url:'/pagesA/addressEdit/addressEdit?address='+address
				})
			},
			addressDel(e){
				let that =this
				console.log(e.currentTarget.dataset.id)
				let id=e.currentTarget.dataset.id
				wx.showModal({
					content:"确定要删除改地址吗?",
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(that.btnkg==1){
								return
							}else{
								that.btnkg=1
							}
			        var jkurl='/user/address/del'
			        var data={
			        	token:that.loginMsg.userToken,
			        	id:id
			        }
			        service.post(jkurl, data,
			        	function(res) {
			        		that.btnkg=0
			        		// if (res.data.code == 1) {
			        		if (res.data.code == 1) {
			        			var datas = res.data.data
			        			// console.log(typeof datas)
			        			
			        			if (typeof datas == 'string') {
			        				datas = JSON.parse(datas)
			        			}
			        			uni.showToast({
			        				icon:'none',
											title:'操作成功'
			        			})
										this.onRetry()
			        		} else {
			        			if (res.data.msg) {
			        				uni.showToast({
			        					icon: 'none',
			        					title: res.data.msg
			        				})
			        			} else {
			        				uni.showToast({
			        					icon: 'none',
			        					title: '操作失败'
			        				})
			        			}
			        		}
			        	},
			        	function(err) {
			        		that.btnkg=0
			        		
			        			uni.showToast({
			        				icon: 'none',
			        				title: '获取数据失败'
			        			})
			        	
			        	}
			        )
							
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			getaddlist(){
				
				let that =this
				var jkurl='/user/address'
				var data={
					token:that.loginMsg.userToken,
					page:that.page,
					size:that.page_size
				}
				service.get(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if(that.page==1){
								that.datas=datas.address
							}else{
								if(datas.address.length){
									uni.showToast({
										icon:'none',
										title:'到底了。。。'
									})
									return
								}
								that.datas=that.datas.concat(datas.address)
							}
							that.page++
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '操作失败'
								})
							}
						}
					},
					function(err) {
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			onRetry(){
				this.btnkg=0
				this.page=1
				this.getaddlist()
			}
		}
	}
</script>

<style scoped>
.container{
	min-height: 100vh;
	background: #eeeeee;padding-top: 17rpx;
	padding-bottom: 180rpx;
}
.addressOne{
	width: 100%;
	padding: 24rpx 28rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #fff;
	margin-bottom: 20rpx;
}
.addp1{
	font-size: 28rpx;
	color: #333;
	display: flex;
	justify-content: space-between;
}
.addp2{
	font-size: 24rpx;
	color: #333333;
	height: 80rpx;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #eee;
	margin-bottom: 20rpx; 
	word-wrap:break-word;
word-break:break-all;
}
.addsetting{
	width: 100%;
	display: flex;
	font-size: 24rpx;
	color: #b2b2b2;
	justify-content: space-between;
}
.setcz{
	display: flex;
	align-items: center;
}
.setting1{
	width: 150rpx;
  height: 20rpx;
	display: flex;
	align-items: center;
  border: 0!important;
}

.setting3{
	margin-left: 40rpx;
}
.mricon{
	width: 24rpx;
	height: 24rpx;
	border:1px solid #bababa;
	border-radius: 50%;
	margin-right: 20rpx;
}
.mricon1{
	border:1px solid transparent;
  color: #F7B43B;
}
.fixbottom{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	height: 140rpx;
	background-color: #eeeeee;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
}
.addbtn{
	width: 100%;
	height: 86rpx;
	background-color: #F7B43B;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 28rpx;
}
.addicon{
	margin-right: 14rpx;
	width: 22rpx;
	height: 22rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.addicon image{
	width: 22rpx;
	height: 22rpx;
}
</style>
