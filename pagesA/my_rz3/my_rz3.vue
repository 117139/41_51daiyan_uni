<template>
	<view>
		<form class="w100" @submit="formSubmit">
		  <view class='container'>
		    <image class="rz_jd" :src="filter.imgIP('/static_s/51daiyan/images/rz_jd3_02.jpg')"></image>
		    <view class="hx10"></view>
		    <view class="hx10"></view>
		    <view class="sh_type">  
		      <image class="rz_sh" :src="filter.imgIP('/static_s/51daiyan/images/rz_sh.png')"></image>
					<!-- 1：未认证  2：审核中  3：审核通过  4：审核未通过 -->
		      <text>{{loginMsg.auth_status==1?'未认证':loginMsg.auth_status==2?'审核中':loginMsg.auth_status==3?'审核通过':'审核未通过'}}</text>
		      <text v-if="loginMsg.auth_status==4" class="jjyy">{{loginMsg.auth_cause}}</text>
		    </view>
		    <button class="definebtn" form-type="submit">{{loginMsg.auth_status!=4?'确定':'重新认证'}}</button>
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
		onLoad() {
			uni.showLoading({
				title:'正在获取状态',
				mask:true
			})
			service.wxlogin()
		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function () {
		  wx.stopPullDownRefresh();
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
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
			  if(that.loginMsg.auth_status!=4){
					wx.switchTab({
					  url: '/pages/my/my'
					})
				}else{
					wx.redirectTo({
					  url: '/pagesA/my_rz1/my_rz1'
					})
				}
			  
			  
			}
		}
	}
</script>

<style scoped>
.jjyy{
	margin-top: 40upx;
	font-size: 24upx;
	color: #999;
}
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
  margin-bottom: 40rpx;
}
</style>
