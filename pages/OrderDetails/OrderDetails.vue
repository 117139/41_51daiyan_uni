<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container">
		<view class="order_box1">
		  <image src="/static/images/order_bg_02.jpg"></image>
		  <view v-if="h_type==1||h_type==0" class="order_tit">
		    <view class="type_img">
		      <image src="/static/images/ot_fukuan.png"></image>
		    </view>
		    <view class="ot_msg">
		      <view class="d1">待付款</view>
		      <view class="d2">等待付款中</view>
		    </view>
		  </view>
		  <view v-if="h_type==2" class="order_tit">
		    <view class="type_img">
		      <image src="/static/images/ot_shouhuo.png"></image>
		    </view>
		    <view class="ot_msg">
		      <view class="d1">待收货</view>
		      <view class="d2">请及时确认收货</view>
		    </view>
		  </view>
		  <view  v-if="h_type==3" class="order_tit">
		    <view class="type_img" style="width:56rpx;">
		      <image src="/static/images/ot_pingjia.png"></image>
		    </view>
		    <view class="ot_msg">
		      <view class="d1">待评价</view>
		      <view class="d2">期待您的评价</view>
		    </view>
		  </view>
		  <view  v-if="h_type==4" class="order_tit">
		    <view class="type_img">
		      <image src="/static/images/ot_daiyan.png"></image>
		    </view>
		    <view class="ot_msg">
		      <view class="d1">待代言</view>
		      <view class="d2">已收货期待您的代言</view>
		    </view>
		  </view>
		</view>
		  <view class="address">
		    <view class="add_r">
					<image src="/static/images/address23.png"></image> 
				</view>
				<view class="add_l">
					<view class="al_1">{{'昵称'}} <text class="l_tel">{{'18300000000'}}</text></view>
					<view class="al_2">{{'河北省  保定市  莲花区  未来石4号楼2101室'}} </view>
				</view>
				
			</view>
			<view class="orderbder">
				<image src="/static/images/orderborder.png"></image>
			</view>
			<view class="goodsBox contbox">
		      <view class="goods" v-for="(item,idx) in goods" :data-tab="idx" @tap="jump" data-url="/pages/OrderDetails/OrderDetails?shop_id=1">
		        <view class="dianpu_tit">
		          <image class="dp_logo" src="../../static/images/tx.png"></image>
		          <text>石说的达开旗舰店</text>
		          <!-- <text class="iconfont iconnext3"></text> -->
		        </view>
		        <view class="goods1" v-for="(item1,idx1) in goods">
		          <view class="goodsImg">
		            <image class="goodsImg" src="../../static/images/goods.png" mode="aspectFill"></image>
		          </view>
		          <view class="goodsinr">
		            <!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
		            <view class="goodsname fz30 c30 oh1">{{'黄金曼特宁精品咖啡/袋泡咖啡/耳挂 咖啡6*10袋装'}}</view>
		            <view class="goodspri">{{'已选择：苏门答腊黄金曼特宁深度烘培'}}</view>
		            <view class="goodspri1">
		              <!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
		              <text class="fz36 cf6377a fwb">￥{{'48'}}</text>
		
		
		            </view>
		          </view>
		        </view>
		        <view class="o_xj">
		          <view></view>
		          <view>共3件，合记
		            <text>¥144</text>
		          </view>
		
		        </view>
		        
		      </view>
		    </view>
		    
			<view class="ordermsg" v-show="order_status!==''">
				<view class="msgtit">
					订单信息
				</view>
				
				<view class="msginr">
					<!-- <view hidden='{{order_status===0}}' class="orderewm">
						<canvas class='canvas' style="width:{{qrcodeWidth}}px; height:{{qrcodeWidth}}px;" canvas-id='canvas' bindlongtap=''></canvas>
					</view> -->
					<view class="ordermsg_r">
						<view class="omsgp">订单编号：{{'21763816468492'}}</view>
						<view class="omsgp">创建时间：{{'2020-02-10  11:56:40'}}</view>
						
					
					</view>
		      
				</view>
				<view class="o_cz">
		        <view v-if="h_type==3" catchtap="jump" data-url="/pages/goods_pj/goods_pj">评价</view>
		        <!-- <view  v-if="h_type==4"  @tap="jump" data-url="/pages/daiyan_fabu/daiyan_fabu">我要代言</view> -->
		        <view  v-if="h_type==2">确认收货</view>
		        <view  v-if="h_type==0||h_type==1">付款</view>
		        <view  v-if="h_type==0||h_type==1" class="qx">取消订单</view>
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
	const QRCode = require('../../utils/weapp-qrcode.js')
	import rpx2px from '../../utils/rpx2px.js'
	let qrcode;
	const qrcodeWidth = rpx2px(210)
	export default {
		data() {
			return {
				h_type:"",
				btnkg:0,
				htmlkg:0,
				Odata:'',
				order_id:'',
				order_status:'',
				delivery_code:'',
				goods:[1,1,],
				spimg:[],
				shopNum:[],
				goods_sele:[],
				qujan:[],
				order_product_list:[],
				show0:0,
				show1:0,
				show2:0,
				sum:0,
				qrcodeWidth: qrcodeWidth,
			}
		},
		onReady(){
			let that =this
			that.countpri()
			console.log(that.delivery_code)
			
		},
		onLoad: function (option) {
		  var that =this
		  if(option.type){
		    that.h_type=option.type
		  }
			// wx.setNavigationBarTitle({
			// 	title:'加载中...'
			// })
		  // if(option.id){
			// 	console.log(option.id)
			// }
			// this.setData({
			// 	order_id:option.id
			// })
			// this.getOrderList(option.id)
		},
		onShow(){
			if(that.btnkg==1){
				that.btnkg=0
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  uni.stopPullDownRefresh();
		},
		methods: {
			
			cload(){
				this.getOrderList(this.order_id)
			},
			
			bindPickerChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.show0= e.detail.value
			},
			bchange1(e){
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.show1= e.detail.value
			},
			bchange2(e){
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.show2= e.detail.value
			},
			/*计算价格*/
			countpri(){
				/*let heji=0
				let var2= this.data.goods
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
							console.log(zj)
						}
						
						let zj1 = zj.substring(0, zj.length-3);
						let zj2 = zj.substring( zj.length-3, zj.length-1);
						// console.log(zj1+'.'+zj2)
						zj=zj1+'.'+zj2
						this.data.goods[i].zj=zj
						this.setData({
							goods:this.data.goods
						})
				}
				// console.log(heji)
				if(heji==0){
					this.setData({
						sum:'0.00'
					})
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
				this.setData({
					sum:heji
				})*/
			},
			//取消订单
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
											// var pages=[1,1,1,1,1]
											// var goods=[ [],[],[],[],[], ]
											// that.setData({
											// 	pages:pages,
											// 	goods:goods
											// })
											// that.getOrderList()
											wx.navigateBack()
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
			//去评论
			gopinlun(e){
				uni.navigateTo({
					url:'/pages/fabiaopl/fabiaopl?oid='+e.currentTarget.dataset.oid
				})
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
							if(that.btnkg==1){
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
									that.btnkg=0
									console.log(res.data)
									if(res.data.code==1){
										wx.showToast({
											title: '收货成功',
											duration: 1000
										});
										setTimeout(function(){
										// 	var pages=[1,1,1,1,1]
										// 	var goods=[ [],[],[],[],[], ]
										// 	that.setData({
										// 		pages:pages,
										// 		goods:goods
										// 	})
										// 	that.getOrderList()
										wx.navigateBack()
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
			//获取订单详情
			getOrderList(id){
				// const pageState1 = pageState.default(this)
				// pageState1.loading()    // 切换为loading状态
				
				let that = this
				//http://water5100.800123456.top/WebService.asmx/order
				wx.request({
					url:  app.IPurl+'/api/order/1',
					data:{
						order_id:id,
						token:wx.getStorageSync('token')
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'get',
					success(res) {
						// console.log(res.data)
						
						if(res.data.code==1){
								
								let resultd=res.data
								console.log(res.data)
								// console.log(resultd.info.delivery_code)
								// that.data.spimg = that.data.spimg.concat(imgb)
								that.Odata=resultd.data
								that.htmlReset=0
								wx.setNavigationBarTitle({
									title:'订单详情'
								})
						}else{
							wx.showToast({
								icon:'none',
								title:'获取失败'
							})
							console.log(res.data)
							that.htmlReset=1
						}
						// pageState1.finish()    // 切换为finish状态
					},
					fail(err) {
						 wx.showToast({
						 	icon:'none',
						 	title:'获取失败'
						 })
						 that.htmlReset=1
						 console.log(err)
					}
				})
			},
			//阶梯价
			ladderpri(idx,num){
				
				let that = this
				let ygnum=that.goods.list[idx].havenum  //已购
				// let ygnum=0  //已购
				let jt=that.goods.list[idx].pricelist  //规则
				let nownum=that.goods.list[idx].order_product.goods_count//本次购买数量
				
				
				if(num){
					nownum=num
				}
				// let numz=ygnum+nownum
				let nownum1 //定义临时变量
				let numlen //定义单个阶梯的限购数量
				let jtlist=[]        //阶梯列表
				let jtnum=[]         //阶梯数量
				let jtTotal=[]         //阶梯总价
				let numladd=[]      //阶梯的区间
				let priladd=[]      //阶梯的价格
				let Totalpri=0
				let laddermsg=[]
				for(let i in jt){
					let lownum=jt[i].lower_num
					let upnum=jt[i].upper_num
					let bpri=jt[i].price
					// console.log(lownum)
					// console.log(upnum)
					
					let jtzsy=jt[i].limit_num-jt[i].saled_num //阶梯限购的剩余
					if(lownum-1<=ygnum&&ygnum<upnum){ //根据已购获取开始阶梯
			         
						let item1
						item1=upnum-ygnum        //n1阶梯限售剩余
						
						if(jtzsy<item1){
							item1=jtzsy
						}
						if(item1==0){
							continue   //售罄
						}
						if(nownum<=item1){         //限售剩余足够
							// Totalpri +=100*bpri*nownum/100
							let ladderOne={
								'numladd':lownum+'-'+upnum,
								'jtnum':nownum,
								'priladd':bpri,
								'jtTotal':100*bpri*nownum/100
							}
							laddermsg.push(ladderOne)
							break;   //结束
						}else{                   //限售剩余不足
							nownum1=nownum-item1
							let ladderOne={
								'numladd':lownum+'-'+upnum,
								'jtnum':item1,
								'priladd':bpri,
								'jtTotal':100*bpri*item1/100
							}
							// Totalpri +=100*bpri*item1/100
							laddermsg.push(ladderOne)
						}
					}
					if(ygnum<lownum){   //后续阶梯（最小值大于已购）
						numlen=upnum-lownum+1   //当前阶梯的限购数量
						if(jtzsy<numlen){
							numlen=jtzsy
						}
						if(numlen==0){
							continue   //售罄
						}
						if(nownum1<=numlen){  //限售剩余足够
							let ladderOne={
								'numladd':lownum+'-'+upnum,
								'jtnum':nownum1,
								'priladd':bpri,
								'jtTotal':100*bpri*nownum1/100
							}
							// Totalpri +=100*bpri*nownum1/100
							laddermsg.push(ladderOne)
							break;   //结束
						}else{                   //限售剩余不足
							nownum1=nownum1-numlen
			
							let ladderOne={
								'numladd':lownum+'-'+upnum,
								'jtnum':numlen,
								'priladd':bpri,
								'jtTotal':100*bpri*numlen/100
							}
							// Totalpri +=100*bpri*numlen/100
							laddermsg.push(ladderOne)
						}
					}
				}
			
				let laddermsgs={
					'laddermsg':laddermsg,
					'Totalpri':Totalpri
				}
				console.log(laddermsgs)
				return laddermsgs
			},
			opengoods(e){
				 let id = e.currentTarget.dataset.id
				app.opengoods(id)
			},
			
			ewm(code){
				qrcode = new QRCode('canvas', {
					usingIn: this, // usingIn 如果放到组件里使用需要加这个参数
					text: code,
					// image: '/images/bg.jpg',
					width: qrcodeWidth,
					height: qrcodeWidth,
					colorDark: "#000",
					colorLight: "white",
					correctLevel: QRCode.CorrectLevel.H,
				});
			},
			pay(){
			  var that = this
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				var that =this
				service.Pay(that.order_id,'info')
			},
			onRetry(){
				this.onLoad()
			}
		}
	}
</script>

<style scoped>
.container{
	min-height: 100vh;
	background: #eeeeee;
}
image{
	width: 100%;
	height: 100%;
}
.address{
	display: flex;
	width: 100%;
	height: 153rpx;
	padding: 0 28rpx;
	box-sizing: border-box;
	background-color: #fff;
	align-items: center;
}
.add_l{
	height: 80%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	flex: 1;
	
}
.al_1{
	font-size: 30rpx;
	color: #333;
}
.l_tel{
	margin-left: 47rpx;
}
.al_2{
	width: 670rpx;
	font-size: 24rpx;
	color: #999;
	text-overflow:ellipsis;
	 white-space:nowrap; 
	 overflow:hidden;
}
.add_r{
  flex: none;
	width:28rpx;
  height:36rpx;
  margin-right: 38rpx;
}
.orderbder{
	width: 100%;
	height: 6rpx;
	display: flex;
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
.slh2{
	display:-webkit-box !important;  
	overflow:hidden;
	text-overflow:ellipsis;
	word-break:break-all;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
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
	/* text-align: right; */
	font-size: 28rpx;
	color: #333;
	/* padding: 30rpx 0; */
}
.ml10{
	margin-left: 10px;
}
.xjjine{
	font-size: 32rpx;
	color: #fe0042;
}

.ordermsg{
	width: 100%;
	background-color: #fff;
	padding: 30rpx 28rpx 30rpx;
	box-sizing: border-box;
	
}
.msgtit{
	width: 100%;
	padding-left: 10rpx;
	box-sizing: border-box;
	height: 26rpx;
	border-left: 8rpx solid #F8BE3A;
	font-size: 30rpx;
	color: #333;
	display: flex;
  font-weight:500;
	align-items: center;
	margin-bottom: 30rpx;
}
.msginr{
	width: 100%;
	display: flex;
}
.orderewm{
	width: 210rpx;
	height: 210rpx;
	margin-right: 32rpx;
}
.ordermsg_r{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.omsgp{
	font-size: 26rpx;
	margin-bottom: 12rpx;
	color: #666;
}
.ordercaozuo{
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 32rpx;
	color: #fe0042;
}
.confirmBtn{
	width: 180rpx;
	height: 64rpx;
	border-radius: 32rpx;
	font-size: 24rpx;
	color: #fe0042;
	border:1px solid #fe0042;
	display: flex;
	justify-content: center;
	align-items: center;
}

.zhifu{
	width: 100%;
	height:100rpx;
	display:flex;
	justify-content:center;
	align-items:center;
	background-color:#fe0042;
	color:#fff;
	font-size:30rpx;
}
.ziti{
	margin-bottom:17rpx;
}
.ztmsgbox{
	display: flex;
	flex-direction: column;
}
.ztmsg{
	font-size: 28rpx;
	color: #333;
	display: flex;
}
.ztmsginr{
	flex: 1;
}



.contbox{
	width: 100%;
	padding: 0rpx 28rpx;
	box-sizing: border-box;
	background-color: #fff;
}
.goodsImg image{
	width: 100%;
	height:100%;
}
.ordercaozuo{
	width: 100%;
	height: 100rpx;
	padding: 0 36rpx;
	box-sizing: border-box;
	position: fixed;
	bottom: 0;
	left: 0;
	background-color: #fff;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	font-size: 32rpx;
	color: #f75852;
	/* padding-bottom: 25rpx; */
}
.confirmBtn{
	width: 180rpx;
	height: 64rpx;
	border-radius: 32rpx;
	font-size: 24rpx;
	color: #fff;
	border:1px solid #f75852;
	background-color: #f75852;
	display: flex;
	justify-content: center;
	align-items: center;
}
.cancelBtn{
	color: #fff;
	border:1px solid #f75852;
	background-color: #f75852;
	margin-right: 30rpx;
}





/*  */


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
	flex: 1;
}
.goodsname{
	font-size: 30rpx;
	color: #333333;
	padding-right: 20rpx;
	margin-bottom: 20rpx;
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
  padding: 40rpx 0;
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


/*  */
.order_box1{
  width: 100%;
  height: 176rpx;
  position: relative;
}
.order_tit{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 60rpx;
  padding-left: 30rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.type_img{
  width:69rpx;
  height:70rpx;
  margin-right: 22rpx;
}
.ot_msg{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: #fff;
}
.ot_msg .d1{
  font-size: 30rpx;
}
.ot_msg .d2{
  font-size: 24rpx;
}
</style>
