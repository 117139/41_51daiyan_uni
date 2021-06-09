<template>
	<view class="warp">
		<navigator class="zbj_li" :url="'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+item.room_id" v-for="(item,index) in datas">
			<image  class="zbj_tx" :src="getimg(item.cover_img)" ></image>
			<view class="zbj_li_msg">
				<view class="zb_tit oh1">{{item.name}}</view>
				<view class="zb_tit1 oh1">{{item.anchor_name}}</view>
			</view>
		</navigator>
		<view class="zanwu" v-if="datas.length==0">暂无直播</view>
		<view class="data_last" v-if="data_last">到底了~~</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import service from '../../service.js';
	var that
	export default {
		data() {
			return {
				page:1,
				size:20,
				datas:[],
				data_last:false
			}
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin'
			])
		},
		onLoad() {
			that=this
			that.btnkg=0
			this.onRetry()
		},
		onShow() {
			that.btnkg=0
		},
		onPullDownRefresh() {
			this.onRetry()
		},
		onReachBottom() {
			this.getdata()
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function () {
			
		},
		onShareTimeline(){
			return {
				title:'51代言',
				query:'pid=' + that.loginMsg.id,
			}
		},
		methods: {
			onRetry(){
				this.page=1
				
				this.data_last=false
				this.datas=[]
				this.getdata()
			},
			getdata() {
				var that = this
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				var datas = {
					token: that.loginMsg.userToken,
					page:this.page,
					size:this.size
				}
				var now_page=this.page
				// 单个请求
				service.P_get('/live/list', datas).then(res => {
					console.log(res)
					that.btnkg=0
					if (res.code == 1) {
						if(now_page==1){
							
							that.datas = res.data
							// that.datas=[
							// 	{
							// 	"name": "2021517-3",
							// 	"cover_img": "/resource/merchant/live_stream/20210517/dea5e25c69c05f15d52a2ec0e181c91d.jpg",
							// 	"start_time": 1621440000,
							// 	"end_time": 1621512440,
							// 	"anchor_name": "冯某人3",
							// 	"room_id": "1"
							// 	}
							// ]
						}else{
							if(res.data.length==0){
								this.data_last=true
								return
							}
							that.datas = that.datas.concat(res.data)
						}
						that.page++
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			
			
			},
			jump(e){
			  service.jump(e)
			},
			pveimg(e) {
			  service.pveimg(e)
			},
			getimg(e) {
			  return service.getimg(e)
			},
		}
	}
</script>

<style scoped>
	view,text,navigator{
		box-sizing: border-box;
	}
	.warp{
		width: 100%;
		background: #fff;
		padding: 20upx 30upx;
	}
	.zbj_li{
		width: 100%;
		padding: 10upx;
		box-shadow: 0px 3px 10px 0px rgb(119,119,119,.3);
		border-radius: 10upx;
		display: flex;
		align-items: stretch;
	}
	.zbj_li+.zbj_li{
		margin-top: 30upx;
	}
	.zbj_tx{
		width: 130upx;
		height: 130upx;
		margin-right: 20upx;
		flex: none;
		border-radius: 10upx;
	}
	.zbj_li_msg{
		width: 500upx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.zb_tit{
		font-size: 32upx;
		color: #333;
	}
	.zb_tit1{
		font-size: 28upx;
		color: #999;
	}
</style>
