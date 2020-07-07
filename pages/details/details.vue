<template>
	<view>
		<view :class="sheetshow1||sheetshow?'container-ban':'container'">
		  <view class="swiper_box">
		    <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay"
				 :interval="interval" :duration="duration" indicator-active-color='#8e8e8e'
					:circular="circular" @change="swiper_change">
		      <block v-for="(item,idx) in data_list">
		        <swiper-item>
		          <!-- <image src="{{item}}" class="slide-image" width="355" height="150" data-curitem="{{item}}" @tap="pveimg" /> -->
		          <image :src="filter.imgIP('goods_02.jpg')" class="slide-image" mode="aspectFill" width="355"
							 height="150" :data-src="filter.imgIP('goods_02.jpg')" @tap.stop="pveimg" />
		        </swiper-item>
		      </block>
		
		    </swiper>
		    <view class="br_box">{{cur_swiper}}/{{data_list.length}}</view>
		  </view>
		  <view class="goods_msg">
		    <view class="goods_pri">
		      <view class="pri1">¥48</view>
		      <view class="pri2">代言费：¥5</view>
		    </view>
		    <view class="goods_pri">
		      <view class="pri2">原价：¥66.6</view>
		    </view>
		    <view class="goods_name">黄金曼特宁精品咖啡/袋泡咖啡/耳挂咖啡6*10袋装</view>
		
		    <view class="goods_pri">
		      <view class="pri2">运费10元</view>
		      <view class="pri2">销量8280</view>
		      <view class="pri2">
		        <text class="iconfont icondizhi"></text> 北京</view>
		    </view>
		    <view class="goods_bz">
		      <view class="g_bz_1">
		        <text>服务保障</text> 该商品加入了代言人服务保障，官方已认证</view>
		      <view class="bz_li">
		        <view>
		          <text class="iconfont iconanquan"></text>已缴纳保证金</view>
		        <view>
		          <text class="iconfont iconanquan"></text>售后无忧</view>
		        <view>
		          <text class="iconfont iconanquan"></text>48小时发货</view>
		      </view>
		    </view>
		  </view>
		  <!-- msg -->
		  <view class="mt20 goods_xmsg"  @tap="sheetshow1_fuc">
		    <view class="v1">代言人</view>
		    <view class="v2">
		      <view class="sj_list">
		        <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		        <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		        <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		        <image class="sj_li" src="/static/images/tx.png" mode="aspectFill"></image>
		      </view>
		    优先显示您的好友</view>
		    <view class="v3">
		      <text class="iconfont iconnext3"></text>
		    </view>
		  </view>
		  <view class="goods_xmsg" @tap="jump" data-url="/pages/my_yhq/my_yhq">
		    <view class="v1">优惠券</view>
		    <view class="v2">
		      <text class="yhq_box">领券</text>
		    </view>
		    <view class="v3">
		      <text class="iconfont iconcaozuo"></text>
		    </view>
		  </view>
		  <view class="goods_xmsg">
		    <view class="v1">促 销</view>
		    <view class="v2">
		      <text class="yhq_box">满包邮</text>全店满118.00元包邮，偏远地区除外；</view>
		    <view class="v3">
		      <text class="iconfont iconcaozuo"></text>
		    </view>
		  </view>
		  <view class="goods_xmsg"  @tap="jump" data-url="/pages/myaddress/myaddress?type=1">
		    <view class="v1">配 送</view>
		    <view class="v2">
		      <text class="yhq_box">同城</text>北京市五环内下单可享受商家配送服务；</view>
		    <view class="v3">
		      <text class="iconfont iconcaozuo"></text>
		    </view>
		  </view>
		  <view class="mt20 goods_xmsg"  @tap="sheetshow_fuc">
		    <view class="v1">已选择</view>
		    <view class="v2 v21">{{guige[type1[0]].value1}},{{cnum}}件</view>
		    <view class="v3">
		      <text class="iconfont iconnext3"></text>
		    </view>
		  </view>
		  <!-- 评价 -->
		  <view class="pj_box mt20">
		    <view class="pj_box_tit">
		      <view class="p_tit_l">商品评价（233）</view>
		      <view class="p_tit_r" data-url="/pages/details_pl/details_pl" @tap="jump">查看全部
		        <text class="iconfont iconnext3"></text>
		      </view>
		    </view>
		    <view class="pj_bq">
		      <view>质量很好（111）</view>
		      <view>性价比高（62）</view>
		      <view>发货快（53）</view>
		    </view>
		    <view class="pj_li">
		      <view class="pj_d1">
		        <view class="user_tx">
		          <image class="user_tx" src="../../static/images/tx.png"></image>
		        </view> Y***I</view>
		      <view class="pj_d2">上次就买了，感觉太好喝了，这次又来光顾一下，这次又来光顾一下，这次又来光顾一下，这次又来光顾一下。</view>
		    </view>
		  </view>
		  <!-- 代言人 -->
		  <view class="pj_box ">
		    <view class="pj_box_tit">
		      <view class="p_tit_l">代言人说（8）</view>
		      <view class="p_tit_r" @tap="jump" data-url="/pages/dyr_text/dyr_text">查看全部
		        <text class="iconfont iconnext3"></text>
		      </view>
		    </view>
		    <scroll-view scroll-x class="dyr_text">
		      <view class="dyr_text1">
		        <view class="dyr_li" v-for="(item,idx) in data_list">
		          <view class="dyr_msg">
		            <view class="pj_d1">
		              <view class="user_tx">
		                <image class="user_tx" :src="filter.imgIP('tx.png')" mode="aspectFill"></image>
		              </view> Y***I</view>
		            <view class="dyr_d oh3"> 蛮好喝的，换了新包装，品质还以依旧刚刚的蛮好喝的，换了新包装，品质还以依旧刚刚的</view>
		          </view>
		
		          <view class="dyr_img">
		            <image class="dyr_img" :src="filter.imgIP('goods_02.jpg')"  mode="aspectFill"
								 :data-src="filter.imgIP('goods_02.jpg')" @tap.stop="pveimg"></image>
		            <view class="dyr_imgnum"><text class="iconfont iconicontupian"></text> 4</view>
		          </view>
		        </view>
		      </view>
		    </scroll-view>
		  </view>
		  <!-- 店铺 -->
		  <view class="dp_box">
		    <view class="dp_b1">
		      <view class="dp_logo">
		        <image :src="filter.imgIP('goods_02.jpg')" mode="aspectFill"></image>
		      </view>
		      <view class="dp_msg">
		        <view class="dp_name oh2">弥翼咖啡 MIYI COFFEE ROSASTERS</view>
		        <view class="dp_lv">
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		          <image :src="filter.imgIP('dp_zuan.png')"></image>
		        </view>
		        <view class="dp_bq">
		          <text>代言 835</text>
		          <text>回头率  21%</text>
		          <!-- <text class="bq">高</text> -->
		        </view>
		
		      </view>
		    </view>
		    <view class="dp_cz">
		      <view>+ 关注店铺</view>
		      <view @tap="jump" data-url="/pages/dp_index/dp_index">进店逛逛</view>
		    </view>
		  </view>
		  <!-- 回头客 -->
		  <view class="htk" >
		    <view class="pj_box_tit">
		      <image class="htk_img" :src="filter.imgIP('htk.png')"></image>
		      <view class="p_tit_r"  data-url="/pages/details_pl/details_pl" @tap="jump">8人在说
		        <text class="iconfont iconnext3"></text>
		      </view>
		    </view>
		    <view class="htk_text">喝过很多家的豆子，这家没得说，烘培的很新鲜，常备口粮。</view>
		    <view class="htk_msg">
		      <view class="htk_tx">
		        <image class="htk_tx" :src="filter.imgIP('tx.png')"></image>
		      </view>
		      <view class="htk_name">张佳</view>
		      <view class="htk_num">买过14次</view>
		    </view>
		  </view>
		  <!-- 本店回头客都在买 -->
		  <view class="htk mt20">
		    <view class="pj_box_tit">
		      <view  class="p_tit_l">本店回头客都在买</view>
		      <view class="p_tit_r" @tap="jump" data-url="/pages/goods_list/goods_list">更多
		        <text class="iconfont iconnext3"></text>
		      </view>
		    </view>
		    <view class="goods_list">
		      <view v-if="idx<3" class="goods_li" v-for="(item,idx) in data_list" @tap="jump" data-url="/pages/details/details">
		        <view class="goods_img">
		          <image class="goods_img" :src="filter.imgIP('goods_02.jpg')" mode="aspectFill"></image>
		        </view>
		        <view class="htk_goods_name oh2">FISHER 意式浓精品挂耳咖啡202020202020……</view>
		        <view class="htk_goods_pri">¥<text>60</text></view>
		      </view>
		    </view>
		  </view>
		  <!-- 详情 -->
		  <view class="goods_xq mt20">
		    <view class="xq_tit">
		      <text>-</text>
		      商品详情
		      <text>-</text>
		    </view>
		    <view class="xq_box">
		      <image :src="filter.imgIP('goods_02.jpg')" mode="aspectFill" style="width:750rpx;height:750rpx;display:block;" />
		    </view>
		  </view>
		  <!-- tk -->
		  <uni-popup ref="popup" type="bottom" @change="tkchange1">
		    <view class="dy_box" style="padding: 0 5rpx 20rpx;height:600rpx;overflow: hidden">
		        <scroll-view class=" dyr_scroll" style="height:600rpx;" scroll-y>
		          <view class="tk_dyr_li" v-for="(item,idx) in data_list"  :data-type="idx" @tap="txtype_fuc">
		          <view class="dis_flex aic flex_1">
		            <view class="tk_user_tx">
		              <image class="tk_user_tx" :src="filter.imgIP('tx.png')"  mode="aspectFill"></image>
		              <image v-if="idx==1" class="tk_user_v" src="../../static/images/star_b.png"></image>
		              <image v-if="idx==2" class="tk_user_v" src="../../static/images/star_d.png"></image>
		            </view>
		            <view class="tk_user_name">kimi</view>
		            <view v-if="idx==0" class="hy_bq">好友</view>
		            <view v-if="idx==1" class="hy_bq hy_bq1 ">明星</view>
		            <view v-if="idx==2" class="hy_bq hy_bq2">达人</view>
		          </view>
		          <icon  v-if="dyr_type==idx" type="success" size="18" color="#F7B43B" />
		          <view wx:else class="tx_type2">
		            
		          </view>
		        </view>
		        </scroll-view>
		        <view class="dy_btn" @tap="xz_dyr">作为代言人</view>
		    </view>
		    <view class="b_view_o"></view>
		  </uni-popup>
		  <uni-popup ref="popup_goods" type="bottom" @change="tkchange">
				<view class="tk_popup_box">
					<view class="popopBox1">
						<view class="goodsimg">
							<image :src="filter.imgIP('goods_02.jpg')" :data-src="filter.imgIP('goods_02.jpg')" mode="aspectFill" @tap="previewImage"></image>
						</view>
						<view class="goodstkjg">
							<view class="closebtn" @tap="onClose">
								<image src="/static/images/closebtn_03.jpg"></image>
							</view>
							<view class="goods_pri_h">￥{{guige[type1[0]].pri}}</view>
							<view class="kucun">库存{{guige[type1[0]].kucun}}件</view>
							<view class="tkname oh2">已选择：{{guige[type1[0]].value1}}</view>
							<!-- <view class="tkname oh2">YI-DONG SPORT 屹动专业运动鞋 专业为中小学生运动打造的运动鞋</view> -->
						</view>
					</view>
					<block >
						<view class="tkguigetit">类型</view>
						<view class="guigeBox">
							<text class="guigeOne" :class="idx1==type1[0]?'cur':''"
								v-for="(item1,idx1) in guige"
												
												:data-gg="'0'"
												:data-gg1="idx1"
												@tap="selegg">{{item1.value1}}</text>
						</view>
					</block>
					<view class="countnum">
						<text>购买数量</text>
						<van-stepper custom-class="steppera" input-class="vanipt" plus-class="vantjia" minus-class="vantjian" :value="cnum"
						 :data-selec="idx" @input="onChange" @change="onChange" />
					</view>
					<view class="b_view_o"></view>
					<view class="czbtnG">
						<view class="jrgwc" @tap="addwgc">加入购物车</view>
						<view class="buybtn" @tap="nowbuy">立即购买</view>
					</view>
				</view>
			</uni-popup>
		  <!-- 底部 -->
		  <view class="bottom_box">
		    <view class="kf_btn" @tap="jump" data-url="/pages/lts/lts">
		      <text class="iconfont iconkefu"></text>
		      <text >客服</text>
		    </view>
		    <view class="sg"></view>
		    <view class="kf_btn">
		      <text class="iconfont iconhongxinicon"></text>
		      <text>收藏</text>
		    </view>
		    <view class="sg"></view>
		    <view class="kf_btn">
		      <text class="iconfont iconstore"></text>
		      <text  @tap="jump" data-url="/pages/dp_index/dp_index">店铺</text>
		    </view>
		    <view class="buy_btn"  @tap="sheetshow_fuc">加入购物车</view>
		    <view class="buy_btn buy_btn1"  @tap="sheetshow_fuc">立即购买</view>
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
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				circular: true,
				interval: 3000,
				duration: 1000,
				data_list:[
				  { value1: '苏门答腊黄金曼特宁深度烘培' },
				  { value1: '耳挂咖啡' },
				  { value1: '耳挂咖啡1' },
				  { value1: '耳挂咖啡1' },
				  { value1: '耳挂咖啡1' },
				  { value1: '耳挂咖啡1' },
				  { value1: '耳挂咖啡1' },
				  { value1: '耳挂咖啡1' },
				  { value1:'耳挂咖啡1'},
				],
				
				cur_swiper:1,
				
				
				
				sheetshow: false,         //规格弹框控制
				sheetshow1: false,
				dyr_type:0,
				showcan: false,
				goods_total_limit: '',  //商品阶梯
				guige: [
				  { value1: '苏门答腊黄金曼特宁深度烘培', pri: 48, kucun:900 },
				  { value1: '耳挂咖啡', pri: 49, kucun: 1900 },
				  { value1: '耳挂咖啡1', pri: 41, kucun: 2900 },
				  { value1: '耳挂咖啡2', pri: 42, kucun: 3900 },
				  { value1: '耳挂咖啡3', pri: 43, kucun: 4900 },
				],  //规格
				type1: [0],         //规格index
				cnum: 1,//数量
				goods_sku_id: 0,  //商品id
			}
		},
		components: {
				uniPopup
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function (options) {
		  
		},
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
		methods: {
			
			
			swiper_change(e){
			  console.log(e.detail )
			  var num = e.detail.current+1
			  this.cur_swiper=num
			},
			//数量
			onChange(e) {
			  let idx = e.currentTarget.dataset.selec
			  console.log(e.detail)
			  // this.data.goods_sele[idx].num=e.detail
			  this.cnum= e.detail
			},
			txtype_fuc(e) {
			  console.log(e.currentTarget.dataset.type)
			  this.dyr_type= e.currentTarget.dataset.type
			},
			xz_dyr(){
			  console.log(this.dyr_type)
			  this.sheetshow1= false
				this.$refs.popup.close()
			},
			//选择规格
			selegg(e) {
			  // console.log(e.currentTarget.dataset.gg)
			  this.type1[e.currentTarget.dataset.gg] = e.currentTarget.dataset.gg1
			
			  this.type1= this.type1
			  var ggs = this.guige
			  var ggidxs = this.type1
			
			  var ggshow1 = []
			  var ggshowid = []
			  // var ggjson = '{'
			  // for (var i = 0; i < ggs.length; i++) {
			  //   console.log(ggidxs[i])
			  //   if (ggidxs[i] != -1) {
			  //     console.log(ggs[i].values)
			  //     ggshow1.push(ggs[i].values[ggidxs[i]].attr_value)
			  //     ggshowid.push(ggs[i].values[ggidxs[i]].id)
			  //     ggjson += '"' + ggs[i].name + '":"' + ggs[i].values[ggidxs[i]].attr_value + '"'
			  //     if (i != ggs.length - 1) {
			  //       ggjson += ','
			  //     }
			  //   }
			  // }
			  // var ggshow2 = ggshow1.join('，')
			  // ggjson += "}"
			  // // ggjson=JSON.parse(ggjson)
			  var newpri = this.bSort(ggshowid)
			  newpri = newpri.join('_')
			  console.log(newpri)
			  var json1 = this.goods.sku_data
			  var mrpri = this.goods.goods_real_price
			  var mrpimg = this.goods.goods_pic
			  this.newprice= mrpri
			   this.newimg= mrpimg
			   this.sku_id= 0
			  for (var key in json1) {
			    // console.log(key, newpri, newpri == key);     //获取key值
			    if (key == newpri) {
			      console.log(json1[key])
			        this.newprice= json1[key].sku_price
			        this.sku_id= json1[key].sku_id
			        this.newimg= json1[key].sku_images
			      
			    }
			    // console.log(json1[key]); //获取对应的value值
			  }
			  // console.log(this.goods.sku_data['"'+newpri+'"'])
			  
			    this.ggshow= ggshow2
			    this.ggjson= ggjson
			  
			},
			jump(e) {
			  console.log(e.currentTarget.dataset.type)
			  service.jump(e)
			},
			onClose() {
			    this.sheetshow= false
			    this.sheetshow1= false
					this.$refs.popup.close()
					this.$refs.popup_goods.close()
			},
			sheetshow_fuc() {
			    this.sheetshow= true
			    this.btnkg= 0
					this.$refs.popup_goods.open()
			
			},
			sheetshow1_fuc() {
			  this.sheetshow1=true
			   this.$refs.popup.open()
			  this.btnkg= 0
			
			},
			tkchange(e){
				console.log(e)
				this.sheetshow=e.show
			},
			tkchange1(e){
				console.log(e)
				this.sheetshow1=e.show
			},
			//加入购物车
			addwgc() {
			  // if (!wx.getStorageSync('userWxmsg')) {
			  //   wx.navigateTo({
			  //     url: '/pages/login/login',
			  //   })
			  //   return
			  // }
			  let that = this
			
			  that.onClose()
			  wx.showToast({
			  	title:"加入成功"
			  })
			  return
			  ///api/shopping
			  console.log('addwgc')
			  if (that.btnkg == 1) {
			    return
			  } else {
			    that.btnkg= 1
			  }
			  wx.request({
			    url: service.IPurl + '/api/shopping',
			    data: {
			      token: wx.getStorageSync('token'),
			      goods_id: that.goods_id,						//(商品id) 
			      num: that.cnum,															//（数量） 
			      attr_set: that.ggjson,//(规格名称)
			      sku_id: that.sku_id,
			    },
			    header: {
			      'content-type': 'application/x-www-form-urlencoded'
			    },
			    dataType: 'json',
			    method: 'POST',
			    success(res) {
			      console.log(res.data)
			      if (res.data.code == 1) {
			        let resultd = res.data
			        // console.log(res.data)
			        that.onClose()
			        wx.showToast({
			          title: '添加成功'
			        })
			        that.addshow= true
			        // that.setData({
			        //   btnkg: 0
			        // })
			
			      } else {
			        that.sbtnkg= 0
			        if (res.data.msg) {
			          wx.showToast({
			            title: res.data.msg,
			            duration: 2000,
			            icon: 'none'
			          });
			        } else {
			          wx.showToast({
			            title: '网络异常',
			            duration: 2000,
			            icon: 'none'
			          });
			        }
			      }
			
			    },
			    fail(err) {
			      that.sbtnkg= 0
			      wx.showToast({
			        title: '网络异常',
			        duration: 2000,
			        icon: 'none'
			      });
			    }
			  })
			},
			nowbuy() {
			  // if (!wx.getStorageSync('userWxmsg')) {
			  //   wx.navigateTo({
			  //     url: '/pages/login/login',
			  //   })
			  //   return
			  // }
			  // console.log('buy')
			  //http://water5100.800123456.top/WebService.asmx/order
			  let that = this
				
			  // let goods = this.data.goods
			  // let newimg = this.data.newimg
			  // let newprice = this.data.newprice
			  // //let goodsname=this.data.goodsd.goods_sku_name
			  // let goods_pic = newimg ? newimg : goods.goods_pic
			  // let goods_name = goods.goods_name
			  // let goods_id = goods.id
			  // let goods_real_price = newprice ? newprice : goods.goods_real_price
			  // let ggshow = that.data.ggshow
			  // let ggjson = that.data.ggjson
			  // let goodsnum = this.data.cnum
			  // let sku_id = that.data.sku_id
			  // let goodsladder=this.data.goodsd.is_ladder_pricing
			  // let goodsxq=this.data.goodsd
			  // console.log(goodsxq)
				that.onClose()
			  uni.navigateTo({
			    url: '/pages/Order/Order'
			  })
			},
			call(e){
			  service.call(e)
			},
			
			pveimg(e) {
			  var curr = e.currentTarget.dataset.src
			  var urls = e.currentTarget.dataset.array
			  app.pveimg(curr, urls)
			},
		}
	}
