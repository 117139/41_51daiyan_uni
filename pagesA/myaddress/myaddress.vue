<template>
	<view>
		<view class="container log-list">
		  <view class="addressOne" v-for="(item,idx) in addresslist" @tap="xz_add" :data-idx="idx">
				<view class="addp1">
					<text class="mr20">{{item.user_name}}</text>
					<text>{{item.phone}}</text>
				</view>
				<view class="addp2">{{item.area}}{{item.address}}</view>
				<view class="addsetting">
					<view class="setting1 flex_1 c3 " :class="moren==item.id?'mricon1':''" :data-id="item.id" @tap="selecmr">
						<view class="mricon " :class="moren==item.id?'mricon1':''">
							<icon  v-if="moren==item.id" size="13" type="success" color="#F7B43B" />
		
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
				<navigator class="addbtn" url="/pages/addressEdit/addressEdit">
					<view class="addicon">
						<image src="/static/images/addicon.png"></image>
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
				addresslist: [
				  {
				    user_name: '昵称',
				    phone: '18300000000',
				    area: '北京 北京市 海淀区',
				    address: '中关村e世界5层',
				    id:1
				  },
				  {
				    user_name: '昵称',
				    phone: '18300000000',
				    area: '北京 北京市 海淀区',
				    address: '中关村e世界5层',
				    id:2
				  },
				  {
				    user_name: '昵称',
				    phone: '18300000000',
				    area: '北京 北京市 海淀区',
				    address: '中关村e世界5层',
				    id:3
				  },
				  {
				    user_name: '昵称',
				    phone: '18300000000',
				    area: '北京 北京市 海淀区',
				    address: '中关村e世界5曾',
				    id:4
				  },
				],
				mridx:0,
				form_type:0
			}
		},
		onLoad: function (option) {
		  var that =this
		  if(option.type){
		    that.form_type=option.type
		  }
		},
		onShow(){
		
			// this.getaddlist()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
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
			  that.moren=id
			  return 
				console.log(e.currentTarget.dataset.id)
				// let id=e.currentTarget.dataset.id
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				wx.request({
					url:  service.IPurl+'/api/userAddressDefaultStatus/'+id,
					data:  {
						token:wx.getStorageSync('token')
				  },
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'put',
					success(res) {
						console.log(res.data)
						that.btnkg=0
						if(res.data.code==1){
							that.getaddlist()
						}else{
							if(res.data.msg){
								wx.showToast({
									title: res.data.msg,
									duration: 2000,
									icon:'none'
								});
							}else{
								wx.showToast({
									title: '网络异常',
									duration: 2000,
									icon:'none'
								});
							}
						}
					},
					fail(err){
						console.log(err)
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon:'none'
						});
						that.btnkg=0
					}
				})
			},
			addressEdit(e){
				
				console.log(e.currentTarget.dataset.id)
				let address=this.addresslist[e.currentTarget.dataset.id]
				 address=JSON.stringify(address)
				wx.navigateTo({
					url:'/pages/addressEdit/addressEdit?address='+address
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
			        wx.showToast({
			          title: '删除'
			        })
			        return
							wx.request({
								url:  app.IPurl+'/api/userAddress/'+e.currentTarget.dataset.id,
								data:  {
										token:wx.getStorageSync('token')
							    },
								header: {
									'content-type': 'application/x-www-form-urlencoded' 
								},
								dataType:'json',
								method:'DELETE',
								success(res) {
									console.log(res.data)
									that.btnkg=0
									if(res.data.code==1){
										wx.showToast({
											title:'操作成功'
										})
										setTimeout(function(){
											that.getaddlist()
										},1000)
									}else{
										if(res.data.msg){
											wx.showToast({
												title: res.data.msg,
												duration: 2000,
												icon:'none'
											});
										}else{
											wx.showToast({
												title: '网络异常',
												duration: 2000,
												icon:'none'
											});
										}
									}
								},
								fail(){
									that.btnkg=0
									wx.showToast({
										title: '网络异常',
										duration: 2000,
										icon:'none'
									});
								}
							})
							
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			getaddlist(){
				
				let that =this
				//http://water5100.800123456.top/WebService.asmx/useraddress
				wx.request({
					url:  app.IPurl+'/api/userAddressList',
					data:  {
							token:wx.getStorageSync('token')
						},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'get',
					success(res) {
						console.log(res.data)
						
						if(res.data.code==1){
							that.addresslist=res.data.data
						}
						
					},
					fail() {
						 
					}
				})
			},
			onRetry(){
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
