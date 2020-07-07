<template>
	<view>
		<view class="hengxian"></view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container" v-if="htmlReset==0">
		
		  <view class="address" data-url="/pages/myaddress/myaddress?type=1" @tap="jump">
		    <view class="add_l">
		      <view v-if="address.user_name" class="al_1">{{address.user_name}}
		        <text class="l_tel">{{address.phone}}</text>
		      </view>
		      <view v-if="address.user_name" class="al_2">{{address.area}}{{address.address}}</view>
		      <view v-if="!address.user_name" class="fz30">请选择地址</view>
		    </view>
		    <!-- <view class="add_r"> -->
		    <text class="iconfont iconnext"></text>
		    <!-- </view> -->
		  </view>
		  <view class="orderbder">
		    <image src="/static/images/orderborder.png"></image>
		  </view>
		  <view class="goodsBox contbox">
		    <view class="goods" v-for="(item,idx) in goods" :data-tab="idx">
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
		        <view>共3件，小记
		          <text>¥144</text>
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
		      <image src="/static/images/wxpay.png"></image>
		      微信支付
		    </view>
		  </view>
		  <view class="guige">
		    <view class="guige_l">
		      <view class="guige_l_name">运费</view>
		      <!-- <view>10元</view> -->
		    </view>
		    <!-- <view class="guige_r"> -->
		    <view class="fz26 c9">{{yunfei==0? '免运费':'+￥'+yunfei}}</view>
		    <!-- <text class="iconfont iconsangedian fz36 c9"></text> -->
		    <!-- </view> -->
		  </view>
		  <view class="guige" data-url="/pages/my_yhq/my_yhq?type=1" @tap="jump">
		    <view class="guige_l">
		      <view class="guige_l_name">优惠券</view>
		      <!-- <view>10元</view> -->
		    </view>
		    <view class="dis_flex aic">
		      <view class="fz26 c9">{{!yhmsg? '无可用':'-￥'+yhmsg.arg1}}</view>
		      <text class="iconfont iconnext3 fz30 c9"></text>
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
				goods: [1, 1],
				yunfei: 0, //运费
				yhlist: [], //优惠
				sku_id: '', //新单价
				yhidx: 0,
				addresslist: [], //地址列表
				paykg: true, //按钮开关
				address: '',
				sum: 1000,
				my_dou: 100,
				my_dou_xuan: false,
				zsum: 1000
			}
		},
		onShow() {
		
		  let pages = getCurrentPages();
		  let currPage = pages[pages.length - 1];
		  if (currPage.data.addresschose) {  
		        //将携带的参数赋值
		          
		      this.address=currPage.data.addresschose
		      this.addressBack=true 
		
		    console.log(this.address, '地址')
		
		  }
		  if (currPage.data.yhmsg) {
		    console.log(currPage.data.yhmsg, '优惠')
		
		    // var zsum = this.data.sum - currPage.data.yhmsg.arg1 + Number(this.data.yunfei)
		    // console.log(zsum)
		    // this.setData({
		    //   yhmsg: currPage.data.yhmsg,
		    //   zsum: zsum
		    // })
		    this.yhmsg= currPage.data.yhmsg
		    this.jisuan()
		  }
		},
		onReady() {
		
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {
		  uni.stopPullDownRefresh();
		},
		methods: {
			cload() {
			  var that = this
			  that.countpri()
			  that.getyunfei()
			  that.getyhlist()
			
			  that.getadd()
			},
			
			select() {
			  var that = this
			  that.my_dou_xuan= !that.my_dou_xuan
			  that.jisuan()
			},
			jisuan() {
			  var that = this
			  var yhnum = that.yhmsg ? that.yhmsg.arg1 : ''
			  if (that.my_dou_xuan) {
			    var zsum = that.sum - yhnum
			    var my_dou_new = that.my_dou
			    if (zsum > that.my_dou) {
			      zsum = zsum - that.my_dou
			      my_dou_new = 0
			    } else {
			      my_dou_new = that.my_dou - zsum
			      zsum = 0
			    }
			    console.log(zsum)
			    console.log('我的代言豆还有：' + my_dou_new + '个')
			    that.zsum= zsum
			
			  } else {
			    var zsum = that.sum - yhnum
			    that.zsum= zsum
			  }
			},
			bindPickerChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.show0= e.detail.value
			},
			//address
			bchange1(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  
			    this.show1= e.detail.value
			    this.ztaddress= this.columns1[e.detail.value].id
			    this.zttime= this.columns2[e.detail.value][0].id
			  
			  // that.setData({
			  // 	ztaddress:that.columns1[0].id,
			  // 	zttime:that.columns2[0][0].id
			  // })
			},
			//time
			bchange2(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  
			    this.show2= e.detail.value
			    this.zttime= this.columns2[this.show1][e.detail.value].id
			  
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
			//运费
			getyunfei() {
			  let that = this
			  wx.request({
			    url: app.IPurl + '/api/carriage',
			    data: {
			
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'get',
			    success(res) {
			      // console.log(res.data)
			      if (res.data.code == 1) {
			
			        that.yunfei= res.data.data.carriage
			
			
			      } else {
			        wx.showToast({
			          icon: 'none',
			          title: res.data.msg
			        })
			      }
			
			    },
			    fail() {
			      wx.showToast({
			        icon: 'none',
			        title: '获取失败'
			      })
			      console.log('失败')
			    }
			  })
			},
			//获取默认地址
			getadd() {
			  let that = this
			  wx.request({
			    url: app.IPurl + '/api/userAddressDefault',
			    data: {
			      token: wx.getStorageSync('token')
			    },
			    // header: {
			    // 	'content-type': 'application/x-www-form-urlencoded' 
			    // },
			    dataType: 'json',
			    method: 'get',
			    success(res) {
			      // console.log(res.data)
			      if (res.data.code == 1) {
			        wx.setNavigationBarTitle({
			          title: '提交订单'
			        })
			        that.address= res.data.data
			        that.ahtmlReset= 0
			
			
			      } else {
			        // wx.showToast({
			        // 	icon:'none',
			        // 	title:res.data.msg
			        // })
			        that.htmlReset= 1
			      }
			
			    },
			    fail(err) {
			      wx.showToast({
			        icon: 'none',
			        title: '获取默认地址失败'
			      })
			      that.htmlReset= 1
			      console.log(err)
			    }
			  })
			},
			//获取优惠
			getyhlist() {
			  var that = this
			  wx.request({
			    url: app.IPurl + '/api/userCouponList',
			    data: {
			      token: wx.getStorageSync('token')
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'get',
			    success(res) {
			      console.log(res.data)
			      if (res.data.code == 1) {
			
			        that.yhlist= res.data.data
			
			        var zsum
			        if (res.data.data[0]) {
			          zsum = that.sum - res.data.data[0].coupon_money + Number(that.yunfei)
			        } else {
			          zsum = Number(that.sum) + Number(that.yunfei)
			        }
			        that.zsum= zsum
			      } else {
			        wx.showToast({
			          icon: 'none',
			          title: ''
			        })
			      }
			
			    },
			    fail() {
			      wx.showToast({
			        icon: 'none',
			        // title:res.data.msg
			        title: '获取优惠券信息失败'
			      })
			      console.log('失败')
			    }
			  })
			
			},
			subbtn() {
			
			  console.log(app.IPurl1)
			  let that = this
			
			  if (that.address == null || that.address.id == '' || that.address.id == undefined) {
			    wx.showToast({
			      icon: 'none',
			      title: '请先添加地址'
			    })
			    return
			  }
			  if (that.paykg == false) {
			    return
			  } else {
			    wx.showLoading({
			      title: '订单提交中...'
			    })
			    that.paykg= false
			  }
			  setTimeout(function() {
			    uni.hideLoading()
			    uni.navigateTo({
			      url: '/pages/OrderList/OrderList',
			    })
			  }, 1000)
			  return
			  // wx.hideLoading()
			  // that.setData({
			  // 	paykg:true
			  // })
			  // wx.showToast({
			  // 	title: '提交失败',
			  // 	icon: 'none',
			  // 	duration: 1000
			  // })
			  // return
			  let data
			  let jkurl
			  if (that.data.type == 2) {
			    data = {
			      token: wx.getStorageSync('token'),
			      shopping_ids: that.idg,
			      user_address_id: that.address.id,
			      user_coupon_id: that.yhlist[that.yhidx] ? that.yhlist[that.yhidx].id : -1
			    }
			    jkurl = '/api/orderForShopping'
			  } else {
			
			    data = {
			      token: wx.getStorageSync('token'),
			      goods_id: that.xzarr[0].goods_id,
			      goods_attr: that.xzarr[0].attr_setjson,
			      goods_num: that.xzarr[0].num,
			      user_address_id: that.address.id,
			      sku_id: that.sku_id,
			      user_coupon_id: that.yhlist[that.yhidx] ? that.yhlist[that.yhidx].id : -1
			    }
			    jkurl = '/api/orderForGoods'
			  }
			  wx.request({
			    url: app.IPurl + jkurl,
			    data: data,
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'POST',
			    success(res) {
			
			      wx.hideLoading()
			      console.log(res)
			
			      if (res.data.code == 1) {
			
			        // setTimeout(function(){
			        if (res.data.data.order_code) {
			          console.log('order_code' + res.data.data.order_code)
			          app.Pay(res.data.data.order_code)
			        }
			        // },1000)
			        // let resultd=res.data
			        // console.log(res.data)
			        // if(res.data.data.order_code){
			        // 	console.log('order_code'+res.data.data.order_code)
			        // 	// app.Pay(res.data.order_info_id,'info')
			        // }
			      } else {
			        wx.showToast({
			          title: res.data.msg,
			          icon: 'none',
			          duration: 1000
			        })
			        that.paykg= true
			      }
			    },
			    fail(res) {
			
			
			      wx.hideLoading()
			      that.paykg= true
			      wx.showToast({
			        title: '提交失败',
			        icon: 'none',
			        duration: 1000
			      })
			    }
			  })
			
			
			  // wx.navigateTo({
			  // 	url:'../OrderDetails/OrderDetails'
			  // })
			
			},
			goaddress() {
			  service.goaddress()
			},
			//单品
			getGoodsDetails(id) {
			  // const pageState1 = pageState.default(this)
			  // pageState1.loading()    // 切换为loading状态
			  let that = this
			  wx.request({
			    url: app.IPurl1 + 'shopinfo',
			    data: {
			      key: app.jkkey,
			      tokenstr: wx.getStorageSync('tokenstr'),
			      goods_sku_id: id
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'POST',
			    success(res) {
			      // console.log(res.data)
			
			      if (res.data.error == -2) {
			        app.checktoken(res.data.error)
			        that.onLoad()
			      }
			      if (res.data.error == 0) {
			        let resultd = res.data
			        console.log(res.data)
			        that.data.goodslist.push(res.data)
			        that.setData({
			          goodslist: that.data.goodslist,
			        })
			
			        let shopimg = resultd.data.goods_img.split(",")
			        // let guige=resultd.data.goods_unit.split(",")
			        // // that.data.spimg = that.data.spimg.concat(rlb)
			        console.log(shopimg[0])
			        that.data.spimg.push(shopimg[0])
			        that.setData({
			          spimg: that.data.spimg
			        })
			        let arra = []
			        if (that.data.goodslist[0].goods_total_limit != '') {
			
			          arra.push({
			            xuan: true,
			            // pri:res.data.shopinfo_sku_price_list[dbggidx].goods_sku_info.internal_price,
			            num: that.data.goodsnum,
			            // order_cart_id:that.data.goodslist[0].order_cart.order_cart_id,
			            laddermsgs: that.ladderpri(0)
			          })
			        } else {
			          var dbggidx = that.data.dbggtype
			          console.log(dbggidx)
			          let ss = res.data.shopinfo_sku_price_list[dbggidx].goods_sku_info.internal_price * that.data.goodsnum
			
			          let Totalpri = ss.toFixed(2)
			
			          arra.push({
			            xuan: true,
			            pri: res.data.shopinfo_sku_price_list[dbggidx].goods_sku_info.internal_price,
			            num: that.data.goodsnum,
			            Totalpri: Totalpri
			          })
			        }
			        that.setData({
			          goods_sele: arra
			        })
			        that.countpri()
			      }
			      // pageState1.finish()    // 切换为finish状态
			      // pageState1.error()    // 切换为error状态
			    },
			    fail(err) {
			      wx.showToast({
			        icon: 'none',
			        title: '获取失败'
			      })
			      console.log(err)
			      // pageState1.error()    // 切换为error状态
			    }
			  })
			},
			jump(e) {
			  service.jump(e)
			},
			onRetry() {
			  this.onLoad()
			}
		}
	}
</script>

<style scoped>
.container{
	min-height: 100vh;
	background: #eeeeee;
	padding-bottom: 100rpx;
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
