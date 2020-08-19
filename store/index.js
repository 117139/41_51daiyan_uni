import Vue from 'vue'
import Vuex from 'vuex'
import tim from '../commen/tim/tim'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		isLogin: false,
		isSDKReady: false, // TIM SDK 是否 ready

		conversationActive: {}, //聊天进行中的会话
		toUserId: '', //聊天对象id
		conversationList: [], //会话列表
		currentMessageList: [], //消息列表

		forcedLogin: false,
		hasLogin: false,
		platform: '',
		shouquan: '',
		userName: "游客",
		loginMsg: '',
		wxlogin: 0,
		renzheng:'',
		order_ls_data:'',
		spurl:[],
		dy_fb_list:[],
		ov_ids:'',
	},
	mutations: {
		
		dy_fb_fuc(state,dy_fb_list){
			state.dy_fb_list = dy_fb_list || [];
			var ov_ids=[]
			console.log('dy_fb_list-------------------------------------------->')
			console.log(dy_fb_list)
			for(var i=0;i<dy_fb_list.length;i++){
				ov_ids.push(dy_fb_list[i].ov_id)
			}
			console.log(ov_ids)
			state.ov_ids = ov_ids.join(',')
		},
		spurl_fuc(state,spurl){
			state.spurl = spurl || [];
		},
		saverz(state,renzheng){
			state.renzheng = renzheng || '';
		},
		wxlogin(state, num) {
			state.wxlogin = num++
		},
		order_ls(state,order_ls){
			state.order_ls_data=order_ls || ''
		},
		login(state, loginMsg) {
			// state.userName = userName || '新用户';
			state.loginMsg = loginMsg || '新用户';
			state.hasLogin = true;
		},
		setplatform(state, platform) {
			state.platform = platform || 'android';
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		},
		wxshouquan(state, shouquan) {
			state.shouquan = shouquan || '';
		},
		//更新登录状态
		toggleIsLogin(state, isLogin) {
			state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
			state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady
		},
		//退出登录重置状态
		reset(state) {
			state.isLogin = false
			state.isSDKReady = false
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state, toUserId) {
			state.conversationActive.conversationID = 'C2C' + toUserId
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state, conversationItem) {
			state.conversationActive = Object.assign({}, conversationItem);
			state.toUserId = conversationItem.userProfile.userID
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state, newConversationList) {
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			// 还没当前会话，则跳过
			if (Array.isArray(data)) {
				// 筛选出当前会话的消息
				const result = data.filter(item => item.conversationID === state.conversationActive.conversationID)
				state.currentMessageList = [...state.currentMessageList, ...result]
			} else if (data.conversationID === state.conversationActive.conversationID) {
				state.currentMessageList = [...state.currentMessageList, data]
			}
			console.log('1111')
			console.log(state.currentMessageList)
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state, data) {
			console.log(data)
			if (data) {
				state.currentMessageList = [...data, ...state.currentMessageList]
			}
		},
	},

	actions: {

	}
})
export default store
