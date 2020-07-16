<template>
	<view>
		<form class="w100" @submit="formSubmit">
		  <view class='container'>
		    <image class="rz_jd" :src="filter.imgIP('/static_s/51daiyan/images/rz_jd_02.jpg')"></image>
		    <view class="hx10"></view>
		    <picker class="w100" @change="bindPickerChange" :value="index" :range="catelist" range-key='title'>
		      <view class="msg_box">
		        <text class="msg_name">认证身份</text>
		        <view class="dis_flex aic msg_val">{{catelist[index].title}}
		
		        </view>
		        <text class="iconfont iconnext3 c9 fz30"></text>
		      </view>
		      <input class="hidden" name="sfid" type="text" :value="catelist[index].id" disabled/>
		
		    </picker>
		    <view class="hx10"></view>
		    <view class="sfrz_tit">请提交身份证信息，仅用于平台审核</view>
		    <view class="sf_sfz">
		      <view @tap="scpic" data-type="1">
		        <image class="sfzimg" :src="sfimg1?filter.imgIP(sfimg1):filter.imgIP('/static_s/51daiyan/images/rz_img_05.jpg')" mode="aspectFill"></image>
		        <input class="hidden" name="sfimg1" type="text" :value="sfimg1" disabled/>
		        <text class="fz30">身份证姓名面</text>
		      </view>
		      <view @tap="scpic" data-type="2">
		        <image class="sfzimg" :src="sfimg2?filter.imgIP(sfimg2):filter.imgIP('/static_s/51daiyan/images/rz_img_07.jpg')" mode="aspectFill"></image>
		        <input class="hidden" name="sfimg2" type="text" :value="sfimg2" disabled/>
		        <text class="fz30">身份证国徽面</text>
		      </view>
		    </view>
		    <!-- 身份证信息 -->
		    <view class="msg_box b0">
		      <text class="msg_name">身份证信息</text>
		      <view class="dis_flex aic msg_val"></view>
		
		    </view>
		    <view class="sf_box">
		      <view class="sfxx_box">
		        <text>姓名</text>
		        <input name="sfz_name" placeholder="请输入姓名"></input>
		      </view>
		      <view class="sfxx_box">
		        <text>身份证号</text>
		        <input name="sfz_id" placeholder="请输入身份证号"></input>
		      </view>
		      <view class="sfxx_box">
		        <text>有效期</text>
		        <view class="sf_time">
		          <picker class="yx_time" mode="date" @change="bindTimeChange" :value="index">
		
		            <view  class="yx_time fz28">{{yxtime1?yxtime1:'--'}}</view>
		            <input class="hidden" name="yxtime1" type="text" :value="yxtime1" disabled/>
		          </picker>
		          <view class="fz30">至</view>
		          <picker  class="yx_time" mode="date" @change="bindTimeChange2" :value="index">
		            <view class="yx_time fz28">{{yxtime2?yxtime2:'--'}}</view>
		            <input class="hidden" name="yxtime2" type="text" :value="yxtime2" disabled/>
		          </picker>
		        </view>
		      </view>
		    </view>
		    <button class="definebtn" form-type="submit">保存并进行下一步</button>
		  </view>
		</form>
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
				uname: '',
				sname: '',
				catelist: [],
				index:'0',
				sfimg1:'',
				sfimg2:'',
				yxtime1: '',
				yxtime2:'',
			}
		},
		onLoad() {
			this.getclist()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
		},
		methods: {
			...mapMutations(['saverz','login']),
			reset_val() {
			  this.uname= ''
			},
			bindPickerChange: function (e) {
			
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.index= e.detail.value
			},
			scpic(e) {
			  var that = this
			  console.log(e.currentTarget.dataset.type)
			  var sf_type = e.currentTarget.dataset.type
			  // wx.showActionSheet({
			  //   itemList: ['拍照上传', '本地图片'],
			  //   success(res) {
			  //     console.log(res.tapIndex)
			  //     if (res.tapIndex == 0) {
			  //       //拍照
			  //       wx.chooseImage({
			  //         count: 1,
			  //         sizeType: ['original'],
			  //         sourceType: ['camera'],
			  //         success(res) {
			  //           // tempFilePath可以作为img标签的src属性显示图片
			  //           console.log(res)
			  //           const tempFilePaths = res.tempFilePaths
			  //           if (sf_type==1){
			  //             that.setData({
			  //               sfimg1: tempFilePaths[0]
			  //             })
			  //           }else{
			  //             that.setData({
			  //               sfimg2: tempFilePaths[0]
			  //             })
			  //           }
			            
			        
			  //         }
			  //       })
			  //     }
			  //     if (res.tapIndex == 1) {
			        //本地
			        uni.chooseImage({
			          count: 1,
			          sizeType: ['original'],
			          sourceType: ['album','camera'],
			          success(res) {
			            // tempFilePath可以作为img标签的src属性显示图片
			            console.log(res)
			            const tempFilePaths = res.tempFilePaths
									wx.uploadFile({
									  url: service.IPurl+'/upload/streamImg', //仅为示例，非真实的接口地址
									  filePath: tempFilePaths[0],
									  name: 'file',
									  formData: {
									    'type': 1,
									  },
									  success(res) {
									    // console.log(res.data)
									    var ndata = JSON.parse(res.data)
									    // console.log(ndata)
									    // console.log(ndata.error == 0)
									    if (ndata.code == 1) {
									      console.log(ndata.msg)
									      if (sf_type == 1) {
									        that.sfimg1= ndata.msg
									       
									      } else {
									        that.sfimg2= ndata.msg
									       
									      }
									    } else {
									      wx.showToast({
									        icon: "none",
									        title: "上传失败"
									      })
									    }
									  }
									})
			            
			            // wx.setStorageSync('image_c', tempFilePaths[0])
			            // wx.navigateTo({
			            //   url: '/pages/cropper/cropper-example?&type=' + e.currentTarget.dataset.type,
			            // })
			            /*const imglen = that.data.imgb.length
			            that.upimg(tempFilePaths, 0)*/
			
			          }
			        })
			  //     }
			  //   },
			  //   fail(res) {
			  //     console.log(res.errMsg)
			  //   }
			  // })
			
			},
			bindTimeChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.yxtime1 = e.detail.value
			  this.yxtime1= this.yxtime1
			},
			bindTimeChange2(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.yxtime2 = e.detail.value
			  this.yxtime2= this.yxtime2
			},
			get_val(e) {
			  console.log(e.detail)
			  this.sname= e.detail.value
			},
			getclist(){
				var that =this
				var jkurl='/cate/list'
				var data={
					type:1
				}
				service.get(jkurl, data,
					function(res) {
						
						// if (res.data.code == 1) {
						if (res.data.code == 1) {
							var datas = res.data.data
							// console.log(typeof datas)
							
							if (typeof datas == 'string') {
								datas = JSON.parse(datas)
							}
							that.catelist=datas
						} else {
							if (res.data.msg) {
								uni.showToast({
									icon: 'none',
									title: res.data.msg
								})
							} else {
								uni.showToast({
									icon: 'none',
									title: '获取身份失败'
								})
							}
						}
					},
					function(err) {
						that.btnkg=0
						
							uni.showToast({
								icon: 'none',
								title: '获取数据失败'
							})
					
					}
				)
			},
			formSubmit: function (e) {
			  var that = this
			  console.log('form发生了submit事件，携带数据为：', e.detail.value)
			
			
			  var fs = e.detail.value
			  if (!fs.sfimg1 & !fs.sfimg2) {
			    wx.showToast({
			      icon: 'none',
			      title: '请上传身份证图片'
			    })
			    return
			  }
			
			  if (!fs.sfz_name) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入姓名'
			    })
			    return
			  }
			  if (!fs.sfz_id) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入身份证号'
			    })
			    return
			  }
			  if (!fs.yxtime1) {
			    wx.showToast({
			      icon: 'none',
			      title: '请选择有效期'
			    })
			    return
			  }
			  if (!fs.yxtime2) {
			    wx.showToast({
			      icon: 'none',
			      title: '请选择有效期'
			    })
			    return
			  }
				that.saverz(fs)
				wx.navigateTo({
				  url:'/pagesA/my_rz2/my_rz2'
				})
			  /*wx.showModal({
			    title: '提示',
			    content: '是否提交',
			    success(res) {
			      if (res.confirm) {
			        console.log('用户点击确定')
			        wx.showLoading({
			          title: '正在提交。。',
			          mask: true
			        })
			        setTimeout(function(){
			          wx.showToast({
			            icon: 'none',
			            title: '提交成功',
			            duration: 2000
			          })
			          setTimeout(function () {
			            wx.navigateTo({
			              url:'/pagesA/my_rz2/my_rz2'
			            })
			          }, 1000)
			        }, 1000)
			        return
			        wx.request({
			          url: app.IPurl + '/api/index/save',
			          data: {
			
			            title: that.bookname,
			            book_width: fs.book_h,//(图书高)
			            author: fs.book_user,//(作者)
			            isbn: fs.book_ISBN,//(ISBN)
			            name: fs.book_myname,//(姓名)
			            tel: fs.book_tel,//(联系方式)
			            pic_book: fs.book_img1,//(书脊)
			            pic_cover: fs.book_img2,//(封面)
			            pic_rests: fs.book_img3,//(其他)
			          },
			          header: {
			            'content-type': 'application/x-www-form-urlencoded'
			          },
			          dataType: 'json',
			          method: 'POST',
			          success(res) {
			            wx.hideLoading()
			            console.log(res.data)
			
			
			            if (res.data.code == 1) {
			
			              wx.showToast({
			                icon: 'none',
			                title: '提交成功',
			                duration: 2000
			              })
			              setTimeout(function () {
			                wx.navigateBack()
			
			              }, 1000)
			
			            } else {
			              if (res.data.msg) {
			                wx.showToast({
			                  icon: 'none',
			                  title: res.data.msg
			                })
			              } else {
			                wx.showToast({
			                  icon: 'none',
			                  title: '操作失败'
			                })
			              }
			            }
			
			
			          },
			          fail() {
			            wx.hideLoading()
			            wx.showToast({
			              icon: 'none',
			              title: '操作失败'
			            })
			          }
			        })
			
			      } else if (res.cancel) {
			        console.log('用户点击取消')
			      }
			    }
			  })*/
			}
		}
	}
