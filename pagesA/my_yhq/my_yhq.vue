<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container" v-if="htmlReset==0">
			<view class="data_null" v-if="goods.length==0">
						 <image  :src="filter.imgIP('/static_s/51daiyan/images/data_null1.png')"></image>
			</view>
		  <view class="goods" v-for="(item,idx) in goods"
				:data-tab="idx"
				>
		     
				<view class="goods1">
				
					<!-- <view class="xuanze" data-selec="idx" catchtap="select">
						<view class="xuanze1 {{goods_sele[idx].xuan==true? 'xuanze2':''">
							<icon  v-if="goods_sele[idx].xuan==true" type="success" size="14" color="#F7B43B" />
						</view>
					</view> -->
					<!-- <view class="goodsImg" v-if="item.goods_pic"> -->
					<view class="yhq_li_img"  @tap="xz_add" :data-idx="idx">
						<image v-if="idx==0" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/mj.png')"  mode="aspectFill"></image>
						<image v-if="idx==1" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/yhq_bg_07.png')"  mode="aspectFill"></image>
						<image v-if="idx==2" class="yhq_li_img" :src="filter.imgIP('/static_s/51daiyan/images/yhq_bg_10.png')"  mode="aspectFill"></image>
						<view class="yhq_pri">
							<view class="d1"><text>¥{{data_list[idx].arg1}}元</text> 代金券</view>
							<view class="d2">2020.02.14-2020.02.18</view>
						</view>
						
					</view>
				</view>	
		    
			</view>
			<view v-if="form_type==1" class="no_btn" @tap="nouse">不使用优惠券</view>
			<!-- <view class="vbottom" v-if="goods.length!==0">
				<view class="selecAll" @tap="selecAll">
					<view class="xuanze1 all {{all==true? 'xuanze2':''">
						<icon  v-if="all==true" type="success" size="14" color="#F7B43B" />
					</view>
					全选
				</view>
				<view class="heji flex_1">
					
				</view>
				<view class="jiesuan jiesuan1" @tap="data_del">删除</view>
				<view class="jiesuan" @tap="data_open">共享</view>
			</view> -->
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
				btnkg: 0,     //0  ok       1 off
				htmlReset: 0,
				data_list:[
				  { arg1: 10, type: 1 },
				  { arg1: 20, type: 2 },
				  {arg1:10,type:1},
				],
				goods: [
				  { "num": 1, xuan: false },
				    { "num": 1, xuan: false },
				    { "num": 1, xuan: false },
				],
				// goods: [],
				spimg: [],
				goods_sele: [
				 { "num": 1, xuan: false },
				  { "num": 1, xuan: false },
				   { "num": 1, xuan: false },
				],
				// goods_sele: [],
				xuan: false,
				all: false,
				sum: '0.00',
				form_type:''
			}
		},
		onLoad: function (option) {
		  var that = this
		  if (option.type) {
		    that.form_type= option.type
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
			  that.getdata()
			},
			xz_add(e) {
			  var that = this
			  if (that.form_type != 1) {
			    return
			  }
			  console.log(e.currentTarget.dataset.idx)
			  var idx = e.currentTarget.dataset.idx
			  var pages = getCurrentPages();   //当前页面
			  var prevPage = pages[pages.length - 2];   //上一页面
			  prevPage.setData({
			    //直接给上一个页面赋值
					yhmsg: that.data_list[idx]
				});	
			  wx.navigateBack({
			    //返回
			    delta: 1
			  })
			},
			nouse(){
			  var pages = getCurrentPages();   //当前页面
			  var prevPage = pages[pages.length - 2];   //上一页面
			  prevPage.setData({
			    //直接给上一个页面赋值
			    yhmsg:'',
			  });
			
			  wx.navigateBack({
			    //返回
			    delta: 1
			  })
			},
			getdata(){
				uni.showToast({
					title:'获取数据'
				})
			},
			opengoodsxq(e) {
			  let id = e.currentTarget.dataset.gid
			  app.opengoods(id)
			},
			jump(e) {
			  service.jump(e)
			},
			cardel(e) {
			  var that = this
			  if (that.btnkg == 1) {
			    return
			  } else {
			    that.btnkg= 1
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
			          that.btnkg= 0
			          that.getcar()
			        }, 1000);
			      } else {
			        that.btnkg= 0
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
			      that.btnkg= 0
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
	background-color: #ffffff;
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
	/* margin-bottom: 15rpx; */
}
.goods1{
	width: 100%;
	padding: 15rpx 28rpx;
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
	
	text-align: center;
}
.yhq_li_img{
	/* width:650rpx; */
  width:690rpx;
	/* height:236rpx; */
	height:248rpx;
	position: relative;
	z-index: 1;
}
.yhq_pri{
	width:407rpx;
	height:236rpx;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 9;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.yhq_pri .d1{
	font-size:36rpx;
	color: #fff;
}
.yhq_pri .d1 text{
	font-size:  48rpx;
}
.yhq_pri .d2{
	margin-top: 10rpx;
	font-size: 22rpx;
	color: #fff;
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



.vbottom{
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0;
	z-index: 99;
	background-color: #fff;
	display: flex;
	align-items: center;
	box-shadow:0px 4rpx 20rpx 0px rgba(119,119,119,0.2);
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
  height:68rpx;
  background:#F73B67;
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


.data_null{
	width: 100%;
	height: 500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.data_null image{
	width: 122rpx;
	height: 152rpx;
}
.no_btn{
  margin: 100rpx auto 50rpx;
  width: 300rpx;
  height: 80rpx;
  background:#F73B67;
  border-radius:29px;
	color: #fff;
	font-size: 30rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
