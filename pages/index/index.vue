<template>
	<view class="container">
		<hongbao ref="hongbao" :shuaxin="shuaxin"></hongbao>
		<view class="header_box">
			<view class="index_box1">
				<image v-if="!hasLogin" class="user_tx" :src="filter.imgIP('/static_s/51daiyan/images/mr_tx.jpg')" data-url="/pagesA/login/login" @tap='jump'></image>
				<image v-else class="user_tx" @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+loginMsg.id"  :src="loginMsg.avatarurl"></image>
				<view class="sousuo_box" @tap="jump" data-url="/pages_goods/search/search">
					<text class="iconfont iconsousuo"></text>搜索人名代言号/商品/品牌
				</view>
				<view class="game_js" @tap="jump" data-url="/pages_goods/game_js/game_js">
					<text class="iconfont iconic_help_px"></text>
					玩法介绍
				</view>
			</view>
			<!-- <view @tap="jump" data-url="/pagesA/order_fapiao/order_fapiao?id=1">发票</view> -->
			<view class="index_box1 index_box2">
				<view class="cur">代言动态<text></text></view>
				<view @tap="jump" data-url="/pages_goods/daiyan_sc/daiyan_sc">代言商城</view>
				<view @tap="jump" data-url="/pages_goods/star_list/star_list?type=1">明星</view>
				<view @tap="jump" data-url="/pages_goods/star_list/star_list?type=2">达人</view>
				<view @tap="jump" data-url="/pagesA/my_friends/my_friends">好友</view>
				<view @tap="jump" data-url="/pages_goods/daiyan_ph/daiyan_ph">排行</view>
			</view>
		</view>
		
		<view v-if="htmlReset==1" class="zanwu" @tap='getdata'>请求失败，请点击重试</view>
		<view class="index_box1 index_box3" v-if="datas.wdyNumber>0" @tap="jump" data-url="/pagesA/OrderList/OrderList?type=5"
		 data-login="true" :data-haslogin="hasLogin">
			<text class="iconfont iconyiping"></text>
			<view>您还有{{datas.wdyNumber}}件商品未代言，快来代言吧～</view>
		</view>
		
		<!-- <web-view src="https://51daiyan.com.aa.800123456.top/api/cron/orderReleaseCost"></web-view> -->
		<view v-if="start_li.length>0" class="index_box1 index_box4" @tap="jump" data-url="/pages_goods/star_list/star_list?type=1">
			<view>明星达人代言人推荐：</view>
			<text>各种玩法尽在明星达人代言秀</text>
		</view>
		<scroll-view  v-if="start_li.length>0" class="start_list" scroll-x>
			<view class="start_list1">
				<view class="start_li" v-for="(item,index) in start_li">
					<view class="star_tx" @tap="jump" :data-url="'/pagesA/my_index/my_index?id='+item.user_id">
						<image :src="item.head_portrait" mode="aspectFill" ></image>
						
						<!-- mingxing -->
						<view v-if="item.identity_id==1" class="star_v star_v1">
							<image  :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
						</view>
						
						<!-- daren -->
						<view v-if="item.identity_id==2" class="star_v star_v1">
							<image  :src="filter.imgIP('/static_s/51daiyan/images/star_dbg.png')"></image>
							<text class="iconv iconfont"></text>
							<text class="user_v_lv">{{item.user_grade_num?item.user_grade_num:0}}</text>
						</view>
						<!-- <view>
							<image v-if="item.identity_id==1" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							<image v-if="item.identity_id==2" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image>
						</view> -->
					</view>
					<view class="star_name oh1">{{item.nickname}}</view>
					<view class="star_name_label oh1">
						<text v-for="(item1,index1) in item.label_arr">{{item1}}</text>
					</view>
					<view v-if="item.is_attention==1" class="star_btn" @tap.stop="guanzhuFuc(item.user_id,'affirm')">关注</view>
					<view v-if="item.is_attention==2" class="star_btn star_btn1" @tap.stop="guanzhuFuc(item.user_id,'cancel')">已关注</view>
				</view>
			</view>
		</scroll-view>
		<view class="find_star" v-if="datas.activityArr.length>0" @tap="jump" data-url="/pages_goods/daiyan_find/daiyan_find">
			<view class="find_tit">
				<view>寻找代言人:</view>
				<text>（赏金任务）</text>
			</view>
			<view class="find_sj">
				<view class="sj_list">
					<image v-for="(item,idx) in datas.activityArr" class="sj_li" :src="filter.imgIP(item.head_portrait)" mode="aspectFill"></image>
					<!-- <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
	        <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
	        <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image>
	        <image class="sj_li" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')" mode="aspectFill"></image> -->
				</view>
				<text class="iconfont iconnext3"></text>
			</view>
		</view>
		<view class="goods_index" v-if="datas.advocacyVideoArr.length>0||datas.goodStuffArr.length>0">
			<view>
				<view class="goodstype_name">代言人短视频 <image :src="filter.imgIP('/static_s/51daiyan/images/goods_type1.png')"></image>
				</view>
				<view class="goods_tip">已为您更新{{datas.advocacyVideoArr.length>0?datas.advocacyVideoArr.length:0}}个视频</view>
				<view class="goods_list">
					<view v-if="idx<2" class="goods_li" v-for="(item,idx) in datas.advocacyVideoArr" 
					 @tap.stop="jump" :data-url="'/pages_goods/xvideo/xvideo?idx='+item.id">
						<image class="goods_img" :src="filter.imgIP_video(item.img[0])" mode="aspectFill"></image>
						<image class="goods_play" :src="filter.imgIP('/static_s/51daiyan/images/goods_play.png')"></image>
					</view>
					<!-- <view class="goods_li">
	          <image class="goods_img" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" mode="aspectFill"></image>
	          <image class="goods_play" :src="filter.imgIP('/static_s/51daiyan/images/goods_play.png')"></image>
	        </view> -->
				</view>
				<!-- <image src="/static/images/goods_type1.png"></image> -->
			</view>
			<view @tap="jump" data-url="/pages_goods/goods_tj/goods_tj">
				<view class="goodstype_name goodstype_name1">好货推荐<image :src="filter.imgIP('/static_s/51daiyan/images/goods_type2.png')"></image>
				</view>
				<view class="goods_tip">发现更多人气代言好货</view>
				<view class="goods_list">
					<view class="goods_li" v-for="(item,idx) in datas.goodStuffArr">
						<image class="goods_img" :src="filter.imgIP(item.img[0])" mode="aspectFill"></image>
					</view>
					<!-- <view class="goods_li">
	          <image class="goods_img" :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" mode="aspectFill"></image>
	        </view> -->
				</view>
				<!-- <image src="/static/images/goods_type2.png"></image> -->
			</view>
		</view>
		<!-- 代言圈 -->
		<view class="quan_list">
			<view class="quan_li" v-for="(item,idx) in data_list">
				<view class="quan_user_box">
					<image @tap="jump"  :data-url="'/pagesA/my_index/my_index?id='+item.user_id" class="quan_user_tx" :src="item.user_head_portrait" mode="aspectFill"></image>
					<view class="quan_user_msg">
						<view class="quan_user_name">{{item.user_nickname}}
							<!-- mingxing -->
							<view v-if="item.use_identity_id==1" class="star_v">
								<image  :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							</view>
							
							<!-- daren -->
							<view v-if="item.use_identity_id==2" class="star_v">
								<image  :src="filter.imgIP('/static_s/51daiyan/images/star_dbg.png')"></image>
								<text class="iconv iconfont"></text>
								<text class="user_v_lv">{{item.user_grade_num?item.user_grade_num:0}}</text>
							</view>
							<!-- <image v-if="item.use_identity_id==1" :src="filter.imgIP('/static_s/51daiyan/images/star_b.png')"></image>
							<image v-if="item.use_identity_id==2" :src="filter.imgIP('/static_s/51daiyan/images/star_d.png')"></image> -->
						</view>
						<view class="quan_user_time">
							<text>{{filter.getDateTime(item.create_time)}}</text>
							<text v-if="item.use_identity_id==1">明星</text>
							<text v-if="item.use_identity_id==2">达人</text>
						</view>
					</view>
					<view v-if="item.a_activity_id>0&&item.is_vote==2" class="quan_user_btn" @tap.stop="toupiao" :data-id="item.user_id" :data-idx="idx">为我投票</view>
					<view v-if="item.a_activity_id>0&&item.is_vote==1" class="quan_user_btn quan_user_btn1">已投票</view>
				</view>
				<!-- <view class="quan_msg"> -->
				<view class="quan_msg" @tap="jump" :data-url="'/pages_goods/daiyan_xq/daiyan_xq?id='+item.id">
					<view class="oh4  quan_msg_text">{{item.content}}</view>
					<view v-if="item.img.length==1" class="quan_msg_img">
						<image v-if="item.type==1||item.type==3" class="one one_one" :lazy-load='true' 
						 :src="filter.imgIP(item.img[0])" mode="aspectFill" :data-src="filter.imgIP(item.img[0])"
						 @tap.stop="pveimg"></image>
						<image v-if="item.type==2" class="one one_one" :lazy-load='true' 
						 :src="filter.imgIP_video(item.img[0])" mode="aspectFill" :data-src="filter.imgIP_video(item.img[0])"
						 @tap.stop="jump" data-type="sp" :data-spurl="item.img" :data-url="'/pages_goods/d_video/d_video?idx=0&a_id='+item.id"></image>
					</view>
					<view v-else class="quan_msg_img">
						<image v-if="item.type==1" v-for="(item1,idx1) in item.img"
						 :src="filter.imgIP(item1)" mode="aspectFill" :lazy-load='true' :data-src="filter.imgIP(item1)" 
							:data-array="filter.getgimgarrIP(item.img)" :data-array1="item.img" 
						 @tap.stop="pveimg"></image>
						<image v-if="item.type==2" v-for="(item1,idx1) in item.img" :lazy-load='true' :src="filter.imgIP_video(item1)" mode="aspectFill" 
						 @tap.stop="jump" data-type="sp" :data-spurl="item.img" :data-url="'/pages_goods/d_video/d_video?idx='+idx1+'&a_id='+item.id"></image>
						<!-- <image :src="filter.imgIP('/static_s/51daiyan/images/goods1.png')" mode="aspectFill" :data-src="filter.imgIP('/static_s/51daiyan/images/goods1.png')"
						 @tap.stop="pveimg"></image>
						<image :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" mode="aspectFill" :data-src="filter.imgIP('/static_s/51daiyan/images/goods.png')"
						 @tap.stop="pveimg"></image> -->
					</view>
				</view>
				<view v-if="idx1<1" v-for="(item1,idx1) in item.goods" class="quan_goods por" @tap="jump" 
				 :data-url="'/pages_goods/details/details?id='+item1.g_id+'&dy_id='+item.id+'&advocacyviceId='+item1.id">
					<view class="goods_hb_box" v-if="item1.is_red">
						
						<image v-if="item1.is_red.is_have_share_red==1&&item1.is_red.is_may_share_red==1" class="goods_hb" @tap.stop="open_hb_fuc(item1,1)" :src="filter.imgIP('/static_s/51daiyan/images/pro2/hb_off.png')" mode="widthFix"></image>
						<image v-if="item1.is_red.is_have_advocacy_red==1&&item1.is_red.is_may_advocacy_red==1" class="goods_hb" @tap.stop="open_hb_fuc(item1,2)" :src="filter.imgIP('/static_s/51daiyan/images/pro2/hb_off.png')" mode="widthFix"></image>
						
						 <!-- <image class="goods_hb" @tap.stop="open_hb_fuc(item1,1)" :src="filter.imgIP('/static_s/51daiyan/images/pro2/hb_off.png')" mode="widthFix"></image>
						<image class="goods_hb" @tap.stop="open_hb_fuc(item1,2)" :src="filter.imgIP('/static_s/51daiyan/images/pro2/hb_off.png')" mode="widthFix"></image> -->
					</view>
					<image class="quan_goods_img" :lazy-load='true' :src="filter.imgIP(item1.g_img[0])" mode="aspectFill"></image>
					<view class="quan_goods_msg">
						<view class="quan_goods_name dis_flex aic"><text v-if="item1.fk_is_way==2" class="xcxdy_zy_icon">自营</text><text class="flex_1 oh1">{{item1.g_title}}</text></view>
						<view class="quan_goods_pri">
							<text class="pri1">¥{{item1.g_current_price}}</text>
							<text class="pri2">¥{{item1.g_original_price}}</text>
						</view>
						<view class="quan_goods_btn">
							<view class="goods_btn1">库存:{{item1.g_total_number}}</view>
							<view class="goods_btn2"><text>{{item1.g_advocacy_mannumber}}</text>代言人</view>
						</view>
					</view>
				</view>
				<view class="goods_more" v-if="item.goods.length>1" >
				  <view>共{{item.goods.length}}件</view>
				  <view class="gm_more" @tap="jump" 
				 :data-url="'/pages_goods/daiyan_xq/daiyan_xq?id='+item.id">点击查看</view>
				</view>
				<view class="quan_li_cz">
					<!-- <text class="iconfont iconcaozuo" @tap.stop=""></text>
	        <view class="cz_li">
	          <view>
	            <text class="iconfont iconhongxinicon"></text>赞
	          </view>
	          |
	          <view>
	           <text class="iconfont iconpinglun"></text>评论
	          </view>
	        </view> -->
					<view class="cz_li" style="position: relative;">
						<button type="default" open-type="share" :data-id="item.id" style="position: absolute;top: 0;opacity: 0;width: 100%;height: 100%;"></button>
						<text class="iconfont iconfenxiang2" style="color: #999;"></text>分享
					</view>
					<view class="cz_li">跟随购买：{{item.follow_buy_number}}</view>
					<view class="cz_li" @tap.stop="jump" :data-url="'/pages_goods/daiyan_pl/daiyan_pl?id='+item.id"><text class="iconfont iconpinglun"></text>{{item.comment_number}}</view>
					<view class="cz_li" v-if="item.is_praise==2" @tap="guanzhuFuc_dz(4,item.id,'affirm')" :data-id="idx">
						<text class="iconfont iconzan"></text>{{item.praise_number}}
					</view>
					<view class="cz_li" v-if="item.is_praise==1" @tap="guanzhuFuc_dz(4,item.id,'cancel')" :data-id="idx">
						<text class="iconfont icondianzan2" style="color: #f00;"></text>{{item.praise_number}}
					</view>
				</view>
			</view>
			<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
		</view>
		<!-- <view class="zxkf_btn">
			<button open-type="contact" bindcontact="kffuc"></button>
			<image src="../../static/images/zxkf.png"></image>
		</view> -->
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
				datas: '',
				page: 2,
				banner: '',
				homeSeek: '',
				homeTeacher: '',
				homeVideo: '',
				start_li: [], //明星达人
				data_list: [], //代言列表
				data_last:false,
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 1000,
				circular: true
			}
		},
		onLoad() {
			var that = this
			that.getdata()
			that.event.on('/pages/index/index', 'test', function(args) {
				//args为trigger中所有的参数，可自定义数据，除了type和page及success
				console.log('testindex:' + args);
				console.log(args);
				that.getdata()
				that.Imlogin()
				//返回数据，在trigger中success方法可以收到
				return {

				};

			});
		},
		onShow() {
			this.btn_kg=0
			if(this.hasLogin){
				if (this.isSDKReady) {
					console.log('2222')
					this.getConversationList()
				} else {
					console.log('333333')
				}
			}
		},
		onPullDownRefresh: function() {
			wx.stopPullDownRefresh();
			this.getdata()
		},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			this.getdatalist()
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage(res) {
		
			if (res.from === 'button') {
				console.log(res.target.dataset.type)
				// this.setData({
				// 	sharetype:'share'
				// })
			}
			
			return {
				title: '51代言',
				path: '/pages_goods/daiyan_xq/daiyan_xq?id=' + res.target.dataset.id,
				success: function(res) {
					console.log('成功', res)
				}
			}
		},
		onShareTimeline(){
			return {
				title:'51代言',
				query:'pid=' + that.loginMsg.id
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
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
					this.updateUserInfo()
					//请求会话列表
					this.getConversationList()
				}
			},


		},
		methods: {
			...mapMutations(['setAbout']),
			open_hb_fuc(item,type){
				this.$refs.hongbao.open_hb(0,item,type)
			},
			shuaxin(){
				this.page=1
				this.getdatalist()
			},
			Imlogin(){
				var that =this
				var userInfo=this.loginMsg
				if (userInfo) {
					let promise = that.tim.login({
						userID: userInfo.identification_id,
						userSig: userInfo.IMSign
					});
					promise.then((res) => {
						console.log(res)
						//登录成功后 更新登录状态
						that.$store.commit("toggleIsLogin", true);
						//自己平台的用户基础信息
						// uni.setStorageSync('userInfo', JSON.stringify(userInfo))
						//tim 返回的用户信息
						uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
						console.log('userTIMInfo========>'+JSON.stringify(res.data))
						// uni.reLaunch({
						// 	url: '../tim/record'
						// })
					}).catch((err) => {
						console.warn('login error:', err); // 登录失败的相关信息
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户不存在',
						duration: 1500
					});
				}
			},
			
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
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					if (conversationList.length>0) {
			
						//将返回的会话列表拼接上 用户的基本资料  
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit("updateConversationList", conversationList);
					}
				}).catch((err) => {
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
				});
			},
			guanzhuFuc_dz(type, id, key) {
				var that = this
				var data = {
					token: that.loginMsg.userToken,
					type: type,
					id: id,
					operate: key,
				}
			
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				service.P_post('/attention/operation', data).then(res => {
					console.log(res)
					that.btn_kg = 0
					if (res.code == -1) {
						uni.navigateTo({
							url: '/pagesA/login/login'
						})
						return
					} else if (res.code == 0 && res.msg == '请先登录账号~') {
						uni.navigateTo({
							url: '/pagesA/login/login'
						})
						return
					} else if (res.code == 1) {
						// that.onRetry()
						for (var i = 0; i < that.data_list.length; i++) {
							if (that.data_list[i].id == id) {
								if (key == 'affirm') {
									that.$set(that.data_list[i], 'is_praise', 1)
									that.$set(that.data_list[i], 'praise_number', that.data_list[i].praise_number-1+2)
								} else {
									that.$set(that.data_list[i], 'is_praise', 2)
									that.$set(that.data_list[i], 'praise_number', that.data_list[i].praise_number-1)
								}
			
							}
						}
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
					} else {
			
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
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
				if(key=='affirm'){
					service.P_post('/attention/operation',data).then(res => {
					  console.log(res)
						that.btnkg=0
						if(res.code==-1){
							uni.navigateTo({
								url:'/pagesA/login/login'
							})
							return
						}else if(res.code==0&&res.msg=='请先登录账号~'){
							uni.navigateTo({
								url:'/pagesA/login/login'
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
										url:'/pagesA/login/login'
									})
									return
								}else if(res.code==0&&res.msg=='请先登录账号~'){
									uni.navigateTo({
										url:'/pagesA/login/login'
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
			getdata() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken||'',
				}
				that.datas=''
				that.start_li=[]
				that.data_list=[]
				// 单个请求
				service.P_get('', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.htmlReset=0
						that.datas = res.data
						that.setAbout(res.data.aboutAs)
						that.start_li = res.data.publicUserArr
						//代言数据
						that.data_list = res.data.advocacyArr
						that.page = 2
						that.data_last=false
					}else{
						that.htmlReset=1
					}
				}).catch(e => {
					that.htmlReset=1
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})


			},
			getdatalist() {

				var that = this
				var jkurl = '/getAdvocacyList'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page
				}
				if(that.data_last) return
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				var now_page=that.page
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
						that.btn_kg=0
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						if(now_page==1){
							that.data_list =datas
						}else{
							if (datas.length==0) {
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '到底了。。。'
								// })
								that.data_last=true
								return
							}
							that.data_list = that.data_list.concat(datas)
								
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
			toupiao(e) {
			  var id = e.currentTarget.dataset.id
			  var idx = e.currentTarget.dataset.idx
				var that =this
			  var datas = {
			  	token: that.loginMsg.userToken,
			  	aau_id:id,
					activity_id:that.data_list[idx].a_activity_id
			  }
			  // 单个请求
			  service.P_post('/activity/vote', datas).then(res => {
			  	console.log(res)
			  	if (res.code == 1) {
			  		// that.page=1
			  		// that.getdatalist()
						// that.data_list[idx].is_vote=2
						that.$set(that.data_list[idx],'is_vote',1)
						// that.$refs.hongbao.open_hb(0,that.data_list[idx].a_activity_id,3)
			  		uni.showToast({
			  			icon: 'none',
			  			title: '操作成功'
			  		})
						setTimeout(function(){
							that.$refs.hongbao.open_hb(0,that.data_list[idx].a_activity_id,3)
						},1000)
			  	}
			  }).catch(e => {
			  	console.log(e)
			  	uni.showToast({
			  		icon: 'none',
			  		title: '操作失败'
			  	})
			  })
			},

			zan(e) {
				console.log(e.currentTarget.dataset.id)
			},
			jump(e) {
				
				service.jump(e)
			},
			pveimg(e) {
				service.pveimg(e)
			},
			kffuc(e) {
				console.log(e)
			},
			retry() {
				this.getdata()
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		min-height: 100vh;
		background: #f5f5f5;
		/* padding: 30rpx 47rpx; */
	}

	.header_box {
		width: 100%;
		padding-top: 10rpx;
		background: linear-gradient(180deg, rgba(245, 195, 61, 1), rgba(254, 133, 53, 1));
	}

	.index_box1 {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5rpx 29rpx 5rpx;
		box-sizing: border-box;
	}

	.user_tx {
		width: 74rpx;
		height: 74rpx;
		border-radius: 37px;
		margin-right: 10rpx;
	}

	.sousuo_box {
		flex: 1;
		height: 55rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 28px;
		font-size: 24rpx !important;
		color: #BBBBBB !important;
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
	}

	.sousuo_box text {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #BBBBBB;
	}

	.game_js {
		width: 165rpx;
		height: 45rpx;
		background: linear-gradient(180deg, rgba(252, 139, 17, 1), rgba(255, 85, 25, 1));
		opacity: 0.8;
		border-radius: 0px 23px 23px 0px;
		margin-left: 30rpx;
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		padding-left: 50rpx;
		box-sizing: border-box;
		position: relative;
	}

	.game_js text {
		position: absolute;
		left: -20rpx;
		font-size: 60rpx;
		color: #fff;
	}

	/* index_box2 */
	.index_box2 {
		padding: 5rpx 29rpx 20rpx;
	}

	.index_box2 view {
		color: #fff;
		font-size: 30rpx;
		position: relative;
	}

	.index_box2 .cur text {
		content: '';
		position: absolute;
		bottom: -8rpx;
		left: 50%;
		margin-left: -25rpx;
		width: 50rpx;
		height: 6rpx;
		background: rgba(255, 251, 240, 1);
		border-radius: 3px;
	}

	.index_box3 {
		height: 52rpx;
		background: #FFF4EF;
		font-size: 22rpx;
		color: #f9b234;
		justify-content: flex-start;
		padding: 10rpx 28rpx;
		align-items: center;
	}

	.index_box3 text {
		margin-right: 20rpx;
		font-size: 24rpx;
		color: #f9b234;
	}

	.index_box4 {
		height: 82rpx;
		background: #fff;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;
	}

	.index_box4 text {
		color: #FE8735;
	}

	.start_list {
		width: 100%;


		background: #fff;
		height: 286rpx;
		display: flex;
		white-space: nowrap;
		margin-bottom: 20rpx;

	}

	.start_list1 {
		padding: 10rpx 29rpx 40rpx;
		box-sizing: border-box;
		height: 336rpx;
	}

	.start_li {
		display: inline-flex;
		width: 198rpx;
		height: 286rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		margin-right: 20rpx;
		flex-direction: column;
		align-items: center;
		padding: 17rpx;
		box-sizing: border-box;
	}

	.star_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
		margin-bottom: 20rpx;
	}

	.star_tx>image {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
		z-index: 1;

	}

	/* .star_tx view image {
		width: 27rpx;
		height: 28rpx;
		position: absolute;
		bottom: 0;
		right: -5rpx;
		z-index: 2;
	} */

	.star_name {
		max-width: 100%;
		font-size: 30rpx;
		line-height: 40rpx;
		/* margin-bottom:10rpx; */
		color: #333;
	}
	.star_name_label{
		max-width: 100%;
		font-size: 24rpx;
		line-height: 30rpx;
		height: 30upx;
		margin-bottom: 10rpx;
		color: #333;
	}
	.star_btn {
		width: 100%;
		height: 56rpx;
		background: rgba(254, 135, 53, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		color: #fff;
	}

	.find_star {
		background: #fff;
		padding: 19rpx 29rpx;
		width: 100%;
		box-sizing: border-box;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.find_tit {
		display: flex;
		flex-direction: column;
		justify-content: space-around
	}

	.find_tit text {
		font-size: 24rpx;
		color: #FE8735;
	}

	.find_sj {

		display: flex;
		align-items: center;
	}

	.find_sj>text {
		color: #EEEEEE;
		font-size: 24rpx;
		margin-left: 20rpx;
	}

	.sj_list {
		display: flex;
		flex-direction: row-reverse;
	}

	.sj_li {
		width: 96rpx;
		height: 96rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 10rpx 0px rgba(119, 119, 119, 0.2);
		border-radius: 50%;
		position: relative;
		z-index: 10;
	}

	.sj_li:nth-child(2) {
		position: relative;
		left: 20rpx;
		z-index: 9;
	}

	.sj_li:nth-child(3) {
		position: relative;
		left: 40rpx;
		z-index: 8;
	}

	.sj_li:nth-child(4) {
		position: relative;
		left: 60rpx;
		z-index: 7;
	}

	.sj_li:nth-child(5) {
		position: relative;
		left: 80rpx;
		z-index: 6;
	}

	/* goods_index */

	.goods_index {
		width: 100%;
		background: #fff;
		display: flex;
		margin-bottom: 20rpx;
	}

	.goods_index>view {
		flex: 1;
		padding: 15rpx 18rpx;
		box-sizing: border-box;
	}

	.goods_index>view+view {
		border-left: 1rpx solid #eee;
	}

	.goodstype_name {
		font-size: 30rpx;
		color: #333;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.goodstype_name image {
		width: 142rpx;
		height: 40rpx;
		margin-left: 5rpx;
	}

	.goodstype_name1 image {
		width: 40rpx;
	}

	.goods_tip {
		margin-top: 8rpx;
		font-size: 24rpx;
		color: #999;
	}

	.goods_list {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		/* justify-content: space-around; */
		justify-content: space-between;
		padding-bottom: 10rpx;
	}

	.goods_li {
		position: relative;
		width: 156rpx;
		height: 156rpx;
	}

	.goods_img {
		width: 156rpx;
		height: 156rpx;
		border-radius: 12rpx;
		position: relative;
		z-index: 1
	}

	.goods_play {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		z-index: 2;
		width: 38rpx;
		height: 38rpx;
	}

	/* quan */
	.quan_list {
		width: 100%;
	}

	.quan_li {
		width: 100%;
		background: #fff;
		padding: 23rpx 28rpx 0;
		box-sizing: border-box;
	}

	.quan_li+.quan_li {
		margin-top: 20rpx;
	}

	.quan_user_box {
		display: flex;
		align-items: center;
	}

	.quan_user_tx {
		width: 74rpx;
		height: 74rpx;
		/* background:rgba(252,68,56,1); */
		border-radius: 37rpx;
		margin-right: 22rpx;
	}

	.quan_user_btn {
		font-size: 28rpx;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 168rpx;
		height: 56rpx;
		background: rgba(254, 58, 53, 1);
		border-radius: 10rpx;
		margin-left: 20rpx;
	}

	.quan_user_btn1 {
		background: #ddd;
	}

	.quan_user_msg {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}

	.quan_user_name {
		font-size: 28rpx;
		color: #6876BD;
		display: flex;
		align-items: center;
	}

	/* .quan_user_name image {
		width: 28rpx;
		height: 28rpx;
		margin-left: 10rpx;
	} */

	.quan_user_time {
		font-size: 22rpx;
		color: #999;
	}

	.quan_user_time text {
		margin-right: 20rpx;
	}

	.quan_msg {
		width: 100%;
		padding-left: 96rpx;
		box-sizing: border-box;
		margin-top: 16rpx;
		font-size: 30rpx;
		color: #333;

	}

	.quan_msg_text {
		line-height: 40rpx;
		margin-bottom: 20rpx;
	}

	.quan_msg_img image {
		width: 196rpx;
		height: 196rpx;
		border-radius: 10rpx;
		margin-right: 4rpx;
		margin-bottom: 4rpx;
	}

	.quan_msg_img image:nth-child(3n) {
		margin-right: 0;
	}

	.quan_msg_img image.one {
		max-width: 100%;

		border-radius: 10rpx;
	}
	.quan_msg_img .one_one{
		width: 300rpx;
		height: 400rpx;
	}
	.quan_goods {
		margin-top: 16rpx;
		width: 100%;
		height: 238rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		padding: 20rpx;
		box-sizing: border-box;
		display: flex;
	}

	.quan_goods_img {
		width: 196rpx;
		height: 196rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
	}

	.quan_goods_msg {
		flex: 1;
	}

	.quan_goods_name {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 22rpx;
	}

	.quan_goods_pri {
		color: #EB4443;
		font-size: 30rpx;
		margin-bottom: 50rpx;
	}

	.quan_goods_pri .pri2 {
		margin-left: 20rpx;
		text-decoration: line-through;
		color: #999;
	}

	.quan_goods_btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #333;
	}
	.goods_more{
	  width: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  font-size: 24rpx;
	  color: #333;
	  height: 80rpx;
	
	}
	.gm_more{
	  color: rgba(254,135,53,1);
	}
	
	.goods_btn1 {
		padding: 0 9rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: rgba(254, 135, 53, 1);
		border-radius: 10rpx;
		color: #fff;
	}

	.goods_btn2 text {
		color: #FE8735;
		margin-right: 5upx;
	}

	.quan_li_cz {
		width: 100%;
		margin-top: 15rpx;
		height: 70rpx;
		display: flex;
		/* flex-direction: row-reverse; */
		justify-content: space-between;
		align-items: center;
	}

	.quan_li_cz .iconcaozuo {
		font-size: 48rpx;
		color: #BBBBBB;
	}

	.cz_li {

		display: flex;
		align-items: center;
		justify-content: space-around;
		color: #999;
		font-size: 24rpx;
	}

	.cz_li text {
		font-size: 26rpx;
		color: #999;
		margin-right: 10rpx;
	}
</style>
