<template>
	<view>
		<view :class="sheetshow?'container-ban':'container'">

			<!-- 评价 -->
			<view class="pj_box">

				<view class="pj_bq">
					<view :class="pl_type==-1?'cur':''" data-idx="-1" @tap="qh_pl">全部</view>
					<view v-for="(item,idx) in comment_tag" :class="pl_type==item.name?'cur':''" :data-idx="item.name" @tap="qh_pl">{{item.name}}（{{item.number}}）</view>
				</view>
				<view v-if="star_list.length==0" class="zanwu">暂无数据</view>
				<view class="pj_li" v-for="(item,idx) in star_list">
					<view class="pj_d1">
						<view class="pj_ren">
							<view class="user_tx">
								<image class="user_tx" :src="filter.imgIP(item.head_portrait)"></image>
							</view>
							{{item.nickname}}
						</view>
						<view class="pj_time">{{item.create_time}}</view>
					</view>
					<view class="pj_d2">{{item.comment}}</view>
					<view v-if="item.comment_pic.length==1" class="quan_msg_img">
						<image class="one" :src="filter.imgIP(item.comment_pic[0])" mode="aspectFill" :data-src="filter.imgIP(item.comment_pic[0])"
						 @tap.stop="pveimg"></image>
					</view>
					<view v-if="item.comment_pic.length>1" class="quan_msg_img">
						<image v-for="(item1,idx1) in item.comment_pic" :src="filter.imgIP(item1)" mode="aspectFill" :data-src="filter.imgIP(item1)"
						 :data-array="filter.getgimgarrIP(item.comment_pic)" @tap.stop="pveimg"></image>

					</view>
					<view class="quan_li_cz">

						<view v-if="item.is_praise==2" class="cz_li" @tap="guanzhuFuc(6,item.id,'affirm')" data-id="idx">
							<text class="iconfont iconzan"></text>{{item.like_sum}}
						</view>
						<view v-if="item.is_praise==1" class="cz_li" @tap="guanzhuFuc(6,item.id,'cancel')" data-id="idx">
							<text class="iconfont icondianzan2" style="color: #ff0000;"></text>{{item.like_sum}}
						</view>
					</view>
				</view>
			</view>


			<uni-popup ref="popup_goods" type="bottom" @change="tkchange">
				<view class="tk_popup_box">
					<view class="closebtn" @tap="onClose">
						<image :src="filter.imgIP('/static_s/51daiyan/images/closebtn_03.jpg')"></image>
					</view>
					<scroll-view class=" dyr_scroll" style="height:800rpx;" scroll-y>
						<view class="popopBox1">
							<view class="goodsimg">
								<!-- <image :src="filter.imgIP(show_img[0])" :data-src="filter.imgIP(show_img[0])" mode="aspectFill" @tap="pveimg"></image> -->
								<image v-if="show_img.length>0" :src="filter.imgIP(show_img[0])" :data-src="filter.imgIP(show_img[0])" mode="aspectFill" @tap="pveimg"></image>
								<image v-else :src="filter.imgIP(goodsData.img[0])" :data-src="filter.imgIP(goodsData.img[0])" mode="aspectFill" @tap="pveimg"></image>
							</view>
							<view class="goodstkjg">
								<!-- <view class="closebtn" @tap="onClose">
									<image :src="filter.imgIP('/static_s/51daiyan/images/closebtn_03.jpg')"></image>
								</view> -->
								<view class="goods_pri_h">￥{{show_pri}}</view>
								<view class="kucun" v-if="guige_select.length>0">库存{{show_num}}件</view>
								<view class="tkname oh2">已选择：{{ggshow1}}</view>
							</view>
						</view>
						<block v-if="guige_arr.length>0" v-for="(item,idx) in guige_arr">
							<view class="tkguigetit">{{item.name}}</view>
							<view class="guigeBox">
								<!-- :class="{ 'cur': guige_select[idx]&&guige_select[idx].value==item1,'goods_null':!ggShow(item.name,item1,idx) }" -->
								<block v-for="(item1,idx1) in item.value">
									<text class="guigeOne" v-if="ggShow(item.name,item1,idx)" :class="{ 'cur': guige_select[idx]&&guige_select[idx].value==item1,'goods_null':!ggShow(item.name,item1,idx)}"
									 :data-ggidx="idx" :data-name="item.name" :data-value="item1" @tap="selegg">{{item1}}</text>
									<text class="guigeOne" v-else :class="{ 'cur': guige_select[idx]&&guige_select[idx].value==item1,'goods_null':!ggShow(item.name,item1,idx)}"
									 :data-ggidx="idx" :data-name="item.name" :data-value="item1">{{item1}}</text>
								</block>
							</view>
						</block>
						<view class="countnum">
							<text>购买数量</text>
							<!-- #ifdef MP-WEIXIN -->
							<van-stepper custom-class="steppera" input-class="vanipt" plus-class="vantjia" minus-class="vantjian" v-model="cnum"
							 min="0" :max="show_num" @input="onChange" @change="onChange" />
							 <!-- #endif -->
							 <!-- #ifndef MP-WEIXIN -->
							 <!-- <view class="vstepper steppera">
							 	<view @tap.stop="onNum" :data-idx="idx" data-ad="-" :data-id="item.g_id" class="vantjian c9">-</view>
							 	<input class="vanipt c6" disabled :value="item.number "></input>
							 	<view @tap.stop="onNum" :data-idx="idx" data-ad="+" :data-id="item.g_id" class="vantjia c9">+</view>
							 </view> -->
							 <!-- #endif -->
						</view>
						<view class="b_view_o"></view>
					</scroll-view>
					<view class="czbtnG">
						<view v-if="goodsData.activity_id==0&&goodsData.is_pond_goods==1" class="jrgwc" @tap="addwgc">加入购物车</view>
						<view class="buybtn" @tap="nowbuy">立即购买</view>
					</view>
				</view>
			</uni-popup>
			<!-- 底部 -->
			<view class="bottom_box">
				<view class="kf_btn"  @tap="toroom(goodsData.support_staff)">
					<text class="iconfont iconkefu"></text>
					<text>客服</text>
				</view>
				<view class="sg"></view>
				<view v-if="goodsData.is_collect==1" class="kf_btn" @tap="scFuc(g_id,'affirm')">
				  <text class="iconfont iconhongxinicon"></text>
				  <text>收藏</text>
				</view>
				<view  v-if="goodsData.is_collect==2" class="kf_btn" @tap="scFuc(g_id,'cancel')">
				  <text class="iconfont iconhongxinicon1" style="color: #f00;"></text>
				  <text style="color: #f00;">已收藏</text>
				</view>
				<!-- <view class="kf_btn">
					<text class="iconfont iconhongxinicon"></text>
					<text>收藏</text>
				</view> -->
				<view class="sg"></view>
				<view class="kf_btn" @tap="jump" :data-url="'/pages_goods/dp_index/dp_index?id='+goodsData.merchant.group_code">
				  <text class="iconfont iconstore"></text>
				  <text  data-url="/pages/dp_index/dp_index">店铺</text>
				</view>
				<view class="buy_btn" v-if="goodsData.activity_id==0&&goodsData.is_pond_goods==1" @tap="sheetshow_fuc">加入购物车</view>
				<view class="buy_btn buy_btn1" @tap="sheetshow_fuc">立即购买</view>
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
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				pl_type: -1,
				data_list: [],

				cur_swiper: 1,

				btn_kg: 0,
				btnkg:0,

				g_id: '',
				v_id: '', //sku_id
				dy_id:'',
				advocacyviceId:'',
				dyr_type:0,
				
				sheetshow: false, //规格弹框控制
				sheetshow1: false,

				goodsData: '',
				guige_arr: [],

				guige_arr_show: [],
				guige_select: [],

				show_pri: 0,
				show_img: 0,
				show_num: 0,


				type1: [-1], //规格index
				ggshow1_jjj: [],
				cnum: 0, //数量

				star_list: [],
				star_page: 1,
				size: 20,
				comment_tag: [],

				goods_sku_id: 0, //商品id
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			]),
			ggshow1() {
				var arr = this.guige_select
				if (!arr) {
					return
				}
				var newarr = []
				for (var i = 0; i < arr.length; i++) {
					if (arr[i]&&arr[i].value) {
						newarr.push(arr[i].value)
					}
				}
				console.log(newarr.join(','))
				return newarr.join(',')
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.g_id = options.id
			this.onRetry()
			if(options.dy_id){
				this.dy_id=options.dy_id
				this.advocacyviceId=options.advocacyviceId
			}
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
			this.getStarlist()
		},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {

		},
		methods: {
			onRetry() {
				this.getSku()
				this.star_page = 1
				this.getStarlist()
			},
			toroom(id){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '/pages/login/login',
					});
					return
				}
				this.$store.commit('createConversationActive', id)
				uni.navigateTo({
					url: '/pages/tim/room?id='+id+'&type=2'
				})
			},
			scFuc(id,key){
				var that =this
				var data={
					token:that.loginMsg.userToken,
					type:5,
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
							that.getSku()
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
					content: '是否取消收藏?',
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
									that.getSku()
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
			
			//获取评论的
			getStarlist() {
				let that = this
				// if(that.btn_kg==1){
				// 	return
				// }else{
				// 	that.btn_kg=1
				// }
				var jkurl = '/goods/goodsAppraise'
				var datas = {
					gid: that.g_id,
					tag: that.pl_type == -1 ? '' : that.pl_type,
					is_later: 1, ////1是全部的评论  2：是回头客说 不是第一次购买评论的
					token: that.loginMsg.userToken,
					page: that.star_page,
					size: that.size
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data.comment
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						if (datas.length == 0) {
							if (that.star_page > 1) {
								uni.showToast({
									icon: 'none',
									title: '暂无更多数据'
								})
							}

							that.btn_kg = 0
							return
						}
						if (that.star_page == 1) {
							that.star_list = datas
						} else {

							that.star_list = that.star_list.concat(datas)
						}
						that.btn_kg = 0
						that.star_page++
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

			getSku() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken,
					id: that.g_id
				}
				// 单个请求
				service.P_get('/goods/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						// that.catelist=res.data
						var guige_sku = JSON.stringify(res.data.attr.sku_all)
						var guige_skuarr = JSON.stringify(res.data.attr.specification)
						console.log(guige_sku)
						that.guige = JSON.parse(guige_sku)
						that.guige_arr_show = JSON.parse(guige_skuarr)
						that.guige_arr = res.data.attr.specification
						that.goodsData = res.data
						that.comment_tag = res.data.comment.tag

						that.show_img = res.data.img
						that.show_pri = res.data.current_price
						that.show_num = 0
					}
				}).catch(e => {
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})


			},

			guanzhuFuc(type, id, key) {
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
							url: '/pages/login/login'
						})
						return
					} else if (res.code == 0 && res.msg == '请先登录账号~') {
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return
					} else if (res.code == 1) {
						// that.onRetry()
						for (var i = 0; i < that.star_list.length; i++) {
							if (that.star_list[i].id == id) {

								// that.star_list[i].is_friend=2

								if (key == 'affirm') {
									that.$set(that.star_list[i], 'is_praise', 1)
									that.$set(that.star_list[i], 'like_sum', that.star_list[i].like_sum-1+2)
								} else {
									that.$set(that.star_list[i], 'is_praise', 2)
									that.$set(that.star_list[i], 'like_sum', that.star_list[i].like_sum-1)
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

			ggShow(name, value, idx) {
				var that = this
				var newselect = {
					name: name,
					value: value,
				}

				var show_arr = []
				for (var i = 0; i < that.guige.length; i++) {
					var str = JSON.stringify(that.guige[i].sku)
					var push_type = true
					for (var s = 0; s < that.guige_arr.length; s++) {
						var a = false
						if (that.guige_select[s]) {
							a = JSON.stringify(that.guige_select[s])
						}
						if (s == idx) {
							a = JSON.stringify(newselect)
						}

						console.log(a == 'false')
						if (!a || a == 'false') {
							push_type = true
							// console.log('跳过'+a)
						} else if (str.indexOf(a) == -1) {
							// console.log(that.guige[i].sku)
							// console.log('-1'+a)
							push_type = false
							break
						}

					}
					// console.log(a,push_type)
					if (push_type) {
						show_arr.push(that.guige[i])
					}

				}
				// console.log(show_arr)
				// console.log(value,show_arr)
				if (show_arr.length > 0) {
					return true
				}
				return false

			},

			//选择规格
			selegg(e) {
				var that = this
				// console.log(e.currentTarget.dataset.name)
				console.log(e.currentTarget.dataset.value)
				// console.log(e.currentTarget.dataset.ggidx)

				var newselect = {
					name: e.currentTarget.dataset.name,
					value: e.currentTarget.dataset.value,
				}

				var str = JSON.stringify(that.guige_select)
				var a = JSON.stringify(newselect)


				if (str.indexOf(a) == -1) {
					that.$set(that.guige_select, e.currentTarget.dataset.ggidx, newselect)

				} else {
					// console.log(str.indexOf(a)==-1)
					that.$set(that.guige_select, e.currentTarget.dataset.ggidx, false)
					// console.log(that.guige_select)
				}
				// console.log(str.indexOf(a)==-1)
				// console.log(a,str)
				var show_arr = []
				for (var i = 0; i < that.guige.length; i++) {
					var str = JSON.stringify(that.guige[i].sku)
					var push_type = true
					for (var s = 0; s < that.guige_select.length; s++) {

						if (!that.guige_select[s]) {
							push_type = true
						} else {
							var a = JSON.stringify(that.guige_select[s])
							if (a.length > 0 && str.indexOf(a) == -1) {
								// console.log(that.guige[i].sku)
								push_type = false
								break

							}
						}

					}
					if (push_type) {
						show_arr.push(that.guige[i])
					}

				}
				var idx = e.currentTarget.dataset.ggidx
				var kucun_num = 0
				var pri = 0
				var sku_img = ''
				console.log(show_arr)

				for (var i = 0; i < show_arr.length; i++) {
					kucun_num += show_arr[i].number
					if (pri == 0) {
						that.v_id = show_arr[i].v_id
						pri = show_arr[i].current_price
					}
					if (sku_img == "") {
						sku_img = show_arr[i].v_img
					}
				}

				that.show_pri = pri
				that.show_num = kucun_num
				if (kucun_num < that.cnum) {
					that.cnum = kucun_num
				}
				if (kucun_num > 0 && that.cnum == 0) {
					that.cnum = 1
				}
				that.show_img = sku_img
				if (that.show_img.length == 0) {
					that.show_img = that.goodsData.img
				}
				if (that.show_pri == 0) {
					that.show_pri = that.goodsData.current_price
				}

			},

			//数量
			onChange(e) {
				var that = this
				let idx = e.currentTarget.dataset.selec
				// console.log(e.detail)
				if(that.goodsData.is_pond_goods==2){
					this.cnum= 1
					return
				}
				if (that.guige_select.length == 0) {
					uni.showToast({
						icon: 'none',
						title: '请先选择规格'
					})
					this.cnum = 0
					return
				}
				if (this.cnum > this.show_num) {
					this.cnum = this.show_num
					return
				}
				// this.data.goods_sele[idx].num=e.detail
				this.cnum = e.detail

			},

			jump(e) {
				if (this.btn_kg == 1) {
					return
				} else {
					this.btn_kg = 1
					setTimeout(function() {
						this.btn_kg = 0
					}, 1000)
				}
				console.log(e.currentTarget.dataset.type)
				service.jump(e)
			},
			sheetshow_fuc() {
				if(this.goodsData.activity_id!==0&&this.goodsData.is_apply==1){
					this.bm_fuc()
				}
				this.sheetshow = true
				this.btnkg = 0
				this.$refs.popup_goods.open()

			},
			sheetshow1_fuc() {
				this.sheetshow1 = true
				this.$refs.popup.open()
				this.btnkg = 0

			},
			gb_yhtk() {
				this.$refs.popup_yh.close()
			},
			tkchange0(e) {
				console.log(e)
				this.sheetshow = e.show
			},
			tkchange(e) {
				console.log(e)
				this.sheetshow = e.show
			},
			tkchange1(e) {
				console.log(e)
				this.sheetshow1 = e.show
			},
			qh_pl(e) {
				console.log(e.currentTarget.dataset.idx)
				this.setData({
					pl_type: e.currentTarget.dataset.idx
				})
			},
			swiper_change(e) {
				console.log(e.detail)
				var num = e.detail.current + 1
				this.setData({
					cur_swiper: num
				})
			},
			txtype_fuc(e) {
				console.log(e.currentTarget.dataset.type)
				this.setData({
					dyr_type: e.currentTarget.dataset.type
				})
			},
			xz_dyr() {
				console.log(this.data.dyr_type)
				this.setData({
					sheetshow1: false
				})
			},

			onClose() {
				this.sheetshow = false
				this.sheetshow1 = false
				this.$refs.popup_goods.close()
			},
			//加入购物车
			addwgc() {
				// if (!wx.getStorageSync('userWxmsg')) {
				//   wx.navigateTo({
				//     url: '/pages/login/login',
				//   })
				//   return
				// }
				let that = this
				if (!that.v_id || that.guige_select.length != that.guige_arr.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择规格'
					})
					return
				}
				for (var i; i < that.guige_arr.length; i++) {
					if (that.guige_select[i] == 'false') {
						uni.showToast({
							icon: 'none',
							title: '请选择' + that.guige_arr[i].name
						})
						return
					}
				}
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					})
					return
				}
				console.log(that.cnum)

				console.log('addwgc')
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				var jkurl = '/cart/add'
				var datas = {
					token: that.loginMsg.userToken,
					g_id: that.g_id,
					v_id: that.v_id,
					advocacyId:that.dy_id,
					advocacyviceId:that.advocacyviceId,
					sum: that.cnum,
					advocacy_user_id: that.dyr_type
				}
				// 单个请求
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)

						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}

						that.onClose()
						wx.showToast({
							title: '添加成功'
						})
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
			nowbuy() {
				let that = this
				if (!that.v_id || that.guige_select.length != that.guige_arr.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择规格'
					})
					return
				}
				for (var i; i < that.guige_arr.length; i++) {
					if (that.guige_select[i] == 'false') {
						uni.showToast({
							icon: 'none',
							title: '请选择' + that.guige_arr[i].name
						})
						return
					}
				}
				if (that.cnum == 0) {
					uni.showToast({
						icon: 'none',
						title: '请添加购买数量'
					})
					return
				}
				console.log(that.cnum)

				console.log('addwgc')
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				that.onClose()
				uni.navigateTo({
					url: '/pages/Order/Order?type=1&v_id=' + that.v_id + '&number=' + that.cnum + '&advocacy_user_id=' + that.dyr_type +
						'&v_id=' + that.v_id+'&dy_id='+that.dy_id+'&advocacyviceId='+that.advocacyviceId
				})
			},
			bm_fuc() {
				// var id = e.currentTarget.dataset.id
				// var newdata = this.pinpai
				// newdata[idx].bm = 2
				// this.pinpai= newdata
				var that=this
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				var datas = {
					token: that.loginMsg.userToken,
					id:that.goodsData.activity_id
				}
				// 单个请求
				service.P_post('/activity/join', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.btnkg=0
						
						that.$set(that.goodsData, 'is_apply', 2)
						uni.showToast({
							title:'报名成功'
						})
					}else{
						that.btnkg=0
						// that.getdata()
						uni.showToast({
							icon:'none',
							title:res.msg
						})
					}
				}).catch(e => {
						that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			},
			call(e) {
				service.call(e)
			},

			pveimg(e) {
				// var curr = e.currentTarget.dataset.src
				// var urls = e.currentTarget.dataset.array
				service.pveimg(e)
			},
		}
	}
