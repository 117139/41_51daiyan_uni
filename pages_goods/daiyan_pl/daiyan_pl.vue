<template>
	<view>
		<view class="container">

			<!-- 评价 -->
			<view class="pj_box">
				<view class="pl_tit_box">
					<view>评论({{datas.comment_number}})</view>
					<picker class="" @change="bindPickerChange" :value="index" :range="sex" range-key='name'>
						<view class="pl_px">按{{sex[index].name}}<text class="iconfont iconpaixu"></text></view>
					</picker>
				</view>
				<view class="zanwu" v-if="data_list.length==0">暂无数据</view>
				<view class="pj_li" v-for="(item,idx) in data_list">
					<view class="pj_d1">
						<view class="pj_ren">
							<view class="user_tx">
								<image class="user_tx" :src="filter.imgIP(item.avatar_url)"></image>
							</view>
							{{item.nickname}}
						</view>

					</view>
					<view class="pj_d2">{{item.comment}}</view>
					<!-- <view class="xpl_box">
		        <view class="xpl_li">
		          <view class="xpl_name">飘雪</view>
		          <view class="xpl_inr oh3">这个新包装的味道比之前好喝么？</view>
		        </view>
		        <view class="xpl_li">
		          <view class="xpl_name">飘雪</view>
		          <view class="xpl_inr oh3">这个新包装的味道比之前好喝么？</view>
		        </view>
		        <view class="xpl_li xpl_li_more" @tap="jump" @tap="/pages/daiyan_pl_hf/daiyan_pl_hf">共11条回复<text class="iconfont iconnext3"></text></view>
		      </view> -->
					<view class="quan_li_cz">
						<view class="pj_time">{{item.create_time}}
							<!-- <text class="huifu_btn">回复</text> -->
						</view>
						<view class="cz_li" v-if="item.is_praise==2" @tap="guanzhuFuc_dz(7,item.id,'affirm')" data-id="idx"><text class="iconfont iconzan"></text>{{item.like_sum}}</view>
						<view class="cz_li" v-if="item.is_praise==1" @tap="guanzhuFuc_dz(7,item.id,'cancel')" data-id="idx"><text class="iconfont icondianzan2" style="color: #f00;"></text>{{item.like_sum}}</view>
					</view>
				</view>
				<view v-if="data_last" class="data_last">我可是有底线的哟~</view>
			</view>
			<view v-if="shuru_type" class="sr_view">
				<textarea class="shuru_box" auto-focus="true" focus="true" cursor-spacing='100' @confirm="save_pl" @blur="shuru_guanbi"
				 placeholder="请发表您的评论…"></textarea>
				<view class="syzzc" @tap="shuru_guanbi"></view>
			</view>

			<!-- 底部 -->
			<!-- <view wx:else class="bottom_box"> -->
			<view class="bottom_box">
				<image @tap="shuru" class="edit_icon" :src="filter.imgIP('/static_s/51daiyan/images/edit_icon.png')"></image>
				<view class="kf_btn">
					<text class="iconfont iconbuy"></text>
					<text>{{datas.follow_buy_number}}</text>
				</view>
				<view class="sg"></view>
				<view class="kf_btn">
					<text class="iconfont iconpinglun"></text>
					<text>{{datas.comment_number}}</text>
				</view>
				<view class="sg"></view>
				<view class="kf_btn">
					<text class="iconfont iconzan"></text>
					<text>{{datas.praise_number}}</text>
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
				btn_kg: '',
				data_last:false,
				ad_id: '',
				page:1,
				size:20,
				datas:'',
				data_list: [],

				cur_swiper: 1,
				sex: [{
						name: '热度',
						value: '1'
					},
					{
						name: '时间',
						value: '2'
					},
				],
				index: 0,
				shuru_type: false,
				sheetshow: false, //规格弹框控制
				sheetshow1: false,
				dyr_type: 0,
				showcan: false,
				goods_total_limit: '', //商品阶梯
				guige: [], //规格
				type1: [0], //规格index
				cnum: 1, //数量
				goods_sku_id: 0, //商品id
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				'platform'
			])
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			that=this
			if (options.id) {
				this.ad_id = options.id
			}
			this.onRetry()
			console.log(this.platform)
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {

		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			var that = this;


		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {

		},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {

		},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
			this.onRetry()
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
		onShareAppMessage: function() {

		},
		onShareTimeline(){
			return {
				title:'51代言',
				query:'pid=' + that.loginMsg.id,
			}
		},
		methods: {
			onRetry() {
				this.page = 1
				this.data_last=false
				this.getdatalist()
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
									that.$set(that.data_list[i], 'like_sum', that.data_list[i].like_sum-1+2)
								} else {
									that.$set(that.data_list[i], 'is_praise', 2)
									that.$set(that.data_list[i], 'like_sum', that.data_list[i].like_sum-1)
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
			
			//获取评论的
			getdatalist() {
				let that = this
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
				}
				var jkurl = '/advocacy/commentList'
				var datas = {
					token: that.loginMsg.userToken,
					sort:that.sex[that.index].value,
					ad_id:that.ad_id,
					page: that.page,
					size: that.size
				}
				if(that.data_last) return
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						
						that.datas=res.data
						// console.log(typeof datas)
						var datas = res.data.list
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (datas.length == 0) {
							if (that.page > 1) {
								// uni.showToast({
								// 	icon: 'none',
								// 	title: '暂无更多数据'
								// })
								that.data_last=true
							}else{
								that.data_list = datas
							}

							that.btn_kg = 0
							return
						}
						if (that.page == 1) {
							that.data_list = datas
						} else {

							that.data_list = that.data_list.concat(datas)
						}
						that.btn_kg = 0
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

			shuru() {
				var that = this
				that.shuru_type = true
				console.log(that.shuru_type)
			},
			shuru_guanbi() {
				var that = this
				that.shuru_type = false
				console.log(that.shuru_type)
			},
			save_pl(e) {
				var that = this
				that.shuru_type = false
				if (!e.detail.value) {
					wx.showToast({
						icon: 'none',
						title: '请输入评论内容',
					})
					return
				}
				var jkurl = '/advocacy/comment'
				var datas = {
					token: that.loginMsg.userToken,
					comment:e.detail.value,
					ad_id:that.ad_id,
				}
				if(that.data_last) return
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						
						// console.log(typeof datas)
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						if(res.code==1){
							uni.showToast({
								icon:'none',
								title:'操作成功，已提交审核'
							})
							setTimeout(()=>{
								that.shuru_guanbi()
								that.onRetry()
							},1000)
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				console.log(e.detail.value)
			},
			bindPickerChange: function(e) {

				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
				this.onRetry()
			},
			swiper_change(e) {
				console.log(e.detail)
				var num = e.detail.current + 1
				this.cur_swiper = num
			},
			//数量
			onChange(e) {
				let idx = e.currentTarget.dataset.selec
				console.log(e.detail)
				// this.data.goods_sele[idx].num=e.detail
				this.cnum = e.detail
			},
			txtype_fuc(e) {
				console.log(e.currentTarget.dataset.type)
				this.dyr_type = e.currentTarget.dataset.type
			},
			
			jump(e) {
				service.jump(e)
			},
			onClose() {
				this.setData({
					sheetshow: false,
					sheetshow1: false
				})
			},
			sheetshow_fuc() {
				this.setData({
					sheetshow: true,
					btnkg: 0
				})

			},
			sheetshow1_fuc() {
				this.setData({
					sheetshow1: true,
					btnkg: 0
				})

			},
			call(e) {
				service.call(e)
			},

			pveimg(e) {
				let that = this
				service.pveimg(e)

			}
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		padding-bottom: 100rpx;
		background: #fff;
	}

	image {
		/* width: 100%;
	height: 100%; */
	}

	.pl_tit_box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		box-sizing: border-box;
		padding: 0 28rpx;
		font-size: 28rpx;
	}

	.pl_px,
	.pl_px text {
		color: #FE8735;
		font-size: 28rpx;
	}

	.br_box {
		z-index: 100;
		position: absolute;
		bottom: 40rpx;
		right: 40rpx;
		width: 66rpx;
		height: 36rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 18rpx;
		font-size: 26rpx;
		color: #eee;
		text-align: center;
		line-height: 36rpx;
	}

	.goods_msg {
		width: 100%;
		padding: 28rpx 0;
		background: #fff;
	}

	.goods_pri {
		font-size: 24rpx;
		color: #999;
		width: 100%;
		padding: 0 28rpx;
		margin-bottom: 12rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
	}

	.pri1 {
		font-size: 36rpx;
		color: #FE3A35;
	}

	.goods_name {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		padding: 0 28rpx;
		margin-bottom: 14rpx;
		box-sizing: border-box;
	}

	.pri2 text {
		font-size: 23rpx;
	}

	.goods_bz {
		border-top: 1px solid #eee;
		padding: 20rpx 28rpx 0;
		box-sizing: border-box;
		width: 100%;
	}

	.g_bz_1 {
		font-size: 26rpx;
		color: #666;
		display: flex;
		align-items: center;
	}

	.g_bz_1 text {
		width: 118rpx;
		height: 38rpx;
		background: rgba(247, 59, 103, 1);
		border-radius: 10rpx;
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10rpx;
	}

	.bz_li {
		margin-top: 15rpx;
		display: flex;
		flex-wrap: wrap;
	}

	.bz_li view {
		width: 33%;
		font-size: 24rpx;
		color: #999;
	}

	.goods_xmsg {
		display: flex;
		width: 100%;
		padding: 22rpx 28rpx;
		box-sizing: border-box;
		background: #fff;
		margin-bottom: 1px solid #eee;
		justify-content: space-between;
		align-items: center;
	}

	.goods_xmsg .v1 {
		width: 3em;
		margin-right: 20rpx;
		font-size: 28rpx;
		color: #333;
	}

	.goods_xmsg .v2 {
		flex: 1;
		font-size: 24rpx;
		color: #bbb;
		display: flex;
		align-items: center;
	}

	.goods_xmsg .v3 {
		display: flex;
		align-items: center;
		margin-left: 20rpx;
	}

	.goods_xmsg .v3 text {
		font-size: 20rpx;
		color: #bbb;
	}

	.yhq_box {
		width: 90rpx;
		height: 40rpx;
		background: rgba(250, 233, 234, 1);
		border: 2rpx solid rgba(247, 85, 89, 1);
		border-radius: 6rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #F8757A;
		margin-right: 10rpx;
	}

	.goods_xmsg .v21 {
		font-size: 23rpx;
		color: #333;
		flex-direction: row-reverse;
	}

	/* pingjia */
	.pj_box {
		/* background: #fff; */
		width: 100%;
		padding: 20rpx 0;
		/* border-bottom: 1px solid #eee; */
	}

	.pj_box_tit {
		padding: 0 28rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24rpx;
		color: #999;
		height: 75rpx;
	}

	.p_tit_l {
		font-size: 28rpx;
		color: #333;
	}

	.p_tit_r {
		display: flex;
		align-items: center;
	}

	.p_tit_r text {
		font-size: 24rpx;
		margin-left: 10rpx;
		color: #bbb;
	}

	.pj_bq {
		padding: 0 10rpx;
		box-sizing: border-box;
		width: 100%;
		margin-bottom: 20rpx;
		background: #fff;
	}

	.pj_bq view {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 60rpx;
		background: rgba(250, 233, 234, 1);
		border-radius: 30rpx;
		padding: 0 23rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		color: #333;
		margin: 10rpx 18rpx;
	}

	.pj_li {
		background: #fff;
		width: 100%;
		padding: 20rpx 28rpx 0;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
	}

	.pj_d1 {
		font-size: 26rpx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10rpx;
	}

	.pj_d2 {
		font-size: 26rpx;
		color: #333;
		padding-left: 65rpx;
	}

	.user_tx {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	view.user_tx {
		margin-right: 10rpx;
	}

	/*  */

	.dyr_text {
		width: 100%;


		background: #fff;
		height: 286rpx;
		display: flex;
		white-space: nowrap;
		margin-bottom: 20rpx;

	}

	.dyr_text1 {
		padding: 10rpx 29rpx 40rpx;
		box-sizing: border-box;
		height: 286rpx;
	}

	.dyr_li {
		display: inline-flex;
		width: 480rpx;
		height: 240rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3px 20rpx 0px rgba(119, 119, 119, 0.3);
		border-radius: 10rpx;
		margin-right: 20rpx;
		/* flex-direction: column; */
		align-items: center;
		/* padding: 17rpx; */
		box-sizing: border-box;
	}

	.dyr_msg {
		width: 240rpx;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		flex-wrap: wrap;
	}

	.dyr_img {
		flex: none;
		width: 240rpx;
		height: 240rpx;
		border-radius: 0px 10rpx 10rpx 0px;
		position: relative;
		z-index: 1;
	}

	.dyr_imgnum {
		position: absolute;
		bottom: 10rpx;
		right: 10rpx;
		z-index: 9;
		height: 29rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		font-size: 16rpx;
		color: #fff;
		padding: 0 10rpx;
	}

	.dyr_imgnum text {
		font-size: 14rpx;
		margin-right: 8rpx;
	}

	.dyr_d {
		color: #999;
		font-size: 24rpx;
		white-space: pre-line;
	}

	.dp_box {
		width: 100%;
		background: #fff;
		border-bottom: 1px solid #eee;
		padding: 20rpx 28rpx;
		box-sizing: border-box;


	}

	.dp_b1 {
		width: 100%;
		display: flex;
	}

	.dp_logo {
		width: 123rpx;
		height: 123rpx;
		border-radius: 10rpx;
		border: 1px solid #eee;
	}

	.dp_logo image {
		width: 123rpx;
		height: 123rpx;
		border-radius: 10rpx;
	}

	.dp_msg {
		flex: 1;
		height: 123rpx;
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.dp_name {
		font-size: 28rpx;
	}

	.dp_lv {
		display: flex;
		align-items: center;
	}

	.dp_lv image {
		width: 31rpx;
		height: 25rpx;
		margin-right: 10rpx;
	}

	.dp_bq {
		font-size: 24rpx;
		color: #bbb;
		display: flex;
		align-items: center;
	}

	.dp_bq text {
		margin-right: 20rpx;
	}

	.dp_bq .bq {
		width: 28rpx;
		height: 28rpx;
		background: rgba(241, 241, 241, 1);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dp_cz {
		margin-top: 35rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.dp_cz view {
		width: 336rpx;
		height: 80rpx;
		background: rgba(241, 241, 241, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.htk {
		padding-top: 20rpx;
		padding-bottom: 30rpx;
		width: 100%;
		background: #fff;
	}

	.htk_img {
		width: 143rpx;
		height: 67rpx;
	}

	.htk_text {
		padding: 0 28rpx;
		margin-top: 10rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: #333;
	}

	.htk_msg {
		margin-top: 15rpx;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 28rpx;
	}

	.htk_tx {
		width: 42rpx;
		height: 42rpx;
		border-radius: 50%;
	}

	.htk_name {
		font-size: 26rpx;
		color: #999;
		margin-left: 10rpx;
	}

	.htk_num {
		height: 32rpx;
		background: rgba(248, 89, 81, .2);
		border-radius: 4px;
		padding: 0 9rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		color: #F85951;
		margin-left: 10rpx;
	}

	/* goods_list */
	.goods_list {
		width: 100%;
		display: flex;
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.goods_li {
		width: 223rpx;
		margin-right: 12rpx;
	}

	.goods_li:nth-child(3n) {
		margin-right: 0
	}

	.goods_img {
		width: 223rpx;
		height: 223rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.htk_goods_name {
		margin-top: 10rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #666;
	}

	.htk_goods_pri {
		font-size: 26rpx;
		color: #F85951;
	}

	.htk_goods_pri text {
		font-size: 36rpx;
	}

	/* 详情 */
	.goods_xq {
		width: 100%;
		background: #fff;
	}

	.xq_tit {

		width: 100%;
		display: flex;
		font-size: 28rpx;
		color: #333;
		justify-content: center;
		align-items: center;
		height: 80rpx;
	}

	.xq_tit text {
		margin: 0 10rpx;
		color: #bbb;
	}

	.xq_box {
		width: 100%;
	}

	/* bottom_box */
	.bottom_box {
		position: fixed;
		bottom: 0;
		height: 100rpx;
		background: #fff;
		z-index: 10;
		padding: 0 28rpx;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		border-top: 1px solid #eee;
	}

	.buy_btn {
		width: 192rpx;
		height: 74rpx;
		background: rgba(247, 180, 59, 1);
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
		margin-left: 18rpx;
	}

	.buy_btn1 {
		background: #F73B67;
	}

	.kf_btn {
		width: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 22rpx;
		color: #333;
	}

	.kf_btn text {
		font-size: 30rpx;
		margin-bottom: 5rpx;
	}

	.sg {
		width: 1rpx;
		height: 48rpx;
		background: rgba(238, 238, 238, 1);
	}

	.sj_list {
		width: 154rpx;
		height: 56rpx;
		display: flex;
		flex-direction: row-reverse;
		position: relative;
		margin-right: 20rpx;
	}

	.sj_li {
		width: 56rpx;
		height: 56rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 3rpx 10rpx 0px rgba(119, 119, 119, 0.2);
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 6;
	}

	.sj_li:nth-child(2) {
		left: 36rpx;
		z-index: 7;
	}

	.sj_li:nth-child(3) {
		left: 72rpx;
		z-index: 8;
	}

	.sj_li:nth-child(4) {
		left: 98rpx;
		z-index: 9;
	}

	.sj_li:nth-child(5) {
		left: 134rpx;
		z-index: 10;
	}


	/***/
	.popopBox {
		width: 100%;
		padding: 20rpx 28rpx 0;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding-bottom: 150rpx;
		height: auto;
		position: relative;
		z-index: 999;
	}

	.popopBox1 {
		width: 100%;
		display: flex;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #eee;
	}

	.goodsimg {
		margin-top: 16rpx;
		width: 246rpx;
		height: 246rpx;
		border: 1rpx solid #d2d2d2;
		border-radius: 16rpx;
		overflow: hidden;
		margin-right: 30rpx;
	}

	.goodsimg image {
		width: 246rpx;
		height: 246rpx;
	}

	.goodstkjg {
		flex: 1;
		position: relative;
		padding: 20rpx 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around
	}

	.closebtn {
		width: 37rpx;
		height: 37rpx;
		border-radius: 50%;
		border: 1px solid #dddddd;
		overflow: hidden;
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.closebtn image {
		width: 37rpx;
		height: 37rpx;
		border-radius: 50%;
	}

	.goods_pri_h {
		font-size: 34rpx;
		color: #f75852;
		/* margin: 80rpx 0 25rpx; */
	}

	.kucun {
		color: #999999;
		font-size: 30rpx;
	}

	.tkname {
		display: -webkit-box !important;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 45rpx;
		font-size: 30rpx;
		color: #333;
	}

	.tkguigetit {
		font-size: 26rpx;
		color: #333;
		padding: 20rpx 0 20rpx;
	}

	.guigeBox {
		display: felx;
		align-items: center;
	}

	.guigeOne {
		/* width: 114rpx; */
		height: 50rpx;
		padding: 0 10rpx;
		border-radius: 8rpx;
		border: 1px solid #ddd;
		font-size: 26rpx;
		color: #333;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
	}

	.guigeOne.cur {
		background: rgba(250, 233, 234, 1);
		border: 1px solid rgba(247, 85, 89, 1);
		color: #F75559;
	}

	.countnum {
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		color: #333;
		margin-top: 20rpx;
		padding-bottom: 60rpx;
	}

	.czbtnG {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 120rpx;
	}

	.czbtnG .jrgwc,
	.czbtnG .buybtn {
		width: 338rpx;
		height: 80rpx;
		background: rgba(247, 180, 59, 1);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.czbtnG .buybtn {
		background: #F73B67;
	}

	.shuxian {
		width: 1px;
		height: 90rpx;
		margin: 0 15rpx;
		background-color: #eeeeee;
	}

	.contbox {
		width: 100%;
		padding: 10rpx 28rpx;
		box-sizing: border-box;
		background-color: #fff;
	}



	.tcc {
		width: 80vw;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hiddenbox {
		width: 0;
		height: 0;
		overflow: hidden;
		opacity: 0;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: -1;
	}

	.htoi {
		position: relative;
		width: 750px;
		height: 1206px;
		/* box-shadow:4rpx 4rpx 8rpx rgba(0,0,0,0.5); */
		/* margin-top: 20px; */
		/* transform:scale(.5); */
		opacity: 0;
		z-index: -1;
	}

	.showimg {
		width: 375rpx;
		height: 603rpx;
		margin-top: 20px;
		background-color: #eee;
	}

	.saveimg {
		width: 300rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #f75852;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		margin-top: 40rpx;
		margin-bottom: 20px;
	}

	action-sheet-item {
		padding: 0 !important;
		position: relative;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	button {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff !important;
		opacity: 0;
	}

	.guige {
		position: relative;
	}

	/* 选择代言人 */
	.dy_box {
		width: 100%;
		padding: 0 28rpx;
		box-sizing: border-box;
	}

	.tk_dyr_li {
		width: 100%;
		height: 146rpx;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tk_user_tx {
		width: 82rpx;
		height: 82rpx;
		border-radius: 50%;
		position: relative;
	}

	.tk_user_v {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 27rpx;
		height: 28rpx;
	}

	.tk_user_name {
		font-size: 30rpx;
		color: #333;
		margin: 0 15rpx;
	}

	.hy_bq {
		color: #FE3569;
		width: 60rpx;
		height: 32rpx;
		border: 1px solid rgba(254, 53, 105, 1);
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22rpx;
		margin-right: 5rpx;
	}

	.hy_bq1 {
		color: #FEC335;
		border: 1px solid #FEC335;
	}

	.hy_bq2 {
		color: #3598FE;
		border: 1px solid #3598FE;
	}

	.dy_btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 750rpx;
		height: 98rpx;
		background: rgba(244, 116, 22, 1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		color: #fff;
	}

	.tx_type2 {
		width: 38rpx;
		height: 38rpx;
		border: 1px solid rgba(210, 210, 210, 1);
		border-radius: 50%;
	}



	/* pj */
	.pj_ren {
		display: flex;
		align-items: center;
	}

	.pj_time {
		font-size: 24rpx;
		color: #999
	}

	.quan_msg_img {
		margin: 20rpx 0;
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
		width: 410rpx;
		max-width: 410rpx;
		height: 410rpx;
		border-radius: 10rpx;
	}

	.quan_li_cz {
		width: 100%;
		/* margin-top: 15rpx; */
		height: 60rpx;
		display: flex;
		padding-left: 65rpx;
		box-sizing: border-box;
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
		justify-content: flex-end;
		color: #999;
		font-size: 24rpx;
	}

	.cz_li text {
		font-size: 30rpx;
		color: #999;
		margin-right: 10rpx;
	}

	.huifu_btn {
		margin-left: 20rpx;
		color: #FE8735;
	}

	.edit_icon {
		width: 388rpx;
		height: 74rpx;
		margin-right: 20rpx;
	}

	.xpl_box {
		width: 614rpx;
		background: rgba(249, 249, 249, 1);
		border-radius: 10rpx;
		margin-left: 65rpx;
		margin-top: 20rpx;
	}

	.xpl_li {
		width: 100%;
		padding: 23rpx;
		box-sizing: border-box;

	}

	.xpl_li+.xpl_li {
		border-top: 1px solid #eee;
	}

	.xpl_name {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 15rpx;
	}

	.xpl_inr {
		font-size: 26rpx;
		color: #333;
	}

	.xpl_li_more,
	.xpl_li_more text {
		color: #FE8735;
		font-size: 26rpx;
	}

	.sr_view {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		bottom: 0;
		background: rgba(0, 0, 0, .5);
		z-index: 11;
	}

	.shuru_box {
		width: 100%;
		border: 28rpx solid #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		box-sizing: border-box;
		background: #eee;
		z-index: 100;
		position: absolute;
		bottom: 0;
		font-size: 28rpx;
	}

	.syzzc {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		bottom: 0;
		z-index: 99;
	}
</style>
