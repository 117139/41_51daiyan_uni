<template>
	<view style="height: 100vh;overflow: scroll;">
		<view class="hengxian"></view>
		<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view v-if="htmlReset==0&&data_list.length==0" class="loading_def">
			<image class="loading_def_img" src="../../static/images/loading.gif" mode=""></image>
		</view>
		<view class="container" v-if="data_list.length>0">
		
		  <view class="address" data-url="/pagesA/myaddress/myaddress?type=1" @tap="jump">
		    <view class="add_l">
		      <view v-if="address.name" class="al_1">{{address.name}}
		        <text class="l_tel">{{address.phone}}</text>
		      </view>
		      <view v-if="address.name" class="al_2">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</view>
		      <view v-if="!address.name" class="fz30">请选择地址</view>
		    </view>
		    <!-- <view class="add_r"> -->
		    <text class="iconfont iconnext"></text>
		    <!-- </view> -->
		  </view>
		  <view class="orderbder">
		    <image :src="filter.imgIP('/static_s/51daiyan/images/orderborder.png')"></image>
		  </view>
		  <view class="goodsBox contbox">
		    <view class="goods" v-for="(item,idx) in data_list" :data-tab="idx">
		      <view class="dianpu_tit">
		        <image class="dp_logo" :src="filter.imgIP(item.head_portrait)"></image>
		        <text>{{item.store_name}}</text>
		        <!-- <text class="iconfont iconnext3"></text> -->
		      </view>
		      <view class="goods1" v-for="(item1,idx1) in item.goods">
		        <view class="goodsImg">
		          <image class="goodsImg" :src="filter.imgIP(item1.photo[0])" mode="aspectFill"></image>
		        </view>
		        <view class="goodsinr">
		          <!-- <view class="goodsname fz30 c30 oh1">{{item1.goods_name}}</view> -->
		          <view class="goodsname fz30 c30 oh1">{{item1.title}}</view>
		          <view class="goodspri">已选择：<text style="margin-right: 4rpx;" v-for="(item2,idx2) in item1.attr">{{item2.value}}</text>{{' X'+item1.number}}</view>
		          <view class="goodspri1">
		            <!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
		            <text class="fz36 cf6377a fwb">￥{{item1.price}}</text>
		
		
		          </view>
		        </view>
		      </view>
					
					<view class="guige" :data-url="'/pagesA/my_yhq/my_yhq?type=1&idx='+idx" @tap="jump">
					  <view class="guige_l">
					    <view class="guige_l_name">优惠券</view>
					    <!-- <view>10元</view> -->
					  </view>
					  <view class="dis_flex aic">
					    <view class="fz26 c9">{{item.coupon.length==0?'无可用':order_ls_data[idx].yhidx==-1? '不使用':getxj(idx,'yh')}}</view>
					    <text class="iconfont iconnext3 fz30 c9"></text>
					  </view>
					</view>
					
					<view class="guige">
					  <view class="guige_l">
					    <view class="guige_l_name">运费</view>
					    <!-- <view>10元</view> -->
					  </view>
					  <!-- <view class="guige_r"> -->
					  <view class="fz26 c9">{{yunfei.length==0? '':yunfei[idx].postage==0? '免运费':'+￥'+yunfei[idx].postage}}</view>
					  <!-- <text class="iconfont iconsangedian fz36 c9"></text> -->
					  <!-- </view> -->
					</view>
		      <view class="o_xj">
		        <view></view>
		        <view>共{{item.sum_number}}件，小记
		          <text>¥{{getxj(idx)}}</text>
		        </view>
		
		      </view>
		    </view>
		  </view>
		
		  <!-- <view class="guige">
		    <view class="guige_l">
		      <view class="guige_l_name">优惠券</view>
		      !-- <view class="c9">已选100元优惠券</view> --
		    </view>
		    <view class="fz26 c9">-￥{{yhlist[yhidx].coupon_money}}
		      <text class="iconfont iconnext"></text>
		    </view>
		  </view> -->
		  <!-- <view class="hengxian"></view> -->
		  <view class="guige">
		    <view class="guige_l">
		      <view class="bl1"></view>
		      <view class="guige_l_name">支付方式</view>
		    </view>
		    <view class="fz26 c3 paytype">
		      <image :src="filter.imgIP('/static_s/51daiyan/images/wxpay.png')"></image>
		      微信支付
		    </view>
		  </view>
		  
		  <view class="guige">
		    <view class="guige_l">
		      <view class="guige_l_name">代言豆抵扣</view>
		      <!-- <view>10元</view> -->
		    </view>
		    <view class="dis_flex aic">
		      <view class="fz26 c9">我的代言豆：{{my_dou}}</view>
		      <view class="xuanze1 " :class="my_dou_xuan==true? 'xuanze2':''" @tap.stop="select">
		        <icon v-if="my_dou_xuan==true" type="success" size="14" color="#F7B43B" />
		      </view>
		    </view>
		  </view>
		
		
		  <view class="fixbottom">
		    <view class="fb_l">￥{{zsum}}</view>
		    <view v-if="paykg" class="subbtn" @tap="subbtn">提交订单</view>
		    <view v-if="!paykg" class="subbtn subbtn1">提交订单</view>
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
				btnkg: 0,
				htmlReset: 0,
				type: 0, ///1 单品下单  2 购物车下单
				sku_id: '', //规格
				sku_number: '', //数量
				advocacy_user_id:'',   //代言人
				dy_id:'',
				advocacy_user_id:'',
				use_dou:0,
				
				g_data:'',    //1,2（type=2）购物车 c_id
				data_list:[],
				
				goods: [1, 1],
				yunfei: [], //运费
				yhlist: [], //优惠
				yhidx: 0,
				addresslist: [], //地址列表
				paykg: true, //按钮开关
				address: '',
				sum: 1000,
				my_dou: 100,
				my_dou_xuan: false,
				zsum: 1000,
				order_ls_data:'',
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
			var that =this
			uni.showLoading({
				title:'正在加载中'
			})
			uni.setNavigationBarTitle({
				title:'正在加载中...'
			})
			if(option.type==1){
				that.type=option.type
				that.sku_id=option.v_id
				that.sku_number=option.number
				that.dy_id=option.dy_id
				that.advocacyviceId=option.advocacyviceId
				that.advocacy_user_id=option.advocacy_user_id
			}else{
				that.type=option.type
				that.g_data=option.g_data
				
			}
			that.getdata()
		},
		onShow() {
			var that =this
		  let pages = getCurrentPages();
		  let currPage = pages[pages.length - 1];
		  if (currPage.data.addresschose) {  
		        //将携带的参数赋值
		          
		      this.address=currPage.data.addresschose
		      this.addressBack=true 
		
		    console.log(this.address, '地址')
				
		  }
		  if (currPage.data.yhlist_idx) {
				var yhlist_idx=currPage.data.yhlist_idx
				var yh_idx=currPage.data.yh_idx
				// var  order_ls_data=JSON.parse(JSON.stringify(that.order_ls_data))
				// order_ls_data[yhlist_idx].yh_idx=yh_idx
		    
		    that.$set(that.order_ls_data[yhlist_idx],'yhidx',yh_idx)
				// that.order_ls(order_ls_data)
		  }
			setTimeout(function (){
				that.jisuan()
			},1000)
		},
		onReady() {
		
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
		  // that.getdata()
		},
		methods: {
			...mapMutations(['order_ls']),
			
			onRetry() {
			  this.getdata()
			},
			getxj(idx,type){
				var that = this
				if(that.data_list.length==0){
					return 
				}
				var zj=that.data_list[idx].sum_price
				var yunfei=0
				if(that.yunfei[idx]){
					yunfei=that.yunfei[idx].postage
				}
				var yh=0
				if(that.order_ls_data[idx].yhidx>-1){
					var yhq_data=that.order_ls_data[idx].coupon[that.order_ls_data[idx].yhidx]
					if(yhq_data.coupon_setting_type==1){
						yh=yhq_data.c_money
					}
					if(yhq_data.coupon_setting_type==2){
						var  goods_list=that.order_ls_data[idx].goods
						for(var i in goods_list){
							if(yhq_data.coupon_use_obj_id==goods_list[i].g_id){
								var zk_pri=goods_list[i].price*yhq_data.discount_ratio/100
								zk_pri=goods_list[i].price-zk_pri
								// zk_pri=zk_pri
							}
						}
						yh=zk_pri
					}
					if(yhq_data.coupon_setting_type==3){
						var  goods_list=that.order_ls_data[idx].goods
						for(var i in goods_list){
							if(yhq_data.coupon_use_obj_id==goods_list[i].g_id){
								var zk_pri=goods_list[i].price
								// zk_pri=zk_pri
							}
						}
						yh=zk_pri
					}
				}
				if(type=='yh'){
					return '-￥'+yh+'元'
				}
				zj=zj-yh*1+yunfei*1
				if(zj>0){
					zj=zj*1
					zj=zj.toFixed(2)
				}
				 that.$set(that.data_list[idx],'js_price',zj)
				return zj
			},
			//获取订单
			getdata() {
			  // const pageState1 = pageState.default(this)
			  // /cart
			  let that = this
				var jkurl = '/makeOrder/show'
				var datas = {
					token: that.loginMsg.userToken
				}
				if(that.type==1){
					datas = {
						token: that.loginMsg.userToken,
						type:that.type,
						v_id:that.sku_id,
						number:that.sku_number
					}
				}
				if(that.type==2){
					datas = {
						token: that.loginMsg.userToken,
						type:that.type,
						g_data:that.g_data
					}
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
							that.htmlReset=0
							that.data_list =datas
							that.order_ls(datas)
							that.order_ls_data=JSON.parse(JSON.stringify(datas))
							var address={
								"id":res.address.id,
								"name": res.address.a_name,
								"phone": res.address.a_phone,
								"province": res.address.province,
								"city": res.address.city,
								"area": res.address.area,
								"address": res.address.address,
							}
							that.address=address
							that.my_dou=res.common_data.bean
							uni.setNavigationBarTitle({
								title:'填写订单'
							})
							that.jisuan()
							console.log(address)
							that.getyf()
					}else{
						that.htmlReset=1
					}
				}).catch(e => {
					that.btn_kg=0
					that.htmlReset=1
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
				
			},
			//获取运费
			getyf() {
			  // const pageState1 = pageState.default(this)
			  // /cart
			  let that = this
				if(!that.address.id){
					return
				}
				var jkurl = '/makeOrder/calculatePrice'
				var newarr=[]
				for(var i=0;i<that.data_list.length;i++){
					var new_i={
						price:that.data_list[i].sum_price,
						number:that.data_list[i].sum_number,
						manager_id:that.data_list[i].group_code,
					}
					newarr.push(new_i)
				}
				var datas = {
					token: that.loginMsg.userToken,
					data:JSON.stringify(newarr),
					address_id:that.address.id
				}
				
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					that.btn_kg=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(typeof datas)
							
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
					
							that.yunfei =datas
							that.jisuan()
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
			select() {
			  var that = this
			  that.my_dou_xuan= !that.my_dou_xuan
			  that.jisuan()
			},
			jisuan() {
			  var that = this
				var zsum=0
				for(var i=0;i<that.data_list.length;i++){
					if(!that.data_list[i].js_price&&that.data_list[i].js_price!=0){
						zsum+=that.data_list[i].sum_price*1
					}else{
						zsum+=that.data_list[i].js_price*1
					}
				}
				if (that.my_dou_xuan) {
				 var my_d = that.my_dou*1
				 var my_dou_new =that.my_dou*1
				 if (zsum >my_d) {
					zsum = zsum - my_d
					that.use_dou=my_d
					my_dou_new = 0
				 } else {
					my_dou_new = my_d - zsum
					that.use_dou=zsum
					zsum = 0
				 }
					console.log('我的代言豆还有：' + my_dou_new + '个')
					// that.zsum= zsum
			
				} else {
					// var zsum = that.sum - yhnum
					// that.zsum= zsum
					that.use_dou=0
				}
				
				that.zsum= zsum.toFixed(2)
			//   var yhnum = that.yhmsg ? that.yhmsg.arg1 : ''
			//   if (that.my_dou_xuan) {
			//     var zsum = that.sum - yhnum
			//     var my_dou_new = that.my_dou
			//     if (zsum > that.my_dou) {
			//       zsum = zsum - that.my_dou
			//       my_dou_new = 0
			//     } else {
			//       my_dou_new = that.my_dou - zsum
			//       zsum = 0
			//     }
			//     console.log(zsum)
			//     console.log('我的代言豆还有：' + my_dou_new + '个')
			//     that.zsum= zsum
			
			//   } else {
			//     var zsum = that.sum - yhnum
			//     that.zsum= zsum
			//   }
			},
			
			/*计算价格*/
			countpri() {
			  var that = this
			  let heji = 0
			  let var2 = this.xzarr
			  // console.log(this.goods_sele)
			  // console.log(var2)
			  for (let i in var2) {
			
			    heji += var2[i].num * (var2[i].goods_real_price * 100)
			
			
			
			  }
			  console.log(heji)
			  heji = (heji / 100).toFixed(0)
			
			  this.sum= heji
			},
		
			subbtn() {
			
			  
			  let that = this
			
			  if (that.address == null || that.address.id == '' || that.address.id == undefined) {
			    wx.showToast({
			      icon: 'none',
			      title: '请先添加地址'
			    })
			    return
			  }
			
			  let datas
			  let jkurl='/makeOrder'
				var coupon_list=[]
				for(var i=0;i<that.order_ls_data.length;i++){
					var c_item
					if(that.order_ls_data[i].yhidx!=-1){
						c_item={
							manager_id:that.order_ls_data[i].group_code,
							// coupon_list_id:that.order_ls_data[i].yhidx==-1? '':that.order_ls_data[i].coupon[that.order_ls_data[i].yhidx].id
							coupon_list_id:that.order_ls_data[i].coupon[that.order_ls_data[i].yhidx].id
						}
						coupon_list.push(c_item)
					}
					
					
				}
				if(coupon_list.length==0){
					coupon_list=''
				}else{
					coupon_list=JSON.stringify(coupon_list)
				}
				
			  if(that.type==1){
			  	datas = {
			  		token: that.loginMsg.userToken,
			  		type:that.type,
			  		v_id:that.sku_id,
						address_id:that.address.id,
						advocacy_bean:that.use_dou,
						advocacyId:that.dy_id,
						advocacyviceId:that.advocacyviceId,
						advocacy_user_id:that.advocacy_user_id,
			  		number:that.sku_number,
						coupon_list:coupon_list
			  	}
			  }
			  if(that.type==2){
			  	datas = {
			  		token: that.loginMsg.userToken,
			  		type:that.type,
						address_id:that.address.id,
						advocacy_bean:that.use_dou,
			  		g_data:that.g_data,
						coupon_list:coupon_list
			  	}
			  }
				// return
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
			  // 单个请求
			  service.P_post(jkurl, datas).then(res => {
			  	that.btnkg=0
			  	console.log(res)
			  	if (res.code == 1) {
			  		var datas = res.data
			  		// console.log(typeof datas)
			  			
			  		if (typeof datas == 'string') {
			  			datas = JSON.parse(datas)
			  		}
			  	
			  			uni.showLoading({
			  				title:'正在拉起支付'
			  			})
							setTimeout(()=>{
								uni.hideLoading()
								uni.showToast({
									icon:'none',
									title:'拉起操作'
								})
								that.btnkg=0
								setTimeout(function (){
									uni.redirectTo({
										url:'/pagesA/OrderList/OrderList'
									})
								},1000)
							},1000)
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
			goaddress() {
			  service.goaddress()
			},
			jump(e) {
				var that =this
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
					setTimeout(function (){
						that.btnkg=0
					},1000)
				}
			  service.jump(e)
			}
		}
	}
</script>

<style scoped>

.container{
	min-height: 100vh;
	height: auto;
	background: #eeeeee;
	padding-bottom: 100rpx;
	display: block;
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
	width: 23rpx;
	height: 40rpx;
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
	background-color: #fff;
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
  border-bottom: 20rpx solid #eee;
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
	-webkit-line-clamp:3;
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
  margin-left: 15rpx;
}
.xuanze2{
	border: 0;
}
</style>
