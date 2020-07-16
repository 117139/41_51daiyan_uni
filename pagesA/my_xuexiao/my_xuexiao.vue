<template>
	<view>
		<view class='container'>
		  <view class="set_name">
		    <view class="set_l">我的学校</view>
		    <view class="set_btn" @tap="save_val">保存</view>
		  </view>
		  <view class="set_name">
		    <view class="set_l">我的学校</view>
		    <input class="set_int" placeholder="请填写您的学校" @input="get_val" :value="yname"></input>
		    
		  </view>
		  <view class="set_name">
		    <view class="set_l">我的院系</view>
		    <input class="set_int" placeholder="请填写您的院系" @input="get_val1" :value="xname"></input>
		    
		  </view>
		  
		  <picker class="w100" mode="date" @change="bindTimeChange" :value="index" >
		    <view class="set_name">
		      <text class="set_l">入学时间</text>
		      <view class="dis_flex aic msg_val fz30">{{shengri}}      
		      </view>
		      <text class="iconfont iconnext3 c9 fz30"></text>
		    </view>
		    
		  </picker>
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
				yname:'',
				xname:'',
				shengri: '',
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		onLoad() {
			this.yname=this.loginMsg.school
			this.xname=this.loginMsg.department
			this.shengri=this.loginMsg.entrance_time
		},
		methods: {
			/**
			 * 页面相关事件处理函数--监听用户下拉动作
			 */
			onPullDownRefresh: function () {
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
			reset_val(){
			  this.uname=''
			}, 
			bindTimeChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
			  this.shengri = e.detail.value
			  this.shengri= this.shengri
			},
			get_val(e) {
			  console.log(e.detail)
			  this.yname= e.detail.value
			},
			get_val1(e) {
			  console.log(e.detail)
			  this.xname= e.detail.value
			},
			save_val() {
			  if (!this.yname) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入您的学校名',
			    })
			    return
			  }
			  if (!this.xname) {
			    wx.showToast({
			      icon: 'none',
			      title: '请输入您的院系',
			    })
			    return
			  }
			  if (!this.shengri) {
			    wx.showToast({
			      icon: 'none',
			      title: '请选择您的入学时间',
			    })
			    return
			  }
			  var data={
			  	token:this.loginMsg.userToken,
			  	school:this.yname,
			  	department:this.xname,
			  	entrance_time:this.shengri,
			  }
			  service.setUsermsg(data)
			  setTimeout(function () {
			    wx.navigateBack()
			  }, 1000)
			  console.log(this.yname)
			  console.log(this.xname)
			  console.log(this.shengri)
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
  padding: 0 28rpx;
}
.set_name{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  height: 95rpx;
  border-bottom: 1px solid #eee;
}
.set_l{
  font-size: 30rpx;
  color: #333;
}
.set_btn{
  font-size: 30rpx;
  color: #FE8735;
  
}
.set_int{
  flex: 1;
  font-size: 30rpx;
  text-align: right
}
.set_btn text{
  color: #BBBBBB;
  font-size: 45rpx;
}
.msg_val{
  flex: 1;
  flex-direction: row-reverse
}
</style>
