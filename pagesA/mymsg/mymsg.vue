<template>
	<view>
		<form class="w100" @submit="formSubmit">
		  <view class='container'>
		    <view class="tx_box" >
		      <!-- <image :src="loginMsg.avatarurl"  @tap="scpic"></image> -->
					<avatar stretch="short"
					        selWidth="200px" selHeight="400upx" @upload="myUpload" :avatarSrc="loginMsg.avatarurl"
					        avatarStyle="width: 165rpx; height: 165rpx; border-radius: 100%;">
					    </avatar>
		      <text class="msg_name" >点击更换头像</text>
		    </view>
		    <view class="msg_box" @tap="jump" data-url="/pagesA/my_name/my_name">
		      <text class="msg_name">姓名</text>
		       <view class="dis_flex aic msg_val">{{loginMsg.nickname?loginMsg.nickname:''}}</view>
		        <text class="iconfont iconnext3 c9 fz30"></text>
		    </view>
		    <view class="msg_box">
		      <text class="msg_name">代言号</text>
		       <view class="dis_flex aic msg_val">{{loginMsg.identification_id?loginMsg.identification_id:''}}</view>
		    </view>
		    
		    <view class="msg_box" @tap="jump" data-url="/pagesA/my_jj/my_jj">
		      <text class="msg_name">简介</text>
		       <view class="dis_flex aic msg_val " style="text-align: right;">
						 <view class="oh1">{{loginMsg.introduction?loginMsg.introduction:''}}</view>
					 </view>
		        <text class="iconfont iconnext3 c9  fz30"></text>
		    </view>
		    <view class="msg_box" @tap="jump" data-url="/pagesA/my_xuexiao/my_xuexiao">
		      <text class="msg_name">学校</text>
		       <view class="dis_flex aic msg_val">{{loginMsg.school_data.school?loginMsg.school_data.school:''}}</view>
		        <text class="iconfont iconnext3 c9 fz30"></text>
		    </view>
		    <picker class="w100" @change="bindPickerChange" :value="index" :range="sex" range-key='name'>
		      <view class="msg_box">
		        <text class="msg_name">性别</text>
		        <view class="dis_flex aic msg_val">{{loginMsg.sex?loginMsg.sex:'男'}}
		          
		        </view>
		        <text class="iconfont iconnext3 c9 fz30"></text>
		      </view>
		      <input class="hidden" name="sex" type="text" :value="sex[index].value" disabled/>
		      
		    </picker>
		    <picker class="w100" mode="date" @change="bindTimeChange" :value="index" >
		      <view class="msg_box">
		        <text class="msg_name">生日</text>
		        <view class="dis_flex aic msg_val">{{loginMsg.birthday}}
		          
		        </view>
		        <text class="iconfont iconnext3 c9 fz30"></text>
		      </view>
		      
		    </picker>
		    
		  
		    <picker class="w100" mode="region" @change="bindRegionChange" :value="region">
		      <view class="msg_box">
		        <text class="msg_name">地区</text>
		        <view class="dis_flex aic msg_val">{{loginMsg.province?loginMsg.province:''}} {{loginMsg.city?loginMsg.city:''}} {{loginMsg.county?loginMsg.county:''}}
		         
		        </view>
		        <text class="iconfont iconnext3 c9 fz30"></text>
		      </view>
		
		    </picker>
		    
		    
		  </view>
		</form>
	</view>
</template>

