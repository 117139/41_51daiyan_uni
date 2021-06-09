<template>
	<view class="minh100">
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==-1"  class="loading_def">
				<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view v-if="htmlReset==0">
			<view class="fp_box">
				<picker v-if="array" @change="bindPickerChange"  data-type="1" :value="fw_index" :range="array" range-key="name">
					<view class="box_int ju_b">
						<view class="box_int_name">发票</view>
						<view>{{array[fw_index]?array[fw_index].name:'请选择发票类型'}}</view>
						<text class="iconfont icon-next-m"></text>
					</view>
				</picker>
				<picker v-if="array" @change="bindPickerChange"  data-type="2" :value="tt_index" :range="array_tt" range-key="name">
					<view class="box_int ju_b">
						<view class="box_int_name">抬头类型</view>
						<view>{{array_tt[tt_index]?array_tt[tt_index].name:'请选择抬头类型'}}</view>
						<text class="iconfont icon-next-m"></text>
					</view>
				</picker>
				<view class="box_int ju_b">
					<view class="box_int_name">发票抬头</view>
					<input class="flex_1" type="text" v-model="fp_name" placeholder="请输入发票抬头">
				</view>
				<block v-if="tt_index==1">
					<view class="box_int ju_b">
						<view class="box_int_name">税号</view>
						<input class="flex_1" type="text" v-model="fp_sh" placeholder="请输入税号">
					</view>
					<view class="box_int ju_b">
						<view class="box_int_name">企业地址</view>
						<input class="flex_1" type="text" v-model="fp_qydz" placeholder="请输入企业地址">
					</view>
					<view class="box_int ju_b">
						<view class="box_int_name">企业电话</view>
						<input class="flex_1" type="text" v-model="fp_qydh" placeholder="请输入企业电话">
					</view>
					<view class="box_int ju_b">
						<view class="box_int_name">开户银行</view>
						<input class="flex_1" type="text" v-model="fp_khh" placeholder="请输入开户银行">
					</view>
					<view class="box_int ju_b">
						<view class="box_int_name">银行账号</view>
						<input class="flex_1" type="text" v-model="fp_yhzh" placeholder="请输入银行账号">
					</view>
				</block>
				<view class="sub_btn" @tap="sub(1)">提交</view>
				<view class="sub_btn" @tap="sub(0)" style="background: #888;">不开发票</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				htmlReset:-1,
				data_last:false,
				options:{},
				array:[],
				fw_index:0,
				array_tt:[
					{
						name:'个人或事业单位',
						id:1,
					},
					{
						name:'企业',
						id:2
					},
				],
				tt_index:0,
				fp_name:'',
				fp_sh:'',
				
				fp_qydz:'',
				fp_qydh:'',
				
				fp_khh:'',
				fp_yhzh:'',
				
				
				o_id:''
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName','loginMsg' ,'loginDatas']),
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
		
				return style
			},
		
			style1() {
				var StatusBar = this.StatusBar;
				var style = `top:${StatusBar}px;`;
		
				return style
			},
		},
		onPageScroll(e) {
			console.log(e)
			this.PageScroll = e.scrollTop
			// if(e.scrollTop>10){
			// 	uni.showToast({
			// 		title:e.scrollTop
			// 	})
			// }
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		onLoad(option) {
			that=this
			that.options=option
			console.log(option.orderRemark)
			
		
			if(option.putong==1){
				var newsi={
					name:'普通发票',
					id:1
				}
				that.array.push(newsi)
			}
			if(option.zengzhi==1){
				var newsi1={
					name:'增值税专用发票',
					id:2
				}
				that.array.push(newsi1)
			}
			if(option.orderRemark){
				var orderRemark=JSON.parse(option.orderRemark)
				console.log(orderRemark)
				
				if(orderRemark.invoice){
					var invoices=orderRemark.invoice
					
					if(invoices.oi_type==1){
						this.fw_index=0
					}else{
						if(option.putong==1){
								this.fw_index=1
						}else{
								this.fw_index=0
						}
					}
					this.tt_index=invoices.oi_rise_type==1?0:1
					this.fp_name=invoices.oi_rise_name
					this.fp_sh=invoices.oi_unit_hutchet
					
					this.fp_qydz=invoices.oi_reg_address
					this.fp_qydh=invoices.oi_reg_phone
					
					this.fp_khh=invoices.oi_open_bank
					this.fp_yhzh=invoices.oi_bank_account
					
				}
			}
			
			if(option.o_id){
				this.o_id=option.o_id
			}
			that.onRetry()
		},
		methods: {
			...mapMutations(['login','logindata','logout','setplatform']),
			sub(num){
				var pages = getCurrentPages();   //当前页面
				var prevPage = pages[pages.length - 2];   //上一页面
				if(num==0){
					if(!this.o_id){
						// #ifdef MP-WEIXIN
						prevPage.setData({
							//直接给上一个页面赋值
							invoice_idx:that.options.idx,
							invoice: -1
						});
						// #endif
						// #ifdef H5
						
							var invoice={
								//直接给上一个页面赋值
								invoice_idx:that.options.idx,
								invoice: -1
							}
							uni.setStorageSync('invoice',invoice)
						// #endif
					}
					wx.navigateBack({
					  //返回
					  delta: 1
					})
					return 
				}
				if(!this.fp_name){
					uni.showToast({
						icon: 'none',
						title: '请输入发票抬头'
					})
					return
				}
				var datas={
					oi_make_type:1,   //1：电子 2：纸质
					oi_type:this.array[that.fw_index].id,   //1：普通发票 2：增值税专用发票
					oi_rise_type:this.array_tt[this.tt_index].id,   //抬头类型 1：个人 2：企业
					oi_rise_name:this.fp_name,   //发票抬头
					oi_unit_hutchet:'',   //单位税号
					oi_reg_address:'',   //注册地址
					oi_reg_phone:'',   //注册电话
					oi_open_bank:'',   //开户银行
					oi_bank_account:'',   //银行账号
					// oi_unit_hutchet:this.fp_sh,   //单位税号
					// oi_reg_address:this.fp_qydz,   //注册地址
					// oi_reg_phone:this.fp_qydh,   //注册电话
					// oi_open_bank:this.fp_khh,   //开户银行
					// oi_bank_account:this.fp_yhzh,   //银行账号
				}
				if(this.o_id){
					datas={
						token: that.loginMsg.userToken,
						o_id:this.o_id,
						oi_make_type:1,   //1：电子 2：纸质
						oi_type:this.array[that.fw_index].id,   //1：普通发票 2：增值税专用发票
						oi_rise_type:this.array_tt[this.tt_index].id,   //抬头类型 1：个人 2：企业
						oi_rise_name:this.fp_name,   //发票抬头
						oi_unit_hutchet:'',   //单位税号
						oi_reg_address:'',   //注册地址
						oi_reg_phone:'',   //注册电话
						oi_open_bank:'',   //开户银行
						oi_bank_account:'',   //银行账号
						// oi_unit_hutchet:this.fp_sh,   //单位税号
						// oi_reg_address:this.fp_qydz,   //注册地址
						// oi_reg_phone:this.fp_qydh,   //注册电话
						// oi_open_bank:this.fp_khh,   //开户银行
						// oi_bank_account:this.fp_yhzh,   //银行账号
					}
				}
				if(this.array_tt[this.tt_index].id==2){
					if(!this.fp_sh){
						uni.showToast({
							icon: 'none',
							title: '请输入单位税号'
						})
						return
					}
					if(!this.fp_qydz){
						uni.showToast({
							icon: 'none',
							title: '请输入注册地址'
						})
						return
					}
					if(!this.fp_qydh){
						uni.showToast({
							icon: 'none',
							title: '请输入注册电话'
						})
						return
					}
					if(!this.fp_khh){
						uni.showToast({
							icon: 'none',
							title: '请输入开户银行'
						})
						return
					}
					if(!this.fp_yhzh){
						uni.showToast({
							icon: 'none',
							title: '请输入银行账号'
						})
						return
					}
					datas={
						oi_make_type:1,   //1：电子 2：纸质
						oi_type:this.array[that.fw_index].id,   //1：普通发票 2：增值税专用发票
						oi_rise_type:this.array_tt[this.tt_index].id,   //抬头类型 1：个人 2：企业
						oi_rise_name:this.fp_name,   //发票抬头
						oi_unit_hutchet:this.fp_sh,   //单位税号
						oi_reg_address:this.fp_qydz,   //注册地址
						oi_reg_phone:this.fp_qydh,   //注册电话
						oi_open_bank:this.fp_khh,   //开户银行
						oi_bank_account:this.fp_yhzh,   //银行账号
					}
					if(this.o_id){
						datas={
							token: that.loginMsg.userToken,
							o_id:this.o_id,
							oi_make_type:1,   //1：电子 2：纸质
							oi_type:this.array[that.fw_index].id,   //1：普通发票 2：增值税专用发票
							oi_rise_type:this.array_tt[this.tt_index].id,   //抬头类型 1：个人 2：企业
							oi_rise_name:this.fp_name,   //发票抬头
							oi_unit_hutchet:this.fp_sh,   //单位税号
							oi_reg_address:this.fp_qydz,   //注册地址
							oi_reg_phone:this.fp_qydh,   //注册电话
							oi_open_bank:this.fp_khh,   //开户银行
							oi_bank_account:this.fp_yhzh,   //银行账号
						}
					}
				}
				
				console.log(datas)
				if(!this.o_id){//下单前
					// #ifdef MP-WEIXIN
					prevPage.setData({
					  //直接给上一个页面赋值
						invoice_idx:that.options.idx,
					  invoice: datas
					});
					// #endif
					// #ifdef H5
					var invoice={
					  //直接给上一个页面赋值
						invoice_idx:that.options.idx,
					  invoice: datas
					}
					uni.setStorageSync('invoice',invoice)
					// #endif
					wx.navigateBack({
					  //返回
					  delta: 1
					})
				}else{
					//下单后
					service.P_post('/order/applyOrderInvoice', datas).then(res => {
						console.log(res)
						if (res.code == 1) {
							uni.showToast({
								icon: 'none',
								title: '提交成功'
							})
							setTimeout(function(){
								wx.navigateBack({
								  //返回
								  delta: 1
								})
							},1000)
						}else{
							if(res.msg){
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
							}else{
								uni.showToast({
									icon: 'none',
									title: '提交失败'
								})
							}
						}
					}).catch(e => {
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '提交失败'
						})
					})
				}
				
			},
			bindPickerChange(e){
				// console.log(e.currentTarget.dataset.type)
				var datas=e.currentTarget.dataset
				if(datas.type==1){
					that.fw_index=e.detail.value
					console.log(that.fw_index)
					// Vue.set(that.datas,'shop_category_id',that.array[that.fw_index].id)
				}
				if(datas.type==2){
					that.tt_index=e.detail.value
					console.log(that.tt_index)
					// Vue.set(that.datas,'shop_category_id',that.array[that.tt_index].id)
				}
			},
			onRetry(){
				that.htmlReset=0
				// that.getdata()
			},
			getbanner() {
			
				///api/info/list
				var that = this
				var data = {}
			
				//selectSaraylDetailByUserCard
				var jkurl = '/entrance'
				uni.showLoading({
					title: '正在获取数据'
				})
				service.P_get(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
			
						that.banner = datas
						console.log(datas)
			
			
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
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
			jump(e) {
				var that = this
			
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
			
				service.jump(e)
			},
			getimg(img) {
				return service.getimg(img)
			},
		}
	}
</script>

<style scoped>
	view,text{
		box-sizing: border-box;
	}
	.minh100{
		width: 100%;
		padding: 30upx;
		background: #f7f7f7;
	}
	.fp_box{
		width: 100%;
		padding: 0 30upx 30upx;
		background: #FFFFFF;
		border-radius: 8upx;
	}
	.box_int{
		width: 100%;
		height: 96upx;
		background: #FFFFFF;
		/* border: 1px solid #DEDEDE; */
		border-radius: 4upx;
		font-size: 30upx;
		color: #444;
		padding: 0 0upx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #dedede;
	}
	.box_int_name{
		width: 6em;
	}
	.box_int text{
		font-size: 24upx;
	}
	.box_int input{
		height: 100%;
		font-size: 30upx;
		color: #444;
	}
	.sub_btn{
		margin-top: 40upx;
		width: 100%;
		height: 88upx;
		background: #FE8018;
		border-radius: 44upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		color: #fff;
	}
</style>
