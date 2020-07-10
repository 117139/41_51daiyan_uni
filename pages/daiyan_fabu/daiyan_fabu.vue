<template>
	<view>
		<view v-if="htmlReset==1" class="chongshi" @tap='cload'>重试</view>
		<view class="container" v-if="htmlReset==0">
		  <!-- <view class="hb_canvas" style="position: fixed; top: -199999rpx;">
		    <image class="hb_bg draw_canvas" src="/static/images/hbbg.jpg"></image>
		    <image class="hb_xcxm draw_canvas" src="/static/images/xcxm.png"></image>
		    <view class="user_msg draw_canvas">
		      <image class="user_tx draw_canvas" src="/static/images/tx.png"></image>
		      <view class="user_name draw_canvas">昵称</view>
		      <view class="user_lv draw_canvas"><text class="iconfont iconxingzhuang60kaobei2"></text>代言星级 3</view>
		    </view>
		    <view class="hb_tab draw_canvas">
		      <view>
		        <view class="d1 draw_canvas">累计代言</view>
		        <view class="d2 draw_canvas"><text>212</text>件</view>
		      </view>
		      <view>
		        <view class="d1 draw_canvas">带动销量</view>
		        <view class="d2 draw_canvas"><text>212</text>件</view>
		      </view>
		      <view>
		        <view class="d1 draw_canvas">影响力超过</view>
		        <view class="d2 draw_canvas"><text>70</text>%好友</view>
		      </view>
		    </view>
		  </view>
		   -->
		   
		   <!-- <canvas canvas-id="canvas1" class="share__canvas" style="width: {{width}}px; height: {{height}}px; "></canvas> -->
		  <!-- <wxml-to-canvas class="widget"></wxml-to-canvas> -->
		  <image :src="src" style="width: 375px; height: 667px;position:fixed;top:-9999999px;"></image>
		  <view class="goodsBox w100">
		    <view v-if="open_type>idx" class="quan_goods" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
		      <image class="quan_goods_img" src="/static/images/goods.png" mode="aspectFill"></image>
		      <view class="quan_goods_msg">
		        <view class="quan_goods_name oh1">苏泊尔IH家用大容量智能电饭锅</view>
		        <view class="quan_goods_pri">
		          <text class="pri1">¥668</text>
		          <text class="pri2">¥1368</text>
		        </view>
		        <view class="quan_goods_btn">
		          <view class="goods_btn1">库存:11000</view>
		          <view class="goods_btn2">
		            <text>5200+</text>代言人</view>
		        </view>
		      </view>
		    </view>
		    <view class="goods_more" v-if="open_type==2">
		      <view>共{{data_list.length}}件</view>
		      <view class="gm_more" @tap="open_more">点击查看更多</view>
		    </view>
		  </view>
		  <view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <block  v-for="(item,idx) in datalist">
		      <view :class="type==idx?'typecur':'c9'" :data-type="idx" @tap='bindcur'><text>{{item}}</text></view>
		    </block>
		
		  </view>
		  <view class="fw_list" v-show="type==0">
		    <view class="fuwu_li">
		      <view class="d1">上传商品图片</view>
		      <view class="fw_msg">
		
		      </view>
		    </view>
		    <view class="imgbox mb20">
		      <view class="addimg1" v-for="(item,idx) in imgb" :data-idx="idx" @tap="imgdel">
		        <!-- <image src="filter.imgIP(item)}}" data-src="filter.imgIP(item)}}" mode="aspectFill"></image> -->
		        <image :src="item" :data-src="item" mode="aspectFill"></image>
		      </view>
		
		      <view v-if="imgb.length<9" class="addimg" @tap="scpic">
		
		        <image src="../../static/images/upimg1.jpg"></image>
		      </view>
		    </view>
		
		
		  </view>
		  <view class="fw_list"  v-show="type==1">
		    <view class="fuwu_li">
		      <view class="d1">上传商品视频</view>
		      <view class="fw_msg">
		
		      </view>
		    </view>
		    <view class="imgbox mb20">
		      <view class="addimg1" v-if="sp_url" @tap="chooseVideo">
		        <!-- <image src="filter.imgIP(item)}}" data-src="filter.imgIP(item)}}" mode="aspectFill"></image> -->
		        <image :src="filter.imgIP('download.jpg')" :data-src="filter.imgIP('download.jpg')" mode="aspectFill"></image>
		      </view>
		
		      <view wx:else class="addimg" @tap="chooseVideo">
		
		        <image src="../../static/images/upimg1.jpg"></image>
		      </view>
		    </view>
		
		
		  </view>
		  <view class="fw_list" v-show="type==2">
		    <!-- <view class="haibao" @tap="getPosterHandle">生成海报</view> -->
		    <!-- <view class="haibao" @tap="renderToCanvas">生成海报</view> -->
		    <view class="haibao" @tap="shareFc()">生成海报</view>
		    <!-- <view class="haibao" @tap="extraImage">下载海报</view> -->
		    <!-- <view class="haibao" @tap="ctxc">生成海报</view> -->
		    <view  class="haibao_box">
		      <!-- <image class="haibao_box" src="{{filter.imgIP(haibao)}}"></image> -->
		      <image v-if="src" class="haibao_box" :src="src"></image>
		    </view>
				
		  </view>
			<view class="hideCanvasView">
				<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
			</view>
		  <view class="fw_list">
		    <view class="fuwu_li">
		      <view class="d1">
		        <text class="bitian">*</text>填写您的代言</view>
		      <view class="fw_msg">
		
		      </view>
		    </view>
		    <view class="tk_text">
		      <textarea placeholder="请填写您的代言…" @input="get_val" :value="yname" maxlength="500"></textarea>
		    </view>
		  </view>
		  
		  <view class="daiyan_cz">
		    
		    <view class="sq_btn" @tap="save_val">发布代言</view>
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
	const { wxml, style } = require('./demo.js')
	import _app from '../../utils/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../utils/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				btnkg:0,
				htmlReset:0,
				datalist: [
				  '图片代言',
				  '视频代言',
				  '海报代言'
				],
				src: '',
				type: 0,
				pages:[1,1,1,1,1],
				data_list:[
				  1,
				  1,
				  1,
				  1,
				  1,
				  1,
				],
				open_type:2,
				
				yname:'',
				imgb:[],
				sp_url:'',
				haibao:'haibao.png',
				
				goods_sele: [
				  [{ "num": 1, xuan:false},
				    { "num": 1, xuan:false },],
				  [{ "num": 1, xuan:false },
				    { "num": 1, xuan:false },]
				],
				// goods_sele: [],
				xuan: false,
				all: false,
				
				width:750,
				height: 1334,
				
				
				
				
				
				
				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				count: 0
			}
		},
		onLoad(option) {
			var that =this
			if(option.type){
				that.type=option.type
			}
			that.widget = that.selectComponent('.widget')
		},
		onShow(){
			var pages=1
			var goods=[ 1,1]
			this.goods=goods
			this.pages=pages
		  if (this.btnkg==1){
				that.btnkg=0
			}
		  
			console.log('我显示了')
			// this.getOrderList('onshow')
		},
		methods: {
			
			open_more(){
			  this.open_type=10000
			},
			renderToCanvas() {
			  // var that=this
			  wx.showLoading({
			    title: '正在生成中'
			  })
			  const p1 = this.widget.renderToCanvas({ wxml, style })
			  p1.then((res) => {
			    console.log('container', res.layoutBox)
			    this.container = res
			    wx.hideLoading()
			    this.extraImage()
			    
			  })
			},
			extraImage() {
			  console.log('xiazai')
			  const p2 = this.widget.canvasToTempFilePath()
			  p2.then(res => {
			    wx.showLoading({
			      title: '正在保存'
			    })
			    wx.saveImageToPhotosAlbum({
			      filePath: res.tempFilePath,
			      success(res1) {
			        console.log(res1)
			        wx.hideLoading()
			        setTimeout(function (){
			          wx.showToast({
			            title: '保存成功',
			          })
			        },1000)
			      },
			      fail(err){
			        wx.hideLoading()
			        wx.showToast({
			          icon:'none',
			          title: '保存失败',
			        })
			        console.log(err)
			      },
			      complete(err){
			        wx.hideLoading()
			      }
			    })
			    this.setData({
			      src: res.tempFilePath,
			      width: 750,
			      height: 1334
			    })
			  })
			},
			cload(){
				var pages=1
				var goods=[1,1,]
				this.data.goods=goods
				this.pages=pages
				console.log('我显示了')
				// this.getOrderList('onshow')
			},
			onReady(){
				
			},
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
			  wx.stopPullDownRefresh();
			},
			drawImage() {
			  let _this = this;
			  var drawimg = new Wxml2Canvas({
			    width: _this.data.width,
			    height: _this.data.height,
			    element: 'canvas1',
			    background: '#000000',
			    progress(percent) {
			    },
			    finish(url) {
			      wx.hideLoading();
			      wx.saveImageToPhotosAlbum({
			        filePath: url
			      })
			    },
			    error(res) {
			    }
			  });
			
			  let data = {
			    list: [
			      {   //绘制矩形
			        type: 'rect',
			        x: 0,
			        y: 50,
			        style: {
			          width: _this.data.width,
			          height: _this.data.height - 60,
			          fill: '#fff'
			        }
			      },
			      {   //根据wxml绘制,
			        type: 'wxml',
			        class: '.hb_canvas .draw_canvas',
			        limit: '.hb_canvas',
			        x: 5,
			        y: 70
			      }]
			  }
			  drawimg.draw(data);
			},
			getPosterHandle() {
			  wx.showLoading({
			    title: '海报生成中...',
			  })
			  this.drawImage();
			},
			
			
			
			
			bindcur(e) {
			  var that = this
			  console.log(e.currentTarget.dataset.type)
			  that.type= e.currentTarget.dataset.type
			  // that.getOrderList()
			
			},
			//选择视频
			chooseVideo: function () {
			  var that = this
			  wx.chooseVideo({
			    success: function (res) {
			      that.sp_url= res.tempFilePath
			    }
			  })
			},
			//上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
			uploadvideo: function () {
			  var src = this.data.src;
			  wx.uploadFile({
			    url: 'http://172.16.98.36:8080/upanddown/upload2',//服务器接口
			    filePath: src,
			    header: {
			      'content-type': 'multipart/form-data'
			    },
			    name: 'files',//服务器定义的Key值
			    success: function () {
			      console.log('视频上传成功')
			    },
			    fail: function () {
			      console.log('接口调用失败')
			    }
			  })
			},
			save_val(){
			  var that = this
			  var type = that.type
			  if (type == 0) {
			    if (that.imgb.length == 0) {
			      wx.showToast({
			        icon: 'none',
			        title: '请上传商品图片',
			      })
			      return
			    }
			  }
			  if (type == 1) {
			    if (!that.sp_url) {
			      wx.showToast({
			        icon: 'none',
			        title: '请上传商品视频',
			      })
			      return
			    }
			  }
			  // if (type == 2) {
			  //   if (!that.haibao) {
			  //     wx.showToast({
			  //       icon: 'none',
			  //       title: '请生成海报',
			  //     })
			  //     return
			  //   }
			  // }
			  
			  
				if(!that.yname){
					wx.showToast({
					  icon: 'none',
			      title: '请填写您的代言',
					})
					return
				}
				
				wx.showToast({
					title: '操作成功',
				})
				setTimeout(function () {
				  wx.navigateTo({
			      url: '/pages/daiyan_fabu_ok/daiyan_fabu_ok',
			    })
				}, 1000)
				console.log(that.zhaungtai[that.index])
				console.log(that.yuanyin[that.index1])
				console.log(that.yname)
				console.log(that.imgb)
			},
				
			get_val(e) {
			  console.log(e.detail)
			  this.yname= e.detail.value
			},
			imgdel(e){
				var that =this
				console.log(e.currentTarget.dataset.idx)
				wx.showModal({
					title: '提示',
					content: '确定要删除这张图片吗',
					success (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							that.imgb.splice(e.currentTarget.dataset.idx,1)
							that.imgb=that.imgb
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
				
			},
			scpic() {
			  var that = this
			  wx.chooseImage({
			    count: 9,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['album', 'camera'],
			    success(res) {
			      // tempFilePath可以作为img标签的src属性显示图片
			      console.log(res)
			      const tempFilePaths = res.tempFilePaths
			      
			      const imglen = that.imgb.length
			      that.upimg(tempFilePaths, 0)
			     
			    }
			  })
			},
			upimg(imgs, i) {
			  var that = this
			  const imglen = that.imgb.length
			  var newlen = Number(imglen) + Number(i)
			  if (imglen == 9) {
			    wx.showToast({
			      icon: 'none',
			      title: '最多可上传九张'
			    })
			    return
			  }
				var newdata = that.imgb
				console.log(i)
				newdata.push(imgs[i])
				that.imgb= newdata
				var news1 = that.imgb.length
				if (news1 < 9&& i<imgs.length-1) {
				  i++
				  that.upimg(imgs, i)
				}
				return
			  // console.log(img1)
			  wx.uploadFile({
			    url: app.IPurl, //仅为示例，非真实的接口地址
			    filePath: imgs[i],
			    name: 'upfile',
			    formData: {
			      'apipage': 'uppic',
			    },
			    success(res) {
			      // console.log(res.data)
			      var ndata = JSON.parse(res.data)
			      if (ndata.error == 0) {
			        console.log(imgs[i], i, ndata.url)
			        var newdata = that.data.imgb
			        console.log(i)
			        newdata.push(ndata.url)
			        that.setData({
			          imgb: newdata
			        })
			        // i++
			        // that.upimg(imgs, i)
			        var news1 = that.data.imgb.length
			        if (news1 < 9) {
			          i++
			          that.upimg(imgs, i)
			        }
			      } else {
			        wx.showToast({
			          icon: "none",
			          title: "上传失败"
			        })
			      }
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
				if(that.data.btnkg==1){
					return
				}else{
					that.setData({
						btnkg:1
					})
				}
				app.Pay(oid,'info')
			},
			jump(e) {
			  service.jump(e)
			},
			onRetry(){
				this.onLoad()
			},
			async shareFc() {
				let _this = this;
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							height: 10,
							width: 10
						},
						setCanvasWH({
							bgObj
						}) {
							_this.poster = bgObj
						},
						drawArray({
							bgObj,
							type,
							bgScale,
							setBgObj,
							getBgObj
						}) {
							return [{
									type: 'image',
									id: 'productImage',
									url: _this.count % 2 === 0 ? '/static/1.png' : '/static/2.jpg',
									dx: 0,
									dy: 0,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										if (imageInfo.width > imageInfo.height) {
											width = imageInfo.width > 700 ? 700 : imageInfo.width;
											height = width / imageInfo.width * imageInfo.height;
										} else {
											height = imageInfo.height > 700 ? 700 : imageInfo.height;
											width = height / imageInfo.height * imageInfo.width;
										}
										if (width < 500) {
											width = 500;
											height = width / imageInfo.width * imageInfo.height;
										}
										let addHeight = height * .3;
										if (addHeight < 150) addHeight = 150;
										if (addHeight > 250) addHeight = 250;
										setBgObj({
											width,
											height: height + addHeight
										});
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'text',
									id: 'productName',
									text: '取舍',
									color: '#000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .25,
										}
									}
								},
								{
									type: 'text',
									text: '棒棒哒~',
									color: '#f1505c',
									serialNum: 2,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .5,
										}
									}
								},
								{
									type: 'text',
									text: '无情哈拉少',
									serialNum: 3,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: getBgObj().width * 0.05,
											lineFeed: {
												maxWidth: getBgObj().width * 0.5,
												lineNum: 1
											},
											dx: getBgObj().width * .05,
											dy: productImage.dHeight + addHeight * .75,
										}
									}
								},
								{
									type: 'qrcode',
									text: '123456',
									serialNum: 4,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										const widthSize = getBgObj().width * .4;
										const heightSize = addHeight;
										const countSize = widthSize > heightSize ? heightSize : widthSize;
										const size = countSize * .9;
										return {
											size: size,
											dx: getBgObj().width - countSize * .95,
											dy: getBgObj().height - countSize * .95
										}
									}
								}
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					_this.poster.finalPath = d.poster.tempFilePath;
					_this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif
			
				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style scoped>
page{
  background: #ffffff;
}
.container{
	min-height: 100vh;
	background: #fff;
	padding-top: 1rpx;
  padding-bottom: 100rpx;
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
  padding: 20rpx 28rpx 0;
  box-sizing: border-box;
  background: #fff;
  border-bottom: 20rpx solid #f5f5f5;
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
	padding: 0 0 10rpx;
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
	width: 170rpx;
	height: 170rpx;
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

.fw_list{
	width: 100%;
	padding: 0 28rpx;
	box-sizing: border-box;
	background: #fff;
}
.fuwu_li{
	width: 100%;
	height: 75rpx;
	display: flex;
	align-items: center;
	/* border-top: 1px solid #eee; */
}

.fuwu_li text{
	font-size: 24rpx;
	color: #666;
	margin-left: 10rpx;
}
.fw_msg{
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	font-size: 24rpx;
	color: #999;
}
.fuwu_li .d1{
	flex: none;
	font-size: 30rpx;
	color: #333;
	margin-bottom: 10rpx;
}
.tk_text{
	width: 100%;
	padding: 0 0 28rpx;
	box-sizing: border-box;
	background: #fff;
}
.tk_text textarea{
	width: 100%;
	height: 220rpx;
	border:1px solid rgba(210,210,210,1);
  border-radius:10rpx;
	padding: 12rpx;
	box-sizing: border-box;
	font-size: 24rpx;
}
.tk_text view{
	border-bottom-right-radius: 12rpx;
	border-bottom-left-radius: 12rpx;
  box-sizing: border-box;
	background: #eee;
  font-size: 24rpx;
  color: #666;
  text-align: right;
  padding: 0 12rpx 10rpx 0;
}
.imgbox{
	display: flex;
	flex-wrap: wrap;
	width: 100%;
}
.addimg{
	width: 200rpx;
	height: 200rpx;
	margin: 20rpx 1.5%;
	
	display: flex;
	justify-content: center;
	align-items: center;
	
}
.addimg image{
	width: 200rpx;
	height: 200rpx;
}
.addimg1{
	width: 200rpx;
	height: 200rpx;
	margin: 20rpx 1.5%;
}
.addimg1>image{
	width: 100%;
	height: 100%;
	/* border-radius: 20rpx; */
}

.daiyan_cz{
  width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
  padding: 0 28rpx;
  box-sizing: border-box;
}
.daiyan_cz view{
  flex: 1;
  height:77rpx;
  border:2rpx solid rgba(247,172,57,1);
  border-radius:39rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color:#F7AC39;
}
.daiyan_cz view.sq_btn{
  background:rgba(247,172,57,1);
  color: #fff;
}
.haibao{
  width:238rpx;
  height:77rpx;
  border:2rpx solid rgba(247,172,57,1);
  border-radius:9rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
  color:#F7AC39;
}
view.haibao_box{
  margin: 20rpx 0;
}
.haibao_box{
  width:190rpx;
  height:338rpx;
  border-radius:10rpx;
}
.zp_tip{
  font-size: 24rpx;
  color: #ea4628;
  padding-bottom: 20rpx;
}
.order_tip{
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #666;
}

.quan_goods{
  margin-top: 30rpx;
  width: 100%;
  height:238rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
}
.quan_goods_img{
  width:196rpx;
  height:196rpx;
  border-radius:10rpx;
  margin-right: 20rpx;
}
.quan_goods_msg{
  flex: 1;
}
.quan_goods_name{
  font-size: 30rpx;
  color: #333;
  margin-bottom: 22rpx;
}
.quan_goods_pri{
  color: #EB4443;
  font-size: 30rpx;
  margin-bottom: 50rpx;
}
.quan_goods_pri .pri2{
  margin-left: 20rpx;
  text-decoration:line-through;
  color:#999;
}
.quan_goods_btn{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color:#333;
}
.goods_btn1{
  padding: 0 9rpx;
  height:40rpx;
  line-height: 40rpx;
  background:rgba(254,135,53,1);
  border-radius:10rpx;
  color: #fff;
}
.goods_btn2 text{
  color: #FE8735;
}
.bitian{
  color: #F7AC39;
}
.tab_box{
  margin-bottom: 20rpx;
  font-size: 30rpx;
}
.tab_box view{
  width:133rpx;
  text-align: center;
}
.tab_box text{
  position: relative;
  top: 20rpx;
  color: #999;
}
.typecur{
  border-bottom: 12rpx solid #F9B234;
	color: #333;
}
.typecur text{
  color: #333;
}


/* hb_canvas */
.widget{
  position: fixed; 
 top: -999999px;
  /* top: 1px; */
}
.hb_canvas{
  width: 750rpx;
  height: 1334rpx;
  position: relative;
}
.hb_bg{
  width: 750rpx;
  height: 1334rpx;
  position: relative;
  z-index: 1;
}
.hb_xcxm{
  position: absolute;
  top: 494rpx;
  left: 254rpx;
  width: 243rpx;
  height: 243rpx;
  z-index: 5;
}
.user_msg{
  position: absolute;
  top: 900rpx;
  left: 60rpx;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200rpx;
}
.user_tx{
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  margin-bottom: 10rpx;
}
.user_name{
  font-size: 30rpx;
  color: #333;
}
.user_lv{
  height:32rpx;
  border:1px solid rgba(254,135,53,1);
  border-radius:8rpx;
  color: #FE8735;
  font-size: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10rpx;
}
.user_lv text{
  font-size: 20rpx;
}
.hb_tab{
  position: absolute;
  z-index: 5;
  top: 1148rpx;
  left: 50rpx;
  width: 646rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.hb_tab>view{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.hb_tab .d1{
  font-size: 26rpx;
  color: #999;
  margin-bottom: 10rpx;
}
.hb_tab .d2{
  font-size: 26rpx;
  color: #FE8735;
}
.hb_tab .d2 text{
  font-size: 48rpx;
  font-weight: bold;
}
.goods_more{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  color: #333;
  height: 80rpx;

}
.gm_more{
  color: rgba(254,135,53,1);
}



/*aaasss*/

.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}

	.backgroundColor-white {
		background-color: white;
	}

	.border_radius_10px {
		border-radius: 10px;
	}

	.padding1vh {
		padding: 1vh;
	}

	.posterImage {
		width: 60vw;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