</script>

<style scoped>
page{
	overflow-y: auto!important;
	background: #fff;
}
.container{
	width: 750rpx;
	min-height: 100vh;
	
	background: #fff;
}
.hx10{
  width: 100%;
  height: 10rpx;
  background: #f5f5f5;
}
.rz_jd{
  width: 100%;
  height:138rpx;
}

.msg_box{
	width: 100%;
	height: 110rpx;
	border-bottom: 1px solid #eee;
	display: flex;
	font-size: 30rpx;
	color: #333;
	justify-content: space-between;
	align-items: center;
	padding: 0 24rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
}

.msg_val{
	color: #9c9c9c;
  flex:1;
  flex-direction: row-reverse
}
.iconnext{
	font-size: 24rpx;
	color: #919191;
	margin-left: 10px;
}
.definebtn{
  margin: 20rpx auto 50rpx;
	border-radius: 10rpx;
  width:572rpx;
  height:80rpx;
  background:rgba(244,116,22,1);
	
	margin-top: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 28rpx;
}
.sfrz_tit{
  width: 100%;
  height: 90rpx;
 
  color: #F47416;
  font-size: 24rpx;  
  display: flex;
  align-items: center;
  justify-content: center;
}
.sf_sfz{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 70rpx;
}
.sf_sfz>view{
  width:312rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  color:#BBBBBB;
}
.sfzimg{
  width:312rpx;
  height:206rpx;
  /* border:2rpx solid rgba(244,116,22,1); */
  border-radius:10rpx;
  margin-bottom: 19rpx;
  
}
.b0{
  border: 0;
}
.sf_box{
  width: 100%;
  padding: 0 28rpx;
  box-sizing: border-box;
}
.sfxx_box{
  width:100%;
  height:85rpx;
  border:1px solid rgba(229,229,229,1);
  border-radius:10rpx;
  display: flex;
  margin-bottom: 35rpx;
  align-items: center;
  padding: 0 28rpx;
  box-sizing: border-box;

}
.sfxx_box text{
  min-width: 5em;
  font-size: 30rpx;
  color: #BBBBBB;
}
.sfxx_box input{
  flex: 1;
  font-size: 30rpx;
  color: #333;
  text-align: right;
}
.sf_time{
  flex: 1;
  display: flex;
  align-items: center;
}
.yx_time{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.yx_time view{
  width: 200rpx;
}
</style>
