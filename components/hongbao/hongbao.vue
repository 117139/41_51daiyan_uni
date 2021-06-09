<template>
	<view>
		<block v-if="hongbao==0">
			<view class="pro2_hb_box" @tap="hongbao=-1">
				
			
				<image class="hb_yanhua" :src="getimg('/static_s/51daiyan/images/pro2/hb_yanhua.png')" mode="widthFix"></image>
				<view class="hb_hb" @tap.stop="open_hb(1)">
					<image :src="getimg('/static_s/51daiyan/images/pro2/hb_off.png')" mode="widthFix"></image>
					<view  class="hb_hb_v">
						<view class="hb_hb_type">{{typetext}}</view>
					</view>
				</view>
			</view>
		</block>
		<block v-if="hongbao==1">
		<view  class="pro2_hb_box" @tap="open_hb(-1)">
			<image class="hb_yanhua" :src="getimg('/static_s/51daiyan/images/pro2/hb_yanhua.png')" mode="widthFix"></image>
			<view class="hb_hb" >
				<image :src="getimg('/static_s/51daiyan/images/pro2/hb_open.png')" mode="widthFix"></image>
				<view  class="hb_hb_v">
					<view v-if="hbtype==3" class="hb_hb_ins dis_flex ju_c"><text>{{datas.bean}}</text>{{hbtype==3?'代言豆':'元'}}</view>
					<view v-else class="hb_hb_ins dis_flex ju_c"><text>{{datas.money}}</text>{{hbtype==3?'代言豆':'元'}}</view>
					<view class="hb_hb_type">{{typetext}}</view>
					<view v-if="hbtype==3" class="go_hb_xq" @tap="jump_fuc" :data-url="'/pages_goods/hongbao_xq/hongbao_xq?id='+item+'&type='+hbtype">查看详情<text class="iconfont iconnext3"></text></view>
					<view v-else class="go_hb_xq" @tap="jump_fuc" :data-url="'/pages_goods/hongbao_xq/hongbao_xq?id='+item.is_red.red_id+'&type='+hbtype">查看详情<text class="iconfont iconnext3"></text></view>
				</view>
			</view>
		</view>	
		</block>
	</view>
</template>

<script>
	import service from '../../service.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	var djs_fuc
	export default {
		data() {
			return {
				bj_time:10,
				hongbao:-1,
				typetext:'代言红包',
				item:'',
				hbtype:2,
				datas:''
			};
		},
		computed: {
			...mapState([
				'hasLogin',
				'loginMsg',
				'wxlogin',
				'isLogin',
				'isSDKReady',
				'conversationList'
			])
		},
		methods: {
			
			open_hb_fuc(e){
				this.$emit('open_hb_fuc', e);
			},
			open_hb(num,item,type){
				var that = this
				if(item){
					this.item=item
					this.hbtype=type
				}
				console.log(type)
				if(type==1){
					this.typetext='分享红包'
				}else if(type==2){
					this.typetext='代言红包'
				}else if(type==3){
					this.typetext='投票红包'
				}
				
				
				if(num==1){
					
					that.datas=''
					var datas={}
					var jkurl=''
					if(this.hbtype==3){
						datas = {
							token: that.loginMsg.userToken||'',
							activity_id:this.item,
						}
						jkurl='/activity/drawVoteRedPacket'
					}else{
						datas = {
							token: that.loginMsg.userToken||'',
							adv_id:this.item.is_red.red_id,
							type:this.hbtype
						}
						jkurl='/publicAdvocacy/drawRedPacket'
					}
					if(that.btnkg==1){
						return
					}
					that.btnkg=1
					// 单个请求
					service.P_post(jkurl, datas).then(res => {
						console.log(res)
						
						that.btnkg=0
						if (res.code == 1) {
							that.datas = res.data
							that.hongbao=num
						}else if (res.code == 10) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'/pagesA/my_index/my_index?id='+res.data.user_id
								})
							},1000)
						}else{
							
							if(res.msg){
								uni.showToast({
									icon: 'none',
									title: res.msg
								})
								that.hongbao=-1
							}else{
								uni.showToast({
									icon: 'none',
									title: '获取失败'
								})
							}
						}
					}).catch(e => {
						
						that.btnkg=0
						console.log(e)
						uni.showToast({
							icon: 'none',
							title: '获取数据失败'
						})
					})
				}else{
					this.hongbao=num
				}
				if(this.hongbao==-1){
					that.$emit('shuaxin')
				}
				
			},
			baojing_del(){
				var that=this
				clearInterval(djs_fuc)
				this.bj_time=10
				this.baojing=false
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e){
				service.jump(e)
			},
			jump_fuc(e){
				this.open_hb(-1)
				service.jump(e)
			}
		}
	}
</script>

<style scoped>
	.pro2_hb_box{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 900;
		background-color: rgba(0,0,0,.5);
	}
	.hb_yanhua{
		width: 711upx;
		height: auto;
		position: absolute;
		z-index: 901;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.hb_hb{
		width: 375upx;
		height: auto;
		position: absolute;
		z-index: 902;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
	.hb_hb image{
		position: relative;
		width: 100%;
		z-index: 902;
	}
	.hb_hb_v{
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 903;
	}
	.hb_hb_type{
		position: absolute;
		bottom: 90upx;
		width: 100%;
		text-align: center;
		color: #FFF2A7;
		text-shadow: 0px 0px 0px rgba(255, 39, 0, 0.78);
		font-size: 70upx;
		line-height: 72upx;
		z-index: 910;
		font-family:'HuXiaoBo-NanShen';
	}
	.go_hb_xq{
		position: absolute;
		bottom: 40upx;
		width: 100%;
		text-align: center;
		font-size: 20upx;
		color: #fff;
	}
	.go_hb_xq text{
		font-size: 20upx;
	}
	.hb_hb_ins{
		position: absolute;
		bottom: 300upx;
		width:375upx;
		text-align: center;
		font-size: 28upx;
		color: #CE4031;
		align-items: baseline;
		font-family:'HuXiaoBo-NanShen';
	}
	.hb_hb_ins text{
		font-size: 60upx;
	}
</style>