<script module="filter" lang="wxs" src="../../utils/filter.wxs"></script>
<script>
	import service from '../../service.js';
	 import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				'member': wx.getStorageSync('member'),
				tximg:'/static/images/tx.png',
				sex:[
				  { name: '男', value: '1' },
				  { name: '女', value: '2' },
				],
				shengri:'',
				region: ["北京市", "北京市", "东城区"],
				index:0,
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  if(!this.hasLogin){
				uni.reLaunch({
					url:'../../pages/index/index'
				})
				return
			}
		},
		components: {
				avatar
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
			  this.member= wx.getStorageSync('member')
			  // 停止下拉动作
			  wx.stopPullDownRefresh();
			},
			
			/**
			 * 页面上拉触底事件的处理函数
			 */
			onReachBottom: function () {
			
			},
			
			/**
			 * 用户点击右上角分享
			 */
			onShareAppMessage: function () {
			
			},
			bindPickerChange: function(e) {
			
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.index= e.detail.value
				var data={
					token:this.loginMsg.userToken,
					sex:this.sex[e.detail.value].name,
				}
				service.setUsermsg(data)
			},
			bindTimeChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  // this.shengri = e.detail.value
			  // this.shengri= this.shengri
				var data={
					token:this.loginMsg.userToken,
					birthday:e.detail.value,
				}
				service.setUsermsg(data)
			},
			//选择地区
			bindRegionChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
				// this.region=e.detail.value
			 //  this.region= this.region
				var data={
					token:this.loginMsg.userToken,
					province:e.detail.value[0],
					city:e.detail.value[1],
					county:e.detail.value[2],
				}
				service.setUsermsg(data)
			},
			jump(e) {
			  console.log(e.currentTarget.dataset.type)
			  service.jump(e)
			},
			myUpload(rsp) {
				var that =this
					var url = rsp.path; //更新头像方式一
					wx.uploadFile({
					  url: service.IPurl+'/upload/streamImg', //仅为示例，非真实的接口地址
					  filePath: rsp.path,
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
					      var data={
									token:that.loginMsg.userToken,
									avatarurl:ndata.msg,
								}
								service.setUsermsg(data)
					    } else {
					      wx.showToast({
					        icon: "none",
					        title: "上传失败"
					      })
					    }
					  }
					})
			},
			scpic() {
			  var that = this
			  wx.chooseImage({
			    count: 1,
			    sizeType: ['original', 'compressed'],
			    sourceType: ['camera'],
			    success(res) {
			      // tempFilePath可以作为img标签的src属性显示图片
			      console.log(res)
			      const tempFilePaths = res.tempFilePaths
			      that.tximg= tempFilePaths
			      return
			      const imglen = that.imgb.length
			      that.upimg(tempFilePaths, 0)
			      /*for (var i = 0; i < tempFilePaths.length; i++) {
			        var newlen = Number(imglen) + Number(i)
			        if (newlen == 9) {
			          wx.showToast({
			            icon: 'none',
			            title: '最多可上传九张'
			          })
			          break;
			        }
			       (function(i){
			         setTimeout(function () {
			           that.upimg(tempFilePaths[i], i)
			         }, 10000)
			       }(i))
			        
			
			      }*/
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
			  // console.log(img1)
			  wx.uploadFile({
			    url: service.IPurl, //仅为示例，非真实的接口地址
			    filePath: imgs[i],
			    name: 'upfile',
			    formData: {
			      'apipage': 'uppic',
			    },
			    success(res) {
			      // console.log(res.data)
			      var ndata = JSON.parse(res.data)
			      // console.log(ndata)
			      // console.log(ndata.error == 0)
			      if (ndata.error == 0) {
			        console.log(imgs[i], i, ndata.url)
			        var newdata = that.imgb
			        console.log(i)
			        newdata.push(ndata.url)
			        that.imgb= newdata
			
			        var news1 = that.imgb.length
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
			formSubmit: function(e) {
			  console.log('form发生了submit事件，携带数据为：', e.detail.value)
			  var that =this
			  var fs = e.detail.value
			  if (fs.name == "") {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入您的姓名'
			    })
			    return
			  }
			  if (fs.tel == "") {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入手机号'
			    })
			    return
			  }
			  if (!(/^1\d{10}$/.test(fs.tel))) {
			    wx.showToast({
			      title: '手机号码有误',
			      duration: 2000,
			      icon: 'none'
			    });
			    return false;
			  }
				if(fs.address=="  "){
					wx.showToast({
						icon:'none',
						title:'请选择居住地'
					})
					return
				}
				if(fs.xxaddress==""){
					wx.showToast({
						icon:'none',
			      title:'请输入详细地址'
					})
					return
				}
			  wx.showModal({
			    title: '提示',
			    content: '信息提交后将不可更改，请确认无误后进行提交',
			    success(res) {
			      if (res.confirm) {
			        console.log('用户点击确定')
			        wx.showLoading({
			          title: '正在提交',
			        })
			        wx.request({
			          url: service.IPurl,
			          data: {
			            apipage:'edituserinfo',
			            realname:fs.name,
			            sex:fs.sex,
			            phone:fs.tel,
			            province: that.region[2],
			            city: that.region[1],
			            country: that.region[0],
			            address:fs.xxaddress,
			            "tokenstr": wx.getStorageSync('tokenstr').tokenstr
			          },
			          header: {
			            'content-type': 'application/x-www-form-urlencoded'
			          },
			          dataType: 'json',
			          method: 'POST',
			          success(res) {
			            console.log(res.data)
			            
			
			            if (res.data.error == 0) {
			
			              wx.showToast({
			                icon: 'none',
			                title: '提交成功',
			                duration: 2000
			              })
			              app.dologin()
			              setTimeout(function () {
			                wx.navigateBack()
			              }, 1000)
			
			            } else {
			              if (res.data.returnstr) {
			                wx.showToast({
			                  icon: 'none',
			                  title: res.data.returnstr
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
			            wx.showToast({
			              icon: 'none',
			              title: '操作失败'
			            })
			          },
			          complete(){
			            wx.hideLoading()
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
.tx_box{
	width: 750rpx;
	
	border-bottom: 1px solid #eee;
	display: flex;
  flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 24rpx 50rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	font-size: 30rpx;
	color: #333;
	background-color: #fff;
  
}
.tx_box image{
	width: 165rpx;
	height: 165rpx;
	border-radius: 50%;
  margin-bottom: 30rpx;
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
.sub_btn{
	margin-top:78rpx;
	margin-bottom: 100rpx;
width:480rpx;
height:80rpx;
background-image:linear-gradient(90deg, #59cafe 0%, #5ebdff 50%, #63b1ff 100%);
border-radius:40rpx;
display:flex;
justify-content:center;
align-items:center;
font-family:PingFang-SC-Medium;
font-size:28rpx;
font-weight:bold;
color:#ffffff;
border: 0;

}
.msg_name{
	min-width: 4em;
}
.msg_int{
	flex: 1;
	padding: 0 10rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
.msg_box1{
	height: auto;
	align-items: flex-start;
}
.msg_box1 .msg_name{
	line-height: 110rpx;
}
.msgsrk{
	/* padding:40rpx 20rpx;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	height: 200rpx;
	flex: 1;
}
.fuwu_text{ */
	flex: 1;
	padding-top: 38rpx;
	padding-bottom: 38rpx;
	padding-left: 10rpx;
	
	
	line-height: 1;
}
</style>
