import Vue from 'vue'
import store from './store/index.js'
import tim from './commen/tim/tim.js'
import event from 'commen/event.js'
// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
/* #ifndef H5 */
// const IPurl = 'https://wx.51daiyan.cn/api/';
/* #endif */
// const IPurl = 'http://xuwes6.natappfree.cc/api/';
const IPurl = 'https://wx.51daiyan.cn/api/';
const imgurl = 'https://cdn.51daiyan.cn/';
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
			if (res.data.code == -1) {
				// if (params.login_type == 1) {
				// 	//一进来就登录失败
				// 	return

				// }
				// if (params.login_type == 2) {
				// 	//授权登录失败
				// 	uni.navigateBack()
				// 	return

				// }
				store.commit('logout')
				uni.showToast({
					icon: 'none',
					title: '请先授权登录'
				})
				setTimeout(function() {
					uni.navigateTo({
						url: './pagesA/login/login?haslogin=false'
					})
				}, 1000)
				return

			}

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
	var datas = e.currentTarget.dataset
	if (datas.login) {
		console.log(datas.haslogin)
		if (!datas.haslogin) {
			uni.navigateTo({
				url: '/pagesA/login/login',
			});
			return
		}
	}
	if (datas.type == 'sp') {
		console.log(datas.spurl)
		store.commit('spurl_fuc', datas.spurl)
		uni.navigateTo({
			url: datas.url
		})
		return
	}
	if (datas.type == 2) {
		uni.switchTab({
			url: datas.url
		})
	} else {
		uni.navigateTo({
			url: datas.url
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
	console.log(urls1)
	uni.previewImage({
		current: current, // 当前显示图片的http链接
		urls: urls1 // 需要预览的图片http链接列表
	})

}
const call = function(e) {
	if (e.currentTarget.dataset.tel) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.tel + ''
		})
	}
}

const wxlogin = function(num) {
	var that = this
	
	var userInfo = uni.getStorageSync('userInfo')
	if (!userInfo) {
			
	} else {
		uni.login({
			success: function(res) {
		
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				var uinfo = userInfo
				let data = {
					code: res.code,
					nickname: uinfo.nickName,
					avatarurl: uinfo.avatarUrl
				}
				let rcode = res.code
				console.log(res.code)
				uni.request({
					url: IPurl + '/login',
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					method: 'POST',
					success(res) {
						uni.hideLoading()
						console.log(res.data)
						if (res.data.code == 1) {
							console.log('登录成功')
							console.log(res.data)
							uni.setStorageSync('token', res.data.data.userToken)
							//获取手机号
							if (!res.data.data.phone) {
								uni.showToast({
									icon: 'none',
									title: '请先绑定手机号'
								})
								if (num == 1) {
									setTimeout(() => {
										uni.redirectTo({
											url: '/pagesA/getTel/getTel'
										})
									}, 1000)
								} else {
									setTimeout(() => {
										uni.navigateTo({
											url: '/pagesA/getTel/getTel'
										})
									}, 1000)
								}
								return
							}
							uni.setStorageSync('loginmsg', res.data.data)
							store.commit('login', res.data.data)
		
							event.trigger({
								type: 'test',
								page: '/pages/index/index',
								//obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
								obj: {
		
								},
								test: {
									'loginmsg': res.data.data
								},
								success: function(data) {
									//data为on中返回的数据
								}
							});
							// im login
		
		
		
							if (num == 1) {
								uni.showToast({
									icon: 'none',
									title: '登录成功'
								})
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							}
						} else {
							uni.removeStorageSync('userInfo')
							uni.removeStorageSync('token')
							uni.showToast({
								icon: 'none',
								title: '登录失败',
							})
						}
		
					},
					fail() {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						})
					}
				})
			}
		})
	}
	return
	// 获取用户信息
	uni.getSetting({
		success: res => {
			console.log(res)
			if (res.authSetting['scope.userInfo'] == true) {
				// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
				console.log('已经授权')
				uni.getUserInfo({
					success(res) {
						var userInfo = res.userInfo
						console.log(userInfo)
						uni.setStorageSync('userInfo', res.userInfo)
						if (!userInfo) {

						} else {
							uni.login({
								success: function(res) {

									// 发送 res.code 到后台换取 openId, sessionKey, unionId
									var uinfo = userInfo
									let data = {
										code: res.code,
										nickname: uinfo.nickName,
										avatarurl: uinfo.avatarUrl
									}
									let rcode = res.code
									console.log(res.code)
									uni.request({
										url: IPurl + '/login',
										data: data,
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										dataType: 'json',
										method: 'POST',
										success(res) {
											uni.hideLoading()
											console.log(res.data)
											if (res.data.code == 1) {
												console.log('登录成功')
												console.log(res.data)
												uni.setStorageSync('token', res.data.data.userToken)
												//获取手机号
												if (!res.data.data.phone) {
													uni.showToast({
														icon: 'none',
														title: '请先绑定手机号'
													})
													if (num == 1) {
														setTimeout(() => {
															uni.redirectTo({
																url: '/pagesA/getTel/getTel'
															})
														}, 1000)
													} else {
														setTimeout(() => {
															uni.navigateTo({
																url: '/pagesA/getTel/getTel'
															})
														}, 1000)
													}
													return
												}
												uni.setStorageSync('loginmsg', res.data.data)
												store.commit('login', res.data.data)

												event.trigger({
													type: 'test',
													page: '/pages/index/index',
													//obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
													obj: {

													},
													test: {
														'loginmsg': res.data.data
													},
													success: function(data) {
														//data为on中返回的数据
													}
												});
												// im login



												if (num == 1) {
													uni.showToast({
														icon: 'none',
														title: '登录成功'
													})
													setTimeout(() => {
														uni.navigateBack()
													}, 1000)
												}
											} else {
												uni.removeStorageSync('userInfo')
												uni.removeStorageSync('token')
												uni.showToast({
													icon: 'none',
													title: '登录失败',
												})
											}

										},
										fail() {
											uni.hideLoading()
											uni.showToast({
												icon: 'none',
												title: '登录失败'
											})
										}
									})
								}
							})
						}
					}
				})

			} else {
				uni.hideLoading()
			}
		}
	})
}


