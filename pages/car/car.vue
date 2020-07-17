<template>
	<view>
		<view class="container" v-if="htmlReset==0">
			<view class="zanwu_box" v-if="goods.length==0">
				<image  :src="filter.imgIP('/static_s/51daiyan/images/car_null.png')"></image>
				<text>购物车空空如也，快去挑好货咯～</text>
				<view>逛逛代言商城</view>
			</view>
		  <view class="goods" v-for="(item,idx) in goods"
				:data-tab="idx"
				 >
		     <!-- <view class="dianpu_tit" @tap="jump" data-url="/pages/dp_index/dp_index?shop_id=1">
					 <image class="dp_logo" :src="filter.imgIP('/static_s/51daiyan/images/tx.png')"></image>
					 <text>石说的达开旗舰店</text>
					 <text class="iconfont iconnext3"></text>
				 </view>  -->
				<view class="goods1" v-for="(item1,idx1) in item" @tap="jump" data-url="/pages/details/details?shop_id=1">
					<!-- <view class="scbg" data-id="{{item.id}}" @tap.stop="cardel">
						<text class="iconfont iconshanchu fz26"></text>
					</view> -->
					<view class="xuanze" :data-selec="idx" :data-selec1="idx1" @tap.stop="select">
						<view class="xuanze1 " :class="goods_sele[idx][idx1].xuan==true? 'xuanze2':''">
							<icon  v-if="goods_sele[idx][idx1].xuan==true" type="success" size="16" color="#F7B43B" />
						</view>
					</view>
					<!-- <view class="goodsImg" wx:if="{{item.goods_pic}}"> -->
					<view class="goodsImg">
						<!-- <image src="{{filter.getgimg(item.order_cart.goods_img)}}"></image> -->
						<!-- <image src="{{filter.getgimg(item.goods_pic)}}"></image> -->
						<image class="goodsImg"  :src="filter.imgIP('/static_s/51daiyan/images/goods.png')" mode="aspectFill"></image>
					</view>
					<view class="goodsinr">
						<!-- <view class="goodsname fz30 c30 oh1">{{item.goods_name}}</view> -->
						<view class="goodsname fz30 c30 oh1">{{'黄金曼特宁精品咖啡/袋泡咖啡/耳挂 咖啡6*10袋装'}}</view>
						<!-- <view class="goodspri">{{'已选择：苏门答腊黄金曼特宁深度烘培'}}</view> -->
						<view class="goodspri1">
							<!-- <text class="fz36 cf6377a fwb">￥{{filter.moneyFormat('48')}}</text> -->
							<text class="fz36 cf6377a fwb">￥{{'48'}}</text>
						
						</view>
		        <view class="goodspri1">
							
							<text class="fz36 cf6377a fwb"></text>
						
							<view class="vstepper steppera">
								<view @tap.stop="onNum" :data-idx="idx" :data-idx1="idx1" data-ad="-" :data-id="item.id" class="vantjian c9">-</view>
								<input class="vanipt c6" disabled :value="goods_sele[idx][idx1].num "></input>
								<view @tap.stop="onNum" :data-idx="idx" :data-idx1="idx1" data-ad="+" :data-id="item.id" class="vantjia c9">+</view>
							</view>
						</view>
					</view>
				</view>	
		    
			</view>
			<!-- 猜你喜欢 -->
		  <view class="you_like">
				<view class="like_tit">
					<text></text>猜你喜欢<text></text>
				</view>
				<view class="goods_list">
					<view class="goods_li" @tap="jump" data-url="/pages/details/details" v-for="(item,index) in you_like">
						<image class="goods_img"  :src="filter.imgIP('/static_s/51daiyan/images//images/goods15_02.jpg')"  mode="aspectFill"></image>
						<view class="goods_msg">
							<view class="oh1">奶油碧根果 整箱</view>
							<view class="goods_pri">
								<text>￥27</text>
								<text class="pr2">￥37</text>
							</view>
						</view>
					</view>
					
				</view>
			</view>
			<view class="vbottom" v-if="goods.length!==0">
				<view class="selecAll" @tap="selecAll">
					<view class="xuanze1 all " :class="all==true? 'xuanze2':''">
						<icon  v-if="all==true" type="success" size="16" color="#F7B43B" />
					</view>
					全选
				</view>
				<view class="heji flex_1">
					<!-- <view><text class="fz26">合计:</text>￥{{sum}}</view>
					<view class="fz22 c9">不含运费</view> -->
				</view>
				<view class="jiesuan jiesuan1" @tap="cardel">删除</view>
				<view class="jiesuan" @tap="openOrder">结算</view>
			</view>
		</view>
		
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	export default {
		data() {
			return {
				btnkg: 0,     //0  ok       1 off
				htmlReset: 0,
				goods: [
				  [{ "num": 1, xuan: false },
				    { "num": 1, xuan: false },]
				],
				// goods: [],
				spimg: [],
				goods_sele: [
				  [{ "num": 1, xuan: false },
				    { "num": 1, xuan: false },],
				],
				// goods_sele: [],
				you_like:[1,1,1,1],
				xuan: false,
				all: false,
				sum: '0.00'
			}
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
			  wx.stopPullDownRefresh();
			},
			cload() {
			  var that = this
			  that.getcar()
			},
			onReady() {
			
			},
			onfocus() {
			  return false;
			},
			select(e) {
			  let that = this
			  // console.log(e.currentTarget.dataset.selec)
			  let sid = e.currentTarget.dataset.selec
			  let sid1 = e.currentTarget.dataset.selec1
			  // console.log(this.data.goods_sele[sid].xuan)
			  if (that.goods_sele[sid][sid1].xuan == false) {
			    that.goods_sele[sid][sid1].xuan = true
			    // that.setData({
			    //   goods_sele: that.goods_sele
			    // });
			  } else {
			    that.goods_sele[sid][sid1].xuan = false
			    // that.setData({
			    //   goods_sele: that.goods_sele
			    // });
			  }
			  let qx = true
			  for (let i in that.goods_sele) {
			    for (let j in that.goods_sele[i]) {
			      if (that.goods_sele[i][j].xuan == false) {
			        qx = false
			        break
			      }
			    }
			  }
			  console.log(qx)
			  //触发全选
			  if (qx == true) {
			    // that.setData({
			    //   all: true
			    // })
					that.all=true
			  } else {
					that.all=false
			    // that.setData({
			    //   all: false
			    // })
			  }
			  // //计算总价
			  // that.countpri()
			},
			onChange(e) {
			  console.log(e.currentTarget.dataset.selec)
			  let idx = e.currentTarget.dataset.selec
			  console.log(e.detail)
			  this.goods_sele[idx].num = e.detail
			  // this.setData({
			  //   goods_sele: this.data.goods_sele
			  // });
			  //计算总价
			  this.countpri()
			  // console.log(that.goods_sele[1].laddermsgs.Totalpri)
			},
			selecAll() {
			  let kg
			  if (this.all == false) {
			    kg = true
			  } else {
			    kg = false
			  }
			  this.all= kg
			  // this.data.goods_sele[sid].xuan=true
			  for (let i in this.goods_sele) {
			
			    for (let j in this.goods_sele[i]) {
			      this.goods_sele[i][j].xuan = kg
			    }
			  }
			  // this.setData({
			  //   goods_sele: this.goods_sele
			  // });
			  //计算总价
			  // this.countpri()
			},
			/*计算价格*/
			countpri() {
			  let heji = 0
			  let var2 = this.goods_sele
			  for (let i in var2) {
			    if (var2[i].xuan == true) {
			      heji += var2[i].num * (var2[i].pri * 100)
			
			    }
			  }
			
			  heji = (heji / 100).toFixed(0)
				this.sum=heji
			  // this.setData({
			  //   sum: heji
			  // })
			},
			openOrder() {
			  wx.navigateTo({
			    url: '/pages/Order/Order'
			  })
			  return
			  let that = this
			  let xuanG = that.goods_sele
			  let idG = ''
			  var xzarr = []
			  for (let i in xuanG) {
			    if (xuanG[i].xuan) {
			      if (idG == '') {
			        idG = xuanG[i].id
			
			      } else {
			        idG += ',' + xuanG[i].id
			      }
			      xzarr.push(that.goods[i])
			    }
			
			    // console.log(idG)
			  }
			  xzarr = JSON.stringify(xzarr)
			  console.log(xzarr)
			  console.log(idG)
			  if (idG !== '') {
			    app.openOrder(idG, xzarr, 1)
			  }
			},
			//加减
			onNum(e) {
			  let that = this
			  console.log(e.currentTarget.dataset)
			  let ad = e.currentTarget.dataset.ad
			  let id = e.currentTarget.dataset.id
			  let thisidx = e.currentTarget.dataset.idx
			  let thisidx1 = e.currentTarget.dataset.idx1
			
			  if (that.goods_sele[thisidx][thisidx1].num < 2 && ad == '-') {
			    console.log('禁止')
			    return false;
			
			  }
				if (ad == '-') {
			    that.goods_sele[thisidx][thisidx1].num--
			    that.goods[thisidx][thisidx1].num--
				} else {
			    that.goods_sele[thisidx][thisidx1].num++
			    that.goods[thisidx][thisidx1].num++
				}
				// that.setData({
				//   goods_sele: that.goods_sele,
				//   goods: that.goods
				// })
				return
			  //http://water5100.800123456.top/WebService.asmx/shopcar
			
			  // return
			  var jkurl
			  if (ad == '-') {
			    jkurl = '/api/shoppingGoodsNumDown/' + id
			  } else {
			    jkurl = '/api/shoppingGoodsNumUp/' + id
			  }
			  wx.request({
			    url: app.IPurl + jkurl,
			    data: {
			      token: wx.getStorageSync('token')
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'PUT',
			    success(res) {
			      // console.log(res.data)
			
			      if (res.data.error == -2) {
			        app.checktoken(res.data.error)
			        that.onLoad()
			      }
			      if (res.data.code == 1) {
			        let resultd = res.data
			        console.log(res)
			        console.log(resultd)
			        if (ad == '-') {
			          that.data.goods_sele[thisidx].num--
			          that.data.goods[thisidx].num--
			        } else {
			          that.data.goods_sele[thisidx].num++
			          that.data.goods[thisidx].num++
			        }
			
			        that.setData({
			          goods_sele: that.data.goods_sele,
			          goods: that.data.goods
			        })
			        console.log(thisidx)
			
			        //计算总价
			        that.countpri()
			      }
			    }
			  })
			},
			//获取购物车
			getcar() {
			  // const pageState1 = pageState.default(this)
			  // pageState1.loading()    // 切换为loading状态
			  let that = this
			  wx.request({
			    url: app.IPurl + '/api/shopping',
			    data: {
			      token: wx.getStorageSync('token')
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'GET',
			    success(res) {
			      // console.log(res.data)
			
			      if (res.data.code == 1) {
			        let resultd = res.data.data
			        // console.log(resultd)
			        that.setData({
			          goods: resultd,
			          htmlReset: 0
			        })
			
			        //设置选中的数组
			        let arra = []
			        for (let i = 0; i < resultd.length; i++) {
			
			          arra.push({
			            xuan: false,
			            id: resultd[i].id,
			            pri: resultd[i].goods_real_price,
			            num: resultd[i].num,
			            order_cart_id: resultd[i].id
			          })
			        }
			        that.setData({
			          goods_sele: arra,
			          all: false,
			          sum: '0'
			        })
			        that.countpri()
			        wx.setNavigationBarTitle({
			          title: '购物车'
			        })
			      } else {
			        wx.showToast({
			          icon: 'none',
			          title: '获取失败'
			        })
			        that.setData({
			          htmlReset: 1
			        })
			        console.log(res.data)
			      }
			      // that.selecAll()
			      // pageState1.finish()    // 切换为finish状态
			    },
			    fail(err) {
			      wx.showToast({
			        icon: 'none',
			        title: '获取失败'
			      })
			      that.setData({
			        htmlReset: 1
			      })
			      console.log(err)
			      // pageState1.error()    // 切换为error状态
			    }
			  })
			},
			opengoodsxq(e) {
			  let id = e.currentTarget.dataset.gid
			  app.opengoods(id)
			},
			jump(e){
			  service.jump(e)
			},
			pveimg(e) {
			  service.pveimg(e)
			},
			cardel(e) {
			  wx.showToast({
			    title: '删除成功',
			  })
			  return
			  var that = this
			  if (that.data.btnkg == 1) {
			    return
			  } else {
			    that.setData({
			      btnkg: 1
			    })
			  }
			  let id = e.currentTarget.dataset.id
			  wx.request({
			    url: app.IPurl + '/api/shopping/' + id,
			    data: {
			      token: wx.getStorageSync('token')
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'DELETE',
			    success(res) {
			
			      if (res.data.code == 1) {
			        let resultd = res.data
			        console.log(res)
			        wx.showToast({
			          icon: 'none',
			          title: '删除成功'
			        })
			        setTimeout(function () {
			          that.setData({
			            btnkg: 0
			          })
			          that.getcar()
			        }, 1000);
			      } else {
			        that.setData({
			          btnkg: 0
			        })
			        if (res.data.msg) {
			          wx.showToast({
			            title: res.data.msg,
			            duration: 2000,
			            icon: 'none'
			          });
			        } else {
			          wx.showToast({
			            title: '网络异常',
			            duration: 2000,
			            icon: 'none'
			          });
			        }
			      }
			    },
			    fail() {
			      that.setData({
			        btnkg: 0
			      })
			      wx.hideLoading()
			      wx.showToast({
			        title: '网络异常',
			        duration: 2000,
			        icon: 'none'
			      });
			    }
			  })
			}
		}
	}
</script>

<style scoped>
page{
	width: 100%;
	height: 100%;
	background-color: #eeeeee;
}
.container{
	/* padding-top: 20rpx; */
	padding-bottom: 130rpx;
  height: auto;
  min-height: 100%;
}
.zanwu{
	line-height: 140rpx;
	font-size: 26rpx;
	color: #999;
}
.goods{
	width: 100%;
	background-color: #fff;
	margin-bottom: 20rpx;
}
.goods1{
	width: 100%;
	padding: 28rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ddd;
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
/*步进器*/
.steppera{
	width: 148rpx;
	height: 45rpx;
	border: 1px solid #dcdcdc;
	display: flex;
	overflow: hidden;
	align-items: center;
}
.steppera .vanipt{
	width: 60rpx;
  height: 40rpx;
  max-height: 0;
	line-height: 40rpx;
	border-left: 1px solid #dcdcdc;
	border-right: 1px solid #dcdcdc;
	border-bottom: 0;
	border-top: 0;
	box-sizing: border-box;
	background-color: #fff;
	margin: 0;
	text-align: center;
	display: flex;
	/* align-items: center; */
	justify-content: center;
}
.steppera .vantjia,.steppera .vantjian{
	width: 45rpx;
	height: 43rpx;
	background-color: #fff;
	margin: 0;
	text-align: center;
	display: flex;
	align-items: center;
	font-size: 40rpx;
	line-height: 40rpx;
	justify-content: center;
}
.table1{
	margin-top: 20rpx;
	width: 100%;
	border:1px solid #dadada;
	border-right: 0;
	border-bottom: 0;
	font-size: 26rpx;
	color: #8e8e8e;
}
.tr1{
	width: 100%;
	display: flex;
}

.th1,.td1 {
	flex: 1;
	height: 60rpx;
	border-bottom: 1px solid #dadada;
	border-right: 1px solid #dadada;
	display: flex;
	justify-content: center;
	align-items: center;
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
.chongshi{
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 200rpx;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #f75852;
	color: #fff;
	border-radius: 8rpx;
}


/* like_tit */
.you_like{
	width: 100%;
	background: #fff;
}
.like_tit{
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30rpx;
}
.like_tit text{
	width: 60rpx;
	height: 1px;
	background: #eee;
	margin: 0 20rpx;
}
.goods_list{
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 0 28rpx 40rpx;
  box-sizing: border-box;
}
.goods_li{
	width:338rpx;
	height:468rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 3rpx 20rpx 0px rgba(119,119,119,0.3);
	border-radius:10rpx;
	margin-bottom: 16rpx;
}
.goods_li:nth-child(2n){
	margin-left: 16rpx;
}
.goods_img{
	width: 100%;
	height:338rpx;
	border-radius:10px 10px 0px 0px;
}
.goods_msg{
	width: 100%;
	box-sizing: border-box;
	padding: 15rpx 24rpx;
	font-size: 28rpx;
	color: #333;
}
.goods_pri{
	color: #e53030;
	font-size: 36rpx;
}
.goods_pri .pr2{
	  font-size: 28rpx;
	  font-family: "PingFangSC";
	  color: rgb(153, 153, 153);
	  text-decoration: line-through;
}

.dianpu_tit{
	display: flex;
	align-items: center;
	padding: 28rpx;
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
.zanwu_box{
	width: 100%;
	background: #fff;
	padding: 40rpx 0 50rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 20rpx;
}
.zanwu_box image{
	width: 177rpx;
	height: 116rpx;
	margin-bottom: 20rpx;
}
.zanwu_box text{
	font-size: 24rpx;
	color: #BBBBBB;
	margin-bottom: 30rpx;
}
.zanwu_box view{
	width:250rpx;
	height:64rpx;
	background:rgba(247,180,59,1);
	border-radius:10rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30rpx;
	color: #fff;
}
</style>
