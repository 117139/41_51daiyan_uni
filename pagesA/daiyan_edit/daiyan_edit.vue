<template>
	<view>
		
			<view v-if="htmlReset==1" class="zanwu" @tap='onRetry'>请求失败，请点击重试</view>
		<view class="container" v-if="htmlReset==0">
		 
		  <image :src="src" style="width: 375px; height: 667px;position:fixed;top:-9999999px;"></image>
		  <view class="goodsBox w100">
		    <view v-if="open_type>idx" class="quan_goods" v-for="(item,idx) in dy_fb_list" @tap="jump" data-url="/pages/details/details">
		      <image class="quan_goods_img" :src="filter.imgIP(item.g_img[0])" mode="aspectFill"></image>
		      <view class="quan_goods_msg">
		        <view class="quan_goods_name oh1">{{item.g_title}}</view>
		        <view class="quan_goods_pri">
		          <text class="pri1">￥{{item.g_current_price}}</text>
		          <text class="pri2">¥{{item.g_original_price}}</text>
		        </view>
		        <view class="quan_goods_btn">
		          <view class="goods_btn1">库存:{{item.g_total_number}}</view>
		          <view class="goods_btn2">
		            <text>{{item.g_advocacy_mannumber}}</text>代言人</view>
		        </view>
		      </view>
		    </view>
		    <view class="goods_more" v-if="open_type==2">
		      <view>共{{dy_fb_list.length}}件</view>
		      <view class="gm_more" @tap="open_more">点击查看更多</view>
		    </view>
		  </view>
		  <view class='dis_flex ju_a w100 pb40 pt20 bgfff tab_box'>
		    <!-- <block  v-for="(item,idx) in datalist"> -->
		      <view :class="type==1?'typecur':'c9'" :data-type="1" @tap='bindcur'><text>图片代言</text></view>
		      <view :class="type==2?'typecur':'c9'" :data-type="2" @tap='bindcur'><text>视频代言</text></view>
		      <view v-if="dy_fb_list.length==1" :class="type==3?'typecur':'c9'" :data-type="3" @tap='bindcur'><text>海报代言</text></view>
		    <!-- </block> -->
		
		  </view>
		  <view class="fw_list" v-show="type==1">
		    <view class="fuwu_li">
		      <view class="d1">上传商品图片</view>
		      <view class="fw_msg">
		
		      </view>
		    </view>
		    <view class="imgbox mb20">
		      <view class="addimg1" v-for="(item,idx) in imgb" :data-idx="idx" @tap="imgdel">
		        <!-- <image src="filter.imgIP(item)}}" data-src="filter.imgIP(item)}}" mode="aspectFill"></image> -->
		        <image :src="filter.imgIP(item)" :data-src="item" mode="aspectFill"></image>
		      </view>
		
		      <view v-if="imgb.length<9" class="addimg" @tap="scpic">
		
		        <image :src="filter.imgIP('/static_s/51daiyan/images/upimg1.jpg')"></image>
		      </view>
		    </view>
		
		
		  </view>
		  <view class="fw_list"  v-show="type==2">
		    <view class="fuwu_li">
		      <view class="d1">上传商品视频</view>
		      <view class="fw_msg">
		
		      </view>
		    </view>
		    <view class="imgbox mb20">
		      <view class="addimg1" v-if="sp_url" @tap="chooseVideo">
		        <!-- <image src="filter.imgIP(item)}}" data-src="filter.imgIP(item)}}" mode="aspectFill"></image> -->
		        <image :src="filter.imgIP_video(sp_url)" mode="aspectFill"></image>
		      </view>
		
		      <view wx:else class="addimg" @tap="chooseVideo">
		
		        <image :src="filter.imgIP('/static_s/51daiyan/images/upimg1.jpg')"></image>
		      </view>
		    </view>
		
		
		  </view>
		  <view class="fw_list" v-show="type==3">
				
				<view class="fuwu_li">
					<view class="d1">选择海报模板</view>
					<view class="fw_msg">
					
					</view>
				</view>
				<scroll-view scroll-x class="hb_moban_list">
					<view class="hb_moban_li" :class="mb_cur==index?'cur':''" @tap="mb_cur=index" v-for="(item,index) in moban_list">
						<image :src="getimg(item.url)" mode=""></image>
					</view>
				</scroll-view>
		    <view class="haibao" @tap="shareFc()">生成海报</view>
		    <view  class="haibao_box">
		      <!-- <image class="haibao_box" src="{{filter.imgIP(haibao)}}"></image> -->
		      <image @tap="saveImage" v-if="src" class="haibao_box" :src="filter.imgIP(src)"></image>
		    </view>
		    <!-- <view  class="haibao_box haibao_box1">
		      <image v-if="src" class="haibao_box haibao_box1" :src="src"></image>
		    </view> -->
				
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
		    <view class="tk_text" v-show="!sheetshow">
		      <textarea placeholder="请填写您的代言…" @input="get_val" :value="yname" maxlength="500"></textarea>
		    </view>
		  </view>
		  
		  <view class="daiyan_cz">
		    
		    <view class="sq_btn" @tap="save_val">保存代言</view>
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
	import _app from '../../utils/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../utils/QS-SharePoster/QS-SharePoster.js';
	var that
	export default {
		data() {
			return {
				id:'',
				btnkg:0,
				xy_datas:'',
				htmlReset:0,
				datalist: [
				  '图片代言',
				  '视频代言',
				  '海报代言'
				],
				src: '',
				type: 0,
				data_list:[],
				open_type:2,
				
				yname:'',
				imgb:[],
				sp_url:'',
				haibao:'',
				
				dy_datas: [],
				// goods_sele: [],
				xuan: false,
				all: false,
				
				width:750,
				height: 1334,
				
				sheetshow:false,
				xdxy_type:1,
				
				
				moban_list:[
					{
						url:'/static_s/51daiyan/images/hb_moban1.jpg',
						url_bg:'/static_s/51daiyan/images/hbbg.jpg',
						dx: 254,
						dy: 494,
						width:244,
						height:244,
					},
					{
						url:'/static_s/51daiyan/images/hb_moban2.jpg',
						url_bg:'/static_s/51daiyan/images/hdhb1.jpg',
						dx: 270,
						dy: 572,
						width:208,
						height:208,
					},
					{
						url:'/static_s/51daiyan/images/hb_moban3.jpg',
						url_bg:'/static_s/51daiyan/images/hdhb2.jpg',
						dx: 283,
						dy: 517,
						width:208,
						height:208,
					},
				],
				mb_cur:0,
				poster: {
					width:750,
					height:1334
				},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				count: 0
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'dy_fb_list',
				'ov_ids',
			])
		},
		onLoad(option) {
			that =this
			if(option.id){
				that.id=option.id
			}
			this.getdata_dy()
			that.widget = that.selectComponent('.widget')
		},
		onShow(){
			
		  if (this.btnkg==1){
				that.btnkg=0
			}
		  
			console.log('我显示了')
			// this.getOrderList('onshow')
		},
		methods: {
			getimg(img){
				return service.getimg(img)
			},
			onRetry(){
				this.getdata_dy()
			},
			getdata_dy() {
				var that = this
				var datas = {
					token: that.loginMsg.userToken?that.loginMsg.userToken:'',
					id: that.id,
				}
				// 单个请求 视频代言改图片代言
				service.P_get('/advocacy/details', datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.dy_datas = res.data
						that.yname=res.data.content
						that.type=res.data.type
						if(res.data.type==1){
							that.imgb=res.data.pic
						}
						if(res.data.type==2){
							that.sp_url=res.data.pic[0]
						}
						if(res.data.type==3){
							that.src=res.data.pic[0]
						}
						that.htmlReset=0
					}else{
						that.htmlReset=1
					}
				}).catch(e => {
					console.log(e)
					that.htmlReset=1
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			xdxy_type_fuc(){
				this.xdxy_type=this.xdxy_type==1?0:1
			},
			sheetshow_fuc() {
			    this.sheetshow= true
			    this.btnkg= 0
					this.$refs.popup.open()
			
			},
			
			tkchange(e){
				console.log(e)
				this.sheetshow=e.show
			},
			onClose() {
			    this.sheetshow= false
					this.$refs.popup.close()
					if(this.xdxy_type==0){
						uni.navigateBack({
							delta:1
						})
					}
			},
			open_more(){
			  this.open_type=10000
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
				uni.showActionSheet({
						itemList: ['拍摄', '相册'],
						success: function (res) {
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								var sourceType=['camera', 'album']
								if(res.tapIndex==0){
									 sourceType=['camera']
								}else{
									sourceType=['album']
								}
							 uni.chooseVideo({
							    count: 1,
									sizeType: ['original', 'compressed'],
									sourceType:sourceType,
									success: function(res) {
										console.log(res)
										that.uploadvideo(res)
									}
								});
						},
						fail: function (res) {
							uni.showToast({
								icon:'none',
								title:'操作失败'
							})
								console.log(res.errMsg);
						}
						
				});
				return
			  wx.chooseVideo({
			    success: function (res) {
			      // that.sp_url= res.tempFilePath
						that.uploadvideo(res)
			    }
			  })
			},
			//上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
			uploadvideo(res) {
				var that=this
			  const uploadTask = uni.uploadFile({
			    url: service.IPurl+'/upload/upVvideo',//服务器接口
			    filePath: res.tempFilePath,
			    name: 'file',
			    formData: {},
			    success: function (res) {
			      console.log('视频上传成功')
						console.log
						if(typeof res.data=='string'){
							var ndata = JSON.parse(res.data)
						}else{
							var ndata = res.data
						}
						if (ndata.code == 1) {
						  // console.log(imgs[i], i,ndata.msg)
						  // var newdata = that.imgb
							that.sp_url= ndata.msg
							wx.showToast({
							  icon: "none",
							  title: "上传成功"
							})
						} else {
						  wx.showToast({
						    icon: "none",
						    title: "上传失败"
						  })
						}
			    },
			    fail: function () {
			      console.log('接口调用失败')
			    }
			  })
				
				uploadTask.onProgressUpdate((res) => {
						console.log('上传进度' + res.progress);
						console.log('已经上传的数据长度' + res.totalBytesSent);
						console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						// uni.showLoading({
						// 	mask:'true',
						// 	title: '上传进度：' + res.progress
						// });
						uni.showLoading({
							mask:'true',
							title: '正在上传视频'
						});
						// 测试条件，取消上传任务。
						// if (res.progress > 50) {
						// 		uploadTask.abort();
						// }
						if (res.progress ==100) {
								// uni.hideLoading()
								uni.showLoading({
									mask:'true',
									title: '正在校验视频'
								});
						}
				});
			},
			save_val(){
			  var that = this
			  var type = that.type
				var path_list=''
			  if (type == 1) {
			    if (that.imgb.length == 0) {
			      wx.showToast({
			        icon: 'none',
			        title: '请上传商品图片',
			      })
			      return
			    }
					path_list=that.imgb.join(',')
			  }
			  if (type == 2) {
			    if (!that.sp_url) {
			      wx.showToast({
			        icon: 'none',
			        title: '请上传商品视频',
			      })
			      return
			    }
					path_list=that.sp_url
			  }
			  if (type == 3) {
			    if (!that.src) {
			      wx.showToast({
			        icon: 'none',
			        title: '请生成海报',
			      })
			      return
			    }
					path_list=that.src
			  }
			  
			  
				if(!that.yname){
					wx.showToast({
					  icon: 'none',
			      title: '请填写您的代言',
					})
					return
				}
				
				var jkurl='/advocacy/update'
				var data={
					token:that.loginMsg.userToken,
					id:that.id,
					content:that.yname,
					path:path_list,
					type:that.type
				}
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
				service.post(jkurl, data,
					function(res) {
						that.btnkg=0
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							
							var datas = res.data.data
							// console.log(typeof datas)
							// that.htmlReset=0
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							wx.showToast({
								icon:'none',
								title: '操作成功'
							})
							var pages = getCurrentPages();   //当前页面
							var prevPage = pages[pages.length - 2];   //上一页面
							prevPage.setData({
							  //直接给上一个页面赋值
							  daiyan_newtype: true,
							});
										
							setTimeout(function () {
							  uni.navigateBack({
							  	delta:1,
							  })
								// wx.redirectTo({
								//   url: '/pagesA/daiyan_fabu_ok/daiyan_fabu_ok?type='+that.type+'&path='+path_list,
								// })
							}, 1000)
						} else {
							// that.htmlReset=1
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
						// that.htmlReset=1
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
					
					}
				)
				
				// console.log(that.zhaungtai[that.index])
				// console.log(that.yuanyin[that.index1])
				// console.log(that.yname)
				// console.log(that.imgb)
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
				var z_count = 9 - that.imgb.length
				uni.showActionSheet({
						itemList: ['拍照', '相册'],
						success: function (res) {
								console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
								var sourceType=['camera', 'album']
								if(res.tapIndex==0){
									 sourceType=['camera']
								}else{
									sourceType=['album']
								}
								uni.chooseImage({
									count: z_count,
									sizeType: ['original', 'compressed'],
									sourceType:sourceType,
									success: function(res) {
										console.log(res)
										const tempFilePaths = res.tempFilePaths
								
										const imglen = that.imgb.length
								
										if (imglen == 9) {
											wx.showToast({
												icon: 'none',
												title: '最多可上传九张'
											})
											return
										} else {
											// that.sj_img=that.sj_img.concat(res.tempFilePaths).slice(0,9)
										}
										// return
										
										that.upimg(tempFilePaths, 0)
									}
								});
						},
						fail: function (res) {
							uni.showToast({
								icon:'none',
								title:'操作失败'
							})
								console.log(res.errMsg);
						}
						
				});
				return
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
				/*var newdata = that.imgb
				console.log(i)
				newdata.push(imgs[i])
				that.imgb= newdata
				var news1 = that.imgb.length
				if (news1 < 9&& i<imgs.length-1) {
				  i++
				  that.upimg(imgs, i)
				}*/
				// return
			  // console.log(img1)
			  wx.uploadFile({
			    url: service.IPurl+'/upload/streamImg', //仅为示例，非真实的接口地址
			    filePath: imgs[i],
			    name: 'file',
			    formData: {
			      'type': 1,
			    },
			    success(res) {
			      // console.log(res.data)
			      var ndata = JSON.parse(res.data)
			      if (ndata.code == 1) {
			        console.log(imgs[i], i,ndata.msg)
			        var newdata = that.imgb
			        console.log(i)
			        newdata.push(ndata.msg)
			        that.imgb= newdata
			        var news1 = that.imgb.length
			        if (news1 < 9&& i<imgs.length-1) {
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
			
			
			jump(e) {
			  service.jump(e)
			},
			async shareFc() {
				let _this = this;
				try {
					this.count++;
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: _this, //若在组件中使用 必传
						type: 'testShareType',
						backgroundImage:service.imgurl+that.moban_list[that.mb_cur].url_bg,
						formData: {
							//访问接口获取背景图携带自定义数据
			
						},
						posterCanvasId: _this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						// background: {
						// 	height: 10,
						// 	width: 10
						// },
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
							return [
								{
									type: 'image',
									id: 'productImage',
									// url: _this.count % 2 === 0 ? '/static/1.png' : '/static/2.jpg',
									// url: 'http://51daiyan.test.upcdn.net/static_s/51daiyan/images/ewm.png',
									// url: 'http://51daiyan.test.upcdn.net/static_s/51daiyan/images/xcxm.jpg',
									url: that.loginMsg.personal_code,
									// url: service.imgurl+'/static_s/51daiyan/images/xcx_zs.jpg',
									dx: that.moban_list[that.mb_cur].dx,
									dy: that.moban_list[that.mb_cur].dy,
									serialNum: 0,
									circleSet:true,
									infoCallBack(imageInfo) {
										let width;
										let height;
										
										width=that.moban_list[that.mb_cur].width
										height=that.moban_list[that.mb_cur].height
										
										return {
											dWidth: width,
											dHeight: height
										}
									}
								},
								{
									type: 'image',
									id: 'userImage',
									// url: _this.count % 2 === 0 ? '/static/1.png' : '/static/2.jpg',
									url: _this.loginMsg.avatarurl,
									// url:service.imgurl+'/static_s/51daiyan/images/logo.png',
									dx: 100,
									dy: 900,
									serialNum: 0,
									infoCallBack(imageInfo) {
										let width;
										let height;
										
										width=120
										height=120
										
										return {
											dWidth: width,
											dHeight: height,
											circleSet:true
										}
									}
								},
								{
									type: 'text',
									id: 'productName',
									text: _this.loginMsg.nickname,
									// text: '51代言',
									color: '#000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 30,
												textAlign:'center',
											lineFeed: {
												maxWidth: 120,
												lineNum: 1
											},
											dx: 152,
											dy: 1044,
										}
									}
								},
								
								{
									type: 'text',
									id: 'userLv',
									text: _this.loginMsg.advocacy_grade_value,
									color: '#000',
									serialNum: 1,
									allInfoCallback({
										drawArray
									}) {
										const productImage = drawArray.find(item => item.id === 'productImage')
										const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 20,
											color: '#FE8735',
											lineFeed: {
												maxWidth: 120,
												lineNum: 1
											},
											dx: 210,
											dy: 1080,
										}
									}
								},
								
								{
									type: 'text',
									text: _this.loginMsg.advocacy_goods_number+'件',
									// text: '10件',
									serialNum: 3,
									allInfoCallback({
										drawArray
									}) {
										// const productImage = drawArray.find(item => item.id === 'productImage')
										// const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 30,
											color:'#FE8735',
											textAlign:'center',
											lineFeed: {
												maxWidth: 120,
												lineNum: 1
											},
											dx: 150,
											dy: 1210,
										}
									}
								},
								{
									type: 'text',
									text: _this.loginMsg.follow_buy_goods_number+'件',
									// text: '100件',
									serialNum: 3,
									allInfoCallback({
										drawArray
									}) {
										// const productImage = drawArray.find(item => item.id === 'productImage')
										// const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 30,
											color:'#FE8735',
											textAlign:'center',
											lineFeed: {
												maxWidth: 120,
												lineNum: 1
											},
											dx: 360,
											dy: 1210,
										}
									}
								},
								{
									type: 'text',
									text: _this.loginMsg.exceed_number+'%好友',
									// text: '100%好友',
									serialNum: 3,
									allInfoCallback({
										drawArray
									}) {
										// const productImage = drawArray.find(item => item.id === 'productImage')
										// const addHeight = getBgObj().height - productImage.dHeight;
										return {
											size: 30,
											color:'#FE8735',
											textAlign:'center',
											lineFeed: {
												maxWidth: 120,
												lineNum: 1
											},
											dx: 585,
											dy: 1210,
										}
									}
								},
								
							]
						}
					})
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					_this.poster.finalPath = d.poster.tempFilePath;
					_this.qrShow = true;
					// _this.src=d.poster.tempFilePath
					wx.uploadFile({
					  url: service.IPurl+'/upload/streamImg', //仅为示例，非真实的接口地址
					  filePath:d.poster.tempFilePath,
					  name: 'file',
					  formData: {
					    'type': 1,
					  },
					  success(res) {
					    // console.log(res.data)
					    var ndata = JSON.parse(res.data)
					    if (ndata.code == 1) {
					      // console.log(imgs[i], i,ndata.msg)
					      // var newdata = that.imgb
					      // console.log(i)
					      // newdata.push(ndata.msg)
					      _this.src= ndata.msg
								_this.poster.finalPath=service.imgurl+ndata.msg
								 wx.showToast({
									 icon: "none",
									 title: "上传成功"
								 })
					    } else {
					      wx.showToast({
					        icon: "none",
					        title: "上传失败"
					      })
					    }
					  }
					})
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.showModal({
				    title: '提示',
				    content: '是否保存',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										// uni.saveImageToPhotosAlbum({
										// 	filePath: that.poster.finalPath,
										// 	success(res) {
										// 		_app.showToast('保存成功');
										// 	}
										// })
										uni.downloadFile({
										    url: service.imgurl+that.src,
										    success: (res) => {
										        if (res.statusCode === 200) {
										            console.log('下载成功');
																uni.hideLoading()
																uni.saveImageToPhotosAlbum({
																	filePath: res.tempFilePath,
																	success(res) {
																		uni.showToast({
																			title:'保存成功'
																		});
																	},
																	fail(res) {
																		console.log(res)
																		uni.showToast({
																			title:res
																		});
																	},
																})
										        }
										    }
										});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
				// #endif
				// #ifdef H5
				// _app.showToast('保存了');
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
	.dyxy_box{
		width:694upx;
		max-height: 1150upx;
		background: #fff;
		border-radius: 18upx;
		padding: 30upx 44upx;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		/* position: absolute; */
		margin: 0 auto;
		
	}
	.dyxy_tit{
		text-align: center;
		font-size: 36upx;
		color: #000;
		margin-bottom: 26upx;
	}
	.dyxy_inr{
		font-size: 28upx;
		color: #666;
	}
	.next_btn{
		margin: 5px auto;
		font-size: 28upx;
		color: #fff;
		width:330upx;
		height:80upx;
		background:rgba(244,116,22,1);
		border-radius:18upx;
		align-items: center;
		justify-content: center;
	}
	.ydxy_btn{
		align-items: center;
		color: #F47416;
		font-size: 24upx;
		line-height: 40upx;
	}
	.ydxy_btn .d1{
		width: 12px;
		height: 12px;
		border-radius:50%;
		border:1px solid #ddd;
		align-items: center;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin-right: 6upx;
	}
	.ydxy_btn.cur .d1{
		border:0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.ydxy_btn.cur .d1 image{
		width: 12px;
		height: 12px;
		border-radius:50%;
	}
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
.haibao_box1{
	width:600rpx;
	height:1114rpx;
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
		border-radius: 10rpx;
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
	
	
	
	
	
	.hb_moban_list{
		width: 100%;
	    background: #fff;
	    height: 345rpx;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    white-space: nowrap;
	    margin-bottom: 20rpx;
	}
	.hb_moban_li{
		width:190rpx;
		height:338rpx;
		border-radius:10rpx;
		margin-right: 15upx;
		border:1px solid #fff;
		display: inline-flex;
	}
	.hb_moban_li image{
		width:190rpx;
		height:338rpx;
	}
	.hb_moban_li.cur{
		/* width:195rpx;
		height:345rpx; */
		border:1px solid #FF0000;
	}
</style>
