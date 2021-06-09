<template>
	<view>
		<view class='container'>
		  <view class="set_name">
		    <view class="set_l">设置备注</view>
		    <view class="set_btn" @tap="save_val">保存</view>
		  </view>
		  <view class="set_name">
		    <input class="set_int" placeholder="请填写备注" confirm-type="保存" @confirm="save_val"
				 @input="get_val" v-model="uname" maxlength="10"></input>
		    <view class="set_btn" @tap="reset_val">
		      <text class="iconfont iconguanbi1" @tap="reset_val"></text>
		    </view>
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
	export default {
		data() {
			return {
				o_id:'',
				uname:'',
				sname:''
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg'
			])
		},
		onLoad(options) {
			this.o_id=options.id
			this.uname=options.name
			
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
			get_val(e){
			  console.log(e.detail )
			  this.sname= e.detail.value
			},
			save_val(){
				var that =this
			  // if (!that.uname){
			  //   wx.showToast({
			  //     icon:'none',
			  //     title: '请输入备注',
			  //   })
			  //   return
			  // }
			  var data={
			  	token:that.loginMsg.userToken,
			  	remark:that.uname,
					user_id:that.o_id
			  }
			  var jkurl='/attention/setRemark'
				service.P_post(jkurl,data).then(res => {
				  console.log(res)
					that.btnkg=0
					if(res.code==-1){
						uni.navigateTo({
							url:'/pagesA/login/login'
						})
						return
					}else if(res.code==0&&res.msg=='请先登录账号~'){
						uni.navigateTo({
							url:'/pagesA/login/login'
						})
						return
					}else if(res.code==1){
						// that.getdata()
						uni.showToast({
							icon:'none',
							title:'操作成功'
						})
						setTimeout(function (){
						  wx.navigateBack()
						},1000)
					}else{
						
					}
				}).catch(e => {
					that.btnkg=0
				  console.log(e)
					uni.showToast({
						icon:'none',
						title:'操作失败'
					})
				})
			  
			  console.log(that.uname)
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
}
.set_btn text{
  color: #BBBBBB;
  font-size: 45rpx;
}
</style>