const get_info = function(data) {
	uni.request({
		url: IPurl + '/user/info',
		data: {
			token:store.state.loginMsg.userToken,
			// token:'a0c5d43b2fa7aa59233287ba6f3536e0',
			// token:'e48aec7443bab4ad0398fb4f55a57363',
			// token:'12e1c60d8de6a4259b8b689d9c8e742e',
			// token:'70c383a3deb1008a622fb41485e05c37',
			// token:'6fc0fd38e32d91f8ec7720fe95e1a666',
			// token:'94c599cbfc0f8a6a0a9a5127c8b76fe2'
			// token:'ede428b7c887b98338ae8a9474ac84f8'
			// token:store.state.loginMsg.userToken
		},
		header: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		dataType: 'json',
		method: 'GET',
		success(res) {
			uni.hideLoading()
			uni.stopPullDownRefresh()
			console.log(res.data)
			if (res.data.code == 1) {
				console.log('登录成功')
				console.log(res.data)
				uni.setStorageSync('token', res.data.data.userToken)
				uni.setStorageSync('loginmsg', res.data.data)
				store.commit('login', res.data.data)

				event.trigger({
					type: 'test',
					page: '/pages/index/index',
					//obj和test是举的例子，随意啥都行，这个传过去在on中的args中都可以获取到
					obj: {

					},
					test: {
						'loginmsg': res.data.data
					},
					success: function(data) {
						//data为on中返回的数据
					}
				});
			}else{
				if(res.data.msg){
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				}else{
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				}
			}
		},
		fail() {
			uni.hideLoading()
			uni.showToast({
				icon: 'none',
				title: '获取数据失败'
			})
		}
	})
}
const setUsermsg = function(data) {
	var jkurl = '/user/amendInfo'

	post(jkurl, data,
		function(res) {

			// if (res.data.code == 1) {
			if (res.data.code == 1) {
				var datas = res.data.data
				// console.log(typeof datas)

				if (typeof datas == 'string') {
					datas = JSON.parse(datas)
				}
				wxlogin()
				uni.showToast({
					title: '操作成功'
				})

			} else {
				if (res.data.msg) {
					uni.showToast({
						icon: 'none',
						title: res.data.msg
					})
				} else {
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				}
			}
		},
		function(err) {
			that.btnkg = 0

			uni.showToast({
				icon: 'none',
				title: '获取数据失败'
			})

		}
	)
}