</script>

<style scoped>
	.container {
		min-height: 100vh;
		padding-bottom: 100rpx;
		background: #f5f5f5;
	}

	image {
		/* width: 100%;
	height: 100%; */
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
		/* padding-top: 20rpx; */
		/* padding: 0 28rpx; */
		border-bottom: 1px solid #eee;
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
		padding: 20rpx 10rpx 20rpx;
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
		color: #F75559;
		border: 1px solid rgba(247, 85, 89, 1);
		border-radius: 14rpx;
		padding: 0 23rpx;
		box-sizing: border-box;
		font-size: 24rpx;
		margin: 10rpx 18rpx;
	}

	.pj_bq view.cur {
		background: rgba(250, 233, 234, 1);
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
	}

	.user_tx {
		width: 42rpx;
		height: 42rpx;
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
		padding-right: 28rpx;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		border-top: 1px solid #eee;
	}

	.buy_btn {
		width: 192rpx;
		flex: 1;
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
		font-size: 22rpx;
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
	.b_view_o {
		width: 100%;
		height: 120rpx;
		background: #fff;
	}

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

	.tk_popup_box {
		width: 100%;
		background: #fff;
		padding: 20rpx 28rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: auto;
		position: relative;
		z-index: 999;
	}
	.dyr_scroll{
		width: 694rpx;
		margin: 0 auto;
		position: relative;
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
		top: 20rpx;
		right: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999999;
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

	.guigeOne.goods_null {
		background: #eee !important;
		border: 1px solid #ddd !important;
		color: #ddd !important;
		text-decoration: line-through;
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
		position: 0 28rpx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

	}

	.czbtnG .jrgwc,
	.czbtnG .buybtn {
		width: 338rpx;
		flex: 1;
		margin: 0 10rpx;
		height: 80rpx;
		background: rgba(247, 180, 59, 1);
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 30rpx;
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
		margin: 20rpx 0 0;
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

	.quan_li_cz {
		width: 100%;
		/* margin-top: 15rpx; */
		height: 60rpx;
		padding-bottom: 4rpx;
		display: flex;
		/* flex-direction: row-reverse; */
		justify-content: flex-end;
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

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.container-ban {
		height: 100vh;
		overflow: hidden;
	}
</style>
