<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container">
		  <!-- <view class="hengxian"></view> -->
		  <view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <block  v-for="(item,idx) in datalist">
		      <view :class="type==idx?'typecur':'c9'" :data-type="idx" @tap='bindcur'>{{item}}</view>
		    </block>
		
		  </view>
		  <view  v-if="htmlReset==0" class="goodsBox w100">
				<view class="zanwu" v-if="datas.length==0">暂无内容</view>
		    
		    <view class="goodsBox contbox">
		      <view class="goods" v-for="(item,idx) in datas">
		        <!-- <view class="dianpu_tit">
		          <image class="dp_logo" :src="filter.imgIP(item.order.head_portrait)"></image>
		          <text>{{item.store_name}}</text>
		        </view> -->
		        <block v-for="(item1,idx1) in item.order_goods">
		          <view class="goods1"  @tap="jump_sh" :data-url="'/pagesA/OrderDetails_sh/OrderDetails_sh?id='+item1.id+'&type='+type" :data-id="item.order.o_id">
		            <!-- <view v-if="type==4}}" class="xuanze" data-selec="idx}}" data-selec1="idx1}}" catchtap="select">
		            <view class="xuanze1 {{goods_sele[idx][idx1].xuan==true? 'xuanze2':''}}">
		              <icon v-if="goods_sele[idx][idx1].xuan==true}}" type="success" size="14" color="#F7B43B" />
		            </view>
								</view> -->
		            <view class="goodsImg">
		              <image class="goodsImg" :src="filter.imgIP(item1.gd_vice_pic)" mode="aspectFill"></image>
		            </view>
		            <view class="goodsinr">
		              <!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
		              <view class="goodsname fz30 c30 oh1">{{item1.gd_name}}</view>
		
		              <view class="goodspri1">
		                <text class="fz24 c6 ">数量：{{item1.may_retreat_number}}</text>
										<text v-if="type==2">{{item1.s_status_value}}</text>
		              </view>
		            </view>
		
		          </view>
		
		          <view class="o_cz">
		            <view v-if="type==0"  @tap.stop="jump" :data-url="'/pagesA/OrderList_sh_tk/OrderList_sh_tk?item='+JSON.stringify(item1)">申请售后</view>
		            <view v-if="type==1&&item1.s_status==1" @tap.stop='del_order(item1.id)'>取消售后</view>
		            <view v-if="type==1&&item1.s_status==2" @tap="jump_sh" :data-url="'/pagesA/OrderDetails_sh/OrderDetails_sh?id='+item1.id+'&type='+type">商家已同意</view>
		          </view>
		        </block>
		
		      </view>
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
	export default {
		data() {
			return {
				btnkg:0,
				htmlReset:0,
				data_last:false,
				datalist:[
					'售后申请',
					'处理中',
				  '申请记录'
				],
				page:1,
				size:20,
				type:0,
				sum:0,
				otype:-2,
				
				
				
				datas: [],
				// goods_sele: [],
				xuan: false,
				all: false,
				show_num:0
			}
		},
		computed:{
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				// 'order_ls_data'
			]),
			
		},
		onLoad(option) {
			
			this.onRetry()
		},
		onShow(){
			// this.page=1
			// this.goods_sele=[]
			// this.all=false
			let pages = getCurrentPages();
			let currPage = pages[pages.length - 1];
			if (currPage.data.reset_type) {  
			      //将携带的参数赋值
			    this.type=1
			   this.onRetry()
				 currPage.data.reset_type=false
					
			  console.log(this.address, '地址')
				
			}
			if (currPage.data.sh_wl) {  
			      //将携带的参数赋值
			 that.onRetry()
				currPage.setData({
					sh_wl:false
				})
			}
			// this.getOrderList('onshow')
		},
		
		onReady(){
			
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
		methods: {
			onRetry(){
				this.datas=[]
				this.page=1
				this.btnkg=0
				this.data_last=false
				this.getdatalist()
			},
			getdatalist(){
				
				let that =this
				var jkurl='/afterSale'
				var data={
					token:that.loginMsg.userToken,
					type:that.type-1+2,
					page:that.page,
					size:that.size
				}
				if(that.data_last) return
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.get(jkurl, data,
					function(res) {
						that.btnkg=0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							that.htmlReset=0
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							if(that.page==1){
								that.datas=datas
							}else{
								if(datas.length==0){
								
									that.data_last=true
									
									return
								}
								that.datas=that.datas.concat(datas)
							}
							that.page++
						} else {
							that.htmlReset=1
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
						that.htmlReset=1
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			del_order(id){
				var that =this
				uni.showModal({
				    title: '提示',
				    content: '是否取消该售后订单',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										var jkurl='/afterSale/cancelAfter'
										var data={
											token:that.loginMsg.userToken,
											id:id
										}
										service.post(jkurl, data,
											function(res) {
												
												// if (res.data.code == 1) {
												if (res.data.code == 1) {
													var datas = res.data.data
													// console.log(typeof datas)
													that.htmlReset=0
													if (typeof datas == 'string') {
														datas = JSON.parse(datas)
													}
													uni.showToast({
														icon: 'none',
														title: '操作成功'
													})
													that.onRetry()
												} else {
													that.htmlReset=1
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
												that.htmlReset=1
												that.btnkg=0
												
													uni.showToast({
														icon: 'none',
														title: '操作失败'
													})
											
											}
										)
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			
			bindcur(e){
				var that =this
			  console.log(e.currentTarget.dataset.type)
				if(that.type== e.currentTarget.dataset.type) return
			  that.type= e.currentTarget.dataset.type
				// that.getOrderList()
				that.onRetry()
				
			},
			select(e) {
			  let that = this
			  // console.log(e.currentTarget.dataset.selec)
			  let sid = e.currentTarget.dataset.selec
			  let sid1 = e.currentTarget.dataset.selec1
			  // console.log(this.data.goods_sele[sid].xuan)
			  if (that.goods_sele[sid][sid1].xuan == false) {
			    that.goods_sele[sid][sid1].xuan = true
			    that.goods_sele= that.goods_sele
			  } else {
			    that.goods_sele[sid][sid1].xuan = false
			    that.goods_sele= that.goods_sele
			  }
			  let qx = true
			  for (let i in that.goods_sele) {
			    for (let j in that.goods_sele[i]){
			      if (that.goods_sele[i][j].xuan == false) {
			        qx = false
			        break
			      }
			    }
			  }
			  console.log(qx)
			  //触发全选
			  if (qx == true) {
			    that.all= true
			  } else {
			    that.all= false
			  }
			  // //计算总价
			  // that.countpri()
			},
			
			gopinlun(e){
				wx.navigateTo({
					url:'/pages/fabiaopl/fabiaopl?oid='+e.currentTarget.dataset.oid
				})
			},
			
			
			jump(e) {
			  service.jump(e)
			},
			jump_sh(e) {
				if(this.type==0){
					uni.navigateTo({
						url:'/pagesA/OrderDetails/OrderDetails?id='+e.currentTarget.dataset.id+'&type=0'
					})
					return
				}
			  service.jump(e)
			},
		}
	}
</script>

<style scoped>
page{
  background: #f5f5f5;
}
.container{
	min-height: 100vh;
	background: #f5f5f5;
	padding-top: 80rpx;
  padding-bottom: 100rpx;
}
.tab_box{
  position: fixed;
  top: 0;
  z-index: 90;
  font-size: 30rpx;
}
.goodsImg image{
	width: 100%;
	height:100%;
}
.zanwu{
	font-size: 24rpx;
	color: #999;
	line-height: 140rpx;
	text-align: center;
}

.typecur{
  padding-bottom: 12rpx;
  border-bottom: 6rpx solid #F9B234;
	color: #333;
}

.orderstatus{
	height: 100rpx;
	border-bottom: 1px solid #eee;
}


.goodsBox{
	width: 100%;
}
.goodsOne{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	background-color: #fff;
	margin-bottom: 17rpx;
}
.goodsdft{
	padding: 38rpx 0 18rpx;
	display: flex;
	border-bottom: 1px solid #eeeeee;
}
.goodsImg{
	/* width: 138rpx;
	height: 138rpx;
	border: 1px solid #d2d2d2; */
	width: 200rpx;
	height: 200rpx;
	margin-right: 40rpx;
}
.goodsInr{
	width: 500rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	
	font-size: 28rpx;
	color: #999;
}
.goods2{
	width: 100%;
	padding:20rpx 0 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.goods2tit{
	width: 100%;
	line-height: 45rpx;
	font-size: 26rpx;
	color: #333;
}
.xiaoji{
	text-align: right;
	font-size: 28rpx;
	color: #333;
	padding: 30rpx 0;
}
.ml10{
	margin-left: 10px;
}
.xjjine{
	font-size: 32rpx;
	color: #fe0042;
}

.guige{
	width: 750rpx;
	height: 70rpx;
	padding: 0 28rpx;
	box-sizing: border-box;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}
.guige_l{
	display: flex;
	align-items: center;
	font-size: 26rpx;
	color: #333;
}
.guige_l_name{
	color: #333;
	margin-right: 25rpx;
}
.guige_r{
	width: 44rpx;
	height: 44rpx;
}
.wxicon{
	width: 38rpx;
	height: 38rpx;
	margin-right: 22rpx;
}


.fixbottom{
	width: 100%;
	position:fixed;
	bottom: 0;
	left: 0;
	height: 100rpx;
	background-color: #fff;
	display: flex;
}
.fb_l{
	flex: 1;
	height: 100rpx;
	padding-left: 28rpx;
	font-size: 38rpx;
	color: #f75852;
	display: flex;
	align-items: center;
	font-weight: bold;
}
.subbtn{
	width: 212rpx;
	height: 100rpx;
	background-color: #f75852;
	color:#fff;
	font-size: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.subbtn1{
	background-color: #999;
}

.contbox{
	width: 100%;
	padding: 10rpx 0;
	box-sizing: border-box;
	background-color: #f5f5f5;
}
.goodsImg image{
	width: 100%;
	height:100%;
}



/*  */
.dianpu_tit{
	display: flex;
	align-items: center;
	padding: 28rpx 28rpx 0;
	box-sizing: border-box;
	font-size: 26rpx;
	color: #333;
}
.dp_logo{
	width:60rpx;
	height:60rpx;
	border-radius:50%;
	margin-right: 10rpx;
}
.dianpu_tit .iconfont{
	font-size: 26rpx;
	color: #999;
}
.goods{
	width: 100%;
	background-color: #fff;
  /* border-bottom: 20rpx solid #F5F5F5; */
	/* margin-bottom: 20rpx; */
}
.goods1{
	width: 100%;
	padding: 28rpx 28rpx 0;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	/* border-bottom: 1px solid #ddd; */
	position: relative;
}
.scbg{
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	width: 46rpx;
	height: 46rpx;
	line-height: 46rpx;
	border-radius: 50%;
	background-color: #999;
	color: #fff;
	font-size: 26rpx;
	/* display: flex;
	justify-content: space-between;
	align-items: center; */
	text-align: center;
}
.goodsImg{
	width: 140rpx;
	height: 140rpx;
	/* border: 1px solid #d2d2d2; */
	margin-right: 22rpx;
}
.xuanze{
	width: 30rpx;
	height: 30rpx;
	padding: 40rpx 30rpx 40rpx 0rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	flex:none;
}
.xuanze1{
	width: 34rpx;
	height: 34rpx;
	border-radius: 50%;
	border: 1px solid #ddd;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	flex:none;
}
.xuanze2{
	border: 0;
}
.goodsinr{
  height: 140rpx;
	flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
}
.goodsname{
	font-size: 30rpx;
	color: #333333;
	box-sizing: border-box;
	display:-webkit-box !important;  
	overflow:hidden;
	text-overflow:ellipsis;
	word-break:break-all;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
}
.goodspri{
	font-size: 26rpx;
	color: #999;
}
.scx{
	text-decoration:line-through;
}
.goodspri1{
	font-size: 32rpx;
	color: #fe0042;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.goods2{
	width: 100%;
	padding:20rpx 28rpx 28rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}
.goods2tit{
	width: 100%;
	line-height: 45rpx;
	font-size: 26rpx;
	color: #333;
}
.o_xj{
  width: 100%;
  height: 80rpx;
  padding: 0 28rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  border-top: 1px solid #eee;
}
text{
  color: #F75559;
  font-size: 28rpx;
}
.paytype{
  display: flex;
  align-items: center;
}
.paytype image{
  width:40rpx;
  height:34rpx;
  margin-right: 6rpx;
}
.bl1{
  width:6rpx;
  height:28rpx;
  background:rgba(247,85,89,1);
  border-radius:3rpx;
  margin-right: 6rpx;
}
.o_cz{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;  
  padding: 0 28rpx 20rpx;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.o_cz view{
  width:180rpx;
  height:64rpx;
  border:2rpx solid rgba(244,116,22,1);
  border-radius:32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F47416;
  font-size: 30rpx;
  margin-left: 20rpx;
}
.o_cz .qx{
  color: #BBBBBB;
  border: 2rpx solid #BBBBBB;
}


.vbottom{
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0;
	z-index: 99;
	background-color: #fff;
	display: flex;
	align-items: center;
}
.selecAll{
	padding-left: 28rpx;
	margin-right: 30rpx;
	display: flex;
	align-items: center;
	font-size: 24rpx;
	color: #f75852;
}
.all.xuanze1{
	margin-right: 8rpx;
}
.all.xuanze2{
	
	/* border: 1px solid #FE0042; */
	display: flex;
	justify-content: center;
	align-items: center;
}
.heji{
	/* flex: 1; */
	margin-right: 10rpx;
	font-size: 32rpx;
	color: #f75852;
	/* font-weight: bold; */
	text-align: right;
}
.jiesuan{
	/* width: 210rpx;
	height: 100rpx;
	background: #f75852; */
  width:174rpx;
  height:57rpx;
  background:rgba(244,116,22,1);
  border-radius:29px;
	color: #fff;
	font-size: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
  margin-right: 28rpx;
}
.jiesuan1{
  background: #B5B5B5;
}
</style>
