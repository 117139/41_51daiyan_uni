// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const IPurl = 'http://syczt.800123456.vip:8099';
const imgurl = 'http://syczt.800123456.vip:8099';

/**
 * 请求头
 */
var header = {
	'content-type': 'application/x-www-form-urlencoded'
}

/**
 * 供外部post请求调用  
 */
function post(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "POST")
	request(url, params, "POST", onSuccess, onFailed);

}

/**
 * 供外部get请求调用
 */
function get(url, params, onSuccess, onFailed) {
	console.log("请求方式：", "GET")
	request(url, params, "GET", onSuccess, onFailed);
}

/**
 * function: 封装网络请求
 * @url URL地址
 * @params 请求参数
 * @method 请求方式：GET/POST
 * @onSuccess 成功回调
 * @onFailed  失败回调
 */

function request(url, params, method, onSuccess, onFailed) {
	console.log('请求url：' + url);

	console.log("请求头：", header)
	uni.request({
		url: IPurl + url,
		data: dealParams(params),
		method: method,
		header: header,
		success: function(res) {
			uni.hideLoading();
			uni.stopPullDownRefresh();
			console.log('响应：', res.data);

			// if (res.data) {
			/*if (res.data.code == -1) {
				if (params.login_type == 1) {
					//一进来就登录失败
					return

				}
				if (params.login_type == 2) {
					//授权登录失败
					uni.navigateBack()
					return

				}
				uni.showToast({
					icon: 'none',
					title: '请先登录账号'
				})
				setTimeout(function (){
					uni.navigateTo({
						url: '../login/login?haslogin=false'
					})
				},1000)
				return

			}*/

			/** start 根据需求 接口的返回状态码进行处理 */
			onSuccess(res);
			/** end 处理结束*/
			// }
		},
		fail: function(error) {

			uni.hideLoading();
			uni.stopPullDownRefresh();
			onFailed(error); //failure for other reasons
		}
	})
}

/**
 * function: 根据需求处理请求参数：添加固定参数配置等
 * @params 请求参数
 */
function dealParams(params) {
	console.log("请求参数:", params)
	return params;
}



const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	let users = getUsers();
	users.push({
		account: userInfo.account,
		password: userInfo.password
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

const gologin = function() {
	uni.navigateTo({
		url: '/pages/login_index/login_index'
	})
}

const jump = function(e) {
	console.log(e.currentTarget.dataset.type)
	if (e.currentTarget.dataset.type == 2) {
		uni.switchTab({
			url: e.currentTarget.dataset.url
		})
	} else {
		uni.navigateTo({
			url: e.currentTarget.dataset.url
		})
	}
}
const pveimg = function(e) {
	var current = e.currentTarget.dataset.src
	var urls = e.currentTarget.dataset.array

	let urls1 = []
	if (urls) {
		urls1 = urls

	} else {
		urls1[0] = current
	}
	uni.previewImage({
		current: current, // 当前显示图片的http链接
		urls: urls1 // 需要预览的图片http链接列表
	})

}
const call=  function (e){
	if(e.currentTarget.dataset.tel){
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.tel+''
		})
	}
}
export default {
	getUsers,
	addUser,
	get,
	post,
	IPurl,
	imgurl,
	gologin,
	jump,
	pveimg,
	call
}
