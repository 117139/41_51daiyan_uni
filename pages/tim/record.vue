<template>
	<view>
		<!-- <view class="user-box">
			<view class="nav-tab">
				<view :class="isActive ==0 ?'tab-item-active tab-item': 'tab-item'" @click="changeTabBtn(0)">聊天记录</view>
				<view :class="isActive ==1 ?'tab-item-active tab-item1': 'tab-item1'" @click="changeTabBtn(1)">好友列表</view>
				<view class="out-login" @click="outLoginBtn()"> 注 销</view>

				<view class="clear-box"></view>
			</view>
		</view> -->
		<!-- 聊天记录 会话列表 -->
		<view class="conversition-box" v-if="hasLogin">
			<official-account class="gzgzh_btn"></official-account>
			<view v-if="datas.xtxx" class="xx_li" @tap="jump" data-url="/pagesA/xiaoxi_list/xiaoxi_list?type=3">
				<view class="user_tx" >
					<image class="user_tx"  :src="filter.imgIP('/static_s/51daiyan/images/xtxx.png')"></image>
					<text v-if="datas.xtxx.is_read==1"></text>
				</view>
				<view class="xx_msg">
					<view class="to_name">
						<text >系统消息</text>
						<text v-if="datas.xtxx.create_time" class="time">{{filter.getDateTime(datas.xtxx.create_time)}}</text>
					</view>
					<view v-if="datas.xtxx.msg" class="to_msg oh1">
						{{datas.xtxx.msg}}
					</view>
					<view v-else class="to_msg oh1">暂无消息</view>
				</view>
			</view>
			<!-- <view class="xx_li" bindtap="jump" data-url="/pages/lts/lts">
				<view class="user_tx" >
					<image class="user_tx" src="../../static/images/wlxx.png"></image>
					<text></text>
				</view>
				<view class="xx_msg">
					<view class="to_name">
						<text >物流信息</text>
						<text class="time">17:30</text>
					</view>
					<view class="to_msg oh1">
						您参与的【华为优选代言人活动】即将开始，敬请关注。
					</view>
				</view>
			</view> -->
			<view v-if="datas.dxdy" class="xx_li" @tap="jump" data-url="/pagesA/xiaoxi_list/xiaoxi_list?type=1">
				<view class="user_tx" >
					<image class="user_tx"  :src="filter.imgIP('/static_s/51daiyan/images/dyxx.png')"></image>
					<text v-if="datas.dxdy.is_read==1"></text>
				</view>
				<view class="xx_msg">
					<view class="to_name">
						<text >定向代言</text>
						<text v-if="datas.dxdy.create_time" class="time">{{filter.getDateTime(datas.dxdy.create_time)}}</text>
					</view>
					<view v-if="datas.dxdy.msg" class="to_msg oh1">
						{{datas.dxdy.msg}}
					</view>
					<view v-else class="to_msg oh1">暂无消息</view>
				</view>
			</view>
			<view v-if="datas.dysy" class="xx_li" @tap="jump" data-url="/pagesA/xiaoxi_list/xiaoxi_list?type=2">
				<view class="user_tx" >
					<image class="user_tx"  :src="filter.imgIP('/static_s/51daiyan/images/dyxx.png')"></image>
					<text v-if="datas.dysy.is_read==1"></text>
				</view>
				<view class="xx_msg">
					<view class="to_name">
						<text >代言收益</text>
						<text v-if="datas.dysy.create_time" class="time">{{filter.getDateTime(datas.dysy.create_time)}}</text>
					</view>
					<view v-if="datas.dysy.msg" class="to_msg oh1">
						{{datas.dysy.msg}}
					</view>
					<view v-else class="to_msg oh1">暂无消息</view>
				</view>
			</view>
			<view class="list-box" v-if="conversationList && conversationList.length>0">
				<view v-for="(item,index) in conversationList" :key="index" @click="toRoom(item)">
					<view class="item-box">
						<view class="item-img">
							<img v-if="item.userProfile.avatar" :src="filter.imgIP(item.userProfile.avatar)" alt="">
							<img v-else :src="filter.imgIP('/static_s/51daiyan/images/mr_tx.jpg')" alt="">
						</view>
						<view class="item-text">
							<view class="item-user">
								{{item.userProfile.nick}}
							</view>
							<view class="item-text-info">
								<rich-text v-if="item.lastMessage.payload.data=='custom_img'" :nodes="nodesFliter('[图片]')"></rich-text>
								<rich-text v-else :nodes="nodesFliter(item.lastMessage.messageForShow)"></rich-text>
							</view>
						</view>
						<view class="item-msg">
							<view class="item-msg-icon" v-if="item.unreadCount">{{item.unreadCount}}</view>
						</view>

					</view>


				</view>
			</view>


			<view class="list-box" v-else>
				<!-- <span class="msg-box">暂无聊天记录，请选择好友进行聊天</span> -->
				<span class="msg-box">暂无聊天记录</span>
			</view>
		</view>


		<!-- 好友列表 -->
		<view class="user-box" v-if="!hasLogin">

			<view class="btn" style="margin-top: 40%;"><button type="default" @tap="gologin">授权登录</button></view>
		</view>

	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	import userList from '../../commen/tim/user.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: 'record',
		data() {
			return {
				btnkg:0,
				userList: userList,
				datas:[],
				friendList: [],
				isActive: 0, //默认聊天记录
			}
		},
		onLoad() {
			if(this.hasLogin){
				this.getxcx_msg()
				console.log('...')
				console.log(this.conversationList)
				console.log(uni.getStorageSync('userInfo'))
				// let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				let userInfo =this.loginMsg
				this.friendList = []
				// userList.forEach(item => {
				// 	if (item.userId != userInfo.userId) {
				// 		console.log(item)
				// 		this.friendList.push(item)
				// 	}
				// })
				// service.get_info()
			}
			
		
		},
		onShow() {
			uni.hideTabBarRedDot({
				index:2
			})
			this.btnkg=0
			if(this.hasLogin){
				if (this.isSDKReady) {
					console.log('2222')
					this.getConversationList()
					
					//更新用户自己的基础资料（头像+昵称+个性签名）
					// this.updateUserInfo()
				} else {
					console.log('333333')
				}
			}
			
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			if(this.hasLogin){
				this.getxcx_msg()
				if (this.isSDKReady) {
					console.log('2222')
					this.getConversationList()
				} else {
					console.log('333333')
					uni.stopPullDownRefresh();
				}
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'forcedLogin',
				'isLogin',
				'isSDKReady',
				'conversationList'
			])
		},
		watch: {
			isSDKReady(val) {
				//isSDKReady == true 
				if (val) {
					//更新用户自己的基础资料（头像+昵称+个性签名）
					// this.updateUserInfo()
					//请求会话列表
					this.getConversationList()
				}
			},


		},
		methods: {
			//提交用户的基础信息到Im
			updateUserInfo() {
				var that =this
				//将已经登陆的用户信息 提交到IM中
				// let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				console.log('将已经登陆的用户信息 提交到IM中')
				let promise = that.tim.updateMyProfile({
					nick: that.loginMsg.nickname,
					avatar: that.loginMsg.avatarurl,
					gender: that.$TIM.TYPES.GENDER_MALE,
					selfSignature: that.loginMsg.introduction||'这个人比较懒还没有简介~~',
					allowType: that.$TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
				});
				promise.then((res) => {
					console.log('提交资料成功')
				}).catch((err) => {
					console.warn('updateMyProfile error:', err); // 更新资料失败的相关信息
				});
			},
			getxcx_msg(){
				var that =this
				var jkurl='/message'
				var datas={
					token: that.loginMsg.userToken || ''
				}
				if(this.btnkg==1){
					return
				}
				this.btnkg=1
				service.P_get(jkurl, datas).then(res => {
					that.btnkg=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
					
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						console.log(datas)
						
						that.datas=datas
						
					
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '获取失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			jump(e) {
				var that =this
				console.log(e.currentTarget.dataset.type)
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
					setTimeout(function (){
						that.btnkg=0
					},1000)
				}
				service.jump(e)
			},
			gologin(){
				uni.navigateTo({
					url:'/pagesA/login/login'
				})
			},
			createGroup() {
				let promise = this.tim.createGroup({
					type: this.$TIM.TYPES.GRP_PUBLIC,
					name: '阿萨德',
					memberList: [{
						userId: '3'
					}, {
						userId: '4'
					}] // 如果填写了 memberList，则必须填写 userID
				});
				promise.then(function(imResponse) { // 创建成功
					console.log(imResponse.data.group); // 创建的群的资料
					console.log('sss')
				}).catch(function(imError) {
					console.warn('createGroup error:', imError); // 创建群组失败的相关信息
				});
			},
			getGroup() {
				let promise = this.tim.getGroupList();
				promise.then(function(imResponse) {
					console.log('群组')
					console.log(imResponse.data.groupList); // 群组列表
				}).catch(function(imError) {
					console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
				});
			},
			//注销登录
			outLoginBtn() {
				let promise = this.tim.logout();
				promise.then(res => {
					this.$store.commit('reset')
					uni.reLaunch({
						url: '../index/index'
					})
				}).catch(err => {
					console.log('退出失败')
				});
			},
			//提交用户的基础信息到Im
			updateUserInfo() {
				//将已经登陆的用户信息 提交到IM中
				let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
				let promise = this.tim.updateMyProfile({
					nick: loginMsg.nickname,
					avatar: loginMsg.avatarurl,
					gender: this.$TIM.TYPES.GENDER_MALE,
					selfSignature: loginMsg.introduction,
					allowType: this.$TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
				});
				promise.then((res) => {
					console.log('提交资料成功')
				}).catch((err) => {
					console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				});
			},
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>'
				return nodeStr
			},
			//切换tab
			changeTabBtn(_index) {
				this.isActive = _index
				if (this.isSDKReady) {
					this.getConversationList()
				}
			},
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
						uni.stopPullDownRefresh();
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					if (conversationList.length>0) {
						//将返回的会话列表拼接上 用户的基本资料  
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit("updateConversationList", conversationList);
					}
				}).catch((err) => {
					uni.stopPullDownRefresh();
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
				});
			},
			toRoom(item) {
				this.$store.commit('updateConversationActive', item)
				uni.navigateTo({
					url: './room'
				})
			},
			//选择用户聊天
			checkUserToRoom(toUserInfo) {
				this.$store.commit('createConversationActive', toUserInfo.userId)
				uni.navigateTo({
					url: './room'
				})
			}

		},
		
	}
