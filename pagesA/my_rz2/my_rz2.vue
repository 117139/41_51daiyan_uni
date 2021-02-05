<template>
	<view>
		<form class="w100" @submit="formSubmit">
		  <view class='container'>
		    <image class="rz_jd" :src="filter.imgIP('/static_s/51daiyan/images/rz_jd2_02.jpg')"></image>
		
		    <view class="hx10"></view>
		    <view class="hx10"></view>
		  
		    <!-- 身份证信息 -->
		    <view class="msg_box b0">
		      <!-- <text class="msg_name">填写信息</text> -->
		      <text class="msg_name">补充信息</text>
		      <view class="dis_flex aic msg_val"></view>
		
		    </view>
		    <view class="sf_box">
		      <!-- <view class="sfxx_box">
		        <text>姓名</text>
		        <input name="sfz_name" placeholder="请输入姓名"></input>
		      </view> -->
		      <!-- <view class="sfxx_box">
		        <text>微博账号</text>
		        <input name="wb_id" placeholder="请输入微博账号"></input>
		      </view>
		      <view class="sfxx_box">
		        <text>抖音账号</text>
		        <input name="dy_id" placeholder="请输入抖音账号"></input>
		      </view>
		      <view class="sfxx_box">
		        <text>快手账号</text>
		        <input name="ks_id" placeholder="请输入快手账号"></input>
		      </view> -->
					<view class="sfxx_box">
					  <textarea name="approve_replenish_msg" value="" placeholder="请输入" maxlength="100"/>
					</view>
		     <!-- <view class="sfxx_box">
		        <text>手机号码</text>
		        <input name="tel" type="number" placeholder="请输入手机号码"></input>
		      </view> -->
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
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'renzheng'
			])
		},
		methods: {
			reset_val() {
			  this.uname= ''
			},
			
			get_val(e) {
			  console.log(e.detail)
			  this.sname= e.detail.value
			},
			formSubmit: function (e) {
			  var that = this
			  console.log('form发生了submit事件，携带数据为：', e.detail.value)
			
			
			  var fs = e.detail.value
			  
			  // if (!fs.sfz_name) {
			  //   wx.showToast({
			  //     icon: 'none',
			  //     title: '请输入姓名'
			  //   })
			  //   return
			  // }
				
				
				var tip_text='是否提交'
				
				// if (!fs.ks_id) {
				// 	tip_text= '您还没有填写快手账号，是否提交'
				// }
				
				// if (!fs.dy_id) {
				// 	tip_text= '您还没有填写抖音账号，是否提交'
				// }
			 //  if (!fs.wb_id) {
				// 	tip_text= '您还没有填写微博账号，是否提交'
			 //  }
				
			  // if (!fs.tel || !(/^1\d{10}$/.test(fs.tel))) {
			  //   wx.showToast({
			  //     icon: 'none',
			  //     title: '请输入正确格式的手机号'
			  //   })
			  //   return
			  // }
			
			  wx.showModal({
			    title: '提示',
			    content: tip_text,
			    success(res) {
			      if (res.confirm) {
			        console.log('用户点击确定')
			        wx.showLoading({
			          title: '正在提交。。',
			          mask: true
			        })
			       
			      var jkurl='/user/applyApprove'
			      var data={
			      	"token": that.loginMsg.userToken,
			      	    // "identity_id": that.renzheng.sfid,
			      	    "id_number_front": that.renzheng.sfimg1,
			      	    "id_number_contrary": that.renzheng.sfimg2,
			      	    "real_name": that.renzheng.sfz_name,
			      	    "id_number": that.renzheng.sfz_id,
			      	    "start_validity": that.renzheng.yxtime1,
			      	    "end_validity": that.renzheng.yxtime2,
			      	    // "weibo_account": fs.wb_id,
			      	    // "douyin_account": fs.dy_id,
			      	    // "kuaishou_account": fs.ks_id,
									"approve_replenish_msg":fs.approve_replenish_msg
			      }
			      service.post(jkurl, data,
			      	function(res) {
			      		
			      		// if (res.data.code == 1) {
			      		if (res.data.code == 1) {
			      			var datas = res.data.data
			      			// console.log(typeof datas)
			      			
			      			if (typeof datas == 'string') {
			      				datas = JSON.parse(datas)
			      			}
			      			wx.showToast({
			      			  icon: 'none',
			      			  title: '提交成功',
			      			  duration: 2000
			      			})
			      			setTimeout(function () {
			      			  wx.navigateTo({
			      			    url:'/pagesA/my_rz3/my_rz3'
			      			  })
			      			}, 1000)
			      		} else {
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
			      		that.btnkg=0
			      		
			      			uni.showToast({
			      				icon: 'none',
			      				title: '操作失败'
			      			})
			      	
			      	}
			      )
			
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
  min-height:85rpx;
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
.sfxx_box textarea{
	width: 100%;
	height: 300upx;
	resize: none;
	border: 0;
	padding: 28upx 0;
	font-size: 30rpx;
	color: #333;
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
</style>