// 配置接口请求的公共方法
const http = ({
	url = '',
	param = {},
	method = '',
	header = {
		'content-type': 'application/x-www-form-urlencoded'
	}
} = {}) => {

	let timeStart = Date.now();
	return new Promise((resolve, reject) => {
		console.log('请求url：' + getUrl(url));

		console.log("请求头：", header)
		console.log("param：", param)
		wx.request({
			url: getUrl(url),
			data: param,
			method: method,
			header: header,
			complete: (res) => {
				uni.hideLoading();
				uni.stopPullDownRefresh(); //慎用hideLoading,会关闭wx.showToast弹窗
				console.log(`耗时${Date.now() - timeStart}`);
				console.log(res)
				if (res.statusCode == 200) { //请求成功

					if (res.data.code == -1) {
						store.commit('logout')
						uni.navigateTo({
							url: '/pagesA/login/login'
						})
						return
					} else if (res.data.code == 0 && res.msg == '请先登录账号~') {
						uni.navigateTo({
							url: '/pagesA/login/login'
						})
						return
					} else if (res.data.code == 0) {
						if (res.data.msg) {
							if(res.data.msg=='您已经关注了此用户'){
								return
							}
							uni.showToast({
								icon: 'none',
								title: res.data.msg
							})
						} else {

							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
					resolve(res.data)
				} else {
					reject(res);
				}
			}
		})
	})
}
// 获取url
const getUrl = (url) => {
	if (url.indexOf('://') == -1) {
		url = IPurl + url;
	}
	return url;
}
//暴露出去调用的方法


// get方法
const P_get = (url, param = {}) => {
	wx.showLoading({
		title: '请求中，请耐心等待...',
	});
	return http({
		url,
		param,
		method: 'GET'
	})
}

const P_post = (url, param = {}) => {
	return http({
		url,
		param,
		method: "POST"
	})
}

const P_put = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}

const P_delete = (url, param = {}) => {
	return http({
		url,
		param,
		method: 'put'
	})
}
// // 单个请求
// service.P_get('/cate/list').then(res => {
// 	console.log(res)
// }).catch(e => {
// 	console.log(e)
// })

// // 一个页面多个请求
// Promise.all([
//   service.P_get('/cate/list'),
//   service.P_get(`detail/${id}`)
// ]).then(result => {
//   console.log(result)
// }).catch(e => {
//   console.log(e)
// })


const gettime = function(mj) {
	if (!mj) {
		return {}
	}
	// // console.log(mj.indexOf('今天')!=-1)
	// if(mj.indexOf('今天')!=-1){
	// 	return {
	// 		type:2,

	// 		time:mj
	// 	}
	// }
	// mj = mj.replace(/-/g,'/')
	var ntime = new Date(mj * 1000)
	// console.log(ntime)
	var n_year = ntime.getFullYear();
	var n_month = ntime.getMonth() + 1;
	var n_date = ntime.getDate();
	var n_hour = ntime.getHours();
	var n_minute = ntime.getMinutes();

	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	// n_month=n_month<10? '0'+n_month:n_month
	n_date = n_date < 10 ? '0' + n_date : n_date
	n_hour = n_hour < 10 ? '0' + n_hour : n_hour
	n_minute = n_minute < 10 ? '0' + n_minute : n_minute
	if (n_year == year) {

		return {
			type: 1,
			year: n_year,
			month: n_month,
			date: n_date,
			hour: n_hour,
			minute: n_minute,
			time: '今天 ' + n_hour + ':' + n_minute
		}
	} else {

		return {
			type: 2,
			year: n_year,
			month: n_month,
			date: n_date,
			hour: n_hour,
			minute: n_minute,
			time: n_year + '-' + n_month + '-' + n_date
		}
	}
}


const wxpay = function(datas, type) {
	if (!datas) return
	uni.showLoading({
		mask: true,
		title: '正在拉起支付'
	})
	if (typeof datas == 'string') {
		datas = JSON.parse(datas)
	}

	return new Promise((resolve, reject) => {
		uni.hideLoading()
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: datas.timeStamp || String(Date.now()),
			nonceStr: datas.nonceStr,
			package: datas.package,
			signType: datas.signType,
			paySign: datas.paySign,
			success: function(res) {
				console.log('success:' + JSON.stringify(res));

				resolve(res)

			},
			fail: function(err) {
				if (!reject) {
					uni.showToast({
						icon: 'none',
						title: '微信支付失败'
					})
				} else {

					reject(err);
				}
				console.log('fail:' + JSON.stringify(err));
			}
		});
	})

}
const getimg = function(img) {
	if (!img) return img
	// console.log(imgurl+img)
	if (img.indexOf('://') == -1) {
		img = imgurl + img
	}
	console.log(img)
	return img
}
const getimgarr = function(imgs, type) {
	if (!imgs) return
	if (!type) {
		type = ','
	}
	imgs = imgs.split(type)
	// console.log(imgurl+img)
	var newimgs = []
	for (var i = 0; i < imgs.length; i++) {
		var img = imgs[i]
		if (img.indexOf('://') == -1) {
			img = imgurl + img
		}
		newimgs.push(img)
	}
	// console.log(newimgs)
	return newimgs
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
	call,
	wxlogin,
	setUsermsg,
	P_get,
	P_post,
	P_put,
	P_delete,
	gettime,
	getimg,
	getimgarr,
	wxpay,
	get_info
}