</script>

<style scoped lange="scss">
	.xx_li{
		width: 100%;
		background: #FFF;
		padding: 20rpx 22rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
	}
	.user_tx{
		width:82rpx;
		height:82rpx;
		border-radius:50%;
		position: relative;
		margin-right: 20rpx;
	}
	.user_tx text{
		width:14rpx;
		height:14rpx;
		background:rgba(254,58,53,1);
		border-radius:50%;
		position: absolute;
		top: 0;
		right: 0;
	}
	.xx_msg{
		flex: 1;
	}
	.to_name{
		width: 100%;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;
		font-size: 30rpx;
		color: #333;
		justify-content: space-between;
	}
	.to_name .time{
		font-size: 24rpx;
		color: #999;
	}
	.to_msg{
		color: #999;
		font-size: 24rpx;
	}
	
	
	
	.list-box {
		width: 100%;
		margin: 0rpx auto;
	}

	.item-box {
		width: auto;
		/* height: 130rpx; */
		padding: 20rpx;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}

	.item-img {
		float: left;
		/* margin-top: 20rpx; */
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.item-img img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.item-text {
		float: left;
		margin-left: 30rpx;
		width: 500rpx;
		height: 80rpx;
		color: #666;
		font-size: 28rpx;
	}

	.item-user {
		width: auto;
		/* height: 60rpx;
		line-height: 60rpx; */
		color: 333;
		font-size: 30rpx;
		margin-bottom: 10upx;

	}

	.item-text-info {
		width: auto;
		/* height: 60rpx;
		line-height: 60rpx; */
		color: #666;
		font-szie: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.user-box {
		width: auto;
		height: 80rpx;
		padding: 0 20rpx;
	}

	.nav-tab {
		padding-top: 20rpx;
		background: #fff;
		height: 80rpx;

	}

	.tab-item {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-left-radius: 25rpx;
		border-bottom-left-radius: 25rpx;
	}

	.tab-item1 {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-right-radius: 25rpx;
		border-bottom-right-radius: 25rpx;
	}

	.tab-item-active {
		color: #fff;
		background: #F56C6C;
	}

	.msg-box {
		display: flex;
		width: 100%;
		line-height: 160rpx;
		font-size: 28rpx;
		color: #666;
		text-align: center;
		align-items: center;
		justify-content: center;
	}

	.user-item-box {
		padding: 20rpx 0;
		width: auto;
		height: 70rpx;
		line-height: 70rpx;
		cursor: pointer;
		border-bottom: 1px solid #eee;
	}

	.user-img {
		float: left;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.user-img image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.user-name {
		float: left;
		margin-left: 20rpx;
		width: 250rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #666;
		font-weight: 500;
	}

	.item-msg {
		float: right;
		width: 40rpx;
		height: 80rpx;
	}

	.item-msg-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #f06c7a;
		color: #fff;
		line-height: 40rpx;
		margin-top: 30rpx;
		text-align: center;
		font-size: 24rpx;
	}

	.clear-box {
		clear: both;
	}

	.out-login {
		float: right;
		margin-right: 20rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 40rpx;
		border-radius: 25rpx;
		color: #fff;
		background: #F56C6C;
		font-size: 26rpx;
	}
</style>