</script>

<style scoped>
.container{
	padding-bottom: 100rpx;
  background: #f5f5f5;
}
image{
	/* width: 100%;
	height: 100%; */
}
.swiper_box{
  width: 750rpx;
	height:750rpx;
  position: relative;
}
.swiper{	
	width: 100%;
	height:750rpx;
  position: relative;
  z-index: 99;
}
.swiper image{
	width: 100%;
	height:750rpx;
}
.br_box{
  z-index: 100;
  position: absolute;
  bottom: 40rpx;
  right: 40rpx;
  width:66rpx;
height:36rpx;
background:rgba(0,0,0,.5);
border-radius:18rpx;
font-size: 26rpx;
color: #eee;
text-align: center;
line-height: 36rpx;
}
.goods_msg{
  width: 100%;
  padding: 28rpx 0 15rpx;
  background: #fff;
}
.goods_pri{
  font-size: 24rpx;
  color: #999;
  width: 100%;
  padding: 0 28rpx;
  margin-bottom:12rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.pri1{
  font-size: 36rpx;
  color: #FE3A35;
}
.goods_name{
  font-size:30rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(0,0,0,1);
  padding: 0 28rpx;
  margin-bottom: 14rpx;
  box-sizing: border-box;
}
.pri2 text{
  font-size: 23rpx;
}
.goods_bz{
  border-top: 1px solid #eee;
  padding: 20rpx 28rpx 0;
  box-sizing: border-box;
  width: 100%;
}
.g_bz_1{
 font-size: 26rpx;
 color: #666; 
 display: flex;
 align-items: center;
}
.g_bz_1 text{
 width:118rpx;
  height:38rpx;
  background:rgba(247,59,103,1);
  border-radius:10rpx;
  font-size:22rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:rgba(255,255,255,1);
  display: flex;
 align-items: center;
 justify-content: center;
 margin-right: 10rpx;
}
.bz_li{
  margin-top: 15rpx;
  display: flex;
  flex-wrap: wrap;
}
.bz_li view{
  width: 33%;
  font-size: 24rpx;
  text-align: center;
  color: #999;
}
.goods_xmsg{
  display: flex;
  width: 100%;
  padding: 22rpx 28rpx;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 1px solid #eee;
  justify-content: space-between;
  align-items: center;
}
.goods_xmsg .v1{
  width: 3em;
  margin-right: 20rpx;
  font-size: 28rpx;
  color: #333;
}
.goods_xmsg .v2{
  flex: 1;
  font-size: 24rpx;
  color: #bbb;
  display: flex;
  align-items: center;
}
.goods_xmsg .v3{
  display: flex;
  align-items: center;
  margin-left: 20rpx;
}
.goods_xmsg .v3 text{
  font-size: 20rpx;
  color: #bbb;
}
.yhq_box{
  width:90rpx;
  height:40rpx;
  background:rgba(250,233,234,1);
  border:2rpx solid rgba(247,85,89,1);
  border-radius:6rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #F8757A;
  margin-right: 10rpx;
}
.goods_xmsg .v21{
  font-size: 23rpx;
  color: #333;
  flex-direction: row-reverse;
}
/* pingjia */
.pj_box{
  background: #fff;
  width: 100%;
  /* padding: 0 28rpx; */
  border-bottom: 1px solid #eee;
}
.pj_box_tit{
  padding: 0 28rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24rpx;
  color: #999;
  height: 75rpx;
}
.p_tit_l{
  font-size: 28rpx;
  color: #333;
}
.p_tit_r{
  display: flex;
  align-items: center;
}
.p_tit_r text{
  font-size: 24rpx;
  margin-left: 10rpx;
  color: #bbb;
}
.pj_bq{
  padding: 0 10rpx;
  box-sizing: border-box;
  width: 100%;
}
.pj_bq view{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height:60rpx;
  background:rgba(250,233,234,1);
  border-radius:30rpx;
  padding: 0 23rpx;
  box-sizing: border-box;
  font-size: 24rpx;
  color: #333;
  margin: 10rpx 18rpx;
}
.pj_li{
  width: 100%;
  padding: 20rpx 28rpx;
  box-sizing: border-box;
}
.pj_d1{
  font-size: 26rpx;
  color: #999;
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}
.pj_d2{
  font-size: 26rpx;
  color: #333;
}
.user_tx{
width:42rpx;
height:42rpx;
border-radius:50%;
}
view.user_tx{
  margin-right: 10rpx;
}
/*  */

.dyr_text{
  width: 100%;
  
  
  background: #fff;
  height: 286rpx;
  display: flex;
  white-space: nowrap;
  margin-bottom: 20rpx;

}
.dyr_text1{
  padding: 10rpx 29rpx 40rpx;
  box-sizing: border-box;
  height: 286rpx;
}
.dyr_li{
  display: inline-flex;
  width:480rpx;
  height:240rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 20rpx 0px rgba(119,119,119,0.3);
  border-radius:10rpx;
  margin-right: 20rpx;
  /* flex-direction: column; */
  align-items: center;
  /* padding: 17rpx; */
  box-sizing: border-box;
}
.dyr_msg{
  width: 240rpx;
  height: 240rpx;
  padding: 20rpx;
  box-sizing: border-box;
  flex-wrap: wrap;
}
.dyr_img{
  flex: none;
  width:240rpx;
  height:240rpx;
  border-radius:0px 10rpx 10rpx 0px;
  position: relative;
  z-index: 1;
}
.dyr_imgnum{
  position: absolute;
  bottom: 10rpx;
  right: 10rpx;
  z-index: 9;
  height:29rpx;
background:rgba(0,0,0,.5);
border-radius:10rpx;
display: flex;
align-items: center;
font-size: 16rpx;
color: #fff;
padding: 0 10rpx;
}
.dyr_imgnum text{
  font-size: 14rpx;
  margin-right: 8rpx;
}
.dyr_d{
  color: #999;
  font-size: 24rpx;
  white-space:pre-line;
}
.dp_box{
  width:100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 20rpx 28rpx;
  box-sizing: border-box;
  

}
.dp_b1{
  width: 100%;
  display: flex;
}
.dp_logo{
  width:123rpx;
  height:123rpx;
  border-radius:10rpx;
  border:1px solid #eee;
}
.dp_logo image{
  width:123rpx;
  height:123rpx;
  border-radius:10rpx;
}
.dp_msg{
  flex: 1;
  height:123rpx;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.dp_name{
  font-size: 28rpx;
}
.dp_lv{
  display: flex;
  align-items: center;
}
.dp_lv image{
  width:31rpx;
  height:25rpx;
  margin-right: 10rpx;
}
.dp_bq{
  font-size: 24rpx;
  color: #bbb;
  display: flex;
  align-items: center;
}
.dp_bq text{
  margin-right: 20rpx;
}
.dp_bq .bq{
  width:28rpx;
  height:28rpx;
  background:rgba(241,241,241,1);
  border-radius:50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dp_cz{
  margin-top: 35rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.dp_cz view{
  width:336rpx;
  height:80rpx;
  background:rgba(241,241,241,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30rpx;
}
.htk{
  padding-top: 20rpx;
  padding-bottom: 30rpx;
  width: 100%;
  background: #fff;
}
.htk_img{
  width: 143rpx;
  height: 67rpx;
}
.htk_text{
  padding: 0 28rpx;
  margin-top: 10rpx;
  font-size: 24rpx;
  font-weight:400;
  color: #333;
}
.htk_msg{
  margin-top: 15rpx;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 28rpx;
  box-sizing: border-box;
}
.htk_tx{
  width:42rpx;
  height:42rpx;
  border-radius:50%;
}
.htk_name{
  font-size: 26rpx;
  color: #999;
  margin-left: 10rpx;
}
.htk_num{
  height:32rpx;
  background:rgba(248,89,81,.2);
  border-radius:4px;
  padding: 0 9rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  color: #F85951;
  margin-left: 10rpx;
}
/* goods_list */
.goods_list{
  width: 100%;
  display: flex;
  padding: 0 28rpx;
  box-sizing: border-box;
}
.goods_li{
  width: 223rpx;
  margin-right: 12rpx;
}
.goods_li:nth-child(3n){
  margin-right: 0
}
.goods_img{
  width: 223rpx;
  height: 223rpx;
  border-radius:10rpx;
  overflow: hidden;
}
.htk_goods_name{
  margin-top: 10rpx;
  font-size:26rpx;
  font-family:PingFang SC;
  font-weight:400;
  color:#666;
}
.htk_goods_pri{
  font-size: 26rpx;
  color: #F85951; 
}
.htk_goods_pri text{
  font-size: 36rpx;
}
/* 详情 */
.goods_xq{
  width: 100%;
  background: #fff;
}
.xq_tit{

  width: 100%;
  display: flex;
  font-size: 28rpx;
  color: #333;
  justify-content: center;
  align-items: center;
  height: 80rpx;
}
.xq_tit text{
  margin: 0 10rpx;
  color: #bbb;
}
.xq_box{
  width: 100%;
}
/* bottom_box */
.bottom_box{
  position: fixed;
  bottom: 0;
  height: 100rpx;
  background: #fff;
  z-index: 10;
  padding-right: 28rpx;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #eee;
}
.buy_btn{
  width:192rpx;
  height:74rpx;
  background:rgba(247,180,59,1);
  border-radius:10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
  margin-left: 18rpx;
}
.buy_btn1{
  background: #F73B67;
}
.kf_btn{
  width: 100rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22rpx;
  color: #333;
}
.kf_btn text{
  font-size: 28rpx;
  margin-bottom: 5rpx;
}
.sg{
  width:1rpx;
  height:48rpx;
  background:rgba(238,238,238,1);
}
.sj_list{
  width: 154rpx;
  height:56rpx;
  display: flex;
  flex-direction: row-reverse;
  position: relative;
  margin-right: 20rpx;
}

.sj_li{
  width:56rpx;
  height:56rpx;
  background:rgba(255,255,255,1);
  box-shadow:0px 3rpx 10rpx 0px rgba(119,119,119,0.2);
  border-radius:50%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 6;
}
.sj_li:nth-child(2){
  left: 36rpx;
  z-index: 7;
}
.sj_li:nth-child(3){
  left: 72rpx;
  z-index: 8;
}
.sj_li:nth-child(4){
  left: 98rpx;
  z-index: 9;
}
.sj_li:nth-child(5){
  left: 134rpx;
  z-index: 10;
}


/***/
.b_view_o{
  width: 100%;
  height: 120rpx;
	background: #fff;
}
.popopBox{
	width: 100%;
	padding: 20rpx 28rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: auto;
  position: relative;
  z-index: 999;
}
.tk_popup_box{
	width: 100%;
	background: #fff;
	padding: 20rpx 28rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: auto;
	position: relative;
	z-index: 999;
}
.popopBox1{
	width: 100%;
	display: flex;
  padding-bottom: 20rpx;
  border-bottom: 1px solid #eee;
	background: #fff;
}
.goodsimg{
	margin-top: 16rpx;
	width: 246rpx;
	height: 246rpx;
	border:1rpx solid #d2d2d2;
	border-radius: 16rpx;
	overflow: hidden;
	margin-right: 30rpx;
}
.goodsimg image{
  width: 246rpx;
	height: 246rpx;
}
.goodstkjg{
	flex: 1;
	position: relative;
  padding: 20rpx 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around
}
.closebtn{
	width: 37rpx;
	height: 37rpx;
	border-radius: 50%;
	border: 1px solid #dddddd;
	overflow: hidden;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}
.closebtn image{
  width: 37rpx;
	height: 37rpx;
	border-radius: 50%;
}
.goods_pri_h{
	font-size: 34rpx;
	color: #f75852;
	/* margin: 80rpx 0 25rpx; */
}
.kucun{
  color: #999999;
  font-size: 30rpx;
}
.tkname{
	display:-webkit-box !important;
	overflow:hidden;
	text-overflow:ellipsis;
	word-break:break-all;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	line-height: 45rpx;
	font-size: 30rpx;
	color: #333;
}
.tkguigetit{
	font-size: 26rpx;
	color: #333;
	padding: 20rpx 0 20rpx;
}
.guigeBox{
	display: felx;
	align-items: center;
}
.guigeOne{
	/* width: 114rpx; */
	height: 50rpx;
	padding: 0 10rpx;
	border-radius: 8rpx;
	border: 1px solid #ddd;
	font-size: 26rpx;
	color: #333;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin-right: 10rpx;
  margin-bottom: 10rpx;
}
.guigeOne.cur{
	background:rgba(250,233,234,1);
  border:1px solid rgba(247,85,89,1);
	color: #F75559;
}
.countnum{
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	color: #333;
	margin-top: 20rpx;
  padding-bottom:60rpx; 
}
.czbtnG{
  width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	display: flex;
  justify-content: space-around;
  align-items: center;
  height: 120rpx;
}
.czbtnG .jrgwc,.czbtnG .buybtn{
	width:338rpx;
  height:80rpx;
  background:rgba(247,180,59,1);
  border-radius:40rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30rpx;
}
.czbtnG .buybtn{
  background: #F73B67;
}
.shuxian{
	width: 1px;
	height: 90rpx;
	margin: 0 15rpx;
	background-color: #eeeeee;
}
.contbox{
	width: 100%;
	padding: 10rpx 28rpx;
	box-sizing: border-box;
  background-color:#fff;
}



.tcc{
	width: 80vw;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.hiddenbox{
	width: 0;
	height: 0;
	overflow: hidden;
	opacity: 0;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: -1;
}

.htoi{
	position: relative;
	width:750px;height:1206px;
	/* box-shadow:4rpx 4rpx 8rpx rgba(0,0,0,0.5); */
	/* margin-top: 20px; */
	/* transform:scale(.5); */
	opacity: 0;
	z-index: -1;
}
.showimg{
	width: 375rpx;
	height: 603rpx;
	margin-top: 20px;
	background-color: #eee;
}
.saveimg{
	width: 300rpx;
	height: 100rpx;
	border-radius: 50rpx;
	background: #f75852;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
	margin-top: 40rpx;
	margin-bottom: 20px;
}
action-sheet-item{
	padding: 0!important;
	position: relative;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
button {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #fff!important;
	opacity: 0;
}
.guige{
	position: relative;
}
/* 选择代言人 */
/* .uni-popup__wrapper-box{
	background: #fff;
} */
.dy_box{
  width: 100%;
  padding:0 0 20rpx;
	margin: 0 auto;
  box-sizing: border-box;
	background: #fff;
}
.dyr_scroll{
	width: 694rpx;
	margin: 0 auto;
}
.tk_dyr_li{
  width: 100%;
  height: 106rpx;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tk_user_tx{
	width:82rpx;
	height:82rpx;
	border-radius:50%;
	position: relative;
}
.tk_user_v{
	position: absolute;
	bottom: 0;
	right: 0;
	width: 27rpx;
	height: 28rpx;
}
.tk_user_name{
  font-size: 30rpx;
  color: #333;
  margin: 0 15rpx;
}
.hy_bq{
  color: #FE3569;
  width:60rpx;
  height:32rpx;
  border:1px solid rgba(254,53,105,1);
  border-radius:4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  margin-right: 5rpx;
}
.hy_bq1{
  color: #FEC335;
  border: 1px solid #FEC335;
}
.hy_bq2{
  color: #3598FE;
  border: 1px solid #3598FE;
}
.dy_btn{
  position: fixed;
  bottom: 20rpx;
  left: 28rpx;
  right: 28rpx;
  height:98rpx;
  background:rgba(244,116,22,1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  color: #fff;
}
.tx_type2{
	width:38rpx;
	height:38rpx;
	border:1px solid rgba(210,210,210,1);
	border-radius:50%;
}


::-webkit-scrollbar
{
width: 0;
height: 0;
color: transparent;
}

.container-ban{
  height: 100vh;
  overflow: hidden;
}
</style>
