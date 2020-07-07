<template>
	<view>
		<view class="hengxian"></view>
		<form class="container" @submit="formSubmit">
		  <view class="addmsg">
				<view class="msgtit">收货人</view>
				<input class="msgsrk" name="name" :value="editaddress.user_name" type="text" placeholder="请填写收货人姓名"/>
			</view>
		  <view class="addmsg">
				<view class="msgtit">手机号码</view>
				<input class="msgsrk" name="tel" :value="editaddress.phone" type="text" placeholder="请填写收货人手机号码"/>
			</view>
		  
			 <picker class="addmsg"
		    mode="region"
		    @change="bindRegionChange"
		    :value="region"
		  >
		    
				<view class="addmsg">
					<view class="msgtit">所在地区</view>
					<input class="msgsrk" name="address"
					 type="text" placeholder="请选择地区"
					 :value="region[0]+region[1]+region[2]" disabled/>
				</view>
		  </picker>
		  <view class="addmsg">
				<view class="msgtit">详细地址</view>
				<input class="msgsrk" name="xxaddress" :value="editaddress.address" type="text" placeholder="街道、楼牌号等" maxlength="40"/>
			</view>
		  <view class="addmsg">
				<view class="">设置默认地址</view>
				<switch :checked="editaddress.is_default==1" class="mrdz" @change="switch1Change" color="#F7B43B"/>
				<input hidden type="text" name="moren"  :value="moren"/>
			</view>
			<!-- <view class="definebtn">保存</view> -->
			 <button class="definebtn" form-type="submit">保存</button>
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
				btnkg:0,   //0ok  1off
				region: [],
				moren:false,
				editaddress:{
					name: "aaa", 
					tel: "18300000000", 
					address: "北京市北京市东城区", 
					xxaddress: "街道街道街道", 
					moren: "true",
				}
			}
		},
		onLoad: function (option) {
		  if(option.address){
				console.log(option.address)
		    this.editaddress= JSON.parse(option.address)
		    var area = this.editaddress.area.split(' ')
		    this.region = area
		   this.moren= this.editaddress.is_default
		    console.log(this.region)
			}
			
			
		},
		methods: {
			//选择地区
			bindRegionChange(e) {
			  console.log('picker发送选择改变，携带值为', e.detail.value)
				this.region=e.detail.value
			  this.region= this.region
			},
			//设置默认
			switch1Change(e) {
			  console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				this.moren=e.detail.value==true?1:0
			},
			//提交表单
			formSubmit(e) {
			  let that =this
				
				console.log('form发生了submit事件，携带数据为：', e.detail.value)
				let formresult=e.detail.value
				if (formresult.name=='') {
					wx.showToast({
						title: '收货人姓名不能为空',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				if (!(/^1\d{10}$/.test(formresult.tel))) {
					wx.showToast({
						title: '手机号码有误',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				if (formresult.address=='') {
					wx.showToast({
						title: '请选择地区',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				if (formresult.xxaddress=='') {
					wx.showToast({
						title: '请填写详情地址',
						duration: 2000,
						icon:'none'
					});
					return false;
				}
				var areaz=that.region[0]+' '+that.region[1]+' '+that.region[2]
				if(that.region[1]==undefined||that.region[2]==undefined){
					areaz=that.region[0]
				}
				if(that.btnkg==1){
					return
				}else{
					that.btnkg=1
				}
			  uni.showToast({
			    title: '操作成功'
			  })
			  setTimeout(function () {
			    that.btnkg= 0
			    uni.navigateBack()
			
			  }, 1000)
			  return
				uni.request({
					url: app.IPurl+'/api/userAddress/'+that.editaddress.id,
					data:  {
							
							token:uni.getStorageSync('token'),
							area:areaz, 
							address:formresult.xxaddress,
							user_name: formresult.name,
							phone:formresult.tel,
							is_default:formresult.moren
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded' 
					},
					dataType:'json',
					method:'PUT',
					success(res) {
						console.log(res.data)
						if(res.data.code==1){
							wx.showToast({
								title:'操作成功'
							})
							setTimeout(function(){
								that.btnkg=0
								uni.navigateBack()
								
							},1000)
						}else{
							that.btnkg=0
							if(res.data.msg){
								uni.showToast({
									icon:'none',
									title:res.data.msg
								})
							}else{
								uni.showToast({
									icon:'none',
									title:'操作失败'
								})
							}
						}
					},
					fail(err){
						that.btnkg=0
						uni.showToast({
							icon:'none',
							title:'操作失败'
						})
						console.log(err)
					}
					
				})
			}
		}
	}
</script>

<style scoped>
.container{
	width: 100%;
	min-height: 100vh;
	padding: 0 28rpx;
	box-sizing: border-box;
	background-color: #fff;
	position: relative;
}
.addmsg{
	width: 694rpx;
	height: 90rpx;
	border-bottom: 1px solid #e8e8e8;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 26rpx;
	color: #333;
}
.msgtit{
	width: 138rpx;
}
.msgsrk{
	flex: 1;
}
.definebtn{
	position: absolute;
	border-radius: 0;
	bottom: 30rpx;
	left: 28rpx;
	right: 28rpx;
	height: 84rpx;
	margin-top: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	font-size: 28rpx;
	background-color: #F7B43B;
}
.wx-switch-input{width:86rpx !important;height:50rpx !important;}
.wx-switch-input::before{width:84rpx !important;height: 48rpx !important;}
.wx-switch-input::after{width: 44rpx !important;height: 44rpx !important;}

</style>
