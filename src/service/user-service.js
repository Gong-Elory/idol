/*
* @Author: Elory
* @Date:   2017-09-20 22:22:47
* @Last Modified by:   Elory
* @Last Modified time: 2017-09-20 22:32:20
*/
'use stirct';
var _req = require('util/idol_common_tools.js');
var _user = {
	logout: function(resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	checkLogin: function(resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	getUserInfo: function(resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/get_information.do'),
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	login: function(userinfo,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/login.do'),
			data: userinfo,
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	checkUsername: function(username,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/check_valid.do'),
			data: {
				type: 'username',
				str: username
			},
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	register: function(userinfo,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/register.do'),
			data:userinfo,
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	getQuestion: function(username,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/forget_get_question.do'),
			data: {
				username: username
			},
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	checkAnswer: function(userinfo,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/forget_check_answer.do'),
			data: userinfo,
			method: 'POST',
			success: resolve,
			error: reject,
		})
	},
	//修改密码
	resetPassword: function(userinfo,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/forget_reset_password.do'),
			data: userinfo,
			method: 'POST',
			success: resolve,
			error: reject,
		})
	},
	//更新个人信息
	updateUserInfo: function(userinfo,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/update_information.do'),
			data: userinfo,
			method: 'POST',
			success: resolve,
			error: reject,
		});
	},
	//登陆状态下更新密码
	updatePassword: function(userinfo,resolve,reject){
		_req.request({
			url : _req.getServerUrl('/user/reset_password.do'),
			data: userinfo,
			method: 'POST',
			success: resolve,
			error: reject,
		});
	}

}

module.exports = _user;