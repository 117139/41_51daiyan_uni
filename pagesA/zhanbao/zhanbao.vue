<template>
	<view>
		<view class="container">
				<view class="avtivity_box">
					<!-- <image class="avtivity_box" :src="'http://51daiyan.test.upcdn.net/'+datas.img[0]" mode="aspectFill"></image> -->
					<image class="avtivity_box"  :src="filter.imgIP(datas.img[0])" mode="aspectFill"></image>
					<view class="hd_time">活动截止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
				</view>
				<view class="zhanbao_box">
					<view class="zhanbao_tit">
						<!-- <image class="zhanbao_tit_bg" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_03.png" mode=""></image> -->
						<image class="zhanbao_tit_bg" :src="filter.imgIP('/static_s/51daiyan/images/zb_03.png')" mode=""></image>
						<view class="zhanbao_tit_box">寻找代言人活动战报</view>
					</view>
					<view class="zb_tj">
						<view class="zb_tj_time">活动起止时间：{{filter.getDate_ymd(datas.start_time,'/')}}-{{filter.getDate_ymd(datas.end_time,'/')}}</view>
						<view class="zb_bl">
							<!-- <image class="zb_bl_bg" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_07.png" mode=""></image> -->
							<image class="zb_bl_bg" :src="filter.imgIP('/static_s/51daiyan/images/zb_07.png')" mode=""></image>
							<view class="zb_bl_box">活动统计</view>
						</view>
						<view class="zb_box">
							<!-- <image class="zb_box_bg" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_1_03.jpg" mode=""></image> -->
							<image class="zb_box_bg" :src="filter.imgIP('/static_s/51daiyan/images/zb_1_03.jpg')" mode=""></image>
							<view class="zb_box_box">
								<view class="zb_box_li">
									<view class="d1">{{datas.join_number}}</view>
									<view class="d2">总参与活动人数</view>
								</view>
								<view class="zb_box_li">
									<view class="d1">{{datas.vote_number}}</view>
									<view class="d2">总投票</view>
								</view>
								<view class="zb_box_li">
									<view class="d1">{{datas.award_money_sum}}</view>
									<view class="d2">奖金发放量</view>
								</view>
								<view class="zb_box_li">
									<view class="d1">{{datas.saleroom}}</view>
									<view class="d2">带动销售总额</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 一等奖 -->
					<view v-if="datas.award.length>0" class="jx_list">
						<view class="jx_list_tit">
							<view class="jx_list_tit_num" style="opacity: 0;"><text>{{datas.award[0].win_user_count}}</text>人</view>
							<!-- <image class="jx_list_tit_img" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_15.png" mode="aspectFit"></image> -->
							<image class="jx_list_tit_img" :src="filter.imgIP('/static_s/51daiyan/images/zb_15.png')" mode=""></image>
							<view class="jx_list_tit_num"><text>{{datas.award[0].win_user_count}}</text>人</view>
						</view>
						<view class="jx_li" v-for="(item,index) in ph_list1">
							<!-- <image class="jx_li_icon" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_19.png" mode="aspectFit"></image> -->
							<image class="jx_li_icon" :src="filter.imgIP('/static_s/51daiyan/images/zb_19.png')" mode="aspectFit"></image>
							<!-- <image class="jx_li_tx" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/tx.png" mode="aspectFill"></image> -->
							<image v-if="!hasLogin" data-url="/pages/login/login" @tap='jump' class="jx_li_tx" :src="filter.imgIP(item.user_head_portrait)" mode="aspectFill"></image>
							<image v-else @tap="jump" :data-url="'/pages/my_index/my_index?id='+item.user_id"  class="jx_li_tx" :src="filter.imgIP(item.user_head_portrait)" mode="aspectFill"></image>
							<view class="jx_li_name text-cut">{{item.user_nickname}}</view>
							<view class="flex_1"></view>
							<view class="jx_list_tit_num"><text>{{item.popularity}}</text>票</view>
						</view>
						<view v-if="ph_list1.length>0" class="get_more"  @tap="getdatalist(1)">更多<text class="iconfont iconoff"></text></view>
						<view v-else class="zanwu" >暂无数据</view>
					</view>
					<!-- 二等奖 -->
					<view  v-if="datas.award.length>1" class="jx_list">
						<view class="jx_list_tit">
							<view class="jx_list_tit_num" style="opacity: 0;"><text>{{datas.award[1].win_user_count}}</text>人</view>
							<!-- <image class="jx_list_tit_img" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_22.png" mode="aspectFit"></image> -->
							<image class="jx_list_tit_img" :src="filter.imgIP('/static_s/51daiyan/images/zb_22.png')" mode=""></image>
							<view class="jx_list_tit_num"><text>{{datas.award[1].win_user_count}}</text>人</view>
						</view>
						<view class="jx_li" v-for="(item,index) in  ph_list2">
							<!-- <image class="jx_li_icon" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_25.png" mode="aspectFit"></image> -->
							<image class="jx_li_icon":src="filter.imgIP('/static_s/51daiyan/images/zb_25.png')" mode="aspectFit"></image>
							<!-- <image class="jx_li_tx" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/tx.png" mode="aspectFill"></image> -->
							
							<image v-if="!hasLogin" data-url="/pages/login/login" @tap='jump' class="jx_li_tx" :src="filter.imgIP(item.user_head_portrait)" mode="aspectFill"></image>
							<image v-else @tap="jump" :data-url="'/pages/my_index/my_index?id='+item.user_id"  class="jx_li_tx" :src="filter.imgIP(item.user_head_portrait)" mode="aspectFill"></image>
							<view class="jx_li_name text-cut">{{item.user_nickname}}</view>
							<view class="flex_1"></view>
							<view class="jx_list_tit_num"><text>{{item.popularity}}</text>票</view>
						</view>
						<view v-if="ph_list2.length>0" class="get_more"  @tap="getdatalist(2)">更多<text class="iconfont iconoff"></text></view>
						<view v-else class="zanwu" >暂无数据</view>
					</view>
					<!-- 三等奖 -->
					<view v-if="datas.award.length>2"  class="jx_list">
						<view class="jx_list_tit">
							<view class="jx_list_tit_num" style="opacity: 0;"><text>{{datas.award[2].win_user_count}}</text>人</view>
							<!-- <image class="jx_list_tit_img" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_28.png" mode="aspectFit"></image> -->
							<image class="jx_list_tit_img" :src="filter.imgIP('/static_s/51daiyan/images/zb_28.png')" mode=""></image>
							<view class="jx_list_tit_num"><text>{{datas.award[2].win_user_count}}</text>人</view>
						</view>
						<view class="jx_li" v-for="(item,index) in ph_list3">
							<!-- <image class="jx_li_icon" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/zb_30.png" mode="aspectFit"></image> -->
							<image class="jx_li_icon" :src="filter.imgIP('/static_s/51daiyan/images/zb_30.png')" mode="aspectFit"></image>
							<image v-if="!hasLogin" data-url="/pages/login/login" @tap='jump' class="jx_li_tx" :src="filter.imgIP(item.user_head_portrait)" mode="aspectFill"></image>
							<image v-else @tap="jump" :data-url="'/pages/my_index/my_index?id='+item.user_id"  class="jx_li_tx" :src="filter.imgIP(item.user_head_portrait)" mode="aspectFill"></image>
							<view class="jx_li_name text-cut">{{item.user_nickname}}</view>
							<view class="flex_1"></view>
							<view class="jx_list_tit_num"><text>{{item.popularity}}</text>票</view>
						</view>
						<view v-if="ph_list3.length>0" class="get_more"  @tap="getdatalist(3)">更多<text class="iconfont iconoff"></text></view>
						<view v-else class="zanwu" >暂无数据</view>
					</view>
					
					<view v-if="datas.my_ranking>0" class="jx_li jx_li1">
						<view class="my_num">{{datas.my_ranking}}<text>名</text></view>
						<!-- <image class="jx_li_tx" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/tx.png" mode="aspectFill"></image> -->
						<image class="jx_li_tx" :src="filter.imgIP(loginMsg.avatarurl)" mode="aspectFill"></image>
						<view class="jx_li_name " style="width: 2em;">本人</view>
						<view class="flex_1" style="font-size: 24upx;color: #999;">我的收入：{{datas.my_activity_income}}元</view>
						<view class="jx_list_tit_num"><text>{{datas.my_poll}}</text>票</view>
					</view>
					
					<view v-else class="jx_li jx_li1">
						<view class="my_num">无</view>
						<!-- <image class="jx_li_tx" src="http://51daiyan.test.upcdn.net//static_s/51daiyan/images/tx.png" mode="aspectFill"></image> -->
						<image class="jx_li_tx" :src="filter.imgIP(loginMsg.avatarurl)" mode="aspectFill"></image>
						<view class="jx_li_name " style="width: 2em;">本人</view>
						<view class="flex_1" style="font-size: 24upx;color: #999;">没有参与本次活动</view>
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
	var that
	export default {
		data() {
			return {
				datas:'',
				ad_id:'',
				ph_list1:[],
				page1:1,
				ph_list2:[],
				page2:1,
				ph_list3:[],
				page3:1,
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		onShareAppMessage() {
			
		},
		onLoad(option) {
			
			that=this
			that.ad_id=option.id
			that.getdata()
		},
		methods: {
			getdata() {
			
				let that = this
				var jkurl = '/activity/activityBattlefield'
				var datas = {
					token: that.loginMsg.userToken,
					act_id:that.ad_id
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
						that.datas=res.data
						if(res.data.award.length>0){
							this.ph_list1=res.data.award[0].win_user
						}
						if(res.data.award.length>1){
							this.ph_list2=res.data.award[1].win_user
						}
						if(res.data.award.length>2){
							this.ph_list3=res.data.award[2].win_user
						}
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
			getdatalist(num) {
			
				let that = this
				var jkurl = '/activity/getDAwardPm'
				var page_page=this.page1
				if(num==1){
					page_page=this.page1
				}
				if(num==2){
					page_page=this.page2
				}
				if(num==3){
					page_page=this.page3
				}
				var datas = {
					token: that.loginMsg.userToken,
					page: page_page,
					size:20,
					jdj:num,
					ad_id:that.ad_id
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
						var datas = res.data
						// console.log(typeof datas)
			
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// that.datas=res.data
						if(page_page==1){
							// that.datas=datas
							if(num==1){
								that.ph_list1=datas
							}
							if(num==2){
								that.ph_list2=datas
							}
							if(num==3){
								that.ph_list2=datas
							}
						}else{
							if(datas.length==0){
							
								uni.showToast({
									icon:'none',
									title:'到底了~'
								})
								
								return
							}
							// that.datas=that.datas.concat(datas)
							if(num==1){
								that.ph_list1=that.ph_list1.concat(datas)
							}
							if(num==2){
								that.ph_list2=that.ph_list2.concat(datas)
							}
							if(num==3){
								that.ph_list3=that.ph_list3.concat(datas)
							}
						}
						if(num==1){
							
							that.page1++
						}
						if(num==2){
							that.page2++
						}
						if(num==3){
							that.page3++
						}
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
			
			jump(e) {
				var that =this
				if(that.btn_kg==1){
					return
				}else{
					that.btn_kg=1
					setTimeout(function(){
						that.btn_kg=0
					},2000)
				}
			  console.log(e.currentTarget.dataset.type)
			  service.jump(e)
			},
		}
	}
</script>

<style scoped>
	view,text{
		box-sizing: border-box;
	}
	.container {
		width: 100%;
		min-height: 100vh;
		background: #fff;
		position: relative;
	}
	
	.avtivity_box {
		position: relative;
		width: 100%;
		height: 336upx;
	}
	
	.hd_time {
		width: 100%;
		position: absolute;
		bottom: 36upx;
		text-align: center;
		font-size: 24upx;
		color: #fff;
	}
	
	.avtivity_time {
		width: 750upx;
		height: 110upx;
		position: relative;
	}
	
	.zhanbao_box {
		width: 100%;
		padding: 30upx;
		background: #F5F5F5;
		min-height: calc(100vh - 336upx);
	}
	
	.zhanbao_tit {
		width: 579upx;
		height: 80upx;
		margin: 0 auto 30upx;
		position: relative;
	}
	
	.zhanbao_tit_bg {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
	}
	
	.zhanbao_tit_box {
		position: relative;
		width: 579upx;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 2;
		color: #fff;
		font-size: 28upx;
	}
	
	.zb_tj {
		width: 100%;
		height: 257upx;
		background: #FFF6E6;
		border: 6upx solid #FA8A54;
		border-radius: 18upx;
		position: relative;
	}
	
	.zb_tj_time {
		width: 100%;
		padding-left: 156upx;
		padding-right: 30upx;
		font-size: 22upx;
		color: #999;
		height: 80upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.zb_bl {
		position: absolute;
		top: 17upx;
		width: 156upx;
		height: 52upx;
	}
	
	.zb_bl_bg {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	
	.zb_bl_box {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 26upx;
	}
	
	.zb_box {
		width: 657upx;
		height: 153upx;
		/* background: linear-gradient(0deg, #FE5606 0%, #FFC2A5 100%); */
		border-radius: 10px;
		margin: 0 auto;
		position: relative;
	}
	
	.zb_box_bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
	
	.zb_box_box {
		position: relative;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		display: flex;
	}
	
	.zb_box_li {
		width: 25%;
		padding: 0 10upx;
		color: #fff;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.zb_box_li .d1 {
		font-size: 30upx;
		color: #fff;
		font-weight: bold;
		margin-bottom: 10upx;
	}
	
	.zb_box_li .d2 {
		font-size: 24upx;
		color: #fff;
		height: 60upx;
		text-align: center;
	}
	
	.jx_list {
		width: 100%;
		/* min-height: 500upx; */
		background: #FFFFFF;
		border-radius: 10upx;
		/* padding-top: 76upx; */
		margin-top: 65upx;
	}
	
	.jx_list_tit {
		width: 100%;
		height: 76upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.jx_list_tit_num {
		color: #FE9B00;
		font-size: 24upx;
	}
	
	.jx_list_tit_num text {
		font-size: 36upx;
	}
	
	.jx_list_tit_img {
		width: 150upx;
		height: 120upx;
		margin: 0 50upx;
		position: relative;
		top: -30upx;
	}
	
	.jx_li {
		width: 100%;
		padding: 30upx;
		border-bottom: 1px solid #eee;
		display: flex;
		align-items: center;
		
	}
	
	.jx_li_icon {
		width: 40upx;
		height: 55upx;
		margin-right: 26upx;
		flex: none;
	}
	
	.jx_li_tx {
		width: 72upx;
		height: 72upx;
		border-radius: 50%;
		margin-right: 26upx;
		flex: none;
	}
	
	.jx_li_name {
		width: 150upx;
		font-size: 26upx;
		color: #333;
		margin-right: 26upx;
		flex: none;
		font-weight: bold;
	}
	.get_more{
		width: 100%;
		height: 50upx;
		font-size: 26upx;
		color: #999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.get_more text{
		font-size: 20upx;
		color: 39px;
	}
	.jx_li1{
		margin-top: 65upx;
		width: 100%;
		height: 115upx;
		background: #FFFFFF;
		border-radius: 1px;
	}
	.my_num{
		width: 119upx;
		height: 63upx;
		background: #FFA259;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32upx;
		color: #fff;
		margin-right: 20upx;
	}
	.my_num text{
		position: relative;
		top: 4upx;
		font-size: 24upx;
	}
</style>
