<template>
	<view>
		<view class="container">
			<!-- <view class="top_box">
				<view class="search_type">
					<view class="ss_cur==0?'cur':''" @tap="ss_type" data-type="0">全部</view>
					<view class="ss_cur==1?'cur':''" @tap="ss_type" data-type="1">店铺</view>
					<view class="ss_cur==2?'cur':''" @tap="ss_type" data-type="2">明星</view>
					<view class="ss_cur==3?'cur':''" @tap="ss_type" data-type="3">达人</view>
					<view class="ss_cur==4?'cur':''" @tap="ss_type" data-type="4">代言圈</view>
					<view class="ss_cur==5?'cur':''" @tap="ss_type" data-type="5">其他</view>
				</view>
			</view> -->
			<!-- 用户 -->
			 <view class="ss_list">
				 <view class="data_null" v-if="data_list.length==0">
				 			 <image src="../../static/images/data_null1.png"></image>
				 </view>
				 <view  v-if="data_list.length>0" class="li_box" v-for="(item,idx) in data_list">
						<view class="user_tx" @tap="jump" data-url="/pages/my_index/my_index">
							<image class="user_tx" src="../../static/images/tx.png"></image>
							<image class="user_v" src="../../static/images/star_b.png"></image>
						</view>
						<view class="user_name oh1">王力宏</view>
						<view  v-if="item.tp_type==1"  @tap.stop="toupiao" :data-idx="idx" class="user_btn">+关注</view>
						<view v-else class="user_btn user_btn1">已关注</view>
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
				type:'',
				ss_cur:0,
				data_list: [
				  {
				    name: '未达标商户',
				    img: '/static/images/1_03.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '达标商户',
				    img: '/static/images/1_05.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '巡机单',
				    img: '/static/images/1_09.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已巡机',
				    img: '/static/images/1_10.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '装机单',
				    img: '/static/images/1_13.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已装机',
				    img: '/static/images/1_14.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '维护单',
				    img: '/static/images/1_17.jpg',
				    url: '/pages/list/list',
				    tp_type: '1'
				  },
				  {
				    name: '已维护',
				    img: '/static/images/1_18.jpg',
				    url: '/pages/list/list',
				    type: '7'
				  },
				  {
				    name: '换机单',
				    img: '/static/images/2_09.jpg',
				    url: '/pages/list/list',
				    type: '8'
				  },
				  {
				    name: '已换机',
				    img: '/static/images/2_10.jpg',
				    url: '/pages/list/list',
				    type: '9'
				  },
				  {
				    name: '撤机单',
				    img: '/static/images/2_13.jpg',
				    url: '/pages/list/list',
				    type: '10'
				  },
				  {
				    name: '已撤机',
				    img: '/static/images/2_14.jpg',
				    url: '/pages/list/list',
				    type: '11'
				  },
				  {
				    name: '终端交易查询',
				    img: '/static/images/2_17.jpg',
				    url: '/pages/list/list',
				    type: '12'
				  },
				  {
				    name: '应收列表',
				    img: '/static/images/2_18.jpg',
				    url: '/pages/list/list',
				    type: '13'
				  },
				  
				],
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  var that =this
		  console.log(options)
		  that.type= options.type
		  if (options.name){
		    wx.setNavigationBarTitle({
		      title: options.name,
		    })
		  }
		},
		methods: {
			/**
			   * 页面相关事件处理函数--监听用户下拉动作
			   */
			  onPullDownRefresh: function () {
					uni.stopPullDownRefresh();
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
			  toupiao(e) {
			    var idx = e.currentTarget.dataset.idx
			    var newdata = this.data_list
			    newdata[idx].tp_type = 2
			    this.data_list= newdata
			  },
				ss_type(e){
					
					var that =this
					if(that.ss_cur==e.currentTarget.dataset.type) return
					console.log(e.currentTarget.dataset.type)
					that.ss_cur=e.currentTarget.dataset.type
				},
			  jump(e) {
			    service.jump(e)
			  }
		}
	}
</script>

<style>

</style>
