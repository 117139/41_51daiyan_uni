<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container" v-if="htmlReset==0">
		  <!-- <view class="hengxian"></view> -->
		  <view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <block v-for="(item,idx) in datalist">
		      <view :class="type==idx?'typecur':'c9'" :data-type="idx" @tap='bindcur'>{{item}}</view>
		    </block>
		
		  </view>
		
		  <view class="goodsBox w100" v-if="type==idx0" v-for="(item0,idx0) in datalist">
		    <view class="zanwu" v-if="goods[idx0].length==0">暂无内容</view>
		    <view class="goodsBox contbox">
		      <view class="goods" v-for="(item,idx) in goods" :data-tab="idx">
		        <view class="dianpu_tit" @tap="jump" :data-url="'/pages/dp_index/dp_index?shop_id=1&type='+type">
		          <image class="dp_logo" src="../../static/images/tx.png"></image>
		          <text>石说的达开旗舰店</text>
		        </view>
		        <block v-for="(item1,idx1) in item">
		          <view class="goods1" @tap="jump" :data-url="'/pages/OrderDetails/OrderDetails?shop_id=1&type='+type">
		            <view v-if="type==4" class="xuanze" :data-selec="idx" :data-selec1="idx1" @tap.stop="select">
		              <view class="xuanze1" :class="goods_sele[idx][idx1].xuan==true? 'xuanze2':''">
		                <icon v-if="goods_sele[idx][idx1].xuan==true" type="success" size="14" color="#F7B43B" />
		              </view>
		            </view>
		            <view class="goodsImg">
		              <image class="goodsImg" src="../../static/images/goods.png" mode="aspectFill"></image>
		            </view>
		            <view class="goodsinr">
		              <!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
		              <view class="goodsname fz30 c30">{{'黄金曼特宁精品咖啡/袋泡咖啡/耳挂 咖啡6*10袋装'}}</view>
		              <view class="goodspri">{{'已选择：苏门答腊黄金曼特宁深度烘培'}}</view>
		              <view class="goodspri1">
		                <!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
		                <text class="fz36 cf6377a fwb">￥{{'48'}}</text>
		                <text class="fz36 c9">x1</text>
		
		
		              </view>
		            </view>
		          </view>
		          <view v-if="type==4" class="o_cz">
		            <view  @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view>
		          </view>
		        </block>
		
		        <view class="o_xj">
		          <view></view>
		          <view>共3件，小记
		            <text>¥144</text>
		          </view>
		
		        </view>
		        <view class="o_cz">
		          <view v-if="type==3" @tap.stop="jump" data-url="/pages/goods_pj/goods_pj">评价</view>
		          <!-- <view v-if="type==0||type==4}}" @tap.stop="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view> -->
		          <view v-if="type==0||type==2">确认收货</view>
		          <view v-if="type==0||type==1">付款</view>
		          <view v-if="type==0||type==1" class="qx">取消订单</view>
		        </view>
		      </view>
		    </view>
		  </view>
		  <view class="vbottom" v-if="type==4">
		    <view class="selecAll" @tap="selecAll">
		      <view class="xuanze1 all " :class="all==true? 'xuanze2':''">
		        <icon v-if="all==true" type="success" size="14" color="#F7B43B" />
		      </view>
		      全选
		    </view>
		    <view class="heji flex_1">
		      <!-- <view><text class="fz26">合计:</text>￥{{sum}}</view>
					<view class="fz22 c9">不含运费</view> -->
		    </view>
		    <view class="jiesuan" @tap.stop="jump_fabu">合并代言</view>
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
				datalist:[
					'全部',
					'待付款',
					'待收货',
				  '待评价',
					'待代言'
				],
				pages:[1,1,1,1,1],
				type:0,
				goods:[
				  [{ "num": 1, xuan: false, id: 1 },
				    { "num": 1, xuan: false, id: 2 },],
				  [{ "num": 1, xuan: false, id: 3 },
				  { "num": 1, xuan: false, id: 4 },]
				],
				shopNum:[],
				sum:0,
				otype:-2,
				
				
				
				goods_sele: [
				  [{ "num": 1, xuan:false,id:1},
				    { "num": 1, xuan: false, id: 2 },],
				  [{ "num": 1, xuan: false, id: 3 },
				    { "num": 1, xuan: false, id: 4 },]
				],
				// goods_sele: [],
				xuan: false,
				all: false,
			}
		},
		onLoad(option) {
			if(option.type){
				this.type=option.type
			}
		},
		onShow(){
			var pages=1
			var goods=[ 
		    [{ "num": 1, xuan: false, id: 1 },
		      { "num": 1, xuan: false, id: 2 },],
		    [{ "num": 1, xuan: false, id: 3 },
		    { "num": 1, xuan: false, id: 4 },]
		   ]
			this.goods=goods
			this.pages=pages
		  if (this.btnkg==1){
				that.btnkg=0
			}
			console.log('我显示了')
			// this.getOrderList('onshow')
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
		},
		methods: {
			cload(){
				var pages=1
				var goods=[1,1,]
				this.goods=goods
				this.pages=pages
				console.log('我显示了')
				// this.getOrderList('onshow')
			},
			jump_fabu(){
			  let that = this
			  let xuanG = that.goods_sele
			  let idG = ''
			  var xzarr = []
			  for (let i=0;i<xuanG.length;i++) {
			    for (let j = 0; j < xuanG[i].length; j++){
			      if (xuanG[i][j].xuan) {
			        if (idG == '') {
			          idG = xuanG[i][j].id
			
			        } else {
			          idG += ',' + xuanG[i][j].id
			        }
			        xzarr.push(that.goods[i])
			      }
			    }
			
			    // console.log(idG)
			  }
			  xzarr = JSON.stringify(xzarr)
			  console.log(xzarr)
			  console.log(idG)
			  if (idG !== '') {
			    wx.navigateTo({
			      url: '/pages/daiyan_fabu/daiyan_fabu',
			    })
			    // app.openOrder(idG, xzarr, 1)
			  }
			  
			},
			bindcur(e){
				var that =this
			  console.log(e.currentTarget.dataset.type)
			  that.type= e.currentTarget.dataset.type
				// that.getOrderList()
				
			},
			select(e) {
			  let that = this
			  console.log(e.currentTarget.dataset.selec)
			  console.log(e.currentTarget.dataset.selec1)
			  let sid = e.currentTarget.dataset.selec
			  let sid1 = e.currentTarget.dataset.selec1
			  // console.log(this.data.goods_sele[sid].xuan)
			  if (that.goods_sele[sid][sid1].xuan == false) {
			    that.goods_sele[sid][sid1].xuan = true
			    that.goods_sele=that.goods_sele
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
			selecAll() {
			  let kg
			  if (this.all == false) {
			    kg = true
			  } else {
			    kg = false
			  }
			  this.all= kg
			  // this.goods_sele[sid].xuan=true
			  for (let i in this.goods_sele) {
			    
			    for (let j in this.goods_sele[i]) {
			      this.goods_sele[i][j].xuan = kg
			    }
			  }
			  this.goods_sele= this.goods_sele
			  //计算总价
			  // this.countpri()
			},
			gopinlun(e){
				wx.navigateTo({
					url:'/pages/fabiaopl/fabiaopl?oid='+e.currentTarget.dataset.oid
				})
			},
			//删除
			cancelOrder(e){
				let that =this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let oid=e.currentTarget.dataset.oid
				wx.showModal({
					title: '提示',
					content: '是否取消该订单?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							wx.request({
								url:  app.IPurl+'/api/order',
								data:{
									status:-1,
									order_id:oid,
									token:wx.getStorageSync('token')
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded' 
								},
								dataType:'json',
								method:'PUT',
								success(res) {
									if(res.data.error==-2){
										app.checktoken(res.data.error)
										that.onLoad()
									}
									if(res.data.code==1){
										wx.showToast({
											title: '删除成功',
											duration: 1000
										});
										setTimeout(function(){
											var pages=[1,1,1,1,1]
											var goods=[ [],[],[],[],[], ]
											that.setData({
												pages:pages,
												goods:goods
											})
											that.getOrderList()
										},1000)
										// that.getOrderList(that.data.type)
									}else{
										wx.showToast({
											title: '操作失败',
											duration: 1000
										});
									}
									
								
								},
								fail() {
									 wx.showToast({
									 	title: '操作失败',
									 	duration: 1000
									 });
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			},
			/*计算价格*/
			countpri(){
				let heji=0
				let var2= this.goods
				for (let i in var2) {
						heji +=var2[i].num*(var2[i].pri*100)
						let zj=var2[i].num*(var2[i].pri*100)
						if(zj==0){
							this.setData({
								sum:'0.00'
							})
							return
						}else{
							zj=zj+"'"
						}
						if(zj.length<4){
							zj='0000'+zj
							zj=zj.substr(-4);
							// console.log(zj)
						}
						
						let zj1 = zj.substring(0, zj.length-3);
						let zj2 = zj.substring( zj.length-3, zj.length-1);
						// console.log(zj1+'.'+zj2)
						zj=zj1+'.'+zj2
						this.goods[i].zj=zj
						this.goods=this.goods
				}
				// console.log(heji)
				if(heji==0){
					this.sum='0.00'
					return
				}else{
					heji=heji+"'"
				}
				if(heji.length<4){
					heji='0000'+heji
					heji=heji.substr(-4);
					// console.log(heji)
				}
				
				let hj1 = heji.substring(0, heji.length-3);
				let hj2 = heji.substring( heji.length-3, heji.length-1);
				// console.log(hj1+'.'+hj2)
				heji=hj1+'.'+hj2
				this.sum=heji
			},
			
			shouhuoBtn(e){
				let that =this
				// console.log('picker发送选择改变，携带值为', e.detail.value)
				let oid=e.currentTarget.dataset.oid
				wx.showModal({
					title: '提示',
					content: '是否确认收货?',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							if(that.data.btnkg==1){
								return
							}else{
								that.btnkg=1
							}
							wx.request({
								url:  app.IPurl+'/api/order',
								data:{
									status:1,
									order_id:oid,
									token:wx.getStorageSync('token')
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded' 
								},
								dataType:'json',
								method:'PUT',
								success(res) {
									
									if(res.data.code==1){
										wx.showToast({
											title: '收货成功',
											duration: 1000
										});
										setTimeout(function(){
											var pages=[1,1,1,1,1]
											var goods=[ [],[],[],[],[], ]
											that.pages=pages
											that.goods=goods
											that.btnkg=0
											that.getOrderList()
										},1000)
									}else{
										that.btnkg=0
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
								fail() {
									that.btnkg=0
									 wx.showToast({
									 	title: '操作失败',
									 	duration: 1000
									 });
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
				
			},
			
			//获取列表
			getOrderList(ttype){
				// const pageState1 = pageState.default(this)
				// pageState1.loading()    // 切换为loading状态
				// pageState1.finish()
				// return
				let that = this
				//http://water5100.800123456.top/WebService.asmx/order
				wx.request({
					url:  app.IPurl+'/api/orderList',
					data:{
						token:wx.getStorageSync('token'),
						status_code:that.data.type,
						page:that.data.pages[that.data.type],
						page_length:10
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'get',
					success(res) {
						if(res.data.code==1){
							wx.setNavigationBarTitle({
								title:'订单列表'
							})
							that.htmlReset=0
								console.log(ttype)
								let resultd=res.data.data
								if(ttype=='onshow'){
									var pages=[1,1,1,1,1]
									var goods=[ [],[],[],[],[], ]
									that.data.goods=goods
								}
								if(resultd.length>0){
									that.data.goods[that.data.type]=that.data.goods[that.data.type].concat(resultd)
									that.data.pages[that.data.type]++
									that.goods=that.goods
									that.pages=that.pages
								
									console.log(that.data.goods)
								}else{
									wx.showToast({
										icon:"none",
										title:"没有更多数据了"
									})
								}
								// console.log(res.data.list)
								
								
						}else{
							wx.showToast({
								icon:"none",
								title:"获取失败"
							})
							that.htmlReset=1
							console.log(res.data)
						}
						
						// pageState1.finish()    // 切换为finish状态
					},
					fail(err) {
						wx.showToast({
							icon:"none",
							title:"获取失败"
						})
						that.htmlReset=1
						console.log(err)
						 // pageState1.error()    // 切换为error状态
					}
				})
			},
			//订单详情
			goOrderDetails(e){
				console.log(e.currentTarget.dataset.id)
				wx.navigateTo({
					url:'/pages/OrderDetails/OrderDetails?id='+e.currentTarget.dataset.id
				})
			},
			//付款
			pay(e){
			  var that =this
				let oid=e.currentTarget.dataset.code
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				app.Pay(oid,'info')
			},
			jump(e) {
			  service.jump(e)
			},
			onRetry(){
				this.onLoad()
			}
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
	padding: 20rpx 28rpx ;
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
  border-bottom: 20rpx solid #F5F5F5;
	/* margin-bottom: 20rpx; */
}
.goods1{
	width: 100%;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	/* border-bottom: 1px solid #ddd; */
  border-top: 1px solid #eee;
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
	width: 200rpx;
	height: 200rpx;
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
  height: 200rpx;
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
