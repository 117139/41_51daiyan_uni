<template>
	<view>
		<view class="container">
		  <view class="avtivity_box">
		    <image class="avtivity_box"  :src="filter.imgIP(datas.img[0])" mode="aspectFill"></image>
		    <view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
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
	var that
	export default {
		data() {
			return {
				datas:'',
			}
		},
		onLoad() {
			that=this
			that.getdatalist()
		},
		methods: {
			getdatalist() {
			
				let that = this
				var jkurl = '/activity/activityHit'
				var datas = {
					token: that.loginMsg.userToken,
					page: that.page,
					size:that.size,
					id:that.ad_id
				}
				if(that.data_last) return
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
				}
				// 单个请求
				service.P_get(jkurl, datas).then(res => {
					console.log(res)
					
					that.btn_kg=0
					if (res.code == 1) {
						var datas = res.data.user_data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.hd_type=res.data.is_act_open
						
					}
				}).catch(e => {
					
					that.btn_kg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
				
			},
			
		}
	}
</script>

<style scoped>
	.container{
		width: 100%;
		min-height: 100vh;
		background: #fff;
	  padding-bottom: 50rpx;
	  position: relative;
	}
	.avtivity_box{
	  position: relative;
	  width: 100%;
	  height: 336rpx;
	}
	.hd_time{
	  width: 100%;
	  position: absolute;
	  bottom: 36rpx;
	  text-align: center;
	  font-size: 24rpx;
	  color: #fff;
	}
	.avtivity_time{
	  width:750rpx;
	  height:110rpx;
	  position: relative;
	}
</style>
