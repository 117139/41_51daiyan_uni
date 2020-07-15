<template>
	<view>
		<form class="w100" @submit="formSubmit">
		  <view class='container'>
		    <image class="rz_jd" :src="filter.imgIP('rz_jd3_02.jpg')"></image>
		    <view class="hx10"></view>
		    <view class="hx10"></view>
		    <view class="sh_type">  
		      <image class="rz_sh" :src="filter.imgIP('rz_sh.png')"></image>
		      <text>审核中</text>
		    </view>
		    <button class="definebtn" form-type="submit">确定</button>
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
				sf: [
				  { name: '身份1', value: '1' },
				  { name: '身份2', value: '2' },
				],
				index:'0',
				sfimg1:'',
				sfimg2:'',
				yxtime1: '',
				yxtime2:'',
			}
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
		},
		methods: {
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
			  wx.showActionSheet({
			    itemList: ['拍照上传', '本地图片'],
			    success(res) {
			      console.log(res.tapIndex)
			      if (res.tapIndex == 0) {
			        //拍照
			        wx.chooseImage({
			          count: 1,
			          sizeType: ['original'],
			          sourceType: ['camera'],
			          success(res) {
			            // tempFilePath可以作为img标签的src属性显示图片
			            console.log(res)
			            const tempFilePaths = res.tempFilePaths
			            // wx.setStorageSync('image_c', tempFilePaths[0])
			            if (sf_type==1){
			              that.sfimg1= tempFilePaths[0]
			            }else{
			              that.sfimg2= tempFilePaths[0]
			            }
			            
			            // wx.navigateTo({
			            //   url: '/pages/cropper/cropper-example?&type=' + e.currentTarget.dataset.type,
			            // })
			            /*const imglen = that.data.imgb.length
			            that.upimg(tempFilePaths, 0)*/
			
			          }
			        })
			      }
			      if (res.tapIndex == 1) {
			        //本地
			        wx.chooseImage({
			          count: 1,
			          sizeType: ['original'],
			          sourceType: ['album'],
			          success(res) {
			            // tempFilePath可以作为img标签的src属性显示图片
			            console.log(res)
			            const tempFilePaths = res.tempFilePaths
			            if (sf_type == 1) {
			              that.sfimg1= tempFilePaths[0]
			            } else {
			              that.sfimg2= tempFilePaths[0]
			            }
			            // wx.setStorageSync('image_c', tempFilePaths[0])
			            // wx.navigateTo({
			            //   url: '/pages/cropper/cropper-example?&type=' + e.currentTarget.dataset.type,
			            // })
			            /*const imglen = that.data.imgb.length
			            that.upimg(tempFilePaths, 0)*/
			
			          }
			        })
			      }
			    },
			    fail(res) {
			      console.log(res.errMsg)
			    }
			  })
			
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
			formSubmit: function (e) {
			  var that = this
			  wx.switchTab({
			    url: '/pages/my/my'
			  })
			  
			  return
			
			  wx.showModal({
			    title: '提示',
			    content: '是否上传',
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
			              url:'pages/my_rz2/my_rz2'
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
			  })
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

.sh_type{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 0;
}
.sh_type image{
  width:80rpx;
  height:80rpx;
  margin-bottom: 20rpx;
}
</style>
